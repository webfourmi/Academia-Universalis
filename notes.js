function downloadBackup(data, name) {
  const url = URL.createObjectURL(new Blob([JSON.stringify(data,null,2)], {type:'application/json'}));
  const link = document.createElement('a');
  link.href = url;
  link.download = name;
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function exportNotes() {
  downloadBackup({format:'academia-notes', version:1, notes:S.notes}, 'academia-notes-'+localStudyDate()+'.json');
}

function backup() {
  downloadBackup(S,'academia-sauvegarde.json');
}

async function restore(input) {
  const file = input.files[0];
  if (!file) return;
  const status = v.querySelector('#notes-import-status');
  let data;
  try {
    data = JSON.parse((await file.text()).replace(/^\uFEFF/,''));
  } catch {
    status.textContent = 'Choisis le fichier .json téléchargé depuis Academia Universalis.';
    input.value = '';
    return;
  }
  if (data?.format === 'academia-notes') {
    await importNotes(input,data);
    return;
  }
  const records = (value,type) => value && typeof value === 'object' &&
    !Array.isArray(value) && Object.values(value).every(entry=>typeof entry === type);
  try {
    if (!validAssessments(data?.assessments) || !validReviews(data?.reviews) ||
        !records(data?.done,'boolean') || !records(data.notes,'string') ||
        (data.history !== undefined && !records(data.history,'boolean')) ||
        ![3,6,10].includes(data.hours)) {
      status.textContent = 'Ce fichier JSON ne correspond pas à une sauvegarde Academia valide.';
      return;
    }
    if (!confirm('Remplacer les notes, la progression et le rythme sur cet appareil par cette sauvegarde ?')) return;
    localStorage.au = JSON.stringify(data);
    S = data;
    render();
    v.querySelector('#notes-import-status')?.append('Sauvegarde restaurée.');
  } catch {
    status.textContent = 'Impossible d’enregistrer la sauvegarde sur cet appareil.';
  } finally {
    input.value = '';
  }
}

async function importNotes(input, parsedData) {
  const status = v.querySelector('#notes-import-status');
  const file = input.files[0];
  if (!file) return;
  try {
    const data = parsedData ?? JSON.parse((await file.text()).replace(/^\uFEFF/,''));
    const notes = data?.notes;
    const supported = data?.format === 'academia-notes'
      ? data.version === 1
      : data?.done && typeof data.done === 'object';
    if (!supported || !notes || typeof notes !== 'object' || Array.isArray(notes) ||
        !Object.values(notes).every(note => typeof note === 'string')) {
      throw new Error('Format de notes invalide');
    }

    const merged = new Map(Object.entries(S.notes));
    let added = 0;
    let conflicts = 0;
    for (const [key, note] of Object.entries(notes)) {
      if (!note.trim() || merged.get(key) === note) continue;
      if (merged.get(key)?.trim()) {
        conflicts++;
        continue;
      }
      merged.set(key, note);
      added++;
    }

    if (added) {
      const next = {...S, notes:Object.fromEntries(merged)};
      localStorage.au = JSON.stringify(next);
      S = next;
    }
    if (tab !== 6 && tab !== 15) return;
    if (added) {
      render();
      v.querySelector('#notes-backup-panel').open = true;
    }
    const message = added === 1 ? '1 note ajoutée.' : added+' notes ajoutées.';
    const retained = conflicts === 1 ? ' 1 note différente a été conservée dans sa version locale.'
      : conflicts ? ' '+conflicts+' notes différentes ont été conservées dans leur version locale.' : '';
    v.querySelector('#notes-import-status').textContent = message + retained;
  } catch {
    status.textContent = 'Impossible d’importer ces notes. Choisis un fichier de notes ou une sauvegarde Academia valide.';
  } finally {
    input.value = '';
  }
}

function showNotebook() {
  const entries = Object.entries(S.notes).filter(([,note])=>note.trim());
  v.innerHTML = `<h2>Mon carnet</h2>
    ${entries.length ? '' : '<p>Tes notes de cours et tes brouillons apparaîtront ici.</p>'}
    <div id="notebook-entries">${entries.map(([key,note],index)=>`
      <article class="card note-entry" tabindex="-1" data-note-key="${e(key)}"><h3>${e(noteTitle(key))}</h3>
      <p class="note-text">${e(note)}</p>
      <button type="button" data-edit-note="${index}">Modifier</button>
      ${lessonForNote(key)?`<button type="button" data-note-lesson="${index}">Ouvrir la leçon</button>`:''}</article>`).join('')}</div>
    ${backupControls()}`;
  v.querySelectorAll('[data-note-lesson]').forEach(button=>{
    button.onclick=()=>openNotebookLesson(entries[Number(button.dataset.noteLesson)][0]);
  });
  v.querySelectorAll('[data-edit-note]').forEach(button=>button.onclick=()=>{
    const index = Number(button.dataset.editNote);
    const [key] = entries[index];
    const card = button.closest('article');
    const form = document.createElement('form');
    form.innerHTML = `<label for="note-edit-${index}">Texte de la note</label>
      <textarea id="note-edit-${index}" rows="6" required></textarea>
      <button>Enregistrer</button> <button type="button" data-cancel>Annuler</button>
      <p role="status"></p>`;
    const input = form.querySelector('textarea');
    input.value = S.notes[key];
    const preview = card.querySelector('.note-text');
    preview.hidden = true;
    button.hidden = true;
    card.append(form);
    input.focus();
    function closeEditor() {
      preview.hidden = false;
      button.hidden = false;
      form.remove();
      button.focus();
    }
    form.querySelector('[data-cancel]').onclick = closeEditor;
    form.onsubmit = event => {
      event.preventDefault();
      if (!input.value.trim()) {
        form.querySelector('[role="status"]').textContent = 'Écris une note avant de l’enregistrer.';
        input.focus();
        return;
      }
      try {
        const next = {...S,notes:{...S.notes,[key]:input.value}};
        localStorage.au = JSON.stringify(next);
        S = next;
        preview.textContent = input.value;
        closeEditor();
        v.querySelector('#notes-import-status').textContent = 'Note enregistrée.';
      } catch {
        form.querySelector('[role="status"]').textContent = 'Impossible d’enregistrer la note. Ton texte est toujours dans le champ.';
      }
    };
  });
}


function backupControls() {
  return `<details id="notes-backup-panel" class="card"><summary>Sauvegarder mes notes</summary><p><button onclick="exportNotes()">Exporter mes notes</button></p>
    <label>Importer des notes <input type="file" accept=".json,application/json" onchange="importNotes(this)"></label>
  </details>
  <p id="notes-import-status" role="status"></p>
  <p><button onclick="backup()">Exporter ma sauvegarde</button> <label>Importer <input type="file" accept=".json,application/json" onchange="restore(this)"></label></p>`;
}

function showBackup() {
  v.innerHTML=`<h2>Sauvegarde</h2>
    <p>La sauvegarde complète contient tes notes, ta progression et tes évaluations. Tu peux aussi exporter uniquement tes notes.</p>
    ${backupControls()}`;
}
