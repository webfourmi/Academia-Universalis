const campusResources = [
  {region:'Europe', author:'University of Cambridge', title:'World Archaeology', year:'s. d.', language:'anglais', level:'premier cycle', access:'Présentation publique du programme', rights:'Page institutionnelle citée par lien', url:'https://www.arch.cam.ac.uk/prospective-students/undergraduates/course-structure-1', evidence:'Organisation d’un parcours comparatif en archéologie.'},
  {region:'Afrique', author:'University of Cape Town', title:'Africa in Question', year:'s. d.', language:'anglais', level:'premier cycle', access:'Descriptif public, cours réservé aux inscrits', rights:'Page institutionnelle citée par lien', url:'https://humanities.uct.ac.za/department-historical-studies/our-degrees-undergraduate-studies/africa-question-ancient-pre-colonial-africa-between-past-present', evidence:'Historiographie africaine, Égypte et Nubie.'},
  {region:'Asie', author:'Deccan College', title:'MA in Ancient Indian History, Culture and Archaeology', year:'s. d.', language:'anglais', level:'master', access:'Programme PDF public', rights:'Document institutionnel cité par lien', url:'https://dcpune.ac.in/pdf/II.%20M.A.%20in%20A.%20I.%20H.%20C.%20and%20Archaeology%20Course%20Structure.pdf', evidence:'Place du cours sur l’Indus dans la formation à l’archéologie sud-asiatique.'},
  {region:'Amériques', author:'MIT OpenCourseWare', title:'Empire: Introduction to Ancient and Medieval Studies', year:'2012', language:'anglais', level:'premier cycle', access:'Calendrier et ressources publiques', rights:'CC BY-NC-SA selon les conditions OCW et les mentions propres aux ressources', url:'https://ocw.mit.edu/courses/21h-007j-empire-introduction-to-ancient-and-medieval-studies-fall-2012/pages/calendar/', evidence:'Séquence de cours consacrée à Auguste et aux Res Gestae.'},
  {region:'Océanie', author:'University of Queensland', title:'ARCS2080 · Plants and Archaeology: Food, fuel, foraging and farming in the human past', year:'s. d.', language:'anglais', level:'premier cycle', access:'Descriptif public du cours', rights:'Page institutionnelle citée par lien', url:'https://course-profiles.uq.edu.au/course-profiles/ARCS2080-20848-7620', evidence:'Comparaison archéologique des pratiques de gestion des plantes.'}
];

const campusSpaces = {
  'Qualité scientifique': 'Consulter les contrôles structurels des leçons et les vérifications restant à effectuer.',
  'Planning': 'Répartir son temps sur 40 semaines et ouvrir les révisions arrivées à échéance.',
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

function spaceLesson(courseKey, lessonId) {
  const course=allStudyCourses().find(item=>item.key===courseKey);
  const index=course?.lessons.findIndex(lesson=>lesson.id===lessonId);
  if (index>=0) showLesson(course,index);
}

function spaceButton(courseKey, lessonId, label) {
  return '<h4><button class="title-action" data-course="'+courseKey+'" data-lesson-id="'+lessonId+'">'+label+'</button></h4>';
}

function showSpace(name) {
  rememberCampusRoute('space',{name});
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
    Amphithéâtre:'<h3>Une conférence et un texte à confronter</h3><p>Regarde une séance du cours de Yale, puis note ce que la source ancienne permet de vérifier et ce qui relève de la synthèse de l’enseignant.</p><p><a href="https://online.yale.edu/courses/introduction-ancient-greek-history">Yale · Introduction to Ancient Greek History (anglais, en ligne)</a></p>'+spaceButton('antiquite','athenes','Dossier sur Athènes'),
    Séminaires:'<h3>Argumenter à partir de documents</h3><p>Rédige une thèse, présente deux preuves et traite une objection. Les barèmes et plans indicatifs figurent dans les leçons de synthèse.</p>'+spaceButton('histoire','comparaison','Dissertation sur les premières villes')+' '+spaceButton('antiquite','auguste','Dissertation sur les discours du pouvoir'),
    Laboratoire:'<h3>Tester un bilan de forces</h3><p>Prévois la résultante pour deux forces opposées. Dans la simulation, fais varier une force à la fois et compare ta prédiction à l’observation. Note les conditions avec et sans frottement.</p><p><a href="https://phet.colorado.edu/en/simulations/forces-and-motion-basics">Simulation PhET · Forces et mouvement (en ligne)</a></p>'+spaceButton('physique','forces','Forces et mouvement'),
    Atelier:'<h3>Reconstituer et produire</h3><p>Choisis une tâche. Annote une prémisse implicite ou compose un échange de trois répliques. Vérifie ensuite ta réponse avec le corrigé de la leçon.</p>'+spaceButton('logique','premisses','Atelier d’argumentation')+' '+spaceButton('chinois','saluer','Atelier de mandarin'),
    Musée:'<h3>Lire une notice d’objet</h3><p>Sépare la matière, la datation et la provenance de l’usage proposé par le catalogue. Pour chaque information, indique si tu l’as observée ou lue dans la notice.</p><p><a href="https://www.metmuseum.org/fr/essays/the-origins-of-writing">Metropolitan Museum of Art · The Origins of Writing</a></p>'+spaceButton('histoire','uruk','Étudier une tablette d’Uruk'),
    Observatoire:'<h3>Observer le ciel et documenter une mesure</h3><p>Dans la représentation de la NASA, compare deux planètes en lisant les unités avant d’estimer un rapport de distances. Indique si la vue est à l’échelle ou schématique et garde une trace de la date de consultation.</p><p><a href="https://science.nasa.gov/solar-system/">NASA · Solar System Exploration (anglais, en ligne)</a></p>'+spaceButton('physique','mesures','Unités et mesures'),
    'Cabinet de recherche':'<h3>Construire une enquête</h3><ol><li>Formule une question et une hypothèse réfutable.</li><li>Repère une publication primaire et une synthèse. Note auteur, titre, date, accès, droits et proposition soutenue.</li><li>Distingue ce que la source observe de ce qu’elle extrapole et cherche un contre-exemple.</li><li>Si tu utilises une IA, conserve une trace de son rôle et remonte aux documents originaux avant de citer.</li></ol><p><a href="docs/controle-editorial.html">Contrôle éditorial et grille de relecture</a></p>'+spaceButton('methode','verification','Vérifier une affirmation')+' '+spaceButton('methode','lecture','Lire une publication')+' '+spaceButton('methode','synthese-documentee','Rédiger une synthèse documentée')+' '+spaceButton('psychologie','methodes','Concevoir un test causal')
  };
  v.innerHTML='<button onclick="go(11)">Retour aux espaces</button><h2>'+name+'</h2><article class="card">'+activities[name]+'</article>';
  v.querySelectorAll('[data-course]').forEach(button=>button.onclick=()=>spaceLesson(button.dataset.course,button.dataset.lessonId));
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
  add({author,title,year,url,evidence,language:language||'Non renseignée',region:'Non renseignée',level:'Non renseigné',access:'Accès à vérifier',rights:'Droits à vérifier',theme:libraryTheme({courseKey:course.key})},{courseKey:course.key,lessonId:lesson.id,title:lesson.title,discipline:course.title,year:course.year||1});
 }
 return [...records.values()].map(item=>({...item,type:item.type||(/programme|descriptif/i.test(item.access)?'Programme':/simulation/i.test(item.access)?'Simulation':/vidéo|conférence/i.test(item.access)?'Conférence':'Non classé')})).sort((a,b)=>a.title.localeCompare(b.title,'fr'));
}
function showCampusLibrary(){
 const resources=libraryCatalog();
 const filters=[['theme','Thème'],['region','Région'],['language','Langue'],['type','Type'],['level','Niveau'],['access','Accès'],['author','Auteur / organisme'],['discipline','Discipline'],['year','Année du cursus'],['status','Ma bibliothèque']];
 const values=(r,key)=>key==='discipline'?r.links.map(x=>x.discipline):key==='year'?r.links.map(x=>String(x.year)):key==='status'?[S.libraryShelf?.[r.url]||'none']:[String(r[key]||'Non renseigné')];
 v.innerHTML='<h2>Bibliothèque scientifique</h2><p>Références des cours et catalogues universitaires. Les métadonnées manquantes restent à vérifier.</p><label>Rechercher <input type="search" id="library-search" placeholder="Titre, auteur, notion…"></label><details><summary>Filtres du catalogue</summary><div class="library-filters"></div></details><p role="status" id="library-count"></p><button id="library-export">Exporter les références affichées</button><div id="library-records"></div>';
 const controls=v.querySelector('.library-filters'),search=v.querySelector('#library-search'),list=v.querySelector('#library-records');
 const statusLabels={none:'Non enregistré',saved:'Favori',reading:'En cours',read:'Lu'};
 const picks=filters.map(([key,label])=>{
  const wrap=document.createElement('label'),select=document.createElement('select');wrap.textContent=label+' ';wrap.append(select);controls.append(wrap);
  const all=document.createElement('option');all.value='';all.textContent='Tous';select.append(all);
  const options=key==='status'?Object.keys(statusLabels):[...new Set(resources.flatMap(r=>values(r,key)))].sort((a,b)=>a.localeCompare(b,'fr'));
  options.forEach(value=>{const option=document.createElement('option');option.value=value;option.textContent=key==='status'?statusLabels[value]:value;select.append(option);});
  select.onchange=draw;return {key,select};
 });
 let matches=[];
 function draw(){
  const terms=searchableText(search.value.trim()).split(/\s+/).filter(Boolean);
  matches=resources.filter(r=>picks.every(({key,select})=>!select.value||values(r,key).includes(select.value))&&terms.every(t=>searchableText([r.title,r.author,r.evidence,r.theme,...r.links.map(x=>x.title+' '+x.discipline)].join(' ')).includes(t)));
  v.querySelector('#library-count').textContent=matches.length+' références sur '+resources.length;
  list.replaceChildren();
  matches.forEach(r=>{
   const card=document.createElement('article');card.className='card library-record';
   const h=document.createElement('h3'),a=document.createElement('a');a.href=r.url;a.target='_blank';a.rel='noopener';a.textContent=r.title;h.append(a);card.append(h);
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
 search.oninput=draw;
 v.querySelector('#library-export').onclick=()=>{
  const text=matches.map(r=>[r.author,r.year,r.title,r.url,r.access,r.rights].filter(Boolean).join(' · ')).join('\n\n');
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
  ${guidedJourneyCard()}
  <section class="card"><h3>Révisions prioritaires · ${due.length}</h3>
  ${due.length?due.slice(0,3).map((item,i)=>`<h4><button class="title-action" data-desk-review="${i}">${e(item.lesson.title)}</button></h4><p>${e(item.course.title)}</p>`).join(''):'<p>Aucune révision à échéance.</p>'}
  ${due.length>3?'<button onclick="go(13)">Toutes les révisions</button>':''}</section>
  <section class="card"><h3>Ma semaine</h3><label>Rythme <select id="desk-hours">${[3,6,10].map(h=>`<option value="${h}" ${S.hours===h?'selected':''}>${h} h / semaine</option>`).join('')}</select></label>
  <p>${minutes} / ${target} minutes déclarées</p><progress aria-label="Temps déclaré cette semaine" value="${Math.min(minutes,target)}" max="${target}"></progress>
  <form id="desk-time"><label for="desk-minutes">Temps total étudié aujourd’hui (minutes)</label><input id="desk-minutes" type="number" min="0" max="1440" step="1" required value="${log[today]||0}"><button>Enregistrer</button><p role="status"></p></form>
  <details><summary>Planning de la semaine</summary><p>Répartis librement tes ${target} minutes. Priorité aux révisions à échéance, puis à la prochaine leçon.</p><ol>${week.map(day=>`<li>${e(day)} · ${log[day]||0} min déclarées</li>`).join('')}</ol><button onclick="showSpace('Planning')">Calendrier du campus</button></details></section>
  <article class="card"><h3><button class="title-action" onclick="go(12)">Explorer les matières</button></h3><p>Les quatre années du campus</p></article>`;
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
 panel.innerHTML=`<h3>Mémoire adaptative</h3><p>${due.length+personal.length} rappels à faire · ${entries.filter(x=>!x.review.correct).length} notions fragiles (dernier quiz incorrect)</p><details><summary>Calendrier des rappels</summary><ul>${entries.slice().sort((a,b)=>reviewDate(a.review).localeCompare(reviewDate(b.review))).map(x=>`<li>${e(reviewDate(x.review))} · ${e(x.lesson.title)} · niveau ${x.review.step+1}/5</li>`).join('')}${cards.map(x=>`<li>${e(x.review?reviewDate(x.review):localStudyDate())} · ${e(x.question)}</li>`).join('')}</ul></details><div data-memory-session></div><details><summary>Créer une carte personnelle</summary><form><label>Question<textarea name="question" required maxlength="2000"></textarea></label><label>Réponse<textarea name="answer" required maxlength="10000"></textarea></label><label>Depuis mes annotations <select data-annotation><option value="">Choisir une annotation</option></select></label><button>Ajouter la carte</button></form></details><details><summary>Mes cartes personnelles</summary><div data-personal></div></details><p><small>Les niveaux sont des repères de rappel, pas une mesure de maîtrise globale. Intervalles heuristiques inspirés du rappel actif et de la pratique espacée : <a href="https://pubmed.ncbi.nlm.nih.gov/26173288/">Dunlosky et al., 2013</a>.</small></p>`;
 const form=panel.querySelector('form'),select=panel.querySelector('[data-annotation]');
 const annotations=Object.entries(S.readingTools?.marks||{}).filter(([,m])=>typeof m.note==='string'&&m.note.trim());
 annotations.forEach(([key,m],i)=>{const option=document.createElement('option');option.value=String(i);option.textContent=key+' · '+m.note.slice(0,60);select.append(option);});
 select.onchange=()=>{if(select.value!=='')form.elements.answer.value=annotations[Number(select.value)][1].note;};
 form.onsubmit=event=>{event.preventDefault();const question=form.elements.question.value.trim(),answer=form.elements.answer.value.trim();if(!question||!answer||cards.length>=5000)return;S.memoryCards=[...cards,{question,answer}];save();panel.replaceWith(memoryPanel());};
 cards.forEach((card,i)=>{const row=document.createElement('p');row.textContent=card.question+' ';const remove=document.createElement('button');remove.type='button';remove.textContent='Supprimer';remove.onclick=()=>{if(!confirm('Supprimer cette carte ?'))return;S.memoryCards=cards.filter((_,n)=>n!==i);save();panel.replaceWith(memoryPanel());};row.append(remove);panel.querySelector('[data-personal]').append(row);});
 const queue=[...due.map(x=>({question:x.lesson.quiz[0],answer:x.lesson.quiz[1][x.lesson.quiz[2]]+' · '+x.lesson.quiz[3],record:correct=>recordReview(x.course,x.lesson,correct)})),...personal.map(x=>({question:x.question,answer:x.answer,record:correct=>{x.review=nextMemoryReview(x.review,correct,localStudyDate());S.memoryCards=cards;save();}}))];
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
 const ul=document.createElement('ul');x.checks.forEach(([label,ok])=>{const li=document.createElement('li');li.textContent=(ok?'Présent : ':'À vérifier : ')+label;ul.append(li);});card.append(ul);
 const button=document.createElement('button');button.textContent='Consulter la leçon';button.onclick=()=>showLesson(x.course,x.index);card.append(button);list.append(card);
 });}
 filter.onchange=draw;draw();
}
