const histoire = {
  title: 'La naissance des civilisations',
  introduction: 'Interpréter un vestige, comparer des trajectoires régionales et défendre une thèse sur les effets de l’urbanisation.',
  key: 'histoire',
  lessons: civilisations,
  links: [
    ['docs/chronologie.html', 'Frise des premières villes'],
    ['docs/controle-editorial.html', 'Programmes consultés et contrôle éditorial']
  ]
};

function showCivilisations() {
  showCourse(histoire);
}

function showCourse(course) {
  if (course.key!=='methode' || tab!==9) rememberCampusRoute('course',{key:course.key});
  const {title, introduction, key, lessons, links = []} = course;
  const complete = lessons.filter(lesson => S.history?.[lessonProgressKey(key, lesson.id)]).length;
  v.innerHTML = `
    <h2>${title}</h2>
    <p>Année ${course.year || 1}${course.year ? (lessons.length > 1 ? ' · Cycle en développement' : ' · Leçon d’ouverture') : ''}</p>
    ${course.year ? `<p><button onclick="go(${course.year})">Retour aux matières</button></p>` : ''}
    <article class="card">
      <h3>Ce que vous saurez faire</h3>
      <p>${introduction}</p>
      <label for="history-progress">${complete} leçon${complete === 1 ? '' : 's'} sur ${lessons.length} terminée${complete === 1 ? '' : 's'}</label>
      <progress id="history-progress" value="${complete}" max="${lessons.length}"></progress>
      <details><summary>Choisir mon rythme</summary>
        <ul><li>Essentiel · 30 à 45 min. Lire le cours, interpréter le schéma et faire le quiz.</li>
          <li>Universitaire · 1 h 30 à 2 h. Ajouter le dossier et l’exercice écrit.</li>
          <li>Recherche · 3 à 5 h. Comparer une deuxième source et préparer une réponse argumentée au séminaire.</li></ul>
      </details>
    </article>
    <ol class="lesson-list">${lessons.map((lesson, index) => `
      <li class="card"><h3>${lesson.title}</h3><p>${lesson.goal}</p>
      <button data-lesson="${index}">${S.history?.[lessonProgressKey(key, lesson.id)] ? 'Revoir' : 'Ouvrir'} · ${lesson.title}</button></li>`).join('')}</ol>
    ${key === 'histoire' ? '<article class="card"><h3>Deuxième cycle · Grèce et Rome</h3><button onclick="showCourse(antiquite)">Voir les leçons de Grèce et Rome</button></article>' : ''}
    ${key === 'antiquite' ? '<p><button onclick="showCivilisations()">Retour au premier cycle d’histoire</button></p>' : ''}
    ${links.map(([url, label]) => `<p><a href="${url}">${label}</a></p>`).join('')}`;
  v.querySelectorAll('[data-lesson]').forEach(button => {
    button.addEventListener('click', () => showLesson(course, Number(button.dataset.lesson)));
  });
}

function lessonProgressKey(courseKey, lessonId) {
  return courseKey === 'histoire' ? lessonId : `${courseKey}:${lessonId}`;
}

function showLesson(course, index, {offset,fromNote} = {}) {
  saveReading();
  const {key, lessons} = course;
  const lesson = lessons[index];
  rememberCampusRoute('lesson',{key,id:lesson.id,...(fromNote?{fromNote}:{})});
  const [caption, columns, rows] = lesson.diagram || [];
  const [question, options, answer, rationale] = lesson.quiz;
  const seminar = key === 'histoire' ? historySeminars[lesson.id] : undefined;
  const [level, duration, guidance] = studyLevels[studyLevel()];
  let citationIndex = 0;
  const cite = text => text.replace(/\[(\d+(?:, *\d+)*)\]/g, (match, numbers) => {
    const refs = numbers.split(',').map(Number);
    if (refs.some(number => !lesson.sources[number-1])) return match;
    return refs.map(number => `<a class="citation-ref" id="citation-${++citationIndex}" href="#source-${number}" aria-label="Voir la référence ${number}">[${number}]</a>`).join(' ');
  });
  const noteKey = `${key}:${lesson.id}`;
  v.innerHTML = `
    ${fromNote ? '<button type="button" id="return-to-note">Retour à la note</button>' : ''}
    <button id="history-back">${key === 'histoire' ? 'Retour au cycle d’histoire' : 'Retour au parcours'}</button>
    <h2 tabindex="-1">${lesson.title}</h2>
    <article class="card lesson">
      <p><strong>Objectif.</strong> ${lesson.goal}</p>
      <p><strong>Rythme ${level} · ${duration}.</strong> ${guidance}</p>
      <p><strong>Prérequis.</strong> ${lesson.prerequisite}</p>
      ${lesson.overview ? cite(lesson.overview) : ''}
      ${lesson.sections.map(([heading, paragraph]) => `<h3>${heading}</h3><p>${cite(paragraph)}</p>`).join('')}
      ${lesson.diagram ? `<div class="lesson-table" tabindex="0" role="region" aria-label="${e(caption)}">
        <table><caption>${caption}</caption>
          <thead><tr>${columns.map(column => `<th scope="col">${column}</th>`).join('')}</tr></thead>
          <tbody>${rows.map(([label, ...cells]) => `<tr><th scope="row">${label}</th>${cells.map(cell => `<td>${cell}</td>`).join('')}</tr>`).join('')}</tbody>
        </table>
      </div>` : ''}
    </article>
    <article class="card lesson">
      <h3>Dossier commenté</h3><p>${cite(lesson.dossier)}</p>
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
      <p><label><input type="checkbox" id="history-done" ${S.history?.[lessonProgressKey(key, lesson.id)] ? 'checked' : ''}> Leçon terminée</label></p>
    </article>
    ${seminar ? `<article class="card lesson">
      <details>
        <summary>Approfondissement universitaire</summary>
        <h3>${seminar.title}</h3>
        ${seminar.method.map(paragraph => `<p>${cite(paragraph)}</p>`).join('')}
        <p><a href="${lesson.sources[seminar.source][3]}" target="_blank" rel="noopener">Lecture guidée · ${lesson.sources[seminar.source][1]}</a></p>
        <h3>Travail écrit</h3><p>${seminar.task}</p>
        <h3>Barème sur 20</h3><ul>${seminar.rubric.map(criterion => `<li>${criterion}</li>`).join('')}</ul>
        <details><summary>Consulter le corrigé ou le plan indicatif</summary><p>${seminar.answer}</p></details>
      </details>
    </article>` : ''}
    <article class="card lesson">
      <h3>Bibliographie</h3>
      <ol>${lesson.sources.map(([author, title, year, url, evidence, language], sourceIndex) => `
        <li id="source-${sourceIndex+1}" tabindex="-1">${author} (${year}). <a href="${url}" target="_blank" rel="noopener">${title}</a>
        <br><small>${evidence} · ${language || 'anglais'} · consulté le ${course.year ? '27/11/2026' : '26/11/2026'}. Lien externe.</small><div class="source-return"></div></li>`).join('')}</ol>
    </article>
    <nav aria-label="Navigation des leçons">
      ${index > 0 ? '<button id="history-prev">Leçon précédente</button>' : ''}
      ${index < lessons.length - 1 ? '<button id="history-next">Leçon suivante</button>' : ''}
    </nav>`;
  const heading = v.querySelector('h2');
  heading.focus({preventScroll:offset!==undefined});
  rememberLesson(heading,course,lesson,offset);
  v.querySelector('#return-to-note')?.addEventListener('click',()=>returnToNotebookNote(fromNote));
  v.querySelectorAll('.citation-ref').forEach(link => {
    link.onclick = event => {
      event.preventDefault();
      const reference = v.querySelector(link.getAttribute('href'));
      const container = reference.querySelector('.source-return');
      const back = document.createElement('button');
      back.type = 'button';
      back.textContent = 'Retour au passage';
      back.onclick = () => {
        link.focus({preventScroll:true});
        link.scrollIntoView({block:'center'});
      };
      container.replaceChildren(back);
      reference.focus({preventScroll:true});
      reference.scrollIntoView({block:'center'});
    };
  });
  v.querySelector('#history-back').onclick = () => {saveReading();showCourse(course);};
  v.querySelector('#history-prev')?.addEventListener('click', () => showLesson(course, index - 1, {fromNote}));
  v.querySelector('#history-next')?.addEventListener('click', () => showLesson(course, index + 1, {fromNote}));
  v.querySelector('#history-quiz').onsubmit = event => {
    event.preventDefault();
    const selected = Number(new FormData(event.currentTarget).get('answer'));
    const result = selected === answer ? 'Réponse correcte.' : `Réponse attendue : ${options[answer]}.`;
    recordReview(course, lesson, selected === answer);
    v.querySelector('#quiz-result').textContent = `${result} ${rationale}`;
  };
  v.querySelector('#history-notes').oninput = event => {
    S.notes[noteKey] = event.target.value;
    save();
  };
  v.querySelector('#history-done').onchange = event => {
    S.history ??= {};
    S.history[lessonProgressKey(key, lesson.id)] = event.target.checked;
    save();
  };
}

function guidedJourney() {
  const plan = campusCatalog().flatMap(course =>
    course.lessons.map((lesson, index) => ({course, lesson, index}))
  );
  const remaining = plan.filter(({course, lesson}) =>
    !S.history?.[lessonProgressKey(course.key, lesson.id)]
  );
  return {next: remaining[0], total: plan.length, completed: plan.length - remaining.length};
}

function openGuidedLesson() {
  const {next} = guidedJourney();
  if (next) showLesson(next.course, next.index);
}

function guidedJourneyCard() {
  const {next, total, completed} = guidedJourney();
  return `<article class="card">
    <h3>Commencer mes cours</h3>
    <p>${completed} sur ${total} leçons publiées terminées.</p>
    <progress aria-label="Progression dans les leçons publiées" value="${completed}" max="${total}"></progress>
    ${next ? `<p>Prochaine leçon conseillée · <strong>${next.lesson.title}</strong></p>
      <button onclick="openGuidedLesson()">${completed ? 'Continuer le parcours' : 'Commencer le parcours'}</button>`
      : '<p>Tu as terminé les leçons publiées. Tu peux les revoir depuis les rubriques ci-dessous.</p>'}
    <details><summary>Comment suivre une leçon ?</summary>
      <ol>
        <li>Lis le cours et note une idée dans « Mes notes ».</li>
        <li>Essaie l’exercice avant d’ouvrir le corrigé, puis réponds au quiz.</li>
        <li>Coche « Leçon terminée » quand tu souhaites passer à la suite.</li>
      </ol>
      <p>Le parcours conseillé commence par l’histoire, puis propose la philosophie, la littérature, la physique, la psychologie, l’économie, la logique et le chinois. Tu peux ouvrir directement la matière qui t’intéresse. L’onglet Carnet rassemble tes notes et permet de sauvegarder ta progression.</p>
    </details>
  </article>`;
}
