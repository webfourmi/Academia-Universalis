function showCivilisations() {
  const complete = civilisations.filter(lesson => S.history?.[lesson.id]).length;
  v.innerHTML = `
    <h2>La naissance des civilisations</h2>
    <p>Premier cycle d’histoire · Année 1</p>
    <article class="card">
      <h3>Ce que vous saurez faire</h3>
      <p>Interpréter un vestige, comparer des trajectoires régionales et défendre une thèse sur les effets de l’urbanisation.</p>
      <label for="history-progress">${complete} leçon${complete === 1 ? '' : 's'} sur ${civilisations.length} terminée${complete === 1 ? '' : 's'}</label>
      <progress id="history-progress" value="${complete}" max="${civilisations.length}"></progress>
      <details><summary>Choisir mon rythme</summary>
        <ul><li>Essentiel · 30 à 45 min. Lire le cours, interpréter le schéma et faire le quiz.</li>
          <li>Universitaire · 1 h 30 à 2 h. Ajouter le dossier et l’exercice écrit.</li>
          <li>Recherche · 3 à 5 h. Comparer une deuxième source et préparer une réponse argumentée au séminaire.</li></ul>
      </details>
    </article>
    <ol class="lesson-list">${civilisations.map((lesson, index) => `
      <li class="card"><h3>${lesson.title}</h3><p>${lesson.goal}</p>
      <button data-lesson="${index}">${S.history?.[lesson.id] ? 'Revoir' : 'Ouvrir'} · ${lesson.title}</button></li>`).join('')}</ol>
    <p><a href="docs/chronologie.html">Frise des premières villes</a></p>
    <p><a href="docs/controle-editorial.html">Programmes consultés et contrôle éditorial</a></p>`;
  v.querySelectorAll('[data-lesson]').forEach(button => {
    button.addEventListener('click', () => showHistoryLesson(Number(button.dataset.lesson)));
  });
}

function showHistoryLesson(index) {
  const lesson = civilisations[index];
  const [caption, columns, rows] = lesson.diagram;
  const [question, options, answer, rationale] = lesson.quiz;
  const noteKey = `histoire:${lesson.id}`;
  v.innerHTML = `
    <button id="history-back">Retour au cycle d’histoire</button>
    <h2 tabindex="-1">${lesson.title}</h2>
    <article class="card lesson">
      <p><strong>Objectif.</strong> ${lesson.goal}</p>
      <p><strong>Prérequis.</strong> ${lesson.prerequisite}</p>
      ${lesson.sections.map(([heading, paragraph]) => `<h3>${heading}</h3><p>${paragraph}</p>`).join('')}
      <div class="lesson-table" tabindex="0" role="region" aria-label="${e(caption)}">
        <table><caption>${caption}</caption>
          <thead><tr>${columns.map(column => `<th scope="col">${column}</th>`).join('')}</tr></thead>
          <tbody>${rows.map(([label, ...cells]) => `<tr><th scope="row">${label}</th>${cells.map(cell => `<td>${cell}</td>`).join('')}</tr>`).join('')}</tbody>
        </table>
      </div>
    </article>
    <article class="card lesson">
      <h3>Dossier commenté</h3><p>${lesson.dossier}</p>
      <h3>Exercice</h3><p>${lesson.activity}</p>
      <details><summary>Lire la correction</summary><p>${lesson.correction}</p></details>
      <form id="history-quiz">
        <fieldset><legend>${question}</legend>
          ${options.map((option, n) => `<label class="quiz-option"><input type="radio" name="answer" value="${n}" required> ${option}</label>`).join('')}
        </fieldset>
        <button>Vérifier ma réponse</button>
        <p role="status" id="quiz-result"></p>
      </form>
      <h3>Séminaire</h3><p>${lesson.seminar}</p>
      <h3>Révision espacée</h3><p>${lesson.review}</p>
      <label for="history-notes">Mes notes</label>
      <textarea id="history-notes">${e(S.notes[noteKey])}</textarea>
      <p><label><input type="checkbox" id="history-done" ${S.history?.[lesson.id] ? 'checked' : ''}> Leçon terminée</label></p>
    </article>
    <article class="card lesson">
      <h3>Bibliographie</h3>
      <ol>${lesson.sources.map(([author, title, year, url, evidence, language]) => `
        <li>${author} (${year}). <a href="${url}" target="_blank" rel="noopener">${title}</a>
        <br><small>${evidence} · ${language || 'anglais'} · consulté le 26/11/2026. Lien externe.</small></li>`).join('')}</ol>
    </article>
    <nav aria-label="Navigation des leçons">
      ${index > 0 ? '<button id="history-prev">Leçon précédente</button>' : ''}
      ${index < civilisations.length - 1 ? '<button id="history-next">Leçon suivante</button>' : ''}
    </nav>`;
  v.querySelector('h2').focus();
  v.querySelector('#history-back').onclick = () => go(10);
  v.querySelector('#history-prev')?.addEventListener('click', () => showHistoryLesson(index - 1));
  v.querySelector('#history-next')?.addEventListener('click', () => showHistoryLesson(index + 1));
  v.querySelector('#history-quiz').onsubmit = event => {
    event.preventDefault();
    const selected = Number(new FormData(event.currentTarget).get('answer'));
    const result = selected === answer ? 'Réponse correcte.' : `Réponse attendue : ${options[answer]}.`;
    v.querySelector('#quiz-result').textContent = `${result} ${rationale}`;
  };
  v.querySelector('#history-notes').oninput = event => {
    S.notes[noteKey] = event.target.value;
    save();
  };
  v.querySelector('#history-done').onchange = event => {
    S.history ??= {};
    S.history[lesson.id] = event.target.checked;
    save();
  };
}
