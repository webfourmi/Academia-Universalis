const campusShortcuts = [
  [0,'Accueil','M3 10 12 3l9 7v11h-6v-7H9v7H3z'],
  [12,'Cours','M4 5h6l2 2 2-2h6v14h-6l-2 2-2-2H4z'],
  [6,'Carnet','M6 4h14v16H6zM4 8h4m-4 4h4m-4 4h4m3-7h6m-6 4h6'],
  [13,'Suivi','M4 20h16M6 16v-4m6 4V8m6 8V4'],
  [14,'Rechercher','M15 15l5 5M16 10a6 6 0 1 1-12 0 6 6 0 0 1 12 0z']
];

function updateCampusNavigation() {
  renderTopTools();
  const shortcuts = document.querySelector('#campus-shortcuts');
  if (!shortcuts.children.length) {
    shortcuts.innerHTML = campusShortcuts.map(([id,label,path]) =>
      `<button type="button" data-tab="${id}" onclick="go(${id})"><svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true"><path d="${path}"/></svg><span>${label}</span></button>`
    ).join('');
  }
  document.querySelectorAll('#campus-shortcuts [data-tab], #campus-tools [data-tab]').forEach(button => {
    if (Number(button.dataset.tab) === tab || (Number(button.dataset.tab)===12 && tab>=1 && tab<=4)) button.setAttribute('aria-current','page');
    else button.removeAttribute('aria-current');
  });
  const subjects = document.querySelector('#subject-nav');
  const year = tab-1;
  subjects.hidden = year<0 || year>=raw.length;
  subjects.innerHTML = subjects.hidden ? '' : raw[year].map(([label],index)=>
    `<button type="button" data-subject="${index}">${campusIcon(subjectIcons[year][index])}<span>${label}</span></button>`
  ).join('');
  subjects.onclick = event => {
    const button = event.target.closest('[data-subject]');
    if (!button) return;
    subjects.querySelector('[aria-current]')?.removeAttribute('aria-current');
    button.setAttribute('aria-current','page');
    course(year, Number(button.dataset.subject));
  };
}

const subjectIcons = [
  ['M4 20h16M5 17h14M7 17v-7m5 7v-7m5 7v-7M4 8l8-5 8 5z','M5 6h14v10H9l-4 4zM8 10h8m-8 3h5','M3 5h7l2 2 2-2h7v13h-7l-2 2-2-2H3zM12 7v13','M3 12h4l3-7 4 14 3-7h4','M12 4a7 7 0 0 0-5 12v4h9v-4a7 7 0 0 0-4-12zM12 8v4l3 2','M4 20h16M6 16v-4m6 4V8m6 8V4','M5 5h4v4H5zM15 5h4v4h-4zM10 15h4v4h-4zM7 9v3h10V9m-5 3v3','M3 5h12v11H8l-5 4zM6 9h6m-3-2v6m7-5h5v10h-5'],
  ['M12 3a3 3 0 1 0 0 6 3 3 0 0 0 0-6zM6 21v-5a6 6 0 0 1 12 0v5m-8-4v4m4-4v4','M4 21V8h4V4h3v4h2V4h3v4h4v13zM10 21v-6h4v6','M4 5l8 7 8-7M12 12v7M4 3v4m16-4v4m-10 12h4','M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM3 12h18M12 3c-5 4-5 14 0 18m0-18c5 4 5 14 0 18','M3 4h18v16H3zM6 15l4-5 3 4 3-2 3 3m-3-7h1','M10 17V5l9-2v12M10 17c0 4-7 4-7 1s5-4 7-1zm9-2c0 4-7 4-7 1s5-4 7-1z','M12 3v18M4 8h16M7 8l-3 7h6zM17 8l-3 7h6z','m4 3 7 7m-2-2 5-4 4 4-4 5m-5 1 7 7m-9-9 3 3'],
  ['M5 5h14v14H5zM9 9h6v6H9zM2 8h3m-3 4h3m-3 4h3m14-8h3m-3 4h3m-3 4h3','M4 20h16M8 20v-4l6-5m0 0 4-6m-4 6-4-6m8 0h3m-3 0V2','M6 3c0 7 12 11 12 18M18 3c0 7-12 11-12 18M8 6h8m-7 6h6m-7 6h8','M8 3h8v5h5v8h-5v5H8v-5H3V8h5z','M3 14l12-8 4 5-12 8zM13 14l-2 7m2-7 4 7m3-17v4m-2-2h4','M4 20h16M6 16l5-5 4 2 5-8m-4 0h4v4','M4 19c0-10 7-14 16-14 0 9-4 16-14 15M4 21 15 10','M12 3v18M4 7h16M6 7l-3 8h6zM18 7l-3 8h6zM8 21h8'],
  ['M3 19l3-7L16 2l5 5-10 10zM6 12l5 5m3-13 5 5','M4 5h5v5H4zM15 14h5v5h-5zM9 8h6a3 3 0 0 1 3 3v3','M6 8h12l3 8-3 3-4-3h-4l-4 3-3-3zM8 10v4m-2-2h4m6-1h1m-2 3h1','M3 16c3-2 4-8 8-8 3 0 5 4 9 4M17 3v4m-2-2h4M4 21h16','M4 4h16v16H4zM4 12h16M12 4v16m-8-4 4 4m8-16 4 4','M3 5h18v14H3zm4 4-3 3 3 3m10-6 3 3-3 3m-4-7-2 8','M4 4h16v12H4zm8 12v5m-4 0h8M7 8h10m-10 4h6','M5 3h10l4 4v14H5zM15 3v5h4M8 12h8m-8 4h5']
];

function campusIcon(path) {
  return `<svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true"><path d="${path}"/></svg>`;
}

function yearIcon(year) {
  return `<svg viewBox="0 0 40 34" width="45" height="38" aria-hidden="true">
    <path d="M4 5h13l3 3 3-3h13v22H23l-3 3-3-3H4z"/>
    <text x="20" y="23" text-anchor="middle">${year}</text>
  </svg>`;
}

function toggleInstallation(force) {
  const panel=document.querySelector('#pwa');
  const button=document.querySelector('#campus-installation');
  panel.hidden = force === undefined ? !panel.hidden : !force;
  button.setAttribute('aria-expanded',String(!panel.hidden));
  if (!panel.hidden && force===undefined) {
    if (button.dataset.updateAvailable) panel.querySelector('#updates').open=true;
    panel.scrollIntoView({block:'start'});
  }
}

function renderTopTools() {
  const bar = document.querySelector('#campus-tools');
  if (bar.children.length) return;
  bar.innerHTML = `
    <button type="button" id="campus-installation" aria-controls="pwa" aria-expanded="false">${campusIcon('M4 4h16v12H4zM8 21h8m-4-5v5m0-15v6m-3-3 3 3 3-3')}<span>Outils</span></button>
    <button type="button" data-tab="5" onclick="openTopTool(5)">${campusIcon('M4 4h6v16H4zM13 5l5-1 3 15-5 1z')}<span>Bibliothèque</span></button>
    <button type="button" data-tab="11" onclick="openTopTool(11)">${campusIcon('M3 9l9-6 9 6zM4 21h16M6 10v8m6-8v8m6-8v8')}<span>Campus</span></button>`;
  bar.querySelector('#campus-installation').onclick=()=>toggleInstallation();
}


function openTopTool(id) {
  go(id);
  v.scrollIntoView({block:'start'});
}

function initializeTitleSizing() {
  const selector = 'h2:not(.reading-title), h3 > .title-action:not(.lesson-title), h4 > .title-action, h3 > a, .lesson-name';
  let frame;
  const fit = () => {
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(() => {
      const titles = [...v.querySelectorAll(selector)];
      for (const title of titles) title.style.removeProperty('font-size');
      const sizes = titles.map(title => {
        if (title.clientWidth === 0 || title.scrollWidth <= title.clientWidth) return 0;
        const size = parseFloat(getComputedStyle(title).fontSize);
        const minimum = parseFloat(getComputedStyle(document.documentElement).fontSize) * .875;
        return Math.max(minimum, Math.floor(size * (title.clientWidth - 1) / title.scrollWidth * 10) / 10);
      });
      titles.forEach((title,index) => {
        if (sizes[index]) title.style.fontSize = sizes[index] + 'px';
        if (!title.title && title.scrollWidth > title.clientWidth) title.title = title.textContent.trim();
      });
    });
  };
  new MutationObserver(fit).observe(v,{childList:true,subtree:true});
  new ResizeObserver(fit).observe(v);
  fit();
}
