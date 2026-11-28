const campusResources = [
  {region:'Europe', author:'University of Cambridge', title:'World Archaeology', year:'s. d.', language:'anglais', level:'premier cycle', access:'Présentation publique du programme', rights:'Page institutionnelle citée par lien', url:'https://www.arch.cam.ac.uk/prospective-students/undergraduates/course-structure-1', evidence:'Organisation d’un parcours comparatif en archéologie.'},
  {region:'Afrique', author:'University of Cape Town', title:'Africa in Question', year:'s. d.', language:'anglais', level:'premier cycle', access:'Descriptif public, cours réservé aux inscrits', rights:'Page institutionnelle citée par lien', url:'https://humanities.uct.ac.za/department-historical-studies/our-degrees-undergraduate-studies/africa-question-ancient-pre-colonial-africa-between-past-present', evidence:'Historiographie africaine, Égypte et Nubie.'},
  {region:'Asie', author:'Deccan College', title:'MA in Ancient Indian History, Culture and Archaeology', year:'s. d.', language:'anglais', level:'master', access:'Programme PDF public', rights:'Document institutionnel cité par lien', url:'https://dcpune.ac.in/pdf/II.%20M.A.%20in%20A.%20I.%20H.%20C.%20and%20Archaeology%20Course%20Structure.pdf', evidence:'Place du cours sur l’Indus dans la formation à l’archéologie sud-asiatique.'},
  {region:'Amériques', author:'MIT OpenCourseWare', title:'Empire: Introduction to Ancient and Medieval Studies', year:'2012', language:'anglais', level:'premier cycle', access:'Calendrier et ressources publiques', rights:'CC BY-NC-SA selon les conditions OCW et les mentions propres aux ressources', url:'https://ocw.mit.edu/courses/21h-007j-empire-introduction-to-ancient-and-medieval-studies-fall-2012/pages/calendar/', evidence:'Séquence de cours consacrée à Auguste et aux Res Gestae.'},
  {region:'Océanie', author:'University of Queensland', title:'ARCS2080 · Plants and Archaeology: Food, fuel, foraging and farming in the human past', year:'s. d.', language:'anglais', level:'premier cycle', access:'Descriptif public du cours', rights:'Page institutionnelle citée par lien', url:'https://course-profiles.uq.edu.au/course-profiles/ARCS2080-20848-7620', evidence:'Comparaison archéologique des pratiques de gestion des plantes.'}
];

const campusSpaces = {
  'Mathématiques': 'Expérimenter, démontrer, résoudre des problèmes et réviser les formules.',
  'Salon de lecture': 'Lire les œuvres et retrouver les éditions gratuites.',
  'Qualité scientifique': 'Consulter les contrôles structurels des leçons et les vérifications restant à effectuer.',
  'Projets universitaires': 'Conduire un projet personnel, documenter ses étapes et conserver un dossier de travail.',
  'Planning': 'Planifier les séances et les révisions selon tes disponibilités.',
  'Compétences et erreurs': 'Revoir les questions difficiles et suivre la consolidation.',
  'Vie du campus': 'Découvrir une conférence, une lecture, un séminaire et une recherche.',
  'Amphithéâtre': 'Suivre une conférence ou une lecture de cours.',
  'Séminaires': 'Préparer une argumentation ou un devoir comparatif.',
  'Laboratoire': 'Formuler une hypothèse et la tester.',
  'Atelier': 'Appliquer une méthode et produire une réponse.',
  'Musée': 'Analyser un objet et son contexte.',
  'Observatoire': 'Observer un phénomène et noter les conditions de l’observation.',
  'Cabinet de recherche': 'Documenter une question et vérifier les preuves.'
};

const studyLevels = [
  ['Essentiel', '30–45 min', 'Lire le cours, noter deux idées de mémoire, puis faire le quiz.'],
  ['Universitaire', '1 h 30–2 h', 'Ajouter la lecture guidée et rédiger une réponse à l’exercice avant d’ouvrir le corrigé.'],
  ['Recherche', '3–5 h', 'Comparer deux sources, justifier un choix de méthode et développer la question de séminaire.']
];

function campusCatalog() {
  return [histoire, antiquite, ...Object.values(firstYearCourses), studyMethods];
}

function studyLevel() {
  return S.hours === 3 ? 0 : S.hours === 10 ? 2 : 1;
}

function localStudyDate(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth()+1).padStart(2,'0');
  const day = String(date.getDate()).padStart(2,'0');
  return year+'-'+month+'-'+day;
}

const memoryIntervals=[2,7,30,60,120];
function reviewDate(entry){
 if(entry.due)return entry.due;
 const date=new Date(entry.date+'T12:00:00');date.setDate(date.getDate()+memoryIntervals[Math.min(entry.step,4)]);return localStudyDate(date);
}
function reviewDue(entry,date=new Date()){return reviewDate(entry)<=localStudyDate(date);}
function nextMemoryReview(previous,correct,today){
 let step=previous?.step??0;
 if(!correct)step=0;
 else if(previous&&previous.last!==today&&previous.correct&&reviewDate(previous)<=today)step=Math.min(4,step+1);
 else if(previous&&previous.last===today)return {...previous,correct:previous.correct&&correct};
 else if(previous&&previous.correct&&reviewDate(previous)>today)return previous;
 const date=new Date(today+'T12:00:00');date.setDate(date.getDate()+(correct?memoryIntervals[step]:1));
 return {date:previous?.date||today,last:today,step,correct,due:localStudyDate(date)};
}
function recordReview(course,lesson,correct){
 const key=lessonProgressKey(course.key,lesson.id);S.reviews??={};
 S.reviews[key]=nextMemoryReview(S.reviews[key],correct,localStudyDate());save();
}

function showCampus() {
  v.innerHTML='<h2>Espaces du campus</h2><div class="grid">'+Object.entries(campusSpaces)
    .map(([name, purpose])=>'<article class="card"><h3><button class="title-action" data-space="'+name+'">'+name+'</button></h3><p>'+purpose+'</p></article>').join('')+'</div><nav class="lesson-jumps" aria-label="Repères du campus"><button type="button" onclick="go(7)">Charte</button><button type="button" onclick="go(8)">Atlas</button><button type="button" onclick="go(9)">Méthode</button></nav>';
  v.querySelectorAll('[data-space]').forEach(button=>button.onclick=()=>showSpace(button.dataset.space));
}

function spaceLesson(courseKey, lessonId, section) {
  const course=allStudyCourses().find(item=>item.key===courseKey);
  const index=course?.lessons.findIndex(lesson=>lesson.id===lessonId);
  if (index>=0) {
    showLesson(course,index);
    if(section) jumpToStudySection(section);
  }
}

function spaceButton(courseKey, lessonId, label) {
  return '<h4><button class="title-action" data-course="'+courseKey+'" data-lesson-id="'+lessonId+'">'+label+'</button></h4>';
}

const campusActivitySections = {
  'Amphithéâtre':'lesson-reading',
  'Séminaires':'lesson-seminar',
  'Laboratoire':'lesson-exercise',
  'Atelier':'lesson-exercise',
  'Musée':'lesson-dossier',
  'Observatoire':'lesson-reading',
  'Cabinet de recherche':'lesson-exercise'
};

const historyCampusActivities = {
  'evolution-humaine': ['Amphithéâtre', 'Laboratoire', 'Musée'],
  'migrations-humaines': ['Amphithéâtre', 'Laboratoire', 'Musée'],
  mobilites: ['Amphithéâtre', 'Laboratoire'],
  neolithiques: ['Amphithéâtre', 'Laboratoire'],
  'villages-neolithiques': ['Amphithéâtre', 'Laboratoire'],
  'methodes-archeologiques': ['Amphithéâtre', 'Laboratoire'],
  uruk: ['Amphithéâtre', 'Musée'],
  nil: ['Amphithéâtre', 'Musée'],
  indus: ['Amphithéâtre'],
  chine: ['Amphithéâtre', 'Musée'],
  ameriques: ['Amphithéâtre'],
  comparaison: ['Amphithéâtre', 'Cabinet de recherche'],
  athenes: ['Amphithéâtre'],
  'empire-athenien': ['Amphithéâtre'],
  'republique-romaine': ['Amphithéâtre'],
  auguste: ['Amphithéâtre', 'Cabinet de recherche']
};

function courseCampusActivities(course, name) {
  return course.lessons.flatMap(lesson=>{
    const entries=new Map();
    const add=(title,section)=>entries.set(section,{lessonId:lesson.id,title,section});
    const historySpaces = course.key === 'histoire' || course.key === 'antiquite'
      ? historyCampusActivities[lesson.id] : undefined;
    const spaces = [...(lesson.campusSpaces || []), ...(historySpaces || [])];
    if(spaces.includes(name)) add(lesson.title,campusActivitySections[name]);
    if(name==='Atelier'&&lesson.activity&&!spaces.includes('Laboratoire')
      &&!spaces.includes('Cabinet de recherche')) {
      add(lesson.title,'lesson-exercise');
    }
    if(name==='Séminaires') {
      if(lesson.seminar) add(lesson.title,'lesson-seminar');
      const seminar=course.key==='histoire'&&historySeminars[lesson.id];
      if(seminar&&lesson.sources?.[seminar.source]) add(seminar.title,'lesson-history-seminar');
    }
    if(name==='Laboratoire'&&course.key==='physique'&&physicsLabSpecs[lesson.id]) {
      add('Laboratoire virtuel · '+lesson.title,'lesson-physics-lab');
    }
    return [...entries.values()];
  });
}

function campusCourseActivityPanel(name) {
  const mathActivities=mathCampusSpaces[name]||[];
  const groups=allStudyCourses().map(course=>({
    course, entries:courseCampusActivities(course,name)
  })).filter(({entries})=>entries.length);
  const panel=document.createElement('section');
  panel.className='card';
  panel.innerHTML='<h3>Activités des cours</h3>';
  for(const mathSpace of mathActivities) {
    const button=document.createElement('button');
    button.type='button';
    button.className='title-action';
    button.textContent=mathSpaces[mathSpace]+' · Mathématiques, année 1';
    button.onclick=()=>showMath(mathSpace);
    const row=document.createElement('p');
    row.append(button);
    panel.append(row);
  }
  for(const {course,entries} of groups) {
    const group=document.createElement('details');
    const heading=document.createElement('summary');
    heading.textContent=course.title+' · Année '+(course.year||1)+' ('+entries.length+')';
    const list=document.createElement('ul');
    for(const {lessonId,title,section} of entries) {
      const row=document.createElement('li');
      const button=document.createElement('button');
      button.type='button';
      button.className='title-action';
      button.textContent=title;
      button.onclick=()=>spaceLesson(course.key,lessonId,section);
      row.append(button);
      list.append(row);
    }
    group.append(heading,list);
    panel.append(group);
  }
  if(!groups.length&&!mathActivities.length) {
    const empty=document.createElement('p');
    empty.textContent='Aucune activité de cours disponible dans cet espace.';
    panel.append(empty);
  }
  return panel;
}

function showSpace(name) {
  if(name==='Mathématiques'){showMath();return;}
  if(name==='Carnet littéraire'){openSubjectNotebook('Littérature');return;}
  rememberCampusRoute('space',{name});
  if(name==='Salon de lecture'){literaryPanel(name);return;}
  if(name==='Projets universitaires'){showPractice(name);return;}
  if(name==='Compétences et erreurs'){showCompetencies();return;}
  if(name==='Vie du campus'){showCampusLife();return;}
  if(name==='Qualité scientifique'){showEditorialQuality();return;}
  const catalog=campusCatalog();
  const due=allStudyCourses().flatMap(course=>course.lessons.filter(lesson=>{
    const review=S.reviews?.[lessonProgressKey(course.key,lesson.id)];
    return review && reviewDue(review);
  }).map(lesson=>spaceButton(course.key,lesson.id,'Réviser · '+lesson.title)));
  const lessons=catalog.flatMap(course=>course.lessons.map(lesson=>({course,lesson})));
  const weeklyPlan=Array.from({length:40}, (_, index)=>{
    const first=Math.floor(index*lessons.length/40);
    const last=Math.floor((index+1)*lessons.length/40);
    const labels=lessons.slice(first,last).map(item=>spaceButton(item.course.key,item.lesson.id,item.lesson.title));
    const recap=(index+1)%10===0 ? '<p><small>Revoir ses notes et refaire un exercice des semaines précédentes.</small></p>' : '';
    return '<li>'+labels.join(' ')+recap+'</li>';
  }).join('');
  const activities={
    Planning: '<h3>Ton rythme</h3><p>40 semaines · volumes cibles de travail personnel.</p><label>Heures par semaine <select id="campus-hours">'+[3,6,10].map(hours=>'<option value="'+hours+'" '+(S.hours===hours?'selected':'')+'>'+hours+'</option>').join('')+'</select></label><p>'+S.hours*40+' heures sur l’année au rythme choisi.</p><p>Commence par une leçon, puis réserve une courte séance à la relecture et au rappel actif.</p><button onclick="openGuidedLesson()" '+(!guidedJourney().next?'disabled':'')+'>Ouvrir la prochaine leçon</button><h3>Révisions à faire · calendrier adaptatif</h3>'+(due.length?due.map(button=>'<p>'+button+'</p>').join(''):'<p>Aucune révision à échéance. Répondre au quiz d’une leçon l’inscrit à la révision. Une réponse correcte à échéance espace le rappel suivant. Une erreur rapproche la prochaine révision.</p>')+'<details><summary>Voir le calendrier sur 40 semaines</summary><p>Un ordre conseillé, à adapter à ton rythme. Chaque ligne correspond à une semaine.</p><ol>'+weeklyPlan+'</ol></details>',
    Amphithéâtre:'<h3>Une conférence et un texte à confronter</h3><p>Regarde une séance du cours de Yale, puis note ce que la source ancienne permet de vérifier et ce qui relève de la synthèse de l’enseignant.</p><p><a target="_blank" rel="noopener" href="https://online.yale.edu/courses/introduction-ancient-greek-history">Yale · Introduction to Ancient Greek History (anglais, en ligne)</a></p>',
    Séminaires:'<h3>Argumenter à partir de documents</h3><p>Rédige une thèse, présente deux preuves et traite une objection. Les barèmes et plans indicatifs figurent dans les leçons de synthèse.</p>',
    Laboratoire:'<h3>Tester un bilan de forces</h3><p>Prévois la résultante pour deux forces opposées. Dans la simulation, fais varier une force à la fois et compare ta prédiction à l’observation. Note les conditions avec et sans frottement.</p><p><a target="_blank" rel="noopener" href="https://phet.colorado.edu/en/simulations/forces-and-motion-basics">Simulation PhET · Forces et mouvement (en ligne)</a></p>',
    Atelier:'<h3>Reconstituer et produire</h3><p>Choisis un exercice, rédige ta réponse puis compare-la au corrigé de la leçon lorsqu’il est disponible.</p>',
    Musée:'<h3>Lire une notice d’objet</h3><p>Sépare la matière, la datation et la provenance de l’usage proposé par le catalogue. Pour chaque information, indique si tu l’as observée ou lue dans la notice.</p><p><a target="_blank" rel="noopener" href="https://www.metmuseum.org/fr/essays/the-origins-of-writing">Metropolitan Museum of Art · The Origins of Writing</a></p>',
    Observatoire:'<h3>Observer le ciel et documenter une mesure</h3><p>Dans la représentation de la NASA, compare deux planètes en lisant les unités avant d’estimer un rapport de distances. Indique si la vue est à l’échelle ou schématique et garde une trace de la date de consultation.</p><p><a target="_blank" rel="noopener" href="https://science.nasa.gov/solar-system/">NASA · Solar System Exploration (anglais, en ligne)</a></p>',
    'Cabinet de recherche':'<h3>Construire une enquête</h3><ol><li>Formule une question et une hypothèse réfutable.</li><li>Repère une publication primaire et une synthèse. Note auteur, titre, date, accès, droits et proposition soutenue.</li><li>Distingue ce que la source observe de ce qu’elle extrapole et cherche un contre-exemple.</li><li>Si tu utilises une IA, conserve une trace de son rôle et remonte aux documents originaux avant de citer.</li></ol><p><a href="docs/controle-editorial.html">Contrôle éditorial et grille de relecture</a></p>'
  };
  v.innerHTML='<button onclick="go(11)">Retour aux espaces</button><h2>'+name+'</h2><article class="card">'+activities[name]+'</article>';
  v.querySelectorAll('[data-course]').forEach(button=>button.onclick=()=>spaceLesson(button.dataset.course,button.dataset.lessonId));
  if(Object.hasOwn(campusActivitySections,name))v.querySelector('h2').after(campusCourseActivityPanel(name));
  if(['Séminaires','Laboratoire','Atelier','Cabinet de recherche'].includes(name))v.append(practicePanel(name));
  if(name==='Planning')v.querySelector('article').before(planningPanel());
  addDisciplineWorkshops(name);
  const hours=v.querySelector('#campus-hours');
  if(hours) hours.onchange=()=>{S.hours=Number(hours.value);save();showSpace(name);};
}

const libraryThemes = {
  anthropologie:'Sociétés et histoire', archeologie:'Sociétés et histoire', histoire:'Sociétés et histoire',
  physique:'Sciences et environnement', astronomie:'Sciences et environnement', ecologie:'Sciences et environnement',
  pedagogie:'Enseignement et recherche', methode:'Enseignement et recherche',
  art:'Arts, langues et littérature', musicologie:'Arts, langues et littérature', narratologie:'Arts, langues et littérature',
  ia:'Informatique et technologie', robotique:'Informatique et technologie', applications:'Informatique et technologie',
  jeu:'Informatique et technologie', economie:'Économie'
};

function libraryTheme(resource) {
  if (resource.level==='catalogue') return 'Catalogues universitaires';
  if (resource.level==='méthode de recherche') return 'Enseignement et recherche';
  return libraryThemes[resource.courseKey] || 'Sociétés et histoire';
}

function searchableText(value) {
  return value.normalize('NFD').replace(/\p{M}/gu,'').toLowerCase();
}

function validLibraryShelf(value){
 return value===undefined||Boolean(value&&typeof value==='object'&&!Array.isArray(value)&&Object.entries(value).every(([url,status])=>/^https?:\/\//i.test(url)&&['saved','reading','read'].includes(status)));
}
function libraryCatalog(){
 const records=new Map();
 function add(resource,link){
  if(typeof resource.url!=='string'||!/^https?:\/\//i.test(resource.url))return;
  const key=resource.url;
  if(!records.has(key))records.set(key,{...resource,links:[]});
  const item=records.get(key);
  if(link&&!item.links.some(x=>x.courseKey===link.courseKey&&x.lessonId===link.lessonId))item.links.push(link);
 }
 const courses=allStudyCourses();
 for(const resource of [...campusResources,...libraryAdditions]){
  const course=courses.find(x=>x.key===resource.courseKey),lesson=course?.lessons.find(x=>x.id===resource.lessonId);
  add({...resource,theme:libraryTheme(resource)},lesson?{courseKey:course.key,lessonId:lesson.id,title:lesson.title,discipline:course.title,year:course.year||1}:null);
 }
 for(const course of courses)for(const lesson of course.lessons)for(const [author,title,year,url,evidence,language] of lesson.sources||[]){
  const reference = historyReference(url);
  add({author,title,year,url,evidence,language:language||'Non renseignée',region:'Non renseignée',level:'Non renseigné',access:'Accès à vérifier',rights:'Droits à vérifier',theme:libraryTheme({courseKey:course.key})},{courseKey:course.key,lessonId:lesson.id,title:lesson.title,discipline:course.title,year:course.year||1});
  if(reference && records.has(url)) Object.assign(records.get(url),reference);
 }
 return [...records.values()].map(item=>({...item,type:item.type||(/programme|descriptif/i.test(item.access)?'Programme':/simulation/i.test(item.access)?'Simulation':/vidéo|conférence/i.test(item.access)?'Conférence':'Non classé')})).sort((a,b)=>a.title.localeCompare(b.title,'fr'));
}
function showCampusLibrary(){
 const resources=libraryCatalog();
 const filters=[['theme','Thème'],['region','Région'],['language','Langue'],['type','Type'],['level','Niveau'],['access','Accès'],['author','Auteur / organisme'],['discipline','Discipline'],['year','Année du cursus'],['status','Ma bibliothèque']];
 const values=(r,key)=>key==='discipline'?r.links.map(x=>x.discipline):key==='year'?r.links.map(x=>String(x.year)):key==='status'?[S.libraryShelf?.[r.url]||'none']:[String(r[key]||'Non renseigné')];
 v.innerHTML='<h2>Bibliothèque scientifique</h2><p>Références des cours et catalogues universitaires. Les métadonnées manquantes restent à vérifier.</p><label>Rechercher <input type="search" id="library-search" placeholder="Titre, auteur, notion…"></label><details><summary>Filtres du catalogue</summary><div class="library-filters"></div></details><p role="status" id="library-count"></p><button id="library-export">Exporter toutes les références filtrées</button><div id="library-records"></div><div class="library-pages"><button id="library-prev">Précédent</button> <span id="library-page" role="status"></span> <button id="library-next">Suivant</button></div>';
 const controls=v.querySelector('.library-filters'),search=v.querySelector('#library-search'),list=v.querySelector('#library-records');
 const statusLabels={none:'Non enregistré',saved:'Favori',reading:'En cours',read:'Lu'};
 const picks=filters.map(([key,label])=>{
  const wrap=document.createElement('label'),select=document.createElement('select');wrap.textContent=label+' ';wrap.append(select);controls.append(wrap);
  const all=document.createElement('option');all.value='';all.textContent='Tous';select.append(all);
  const options=key==='status'?Object.keys(statusLabels):[...new Set(resources.flatMap(r=>values(r,key)))].sort((a,b)=>a.localeCompare(b,'fr'));
  options.forEach(value=>{const option=document.createElement('option');option.value=value;option.textContent=key==='status'?statusLabels[value]:value;select.append(option);});
  select.onchange=resetPage;return {key,select};
 });
 let matches=[],page=0;
 const pageSize=20;
 function resetPage(){page=0;draw();}
 const prev=v.querySelector('#library-prev'),next=v.querySelector('#library-next');
 prev.onclick=()=>{page--;draw();};next.onclick=()=>{page++;draw();};
 function draw(){
  const terms=searchableText(search.value.trim()).split(/\s+/).filter(Boolean);
  matches=resources.filter(r=>picks.every(({key,select})=>!select.value||values(r,key).includes(select.value))&&terms.every(t=>searchableText([r.title,r.author,r.evidence,r.theme,...r.links.map(x=>x.title+' '+x.discipline)].join(' ')).includes(t)));
  v.querySelector('#library-count').textContent=matches.length+' références sur '+resources.length;
  list.replaceChildren();
  const pages=Math.ceil(matches.length/pageSize);
  page=Math.max(0,Math.min(page,pages-1));
  prev.disabled=page===0;next.disabled=page+1>=pages;
  v.querySelector('#library-page').textContent=pages?'Page '+(page+1)+' / '+pages:'Aucune référence';
  matches.slice(page*pageSize,(page+1)*pageSize).forEach(r=>{
   const card=document.createElement('article');card.className='card library-record';
   const h=document.createElement('h3'),a=document.createElement('a');a.href=r.readUrl||r.url;a.target='_blank';a.rel='noopener';a.textContent=r.title;h.append(a);card.append(h);
   for(const line of [[r.author,r.year,r.language,r.region,r.type,r.level].filter(Boolean).join(' · '),r.evidence,[r.access,r.rights,r.consulted?'Consulté le '+r.consulted:'Date de consultation non renseignée'].filter(Boolean).join(' · ')]){
    const p=document.createElement('p');p.textContent=line||'';card.append(p);
   }
   const label=document.createElement('label'),select=document.createElement('select');label.textContent='Ma lecture ';label.append(select);
   Object.entries(statusLabels).forEach(([value,text])=>{const option=document.createElement('option');option.value=value;option.textContent=text;select.append(option);});
   select.value=S.libraryShelf?.[r.url]||'none';
   select.onchange=()=>{S.libraryShelf??={};if(select.value==='none')delete S.libraryShelf[r.url];else S.libraryShelf[r.url]=select.value;save();draw();};card.append(label);
   const links=document.createElement('details');const summary=document.createElement('summary');summary.textContent='Leçons associées ('+r.links.length+')';links.append(summary);
   r.links.forEach(link=>{const button=document.createElement('button');button.type='button';button.className='title-action';button.textContent=link.title;button.onclick=()=>spaceLesson(link.courseKey,link.lessonId);links.append(button);});card.append(links);list.append(card);
  });
 }
 search.oninput=resetPage;
 v.querySelector('#library-export').onclick=()=>{
  const text=matches.map(r=>[r.author,r.year,r.title,r.readUrl||r.url,r.access,r.rights].filter(Boolean).join(' · ')).join('\n\n');
  const url=URL.createObjectURL(new Blob([text],{type:'text/plain;charset=utf-8'}));const a=document.createElement('a');a.href=url;a.download='academia-bibliographie.txt';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
 };
 draw();
}

function validReviews(reviews) {
  return reviews===undefined || Boolean(reviews && typeof reviews==='object' && !Array.isArray(reviews) &&
    Object.values(reviews).every(entry=>entry && /^\d{4}-\d{2}-\d{2}$/.test(entry.date) &&
      /^\d{4}-\d{2}-\d{2}$/.test(entry.last) && Number.isInteger(entry.step) && entry.step>=0 && entry.step<=4 && (entry.due===undefined || /^\d{4}-\d{2}-\d{2}$/.test(entry.due)) &&
      typeof entry.correct==='boolean'));
}

/* Bureau étudiant : temps déclaré, sans surveillance ni service externe. */
function validStudyMinutes(value) {
  return value === undefined || Boolean(value && typeof value==='object' && !Array.isArray(value) &&
    Object.entries(value).every(([day,minutes])=>/^\d{4}-\d{2}-\d{2}$/.test(day) && Number.isInteger(minutes) && minutes>=0 && minutes<=1440));
}
function studentWeek(date=new Date()) {
  const monday=new Date(date); monday.setDate(monday.getDate()-(monday.getDay()+6)%7);
  return Array.from({length:7},(_,i)=>{const day=new Date(monday);day.setDate(day.getDate()+i);return localStudyDate(day);});
}
function studentDesk() {
  const today=localStudyDate(), week=studentWeek();
  const log=validStudyMinutes(S.studyMinutes)?(S.studyMinutes||{}):{};
  const minutes=week.filter(day=>day<=today).reduce((sum,day)=>sum+(log[day]||0),0);
  const target=S.hours*60;
  const due=allStudyCourses().flatMap(course=>course.lessons.map((lesson,index)=>({course,lesson,index,review:S.reviews?.[lessonProgressKey(course.key,lesson.id)]}))).filter(item=>item.review&&reviewDue(item.review));
  due.sort((a,b)=>Number(a.review.correct)-Number(b.review.correct)||a.review.date.localeCompare(b.review.date));
  v.innerHTML=`<h2>Mon bureau</h2><p class="session-label">${e(new Date().toLocaleDateString('fr-FR',{weekday:'long',day:'numeric',month:'long'}))}</p>
  ${studentSessionCard()}
  ${guidedJourneyCard()}
  <section class="card"><h3>Révisions prioritaires · ${due.length}</h3>
  ${due.length?due.slice(0,3).map((item,i)=>`<h4><button class="title-action" data-desk-review="${i}">${e(item.lesson.title)}</button></h4><p>${e(item.course.title)}</p>`).join(''):'<p>Aucune révision à échéance.</p>'}
  ${due.length>3?'<button onclick="go(13)">Toutes les révisions</button>':''}</section>
  <section class="card"><h3>Ma semaine</h3><label>Rythme <select id="desk-hours">${[3,6,10].map(h=>`<option value="${h}" ${S.hours===h?'selected':''}>${h} h / semaine</option>`).join('')}</select></label>
  <p>${minutes} / ${target} minutes étudiées</p><progress aria-label="Temps déclaré cette semaine" value="${Math.min(minutes,target)}" max="${target}"></progress>
  <form id="desk-time"><label for="desk-minutes">Temps total étudié aujourd’hui (minutes)</label><input id="desk-minutes" type="number" min="0" max="1440" step="1" required value="${log[today]||0}"><button>Enregistrer</button><p role="status"></p></form>
  <details><summary>Planning de la semaine</summary><p>Répartis librement tes ${target} minutes. Priorité aux révisions à échéance, puis à la prochaine leçon.</p><ol>${week.map(day=>`<li>${e(day)} · ${log[day]||0} min déclarées</li>`).join('')}</ol><button onclick="showSpace('Planning')">Calendrier du campus</button></details></section>
  <article class="card"><h3><button class="title-action" onclick="go(12)">Explorer les matières</button></h3><p>Les quatre années du campus</p></article>`;
  const session=v.querySelector('#desk-session');
  if(session)session.onclick=()=>showStudySession(session.dataset.sessionKey,Number(session.dataset.sessionMinutes));
  v.append(memoryPanel(),bookmarkPanel(),glossaryPanel());
  v.querySelectorAll('[data-desk-review]').forEach(button=>button.onclick=()=>{const item=due[Number(button.dataset.deskReview)];showQuickReview(item.course,item.index);});
  v.querySelector('#desk-hours').onchange=event=>{S.hours=Number(event.target.value);save();studentDesk();};
  v.querySelector('#desk-time').onsubmit=event=>{event.preventDefault();const n=Number(v.querySelector('#desk-minutes').value);if(!Number.isInteger(n)||n<0||n>1440)return;const next={...S,studyMinutes:{...log,[today]:n}};try{localStorage.au=JSON.stringify(next);S=next;studentDesk();v.querySelector('#desk-time [role="status"]').textContent='Temps enregistré.';}catch{v.querySelector('#desk-time [role="status"]').textContent='Enregistrement impossible.';}};
}

function validMemoryCards(cards){
 return cards===undefined||Array.isArray(cards)&&cards.length<=5000&&cards.every(c=>c&&typeof c.question==='string'&&c.question.length<=2000&&typeof c.answer==='string'&&c.answer.length<=10000&&validReviews(c.review?{card:c.review}:undefined));
}
function memoryPanel(){
 const panel=document.createElement('section');panel.className='card';
 const entries=allStudyCourses().flatMap(course=>course.lessons.map((lesson,index)=>({course,lesson,index,review:S.reviews?.[lessonProgressKey(course.key,lesson.id)]}))).filter(x=>x.review);
 const cards=validMemoryCards(S.memoryCards)?S.memoryCards||[]:[];
 const due=entries.filter(x=>reviewDue(x.review)).sort((a,b)=>Number(a.review.correct)-Number(b.review.correct)||reviewDate(a.review).localeCompare(reviewDate(b.review)));
 const personal=cards.filter(x=>!x.review||reviewDue(x.review));
 const lessonCards=typeof builtinStudyCards==='function'?builtinStudyCards():[];
 const mathCards=typeof mathFoundationCards==='function'?mathFoundationLessons.flatMap(mathFoundationCards):[];
 const builtin=[...lessonCards,...mathCards].map(x=>({...x,review:S.reviews?.[x.key]}));
 const builtinDue=builtin.filter(x=>x.review&&reviewDue(x.review));
 panel.innerHTML=`<h3>Mémoire adaptative</h3><p>${due.length+personal.length+builtinDue.length} rappels à faire · ${entries.filter(x=>!x.review.correct).length} notions fragiles (dernier quiz incorrect)</p><details><summary>Calendrier des rappels</summary><ul>${entries.slice().sort((a,b)=>reviewDate(a.review).localeCompare(reviewDate(b.review))).map(x=>`<li>${e(reviewDate(x.review))} · ${e(x.lesson.title)} · niveau ${x.review.step+1}/5</li>`).join('')}${builtin.filter(x=>x.review).map(x=>`<li>${e(reviewDate(x.review))} · ${e(x.question)} · niveau ${x.review.step+1}/5</li>`).join('')}${cards.map(x=>`<li>${e(x.review?reviewDate(x.review):localStudyDate())} · ${e(x.question)}</li>`).join('')}</ul></details><div data-memory-session></div><details><summary>Créer une carte personnelle</summary><form><label>Question<textarea name="question" required maxlength="2000"></textarea></label><label>Réponse<textarea name="answer" required maxlength="10000"></textarea></label><label>Depuis mes annotations <select data-annotation><option value="">Choisir une annotation</option></select></label><button>Ajouter la carte</button></form></details><details><summary>Mes cartes personnelles</summary><div data-personal></div></details><p><small>Les niveaux sont des repères de rappel, pas une mesure de maîtrise globale. Intervalles heuristiques inspirés du rappel actif et de la pratique espacée : <a target="_blank" rel="noopener" href="https://pubmed.ncbi.nlm.nih.gov/26173288/">Dunlosky et al., 2013</a>.</small></p>`;
 const form=panel.querySelector('form'),select=panel.querySelector('[data-annotation]');
 const annotations=Object.entries(S.readingTools?.marks||{}).filter(([,m])=>typeof m.note==='string'&&m.note.trim());
 annotations.forEach(([key,m],i)=>{const option=document.createElement('option');option.value=String(i);option.textContent=key+' · '+m.note.slice(0,60);select.append(option);});
 select.onchange=()=>{if(select.value!=='')form.elements.answer.value=annotations[Number(select.value)][1].note;};
 form.onsubmit=event=>{event.preventDefault();const question=form.elements.question.value.trim(),answer=form.elements.answer.value.trim();if(!question||!answer||cards.length>=5000)return;S.memoryCards=[...cards,{question,answer}];save();panel.replaceWith(memoryPanel());};
 cards.forEach((card,i)=>{const row=document.createElement('p');row.textContent=card.question+' ';const remove=document.createElement('button');remove.type='button';remove.textContent='Supprimer';remove.onclick=()=>{if(!confirm('Supprimer cette carte ?'))return;S.memoryCards=cards.filter((_,n)=>n!==i);save();panel.replaceWith(memoryPanel());};row.append(remove);panel.querySelector('[data-personal]').append(row);});
 const queue=[...due.map(x=>({question:x.lesson.quiz[0],answer:x.lesson.quiz[1][x.lesson.quiz[2]]+' · '+x.lesson.quiz[3],record:correct=>recordReview(x.course,x.lesson,correct)})),...builtinDue.map(x=>({question:x.question,answer:x.answer,record:correct=>{S.reviews[x.key]=nextMemoryReview(S.reviews[x.key],correct,localStudyDate());save();}})),...personal.map(x=>({question:x.question,answer:x.answer,record:correct=>{x.review=nextMemoryReview(x.review,correct,localStudyDate());S.memoryCards=cards;save();}}))];
 const session=panel.querySelector('[data-memory-session]');
 function draw(){session.replaceChildren();const x=queue[0];if(!x){session.textContent='Aucun rappel en attente.';return;}const q=document.createElement('p');q.textContent=x.question;const reveal=document.createElement('button');reveal.type='button';reveal.textContent='Afficher la réponse';session.append(q,reveal);reveal.onclick=()=>{reveal.remove();const a=document.createElement('p');a.textContent=x.answer;session.append(a);for(const correct of [false,true]){const b=document.createElement('button');b.type='button';b.textContent=correct?'Retrouvé sans aide':'À revoir';b.onclick=()=>{x.record(correct);queue.shift();draw();};session.append(b);}};}
 draw();return panel;
}

function editorialChecks(lesson){
 const sources=Array.isArray(lesson.sources)?lesson.sources:[];
 const text=[lesson.overview,...(lesson.sections||[]).map(s=>s[1]),lesson.dossier].join(' ');
 const citations=[...text.matchAll(/\[(\d+(?:, *\d+)*)\]/g)].flatMap(m=>m[1].split(',').map(Number));
 return [
 ['Objectif et prérequis',Boolean(lesson.goal&&lesson.prerequisite)],
 ['Contenu structuré',Boolean(lesson.sections?.length&&lesson.sections.every(s=>s[0]&&s[1]))],
 ['Exercice et corrigé',Boolean(lesson.activity&&lesson.correction)],
 ['Quiz et justification',Boolean(lesson.quiz?.[0]&&Array.isArray(lesson.quiz[1])&&Number.isInteger(lesson.quiz[2])&&lesson.quiz[2]>=0&&lesson.quiz[2]<lesson.quiz[1].length&&lesson.quiz[3])],
 ['Bibliographie renseignée',sources.length>0&&sources.every(s=>s[0]&&s[1]&&s[2]&&/^https?:\/\//i.test(s[3])&&s[4])],
 ['Renvois bibliographiques présents et valides',citations.length>0&&citations.every(n=>n>=1&&n<=sources.length)],
 ['Consigne de révision',Boolean(lesson.review)]
 ];
}
function editorialStatus(lesson){return editorialChecks(lesson).every(x=>x[1])?'Structure complète':'Structure à compléter';}
function showEditorialQuality(){
 const rows=allStudyCourses().flatMap(course=>course.lessons.map((lesson,index)=>({course,lesson,index,checks:editorialChecks(lesson)})));
 const complete=rows.filter(x=>x.checks.every(c=>c[1])).length;
 v.innerHTML='<h2>Qualité éditoriale et scientifique</h2><p>Contrôles automatiques de structure uniquement. Ils ne vérifient ni la vérité des affirmations, ni la pertinence des références, ni les droits, ni la disponibilité des liens.</p><section class="card"><h3>État du corpus</h3><p>'+complete+' / '+rows.length+' leçons satisfont les sept contrôles structurels.</p><progress max="'+Math.max(rows.length,1)+'" value="'+complete+'"></progress><p>Validation scientifique indépendante : non attestée dans ce registre.</p><a href="docs/controle-editorial.html">Protocole éditorial</a></section><label>Afficher <select id="editorial-filter"><option value="all">Toutes les leçons</option><option value="missing">Structures à compléter</option><option value="complete">Structures complètes</option></select></label><div id="editorial-list"></div>';
 const list=v.querySelector('#editorial-list'),filter=v.querySelector('#editorial-filter');
 function draw(){list.replaceChildren();rows.filter(x=>filter.value==='all'||(filter.value==='complete')===x.checks.every(c=>c[1])).forEach(x=>{
 const card=document.createElement('details');card.className='card';const title=document.createElement('summary');title.textContent=x.lesson.title+' · '+editorialStatus(x.lesson);card.append(title);
 const p=document.createElement('p');p.textContent=x.course.title+' · Relecture scientifique indépendante non attestée';card.append(p);
 const ul=document.createElement('ul');x.checks.forEach(([label,ok])=>{const li=document.createElement('li');li.textContent=(ok?'Présent : ':'À vérifier : ')+label;ul.append(li);});card.append(ul,academicReviewSheet(lessonProgressKey(x.course.key,x.lesson.id)));
 const button=document.createElement('button');button.textContent='Consulter la leçon';button.onclick=()=>showLesson(x.course,x.index);card.append(button);list.append(card);
 });}
 filter.onchange=draw;draw();
}

const practiceStages={
 'Séminaires':['Question et thèse','Deux arguments documentés','Objection et réponse','Synthèse et limites'],
 'Laboratoire':['Hypothèse et prédiction','Protocole et variables','Observations et résultats','Interprétation et limites'],
 'Atelier':['Objectif et contraintes','Méthode et réalisation','Vérification et corrections','Production finale'],
 'Cabinet de recherche':['Question de recherche','Sources et méthode','Analyse critique','Conclusion et limites'],
 'Projets universitaires':['Question et objectifs','Plan et sources','Réalisation et résultats','Bilan et perspectives']
};
function validPracticeProjects(value){
 return value===undefined||Array.isArray(value)&&value.length<=500&&value.every(p=>p&&typeof p.id==='string'&&p.id.length<=100&&Object.hasOwn(practiceStages,p.kind)&&typeof p.title==='string'&&p.title.length<=200&&Array.isArray(p.steps)&&p.steps.length===4&&p.steps.every(s=>typeof s==='string'&&s.length<=20000)&&['draft','finished'].includes(p.status))&&new Set(value.map(p=>p.id)).size===value.length;
}
function showPractice(name){
 v.innerHTML='<h2>Projets universitaires</h2><p>Un dossier de travail personnel, de la question initiale au bilan. Aucun résultat n’est évalué automatiquement.</p>';
 v.append(practicePanel(name));
}
function practicePanel(kind){
 const panel=document.createElement('section');panel.className='card';
 const projects=validPracticeProjects(S.practiceProjects)?S.practiceProjects||[]:[];
 panel.innerHTML='<h3>Mes dossiers de travail</h3><p>Rédige tes étapes, conserve tes preuves et indique tes limites. Les dossiers restent sur cet appareil.</p><form><label>Titre du dossier <input name="title" maxlength="200" required></label><button>Créer un dossier</button></form><div data-projects></div>';
 const form=panel.querySelector('form'),list=panel.querySelector('[data-projects]');
 function persist(next){try{localStorage.au=JSON.stringify({...S,practiceProjects:next});S.practiceProjects=next;return true;}catch{alert('Enregistrement impossible. Exporte une sauvegarde et vérifie l’espace disponible.');return false;}}
 function redraw(){panel.replaceWith(practicePanel(kind));}
 form.onsubmit=event=>{event.preventDefault();const title=form.elements.title.value.trim();if(!title||projects.length>=500)return;const id=globalThis.crypto?.randomUUID?.()||Date.now()+'-'+Math.random().toString(36).slice(2);if(persist([...projects,{id,kind,title,steps:['','','',''],status:'draft'}]))redraw();};
 projects.filter(p=>kind==='Projets universitaires'||p.kind===kind).forEach(p=>{
 const details=document.createElement('details');details.className='card practice-dossier';
 const summary=document.createElement('summary');summary.textContent=p.title+' · '+(p.status==='finished'?'Terminé (auto-déclaré)':'En cours');details.append(summary);
 const edit=document.createElement('form');const labels=practiceStages[p.kind];
 const fields=labels.map((label,i)=>{const wrap=document.createElement('label'),area=document.createElement('textarea');wrap.textContent=label;area.rows=5;area.maxLength=20000;area.value=p.steps[i];wrap.append(area);edit.append(wrap);return area;});
 const done=document.createElement('label'),check=document.createElement('input');check.type='checkbox';check.checked=p.status==='finished';done.append(check,' Dossier terminé (autoévaluation)');edit.append(done);
 const status=document.createElement('p');status.setAttribute('role','status');
 const saveButton=document.createElement('button');saveButton.textContent='Enregistrer';edit.append(saveButton,status);
 let editing=!p.steps.some(s=>s.trim());
 function answerMode(){fields.forEach(a=>a.readOnly=!editing);check.disabled=!editing;saveButton.textContent=editing?'Enregistrer':'Modifier';}
 answerMode();
 edit.onsubmit=event=>{event.preventDefault();if(!editing){editing=true;answerMode();fields[0].focus();return;}const steps=fields.map(a=>a.value);if(check.checked&&steps.some(s=>!s.trim())){status.textContent='Complète les quatre étapes avant de terminer.';return;}const next={...p,steps,status:check.checked?'finished':'draft'};if(persist((S.practiceProjects||[]).map(x=>x.id===p.id?next:x))){Object.assign(p,next);summary.textContent=p.title+' · '+(p.status==='finished'?'Terminé (auto-déclaré)':'En cours');status.textContent='Dossier enregistré.';editing=false;answerMode();}};
 const exportButton=document.createElement('button');exportButton.type='button';exportButton.textContent='Exporter le dossier enregistré';exportButton.onclick=()=>{const text=p.title+'\n'+p.kind+'\n\n'+labels.map((label,i)=>label+'\n'+p.steps[i]).join('\n\n');const url=URL.createObjectURL(new Blob([text],{type:'text/plain;charset=utf-8'}));const a=document.createElement('a');a.href=url;a.download='academia-dossier.txt';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);};
 const remove=document.createElement('button');remove.type='button';remove.textContent='Supprimer';remove.onclick=()=>{if(confirm('Supprimer ce dossier ?')&&persist((S.practiceProjects||[]).filter(x=>x.id!==p.id)))redraw();};
 details.append(edit,exportButton,remove);list.append(details);
 });return panel;
}

const literaryBooks=[
{id:"fable",title:"Le Loup et l’Agneau",author:"Jean de La Fontaine",access:"Texte intégral du domaine public",url:"https://fr.wikisource.org/wiki/Fables_de_La_Fontaine_%28%C3%A9d._1874%29/Le_Loup_et_l%E2%80%99Agneau",text:"La raison du plus fort est toujours la meilleure :\nNous l’allons montrer tout à l’heure.\n\nUn Agneau se désaltérait\nDans le courant d’une onde pure.\nUn Loup survient à jeun, qui cherchait aventure,\nEt que la faim en ces lieux attirait.\nQui te rend si hardi de troubler mon breuvage ?\nDit cet animal plein de rage :\nTu seras châtié de ta témérité.\nSire, répond l’Agneau, que Votre Majesté\nNe se mette pas en colère ;\nMais plutôt qu’elle considère\nQue je me vas désaltérant\nDans le courant,\nPlus de vingt pas au-dessous d’Elle,\nEt que par conséquent, en aucune façon,\nJe ne puis troubler sa boisson.\nTu la troubles, reprit cette bête cruelle,\nEt je sais que de moi tu médis l’an passé.\nComment l’aurais-je fait si je n’étais pas né ?\nReprit l’Agneau ; je tette encor ma mère.\nSi ce n’est toi, c’est donc ton frère.\nJe n’en ai point. C’est donc quelqu’un des tiens :\nCar vous ne m’épargnez guère,\nVous, vos bergers et vos chiens.\nOn me l’a dit : il faut que je me venge.\nLà-dessus, au fond des forêts\nLe Loup l’emporte et puis le mange,\nSans autre forme de procès."},
{id:"odyssee",title:"L’Odyssée",author:"Homère",access:"Chant IX intégral gratuit en français, Leconte de Lisle, édition Lemerre 1893",url:"https://fr.wikisource.org/wiki/L%E2%80%99Odyss%C3%A9e/Traduction_Leconte_de_Lisle/9"},
{id:"genji",title:"Le Dit du Genji",author:"Murasaki Shikibu",access:"Œuvre intégrale facultative ; catalogue scientifique externe",url:"https://www.metmuseum.org/met-publications/the-tale-of-genji-a-japanese-classic-illuminated"},
{id:"chevet",title:"Notes de chevet",author:"Sei Shōnagon",access:"Œuvre intégrale facultative ; rechercher une édition gratuite",url:"https://gallica.bnf.fr/"},
{id:"achebe",title:"Le Monde s’effondre",author:"Chinua Achebe",access:"Lecture facultative protégée ; emprunt possible"}
];
function validLiteraryState(x){return x===undefined||!!(x&&typeof x==="object"&&!Array.isArray(x)&&["light","sepia","dark"].includes(x.theme)&&[100,115,130,150].includes(x.size)&&x.entries&&typeof x.entries==="object"&&!Array.isArray(x.entries)&&Object.keys(x.entries).length<=500&&Object.entries(x.entries).every(([k,e])=>k.length<=100&&e&&["todo","reading","read"].includes(e.status)&&["impressions","quotes","analysis","characters"].every(p=>typeof e[p]==="string"&&e[p].length<=20000)&&Number.isFinite(e.position)&&e.position>=0&&e.position<=1));}
function literaryState(){return validLiteraryState(S.literary)&&S.literary?S.literary:{theme:"sepia",size:115,entries:{}};}
function literaryEntry(state,id){return state.entries[id]||{status:"todo",impressions:"",quotes:"",analysis:"",characters:"",position:0};}
function persistLiterary(state){if(!validLiteraryState(state))return false;try{localStorage.au=JSON.stringify({...S,literary:state});S.literary=state;return true;}catch{return false;}}
function literaryPanel(name,selected,container=v){
 if(name==='Carnet littéraire'&&container===v){openSubjectNotebook('Littérature',selected);return;}
 const state=literaryState(),book=literaryBooks.find(b=>b.id===selected)||literaryBooks[0],entry=literaryEntry(state,book.id);
 container.replaceChildren();const el=(tag,txt,parent=container)=>{const n=document.createElement(tag);if(txt)n.textContent=txt;parent.append(n);return n;};
 const btn=(txt,fn,parent=container)=>{const b=el("button",txt,parent);b.type="button";b.onclick=fn;return b;};
 if(container===v){
   btn("Retour aux espaces",()=>go(11));
   el("h2",name);
   btn("Mes notes de lecture",()=>openSubjectNotebook('Littérature',book.id));
 }else{
   notebookBook=book.id;
   el("h3","Notes de lecture");
 }
 const label=el("label","Œuvre ");const select=el("select","",label);literaryBooks.forEach(b=>{const o=el("option",b.title+" · "+b.author,select);o.value=b.id;});select.value=book.id;select.onchange=()=>literaryPanel(name,select.value,container);
 el("h3",book.title);el("p",book.author+" · "+book.access);const lessonId={fable:"fable",odyssee:"odyssee",genji:"japon-heian",chevet:"japon-heian",achebe:"achebe"}[book.id];if(lessonId)btn("Lire la leçon associée",()=>spaceLesson("litterature",lessonId));
 const msg=el("p","");msg.setAttribute("role","status");
 const store=()=>{state.entries={...state.entries,[book.id]:entry};msg.textContent=persistLiterary({...state})?"Enregistré sur cet appareil.":"Enregistrement impossible."};
 const sl=el("label","État de lecture ");const status=el("select","",sl);[["todo","À lire"],["reading","En cours"],["read","Terminé"]].forEach(([k,t])=>{el("option",t,status).value=k;});status.value=entry.status;status.onchange=()=>{entry.status=status.value;store();};
 if(name==="Carnet littéraire"){
 [["impressions","Impressions personnelles"],["quotes","Citations et références de pages"],["characters","Personnages et thèmes"],["analysis","Analyse et questions"]].forEach(([k,t])=>{const l=el("label",t);const a=el("textarea","",l);a.rows=5;a.maxLength=20000;a.value=entry[k];const b=el('button',a.value.trim()?'Modifier':'Enregistrer',l);b.type='button';a.readOnly=Boolean(a.value.trim());b.onclick=()=>{if(a.readOnly){a.readOnly=false;b.textContent='Enregistrer';a.focus();return;}const next={...entry,[k]:a.value};const nextState={...state,entries:{...state.entries,[book.id]:next}};if(persistLiterary(nextState)){Object.assign(entry,next);Object.assign(state,nextState);a.readOnly=true;b.textContent='Modifier';msg.textContent='Enregistré sur cet appareil.';}else msg.textContent='Enregistrement impossible.';};});
 btn("Exporter le carnet",()=>{const content=literaryBooks.map(b=>{const e=literaryEntry(state,b.id);return b.title+" · "+b.author+"\n"+e.status+"\n"+e.impressions+"\n"+e.quotes+"\n"+e.characters+"\n"+e.analysis;}).join("\n\n");const u=URL.createObjectURL(new Blob([content],{type:"text/plain;charset=utf-8"}));const a=document.createElement("a");a.href=u;a.download="carnet-litteraire.txt";a.click();setTimeout(()=>URL.revokeObjectURL(u),1000);});
 }else{
 if(book.url){const a=el("a","Consulter la ressource externe (connexion nécessaire)");a.href=book.url;a.target="_blank";a.rel="noopener noreferrer";}
 if(book.text){const controls=el("div");const theme=el("select","",el("label","Thème ",controls));[["light","Clair"],["sepia","Sépia"],["dark","Nuit"]].forEach(([k,t])=>el("option",t,theme).value=k);theme.value=state.theme;
 const size=el("select","",el("label","Taille ",controls));[100,115,130,150].forEach(n=>el("option",n+" %",size).value=n);size.value=state.size;
 const reader=el("article",book.text);reader.className="card";reader.tabIndex=0;reader.style.cssText="white-space:pre-wrap;line-height:1.8;max-height:65vh;overflow:auto;overflow-wrap:anywhere;";
 const apply=()=>{reader.style.background=state.theme==="dark"?"#20232c":state.theme==="sepia"?"#f3e8ce":"#fff";reader.style.color=state.theme==="dark"?"#f4f4f4":"#29241e";reader.style.fontSize=state.size+"%";};apply();
 theme.onchange=()=>{state.theme=theme.value;apply();store();};size.onchange=()=>{state.size=Number(size.value);apply();store();};
 requestAnimationFrame(()=>{reader.scrollTop=entry.position*Math.max(0,reader.scrollHeight-reader.clientHeight);});
 btn("Mémoriser ce passage",()=>{entry.position=reader.scrollTop/Math.max(1,reader.scrollHeight-reader.clientHeight);store();});
 el("p","Texte de 1668, orthographe modernisée ; collation de l’édition à terminer.");
 }else el("p","Pas de texte intégral embarqué : les droits ou l’accès de l’édition restent à vérifier.");
 btn("Ouvrir mon carnet pour cette œuvre",()=>openSubjectNotebook('Littérature',book.id));
 }
}
