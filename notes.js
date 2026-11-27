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

async function importNotes(input) {
  const status = v.querySelector('#notes-import-status');
  const file = input.files[0];
  if (!file) return;
  try {
    const data = JSON.parse(await file.text());
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
    if (tab !== 6) return;
    if (added) {
      render();
      v.querySelector('details.card').open = true;
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
      <article class="card note-entry"><h3>${e(noteTitle(key))}</h3>
      <p class="note-text">${e(note)}</p>
      <button type="button" data-edit-note="${index}">Modifier</button></article>`).join('')}</div>
    <details class="card"><summary>Sauvegarder mes notes</summary><p><button onclick="exportNotes()">Exporter mes notes</button></p>
      <label>Importer des notes <input type="file" accept=".json,application/json" onchange="importNotes(this)"></label>
    </details>
    <p id="notes-import-status" role="status"></p>
    <p><button onclick="backup()">Exporter ma sauvegarde</button> <label>Importer <input type="file" accept=".json" onchange="restore(this)"></label></p>`;
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
