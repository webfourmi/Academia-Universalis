const campusShortcuts = [
  [0,'Accueil','M3 10 12 3l9 7v11h-6v-7H9v7H3z'],
  [5,'Bibliothèque','M4 4h6v16H4zM13 5l5-1 3 15-5 1z'],
  [6,'Carnet','M6 4h14v16H6zM4 8h4m-4 4h4m-4 4h4m3-7h6m-6 4h6'],
  [13,'Ma progression','M4 20h16M6 16v-4m6 4V8m6 8V4'],
  [14,'Rechercher','M15 15l5 5M16 10a6 6 0 1 1-12 0 6 6 0 0 1 12 0z']
];

function updateCampusNavigation() {
  const shortcuts = document.querySelector('#campus-shortcuts');
  if (!shortcuts.children.length) {
    shortcuts.innerHTML = campusShortcuts.map(([id,label,path]) =>
      `<button type="button" data-tab="${id}" onclick="go(${id})"><svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true"><path d="${path}"/></svg><span>${label}</span></button>`
    ).join('');
  }
  shortcuts.querySelectorAll('button').forEach(button => {
    if (Number(button.dataset.tab) === tab) button.setAttribute('aria-current','page');
    else button.removeAttribute('aria-current');
  });
  const subjects = document.querySelector('#subject-nav');
  const year = tab-1;
  subjects.hidden = year<0 || year>=raw.length;
  subjects.innerHTML = subjects.hidden ? '' : raw[year].map(([label],index)=>
    `<button type="button" data-subject="${index}">${label}</button>`
  ).join('');
  subjects.onclick = event => {
    const button = event.target.closest('[data-subject]');
    if (!button) return;
    subjects.querySelector('[aria-current]')?.removeAttribute('aria-current');
    button.setAttribute('aria-current','page');
    course(year, Number(button.dataset.subject));
  };
}
