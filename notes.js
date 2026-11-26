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
    if (added) render();
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
