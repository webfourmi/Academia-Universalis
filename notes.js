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
  const date=localStudyDate();
  const {studySession,...data}=S;
  if(studySession)data.studySession={...studySession,elapsed:sessionElapsed(studySession),started:null};
  downloadBackup(data,'academia-sauvegarde-'+date+'.json');
  try{localStorage.setItem('au-export-date',date);}catch{}
  const status=v.querySelector('#last-export');
  if(status)status.textContent='Dernier export lancé le '+date+'.';
}

function safeBackupTree(value, depth = 0) {
  if (depth > 40) return false;
  if (value === null || typeof value !== 'object') return true;
  return Object.keys(value).every(key =>
    !['__proto__','constructor','prototype'].includes(key) &&
    safeBackupTree(value[key], depth + 1));
}

async function restore(input) {
  const file = input.files[0];
  if (!file) return;
  const status = v.querySelector('#notes-import-status');
  let data;
  try {
    if (file.size > 10 * 1024 * 1024) throw new Error('Fichier trop volumineux');
    data = JSON.parse((await file.text()).replace(/^\uFEFF/,''));
    if (!safeBackupTree(data)) throw new Error('Structure invalide');
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
    if (!validAuditState(data) || !validLiteraryState(data?.literary) || !validPracticeProjects(data?.practiceProjects) || !validLibraryShelf(data?.libraryShelf) || !validMemoryCards(data?.memoryCards) || !validBookmarks(data?.bookmarks) || !validReadingTools(data?.readingTools) || !validStudyMinutes(data?.studyMinutes) || !validAssessments(data?.assessments) || !validReviews(data?.reviews) ||
        !records(data?.done,'boolean') || !records(data.notes,'string') ||
        (data.history !== undefined && !records(data.history,'boolean')) ||
        (data.lessonRevisions !== undefined && (!records(data.lessonRevisions,'number') ||
          !Object.values(data.lessonRevisions).every(value=>Number.isInteger(value) && value>=1))) ||
        ![3,6,10].includes(data.hours)) {
      status.textContent = 'Ce fichier JSON ne correspond pas à une sauvegarde Academia valide.';
      return;
    }
    if (!confirm('Remplacer les notes, la progression et le rythme sur cet appareil par cette sauvegarde ?')) return;
    const previous = JSON.stringify(S);
    localStorage.setItem('au-before-restore', previous);
    if(data.studySession)data.studySession.started=null;
    localStorage.au=JSON.stringify(data);
    S = data;
    render();
    v.querySelector('#notes-import-status')?.append('Sauvegarde restaurée.');
  } catch {
    if (status) status.textContent = 'Impossible de terminer la restauration. Une copie préalable est conservée si son enregistrement a réussi.';
  } finally {
    input.value = '';
  }
}

async function importNotes(input, parsedData) {
  const status = v.querySelector('#notes-import-status');
  const file = input.files[0];
  if (!file) return;
  try {
    if (file.size > 10 * 1024 * 1024) throw new Error('Fichier trop volumineux');
    const data = parsedData ?? JSON.parse((await file.text()).replace(/^\uFEFF/,''));
    if (!safeBackupTree(data)) throw new Error('Structure invalide');
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

function notebookCategory(key) {
  const lesson = lessonForNote(key);
  if (lesson) return [lesson.course.year || 1,lesson.course.title.split(' · ')[0]];
  const archive = /^(\d+)-(\d+)-\d+$/.exec(key);
  if (archive && raw[archive[1]]?.[archive[2]]) return [Number(archive[1])+1,raw[archive[1]][archive[2]][0]];
  return key.startsWith('synthese:') ? [1,'Travaux de synthèse'] : [0,'Autres notes'];
}

function showNotebook() {
  const entries = Object.entries(S.notes).filter(([,note])=>note.trim());
  const categories=entries.map(([key])=>notebookCategory(key));
  const subjects=[...new Set(categories.map(([,subject])=>subject))].sort((a,b)=>a.localeCompare(b,'fr'));
  v.innerHTML = `<h2>Mon carnet</h2>
    ${entries.length ? `<div class="library-filters"><div><label for="note-year">Année</label><select id="note-year"><option value="">Toutes</option>
      ${years.map((_,index)=>`<option value="${index+1}">Année ${index+1}</option>`).join('')}<option value="0">Autres notes</option></select></div>
      <div><label for="note-subject">Matière</label><select id="note-subject"><option value="">Toutes</option>${subjects.map(subject=>`<option>${e(subject)}</option>`).join('')}</select></div></div>
      <p id="note-count" role="status"></p>` : '<p>Tes notes de cours et tes brouillons apparaîtront ici.</p>'}
    <div id="notebook-entries">${entries.map(([key,note],index)=>`
      <article class="card note-entry" tabindex="-1" data-note-key="${e(key)}"><h3>${lessonForNote(key)?`<button class="title-action" type="button" data-note-lesson="${index}">${e(noteTitle(key))}</button>`:e(noteTitle(key))}</h3>
      <p class="note-text">${e(note)}</p><button type="button" data-edit-note="${index}">Modifier</button></article>`).join('')}</div>
    ${backupControls()}`;
  appendPassageNotebook();
  if (entries.length) {
    const year=v.querySelector('#note-year');
    const subject=v.querySelector('#note-subject');
    const cards=[...v.querySelectorAll('.note-entry')];
    const filter=()=>{
      let count=0;
      cards.forEach((card,index)=>{
        const [entryYear,entrySubject]=categories[index];
        card.hidden=Boolean((year.value && Number(year.value)!==entryYear)||(subject.value && subject.value!==entrySubject));
        if (!card.hidden) count++;
      });
      v.querySelector('#note-count').textContent=count ? `${count} note${count===1?'':'s'}` : 'Aucune note pour ces filtres.';
    };
    year.onchange=subject.onchange=filter;
    filter();
  }
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


function recoverPreviousBackup() {
  const status = v.querySelector('#notes-import-status');
  try {
    const raw = localStorage.getItem('au-before-restore');
    if (!raw) { status.textContent = 'Aucune copie précédente disponible.'; return; }
    const previous = JSON.parse(raw);
    if (!safeBackupTree(previous) || !previous || typeof previous.notes !== 'object' || !previous.notes || typeof previous.done !== 'object' || !previous.done) throw new Error('Copie invalide');
    downloadBackup(previous, 'academia-sauvegarde-precedente.json');
    status.textContent = 'Copie précédente exportée. Pour la restaurer, utilise le bouton Importer.';
  } catch {
    status.textContent = 'Impossible de récupérer la copie précédente.';
  }
}

function backupControls() {
  return `<details id="notes-backup-panel" class="card"><summary>Sauvegarder mes notes</summary><p><button onclick="exportNotes()">Exporter mes notes</button></p>
    <label>Importer des notes <input type="file" accept=".json,application/json" onchange="importNotes(this)"></label>
  </details>
  <p id="notes-import-status" role="status"></p>
  <p><button type="button" onclick="recoverPreviousBackup()">Récupérer la sauvegarde précédente</button></p><p><button onclick="backup()">Exporter ma sauvegarde</button> <label>Importer <input type="file" accept=".json,application/json" onchange="restore(this)"></label></p>`;
}

function showBackup() {
  v.innerHTML=`<h2>Mes données</h2>
    <p id="last-export" role="status">${localStorage.getItem('au-export-date')?'Dernier export lancé le '+e(localStorage.getItem('au-export-date'))+'.':'Aucun export enregistré sur cet appareil.'}</p>
    <p>Pour changer d’appareil, exporte le fichier complet puis importe-le sur l’autre appareil.</p>
    <p>La sauvegarde complète contient tes notes, ta progression et tes évaluations. Tu peux aussi exporter uniquement tes notes.</p>
    ${backupControls()}`;
}

function notebookPassages(){
  return Object.entries(S.readingTools?.marks||{}).filter(([,m])=>m.note?.trim()||m.highlight||m.ranges?.length).map(([key,mark])=>{
    const parts=key.split(':');const section=Number(parts.pop());const lessonId=parts.pop();const courseKey=parts.join(':');
    return {key,mark,section,target:locateLesson(courseKey,lessonId)};
  }).sort((a,b)=>(b.mark.updatedAt||'').localeCompare(a.mark.updatedAt||''));
}
function appendPassageNotebook(){
  const panel=document.createElement('section');panel.className='card';
  panel.innerHTML='<h3>Annotations et surlignages des cours</h3><label>Rechercher <input type="search" data-passage-search></label><div data-passage-list></div>';
  v.querySelector('#notebook-entries').after(panel);
  const list=panel.querySelector('[data-passage-list]');
  const entries=notebookPassages();
  if(!entries.length)list.textContent='Aucune annotation de passage.';
  for(const {key,mark,section,target} of entries){
    const lesson=target?.course.lessons[target.index];
    const card=document.createElement('article');card.className='card';card.dataset.noteKey=key;card.tabIndex=-1;
    const heading=document.createElement('h4');heading.textContent=target?target.course.title+' · '+lesson.title:key;card.append(heading);
    const date=document.createElement('p');date.textContent=mark.createdAt?'Créée le '+new Date(mark.createdAt).toLocaleString('fr-FR'):'Date d’origine inconnue';if(mark.updatedAt)date.textContent+=' · Modifiée le '+new Date(mark.updatedAt).toLocaleString('fr-FR');card.append(date);
    const label=document.createElement('p');label.textContent=lesson?.sections[section]?.[0]||'Passage non identifié';card.append(label);
    const note=document.createElement('div');if(mark.rich)note.append(...cleanAnnotation(mark.rich).childNodes);else note.textContent=mark.note;card.append(note);
    for(const range of mark.ranges||[]){const quote=document.createElement('blockquote');const highlight=document.createElement('mark');highlight.textContent=range.text;quote.append(highlight);card.append(quote);}
    if(mark.highlight){const p=document.createElement('p');p.textContent='Passage entier surligné';card.append(p);}
    if(target){const link=document.createElement('button');link.type='button';link.textContent='Revenir au passage annoté / modifier';link.onclick=()=>{showLesson(target.course,target.index,{fromNote:key});jumpToStudySection('lesson-section-'+section);};card.append(link);}
    const edit=document.createElement('button');edit.type='button';edit.textContent='Modifier ici';card.append(edit);
    edit.onclick=()=>{
      if(card.querySelector('.annotation-editor'))return;
      const editor=document.createElement('div');editor.className='annotation-editor';editor.contentEditable='true';editor.setAttribute('role','textbox');editor.setAttribute('aria-label','Annotation');
      editor.append(...[...note.childNodes].map(n=>n.cloneNode(true)));
      const toolbar=document.createElement('div');
      for(const [label,cmd] of [['Gras','bold'],['Italique','italic']]){
        const b=document.createElement('button');b.type='button';b.textContent=label;b.onpointerdown=e=>e.preventDefault();b.onclick=()=>{editor.focus();document.execCommand(cmd);};toolbar.append(b);
      }
      const commit=document.createElement('button');commit.textContent='Enregistrer';commit.type='button';
      const cancel=document.createElement('button');cancel.textContent='Annuler';cancel.type='button';
      const form=document.createElement('div');form.append(toolbar,editor,commit,cancel);card.append(form);edit.hidden=true;editor.focus();
      cancel.onclick=()=>{form.remove();edit.hidden=false;};
      commit.onclick=()=>{const clean=cleanAnnotation(editor.innerHTML);const plain=clean.textContent;if(plain.length>10000||clean.innerHTML.length>40000)return;
        const current=S.readingTools.marks[key];const next={...current,note:plain,rich:clean.innerHTML,createdAt:current.createdAt||null,updatedAt:new Date().toISOString()};
        if(auditSave({readingTools:{...S.readingTools,marks:{...S.readingTools.marks,[key]:next}}}))showNotebook();
      };
    };
    list.append(card);
  }
  panel.querySelector('input').oninput=event=>{const query=event.target.value.toLocaleLowerCase('fr');for(const card of list.children)card.hidden=!card.textContent.toLocaleLowerCase('fr').includes(query);};
}
