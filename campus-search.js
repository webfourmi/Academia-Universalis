let readingView;
let readingTimer;

function readingPosition() {
  try {
    const record = JSON.parse(localStorage.getItem('auReading'));
    if (record && Number.isFinite(record.offset) && record.offset>=0) return record;
  } catch {
    // Un repère illisible ne doit pas bloquer l’accueil.
  }
}

function locateLesson(courseKey,lessonId) {
  const course = allStudyCourses().find(item=>item.key===courseKey);
  if (!course) return;
  const index = course.lessons.findIndex(lesson=>lesson.id===lessonId);
  if (index>=0) return {course,index,lesson:course.lessons[index]};
}

function lessonForNote(key) {
  const [courseKey,lessonId] = key.split(':');
  if (key === courseKey+':'+lessonId) return locateLesson(courseKey,lessonId);
}

function saveReading() {
  if (!readingView?.heading.isConnected) return;
  const {heading,courseKey,lessonId} = readingView;
  try {
    const offset = Math.max(0, Math.round(window.innerHeight*.2-heading.getBoundingClientRect().top));
    localStorage.setItem('auReading',JSON.stringify({courseKey,lessonId,offset}));
  } catch {
    // La lecture reste possible si le stockage est indisponible.
  }
}

window.addEventListener('scroll',()=>{
  if (!readingView?.heading.isConnected) return;
  clearTimeout(readingTimer);
  readingTimer = setTimeout(saveReading,150);
},{passive:true});
window.addEventListener('pagehide',saveReading);

function rememberLesson(heading,course,lesson,offset) {
  readingView = {heading,courseKey:course.key,lessonId:lesson.id};
  if (offset!==undefined) {
    const headingTop = heading.getBoundingClientRect().top+scrollY;
    window.scrollTo({top:Math.max(0,headingTop+offset-innerHeight*.2),behavior:'instant'});
  }
  saveReading();
}

function bookmarkCard() {
  const record = readingPosition();
  const target = record && locateLesson(record.courseKey,record.lessonId);
  return target ? `<article class="card"><h3>Reprendre ma lecture</h3>
    <p>${e(target.lesson.title)}</p><button onclick="resumeReading()">Reprendre la leçon</button></article>` : '';
}

function resumeReading() {
  const record = readingPosition();
  const target = record && locateLesson(record.courseKey,record.lessonId);
  if (target) showLesson(target.course,target.index,{offset:record.offset});
}

function openNotebookLesson(key) {
  const target = lessonForNote(key);
  if (target) showLesson(target.course,target.index,{fromNote:key});
}

function returnToNotebookNote(key) {
  go(6);
  const note = [...v.querySelectorAll('[data-note-key]')].find(card=>card.dataset.noteKey===key);
  if (note) {
    note.focus({preventScroll:true});
    note.scrollIntoView({block:'center'});
  }
}

function showCampusSearch() {
  const catalog = allStudyCourses();
  const lessons = catalog.flatMap(course=>course.lessons.map((lesson,index)=>({
    type:'Leçon',title:lesson.title,context:course.title,course,index,
    search:searchableText([lesson.title,course.title,lesson.goal,lesson.sections.flat().join(' ')].join(' '))
  })));
  const notes = Object.entries(S.notes).filter(([,note])=>note.trim()).map(([key,note])=>{
    const title=noteTitle(key);
    return {type:'Note',title,context:note.slice(0,180)+(note.length>180?'…':''),key,search:searchableText(title+' '+note)};
  });
  const resources = [...campusResources,...libraryAdditions].map(resource=>({
    type:'Ressource',title:resource.title,context:resource.author+' · '+libraryTheme(resource),url:resource.url,
    search:searchableText([resource.title,resource.author,resource.evidence,libraryTheme(resource)].join(' '))
  }));
  const entries=[...lessons,...notes,...resources];
  v.innerHTML=`<h2>Rechercher sur le campus</h2><div class="library-filters">
    <label>Mot-clé <input type="search" id="campus-query" placeholder="Un sujet, un titre, un passage…"></label>
    <div><label for="campus-search-type">Rechercher dans</label>
    <select id="campus-search-type"><option value="">Tout le campus</option><option>Leçon</option><option>Note</option><option>Ressource</option></select></div>
    </div><p id="campus-search-count" role="status"></p><div id="campus-search-results"></div>`;
  const query=v.querySelector('#campus-query');
  const type=v.querySelector('#campus-search-type');
  const counter=v.querySelector('#campus-search-count');
  const results=v.querySelector('#campus-search-results');
  function find() {
    const terms = searchableText(query.value.trim()).split(/\s+/).filter(Boolean);
    if (!terms.length) {
      counter.textContent='Entre un mot-clé pour rechercher dans les leçons, les notes et la bibliothèque.';
      results.replaceChildren();
      return;
    }
    const matches=entries.map((entry,index)=>({entry,index})).filter(({entry})=>
      (!type.value||type.value===entry.type) && terms.every(term=>entry.search.includes(term)));
    counter.textContent=matches.length+' '+(matches.length===1?'résultat':'résultats');
    results.innerHTML=matches.map(({entry,index})=>`<article class="card"><small>${entry.type}</small>
      <h3>${entry.url ? `<a href="${e(entry.url)}" target="_blank" rel="noopener">${e(entry.title)}</a>`
        : `<button class="title-action" type="button" data-search-result="${index}">${e(entry.title)}</button>`}</h3><p>${e(entry.context)}</p></article>`).join('');
  }
  results.onclick=event=>{
    const button=event.target.closest('[data-search-result]');
    if (!button) return;
    const entry=entries[Number(button.dataset.searchResult)];
    if (entry.type==='Note') returnToNotebookNote(entry.key);
    else showLesson(entry.course,entry.index);
  };
  query.oninput=type.onchange=find;
  find();
  query.focus({preventScroll:true});
}
