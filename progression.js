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
  const options = assessmentOptions();
  v.innerHTML=`<h2>Progression et évaluations</h2>
    <p>Retrouve tes leçons terminées, tes scores et les révisions en attente.</p>
    <button type="button" id="jump-to-assessment">Aller aux évaluations</button>
    <div class="grid">${yearCards}</div>
    <article class="card"><h3>Révisions</h3><p>${due} à faire aujourd’hui ou en retard.</p>
    <button id="progress-planning">Ouvrir le planning</button></article>
    ${assessmentSection(options)}`;
  v.querySelector('#jump-to-assessment').onclick=()=>{
    const heading=v.querySelector('#assessment-title');
    heading.focus({preventScroll:true});
    heading.scrollIntoView({block:'center'});
  };
  v.querySelectorAll('[data-assessment]').forEach(button=>{
    button.onclick=()=>showAssessment(options.find(entry=>entry.key===button.dataset.assessment));
  });
  v.querySelector('#progress-planning').onclick=()=>{go(11);showSpace('Planning');};
}
