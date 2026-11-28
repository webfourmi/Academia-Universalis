function gradedSeminars(catalog) {
  const seminars = [];
  for (const course of catalog) {
    course.lessons.forEach((lesson, index) => {
      const key = `${course.key}:${lesson.id}`;
      const add = (suffix, title, section) => {
        const grades = S.seminarGrades?.[key+suffix];
        if (grades) seminars.push({title, course:course.title, grades, max:20, open:() => {
          showLesson(course, index);
          jumpToStudySection(section);
        }});
      };
      if (lesson.seminar) add(':seminaire', lesson.title, 'lesson-seminar');
      const advanced = course.key === 'histoire' && historySeminars[lesson.id];
      if (advanced && lesson.sources?.[advanced.source]) {
        add(':seminaire-approfondi', advanced.title, 'lesson-history-seminar');
      }
    });
  }
  for (const lesson of mathFoundationLessons) {
    const grades = S.seminarGrades?.[`math-${lesson.id}-seminaire`];
    if (grades) seminars.push({title:lesson.title, course:'Mathématiques', grades, max:6, open:() => {
      showMath(lesson.id);
      jumpToStudySection('math-seminar');
    }});
  }
  return seminars;
}

function showProgress() {
  const catalog = allStudyCourses();
  const yearCards = years.map((title,index) => {
    const year = index+1;
    const courses = catalog.filter(course => (course.year || 1) === year);
    const total = courses.reduce((sum,course)=>sum+course.lessons.length,0);
    const count = course => course.lessons.filter(lesson=>S.history?.[lessonProgressKey(course.key,lesson.id)]).length;
    const done = courses.reduce((sum,course)=>sum+count(course),0);
    return `<article class="card"><h3><button class="title-action" onclick="go(${year})">Année ${year} · ${title}</button></h3>
      <p>${done} / ${total} leçons terminées</p><progress aria-label="Leçons terminées en année ${year}" value="${done}" max="${total}"></progress>
      <details><summary>Voir par parcours</summary><ul>${courses.map(course=>`<li>${course.title} · ${count(course)} / ${course.lessons.length}</li>`).join('')}</ul></details>
      </article>`;
  }).join('');
  const studied = catalog.flatMap(course=>course.lessons.map((lesson,index)=>({
    course,lesson,index,
    review:S.reviews?.[lessonProgressKey(course.key,lesson.id)]
  }))).filter(item=>item.review);
  const due = studied.filter(item=>reviewDue(item.review));
  const correct = studied.filter(item=>item.review.correct).length;
  const options = assessmentOptions();
  const seminars = gradedSeminars(catalog);
  const format = new Intl.NumberFormat('fr-FR', {maximumSignificantDigits:15});
  const score = (grade, max) => grade === undefined ? '—' : `${format.format(grade)} / ${max}`;
  v.innerHTML=`<h2>Progression et évaluations</h2>
    <p>Retrouve tes leçons terminées, tes scores et les révisions en attente.</p>
    <button type="button" id="jump-to-assessment">Aller aux évaluations</button>
    <section class="card"><h3>Résultats des quiz</h3><p>${studied.length ? `${correct} / ${studied.length} bonnes réponses au dernier essai de chaque quiz travaillé.` : 'Les résultats apparaîtront après ton premier quiz.'}</p></section>
    <section class="card"><h3>Notes des séminaires</h3>
      ${seminars.length ? `<div class="lesson-table"><table>
        <thead><tr><th scope="col">Séminaire</th><th scope="col">Premier rendu</th><th scope="col">Après révision</th></tr></thead>
        <tbody>${seminars.map(({title,course,grades,max},index) => `<tr><th scope="row"><button type="button" class="title-action" data-graded-seminar="${index}">${e(title)}</button><br><small>${e(course)}</small></th>
          <td>${score(grades.first,max)}</td><td>${score(grades.revised,max)}</td></tr>`).join('')}</tbody>
      </table></div>` : '<p>Les notes apparaissent ici après leur enregistrement dans un séminaire.</p>'}
    </section>
    <section class="card"><h3>À revoir aujourd’hui</h3>
      ${due.length ? due.map(({course,lesson},index)=>`<h4><button class="title-action" data-review="${index}">${e(lesson.title)}</button></h4><p>${e(course.title)}</p>`).join('') : '<p>Aucune révision à échéance.</p>'}
    </section>
    <section class="card"><h3><button class="title-action" type="button" onclick="showMath()">Mathématiques</button></h3><p>${mathProgress()}</p></section>
    <h3>Leçons terminées</h3><div class="grid">${yearCards}</div>
    ${assessmentSection(options)}`;
  v.querySelector('#jump-to-assessment').onclick=()=>{
    const heading=v.querySelector('#assessment-title');
    heading.focus({preventScroll:true});
    heading.scrollIntoView({block:'center'});
  };
  v.querySelectorAll('[data-graded-seminar]').forEach(button => {
    button.onclick = seminars[Number(button.dataset.gradedSeminar)].open;
  });
  v.querySelectorAll('[data-assessment]').forEach(button=>{
    button.onclick=()=>showAssessment(options.find(entry=>entry.key===button.dataset.assessment));
  });
  v.querySelectorAll('[data-review]').forEach(button=>{
    button.onclick=()=>{const {course,index}=due[Number(button.dataset.review)];showQuickReview(course,index);};
  });
}


function showQuickReview(course,index) {
  const lesson = course.lessons[index];
  const [question,options,answer,rationale] = lesson.quiz;
  rememberCampusRoute('review',{key:course.key,id:lesson.id});
  v.innerHTML=`<h2 class="reading-title">Révision · ${e(lesson.title)}</h2>
    <form id="quick-review" class="card"><fieldset><legend>${e(question)}</legend>
      ${options.map((text,i)=>`<label class="quiz-option"><input type="radio" name="answer" value="${i}" required> ${e(text)}</label>`).join('')}
    </fieldset><button>Vérifier ma réponse</button><p role="status"></p><div id="review-links" hidden>
    <button type="button" id="review-lesson">Relire le passage du cours</button>
    <button type="button" onclick="go(13)">Retour au suivi</button></div></form>`;
  const form = v.querySelector('#quick-review');
  form.onsubmit = event=>{
    event.preventDefault();
    const selected = Number(new FormData(form).get('answer'));
    const correct = selected===answer;
    captureQuizEvidence(course,lesson,selected,correct);
    recordReview(course,lesson,correct);
    form.querySelector('[role="status"]').textContent=`${correct?'Réponse correcte.':'Réponse attendue : '+options[answer]+'.'} ${rationale}`;
    form.querySelector('#review-links').hidden=false;
    form.querySelectorAll('input, button[type="submit"], button:not([type])').forEach(control=>control.disabled=true);
  };
  form.querySelector('#review-lesson').onclick=()=>{
    showLesson(course,index);
    jumpToStudySection(quizReadingTarget(lesson));
  };
}
