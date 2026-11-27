function showProgress() {
  const catalog = allStudyCourses();
  const yearCards = years.map((title,index) => {
    const year = index+1;
    const courses = catalog.filter(course => (course.year || 1) === year);
    const total = courses.reduce((sum,course)=>sum+course.lessons.length,0);
    const count = course => course.lessons.filter(lesson=>S.history?.[lessonProgressKey(course.key,lesson.id)]).length;
    const done = courses.reduce((sum,course)=>sum+count(course),0);
    return `<article class="card"><h3>Année ${year} · ${title}</h3>
      <p>${done} / ${total} leçons terminées</p><progress aria-label="Leçons terminées en année ${year}" value="${done}" max="${total}"></progress>
      <details><summary>Voir par parcours</summary><ul>${courses.map(course=>`<li>${course.title} · ${count(course)} / ${course.lessons.length}</li>`).join('')}</ul></details>
      <button onclick="go(${year})">Ouvrir l’Année ${year}</button></article>`;
  }).join('');
  const due = catalog.reduce((sum,course)=>sum+course.lessons.filter(lesson=>{
    const review=S.reviews?.[lessonProgressKey(course.key,lesson.id)];
    return review && reviewDue(review);
  }).length,0);
  const marks = assessmentOptions().filter(option=>S.assessments?.[option.key]).map(option=>{
    const result=S.assessments[option.key];
    return `<li>${option.title} · dernier ${result.last}/${result.total}, meilleur ${result.best}/${result.total}</li>`;
  }).join('');
  v.innerHTML=`<h2>Ma progression</h2><p>Les leçons cochées « Leçon terminée » alimentent le suivi. Les bilans et les révisions donnent des repères sur ce que tu comprends et retiens.</p>
    <div class="grid">${yearCards}</div>
    <article class="card"><h3>Résultats des bilans</h3>${marks?`<ul>${marks}</ul>`:'<p>Aucun bilan enregistré.</p>'}
    <button onclick="go(12)">Ouvrir les évaluations</button></article>
    <article class="card"><h3>Révisions</h3><p>${due} à faire aujourd’hui ou en retard.</p>
    <button id="progress-planning">Ouvrir le planning</button></article>`;
  v.querySelector('#progress-planning').onclick=()=>{go(11);showSpace('Planning');};
}
