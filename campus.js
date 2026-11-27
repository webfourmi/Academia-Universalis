const campusResources = [
  {region:'Europe', author:'University of Cambridge', title:'World Archaeology', year:'s. d.', language:'anglais', level:'premier cycle', access:'Présentation publique du programme', rights:'Page institutionnelle citée par lien', url:'https://www.arch.cam.ac.uk/prospective-students/undergraduates/course-structure-1', evidence:'Organisation d’un parcours comparatif en archéologie.'},
  {region:'Afrique', author:'University of Cape Town', title:'Africa in Question', year:'s. d.', language:'anglais', level:'premier cycle', access:'Descriptif public, cours réservé aux inscrits', rights:'Page institutionnelle citée par lien', url:'https://humanities.uct.ac.za/department-historical-studies/our-degrees-undergraduate-studies/africa-question-ancient-pre-colonial-africa-between-past-present', evidence:'Historiographie africaine, Égypte et Nubie.'},
  {region:'Asie', author:'Deccan College', title:'MA in Ancient Indian History, Culture and Archaeology', year:'s. d.', language:'anglais', level:'master', access:'Programme PDF public', rights:'Document institutionnel cité par lien', url:'https://dcpune.ac.in/pdf/II.%20M.A.%20in%20A.%20I.%20H.%20C.%20and%20Archaeology%20Course%20Structure.pdf', evidence:'Place du cours sur l’Indus dans la formation à l’archéologie sud-asiatique.'},
  {region:'Amériques', author:'MIT OpenCourseWare', title:'Empire: Introduction to Ancient and Medieval Studies', year:'2012', language:'anglais', level:'premier cycle', access:'Calendrier et ressources publiques', rights:'CC BY-NC-SA selon les conditions OCW et les mentions propres aux ressources', url:'https://ocw.mit.edu/courses/21h-007j-empire-introduction-to-ancient-and-medieval-studies-fall-2012/pages/calendar/', evidence:'Séquence de cours consacrée à Auguste et aux Res Gestae.'},
  {region:'Océanie', author:'University of Queensland', title:'ARCS2080 · Plants and Archaeology: Food, fuel, foraging and farming in the human past', year:'s. d.', language:'anglais', level:'premier cycle', access:'Descriptif public du cours', rights:'Page institutionnelle citée par lien', url:'https://course-profiles.uq.edu.au/course-profiles/ARCS2080-20848-7620', evidence:'Comparaison archéologique des pratiques de gestion des plantes.'}
];

const campusSpaces = {
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

function reviewDue(entry, date = new Date()) {
  const offset = [2, 7, 30][entry.step];
  if (offset === undefined) return false;
  const due = new Date(entry.date+'T12:00:00');
  due.setDate(due.getDate()+offset);
  return localStudyDate(due)<=localStudyDate(date);
}

function recordReview(course, lesson, correct) {
  const key=lessonProgressKey(course.key,lesson.id);
  const today=localStudyDate();
  S.reviews ??= {};
  const previous=S.reviews[key];
  if (!previous) {
    S.reviews[key]={date:today, step:0, last:today, correct};
  } else {
    if (correct && previous.last!==today && reviewDue(previous)) previous.step++;
    previous.last = today;
    previous.correct = correct;
  }
  save();
}

function showCampus() {
  v.innerHTML='<h2>Espaces du campus</h2><div class="grid">'+Object.entries(campusSpaces)
    .map(([name, purpose])=>'<article class="card"><h3>'+name+'</h3><p>'+purpose+'</p><button data-space="'+name+'">Ouvrir · '+name+'</button></article>').join('')+'</div>';
  v.querySelectorAll('[data-space]').forEach(button=>button.onclick=()=>showSpace(button.dataset.space));
}

function spaceLesson(courseKey, lessonId) {
  const course=allStudyCourses().find(item=>item.key===courseKey);
  const index=course?.lessons.findIndex(lesson=>lesson.id===lessonId);
  if (index>=0) showLesson(course,index);
}

function spaceButton(courseKey, lessonId, label) {
  return '<button data-course="'+courseKey+'" data-lesson-id="'+lessonId+'">'+label+'</button>';
}

function showSpace(name) {
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
    Planning: '<h3>Ton rythme</h3><p>40 semaines · volumes cibles de travail personnel.</p><label>Heures par semaine <select id="campus-hours">'+[3,6,10].map(hours=>'<option value="'+hours+'" '+(S.hours===hours?'selected':'')+'>'+hours+'</option>').join('')+'</select></label><p>'+S.hours*40+' heures sur l’année au rythme choisi.</p><p>Commence par une leçon, puis réserve une courte séance à la relecture et au rappel actif.</p><button onclick="openGuidedLesson()" '+(!guidedJourney().next?'disabled':'')+'>Ouvrir la prochaine leçon</button><h3>Révisions à faire · J+2, J+7 et J+30</h3>'+(due.length?due.map(button=>'<p>'+button+'</p>').join(''):'<p>Aucune révision à échéance. Répondre au quiz d’une leçon l’inscrit à la révision. Une réponse correcte à échéance valide le rappel.</p>')+'<details><summary>Voir le calendrier sur 40 semaines</summary><p>Un ordre conseillé, à adapter à ton rythme. Chaque ligne correspond à une semaine.</p><ol>'+weeklyPlan+'</ol></details>',
    Amphithéâtre:'<h3>Une conférence et un texte à confronter</h3><p>Regarde une séance du cours de Yale, puis note ce que la source ancienne permet de vérifier et ce qui relève de la synthèse de l’enseignant.</p><p><a href="https://online.yale.edu/courses/introduction-ancient-greek-history">Yale · Introduction to Ancient Greek History (anglais, en ligne)</a></p>'+spaceButton('antiquite','athenes','Lire le dossier sur Athènes'),
    Séminaires:'<h3>Argumenter à partir de documents</h3><p>Rédige une thèse, présente deux preuves et traite une objection. Les barèmes et plans indicatifs figurent dans les leçons de synthèse.</p>'+spaceButton('histoire','comparaison','Dissertation sur les premières villes')+' '+spaceButton('antiquite','auguste','Dissertation sur les discours du pouvoir'),
    Laboratoire:'<h3>Tester un bilan de forces</h3><p>Prévois la résultante pour deux forces opposées. Dans la simulation, fais varier une force à la fois et compare ta prédiction à l’observation. Note les conditions avec et sans frottement.</p><p><a href="https://phet.colorado.edu/en/simulations/forces-and-motion-basics">Simulation PhET · Forces et mouvement (en ligne)</a></p>'+spaceButton('physique','forces','Ouvrir le cours sur les forces'),
    Atelier:'<h3>Reconstituer et produire</h3><p>Choisis une tâche. Annote une prémisse implicite ou compose un échange de trois répliques. Vérifie ensuite ta réponse avec le corrigé de la leçon.</p>'+spaceButton('logique','premisses','Atelier d’argumentation')+' '+spaceButton('chinois','saluer','Atelier de mandarin'),
    Musée:'<h3>Lire une notice d’objet</h3><p>Sépare la matière, la datation et la provenance de l’usage proposé par le catalogue. Pour chaque information, indique si tu l’as observée ou lue dans la notice.</p><p><a href="https://www.metmuseum.org/fr/essays/the-origins-of-writing">Metropolitan Museum of Art · The Origins of Writing</a></p>'+spaceButton('histoire','uruk','Étudier une tablette d’Uruk'),
    Observatoire:'<h3>Observer le ciel et documenter une mesure</h3><p>Dans la représentation de la NASA, compare deux planètes en lisant les unités avant d’estimer un rapport de distances. Indique si la vue est à l’échelle ou schématique et garde une trace de la date de consultation.</p><p><a href="https://science.nasa.gov/solar-system/">NASA · Solar System Exploration (anglais, en ligne)</a></p>'+spaceButton('physique','mesures','Revoir les unités et les mesures'),
    'Cabinet de recherche':'<h3>Construire une enquête</h3><ol><li>Formule une question et une hypothèse réfutable.</li><li>Repère une publication primaire et une synthèse. Note auteur, titre, date, accès, droits et proposition soutenue.</li><li>Distingue ce que la source observe de ce qu’elle extrapole et cherche un contre-exemple.</li><li>Si tu utilises une IA, conserve une trace de son rôle et remonte aux documents originaux avant de citer.</li></ol><p><a href="docs/controle-editorial.html">Contrôle éditorial et grille de relecture</a></p>'+spaceButton('methode','verification','Vérifier une affirmation')+' '+spaceButton('methode','lecture','Lire une publication')+' '+spaceButton('methode','synthese-documentee','Rédiger une synthèse documentée')+' '+spaceButton('psychologie','methodes','Concevoir un test causal')
  };
  v.innerHTML='<button onclick="showCampus()">Retour aux espaces</button><h2>'+name+'</h2><article class="card">'+activities[name]+'</article>';
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

function showCampusLibrary() {
  const catalog = allStudyCourses();
  const resources = [...campusResources,...libraryAdditions].map(resource=>{
    const theme = libraryTheme(resource);
    const course = catalog.find(entry=>entry.key===resource.courseKey);
    const lesson = course?.lessons.find(entry=>entry.id===resource.lessonId);
    const searchText = searchableText([resource.title,resource.author,resource.evidence,theme,course?.title,lesson?.title].join(' '));
    return {...resource,theme,searchText};
  });
  const regions = [...new Set(resources.map(resource=>resource.region))];
  const themes = [...new Set(resources.map(resource=>resource.theme))].sort((a,b)=>a.localeCompare(b,'fr'));
  v.innerHTML = `<h2>Bibliothèque universitaire</h2><div class="library-filters">
    <label>Rechercher <input id="library-search" type="search" placeholder="Thème, auteur, titre…"></label>
    <div><label for="library-theme">Thème</label><select id="library-theme"><option value="">Tous</option>${themes.map(theme=>`<option>${theme}</option>`).join('')}</select></div>
    <div><label for="library-region">Région</label><select id="library-region"><option value="">Toutes</option>${regions.map(region=>`<option>${region}</option>`).join('')}</select></div>
    </div><p id="library-count" role="status"></p><div id="library-records"></div>`;
  const picker=v.querySelector('#library-region');
  const themePicker=v.querySelector('#library-theme');
  const search=v.querySelector('#library-search');
  function showRecords() {
    const terms=searchableText(search.value.trim()).split(/\s+/).filter(Boolean);
    const matches=resources.filter(resource=>{
      if (picker.value && resource.region!==picker.value) return false;
      if (themePicker.value && resource.theme!==themePicker.value) return false;
      return terms.every(term=>resource.searchText.includes(term));
    });
    v.querySelector('#library-count').textContent=matches.length+' '+(matches.length===1?'ressource':'ressources');
    v.querySelector('#library-records').innerHTML=matches.map(resource=>
      '<article class="card"><h3><a href="'+resource.url+'">'+resource.title+'</a></h3><p>'+resource.theme+' · '+resource.author+' · '+resource.year+' · '+resource.region+' · '+resource.language+' · '+resource.level+'</p><p>'+resource.evidence+'</p><p>'+resource.access+' · '+resource.rights+' · consulté le '+(resource.consulted||'26/11/2026')+'.</p>'+(resource.courseKey?spaceButton(resource.courseKey,resource.lessonId,'Étudier avec cette ressource'):'')+'</article>'
    ).join('') || '<p>Aucun résultat. Essaie un autre mot ou ajuste les filtres.</p>';
  }
  v.insertAdjacentHTML('beforeend','<details><summary>Autres catalogues à explorer</summary><ul><li><a href="https://pll.harvard.edu/catalog/free">Harvard</a></li><li><a href="https://oyc.yale.edu/courses">Open Yale Courses</a></li><li><a href="https://ocw.mit.edu/">MIT OpenCourseWare</a></li><li><a href="https://www.college-de-france.fr/">Collège de France</a></li><li><a href="https://podcasts.ox.ac.uk/">Oxford Podcasts</a></li></ul></details>');
  v.querySelector('#library-records').onclick = event => {
    const button = event.target.closest('[data-course]');
    if (button) spaceLesson(button.dataset.course, button.dataset.lessonId);
  };
  picker.onchange=showRecords;
  themePicker.onchange=showRecords;
  search.oninput=showRecords;
  showRecords();
}

function validReviews(reviews) {
  return reviews===undefined || Boolean(reviews && typeof reviews==='object' && !Array.isArray(reviews) &&
    Object.values(reviews).every(entry=>entry && /^\d{4}-\d{2}-\d{2}$/.test(entry.date) &&
      /^\d{4}-\d{2}-\d{2}$/.test(entry.last) && Number.isInteger(entry.step) && entry.step>=0 && entry.step<=3 &&
      typeof entry.correct==='boolean'));
}
