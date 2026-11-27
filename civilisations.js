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

function lessonStatus(courseKey, lesson) {
  const key = lessonProgressKey(courseKey, lesson.id);
  if (!S.history?.[key]) return '';
  // Increment a lesson’s revision when its teaching content changes. Legacy completions use revision 1.
  const updated = (lesson.revision ?? 1) > (S.lessonRevisions?.[key] ?? 1);
  const label = updated ? 'Mise à jour depuis la validation' : 'Leçon validée';
  return `<span class="lesson-status ${updated?'lesson-updated':''}" title="${label}"><svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="${updated?'M12 2l2.5 7.5L22 12l-7.5 2.5L12 22l-2.5-7.5L2 12l7.5-2.5z':'M5 12l4 4L19 6'}"/></svg><span class="lesson-status-label">${label}</span></span>`;
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
      <li class="card lesson-card"><h3><button class="title-action lesson-title" type="button" data-lesson="${index}"><span class="lesson-name" title="${e(lesson.title)}">${e(lesson.title)}</span>${lessonStatus(key,lesson)}</button></h3><p>${e(lesson.goal)}</p></li>`).join('')}</ol>
    ${key === 'histoire' ? '<article class="card"><h3><button class="title-action" onclick="showCourse(antiquite)">Deuxième cycle · Grèce et Rome</button></h3></article>' : ''}
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
    <h2 class="reading-title" tabindex="-1">${lesson.title}</h2>
    <nav class="lesson-jumps" aria-label="Sommaire de la leçon">
      <button type="button" data-jump="lesson-reading">Cours</button><button type="button" data-jump="lesson-exercise">Exercice</button><button type="button" data-jump="history-quiz">Quiz</button><button type="button" data-jump="history-notes">Notes</button>
    </nav>
    <article class="card lesson" id="lesson-reading" tabindex="-1">
      <p><strong>Objectif.</strong> ${lesson.goal}</p>
      <p><strong>Rythme ${level} · ${duration}.</strong> ${guidance}</p>
      <p><strong>Prérequis.</strong> ${lesson.prerequisite}</p>
      ${lesson.overview ? cite(lesson.overview) : ''}
      ${lesson.sections.map(([heading, paragraph],section) => `<h3 id="lesson-section-${section}" tabindex="-1">${heading}</h3><p>${cite(paragraph)}</p>`).join('')}
      ${lesson.diagram ? `<div class="lesson-table" tabindex="0" role="region" aria-label="${e(caption)}">
        <table><caption>${caption}</caption>
          <thead><tr>${columns.map(column => `<th scope="col">${column}</th>`).join('')}</tr></thead>
          <tbody>${rows.map(([label, ...cells]) => `<tr><th scope="row">${label}</th>${cells.map(cell => `<td>${cell}</td>`).join('')}</tr>`).join('')}</tbody>
        </table>
      </div>` : ''}
    </article>
    <article class="card lesson">
      <h3>Dossier commenté</h3><p>${cite(lesson.dossier)}</p>
      <h3 id="lesson-exercise" tabindex="-1">Exercice</h3><p>${lesson.activity}</p>
      <details><summary>Lire la correction</summary><p>${lesson.correction}</p></details>
      <form id="history-quiz" tabindex="-1">
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
  v.querySelectorAll('[data-jump]').forEach(button=>{
    button.onclick=()=>jumpToStudySection(button.dataset.jump);
  });
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
    const feedback = v.querySelector('#quiz-result');
    feedback.textContent = `${result} ${rationale}`;
    if (selected !== answer) {
      const link = document.createElement('button');
      link.type = 'button';
      link.textContent = 'Relire le passage du cours';
      link.onclick = ()=>jumpToStudySection(quizReadingTarget(lesson));
      feedback.append(' ',link);
    }
  };
  v.querySelector('#history-notes').oninput = event => {
    S.notes[noteKey] = event.target.value;
    save();
  };
  v.querySelector('#history-done').onchange = event => {
    S.history ??= {};
    const progressKey = lessonProgressKey(key, lesson.id);
    S.history[progressKey] = event.target.checked;
    if (event.target.checked) {
      S.lessonRevisions ??= {};
      S.lessonRevisions[progressKey] = lesson.revision ?? 1;
    } else if (S.lessonRevisions) {
      delete S.lessonRevisions[progressKey];
    }
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

function jumpToStudySection(id) {
  const section = document.getElementById(id);
  if (!section) return;
  section.focus({preventScroll:true});
  section.scrollIntoView({block:'start'});
}

function quizReadingTarget(lesson) {
  const words = text=>[...new Set(searchableText(text).match(/[a-z]{5,}/g)||[])];
  const [question,options,answer,rationale] = lesson.quiz;
  const terms = words([question,options[answer],rationale].join(' '));
  let bestScore = 0;
  let target = 'lesson-reading';
  lesson.sections.forEach(([title,text],index)=>{
    const section = new Set(words(title+' '+text));
    const score = terms.filter(term=>section.has(term)).length;
    if (score>bestScore) {
      bestScore=score;
      target='lesson-section-'+index;
    }
  });
  return target;
}

function guidedJourneyCard() {
  const record = readingPosition();
  const bookmark = record && locateLesson(record.courseKey,record.lessonId);
  const resume = bookmark && !S.history?.[lessonProgressKey(bookmark.course.key,bookmark.lesson.id)];
  const journey = guidedJourney();
  const target = resume ? bookmark : journey.next;
  return `<article class="card next-session">
    <p class="session-label">Ma prochaine séance</p>
    ${target ? `<h3><button class="title-action" onclick="${resume?'resumeReading()':'openGuidedLesson()'}">${e(target.lesson.title)}</button></h3>
    <p>${e(target.course.title)} · ${studyLevels[studyLevel()][1]}</p>
    <p>${resume?'Reprendre ma lecture':'Leçon conseillée'}</p>` : '<h3>Parcours conseillé terminé</h3><p>Explore les cours ou consulte tes révisions dans Suivi.</p>'}
    <progress aria-label="Progression dans les leçons du parcours conseillé" value="${journey.completed}" max="${journey.total}"></progress>
    <p>${journey.completed} sur ${journey.total} leçons du parcours conseillé terminées</p>
  </article>`;
}
