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
    <h2 class="reading-title" tabindex="-1">${lesson.title}</h2><details class="card"><summary>Qualité éditoriale · ${editorialStatus(lesson)}</summary><p>Contrôle automatique de structure, sans validation scientifique indépendante attestée.</p><ul>${editorialChecks(lesson).map(([label,ok])=>`<li>${ok?"Présent":"À vérifier"} : ${e(label)}</li>`).join("")}</ul><a href="docs/controle-editorial.html">Protocole éditorial</a></details>
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
  installReadingTools(course,lesson);
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

function validReadingTools(value) {
  return value===undefined || Boolean(value && typeof value==='object' && !Array.isArray(value) &&
    ['light','sepia','dark'].includes(value.theme) && [100,115,130,150].includes(value.size) &&
    value.marks && typeof value.marks==='object' && !Array.isArray(value.marks) &&
    Object.values(value.marks).every(mark=>mark && typeof mark==='object' && typeof mark.highlight==='boolean' && typeof mark.note==='string' && mark.note.length<=10000));
}
function installReadingTools(course,lesson) {
  const article=v.querySelector('#lesson-reading');
  const prefs=validReadingTools(S.readingTools)&&S.readingTools?S.readingTools:{theme:'light',size:100,marks:{}};
  const panel=document.createElement('details');panel.className='card reading-tools';
  panel.innerHTML=`<summary>Outils de lecture</summary><div class="reading-controls"><label>Thème <select data-theme><option value="light">Clair</option><option value="sepia">Sépia</option><option value="dark">Sombre</option></select></label><label>Taille <select data-size>${[100,115,130,150].map(n=>`<option value="${n}">${n} %</option>`).join('')}</select></label><button type="button" data-focus aria-pressed="false">Lecture immersive</button><button type="button" data-speak>Écouter</button><button type="button" data-stop>Arrêter</button></div><p role="status"></p>`;
  article.before(panel);
  panel.append(glossaryPanel());
  panel.append(bookmarkPanel());
  const theme=panel.querySelector('[data-theme]'),size=panel.querySelector('[data-size]'),status=panel.querySelector('[role=status]');
  theme.value=prefs.theme;size.value=String(prefs.size);
  function persist(){try{S.readingTools=prefs;save();status.textContent='Préférences enregistrées.';}catch{status.textContent='Enregistrement impossible.';}}
  function apply(){article.dataset.readingTheme=prefs.theme;article.style.fontSize=prefs.size+'%';}
  theme.onchange=()=>{prefs.theme=theme.value;apply();persist();};size.onchange=()=>{prefs.size=Number(size.value);apply();persist();};apply();
  const focus=panel.querySelector('[data-focus]');
  focus.onclick=()=>{const active=article.classList.toggle('reading-immersive');focus.setAttribute('aria-pressed',String(active));focus.textContent=active?'Quitter la lecture immersive':'Lecture immersive';v.querySelectorAll(':scope > article:not(#lesson-reading), :scope > nav').forEach(el=>{el.hidden=active;});};
  const speech=window.speechSynthesis;
  const speak=panel.querySelector('[data-speak]'),stop=panel.querySelector('[data-stop]');
  const localVoice=()=>speech?.getVoices().find(voice=>voice.localService&&voice.lang.toLowerCase().startsWith('fr'));
  speak.disabled=!speech;stop.disabled=!speech;
  speak.onclick=()=>{const voice=localVoice();if(!voice){status.textContent='Aucune voix française locale disponible sur cet appareil.';return;}speech.cancel();const text=[...article.querySelectorAll('p,h3')].map(el=>el.textContent).join('. ');const utterance=new SpeechSynthesisUtterance(text);utterance.voice=voice;utterance.lang='fr-FR';speech.speak(utterance);};
  stop.onclick=()=>speech?.cancel();
  article.querySelectorAll('h3[id^="lesson-section-"]').forEach((heading,index)=>{
    const paragraph=heading.nextElementSibling;if(!paragraph||paragraph.tagName!=='P')return;
    const key=course.key+':'+lesson.id+':'+index;
    const mark=prefs.marks[key]||{highlight:false,note:''};
    const controls=document.createElement('details');controls.className='passage-tools';
    controls.innerHTML='<summary>Annoter ce passage</summary><label><input type="checkbox"> Surligner le passage</label><label>Annotation personnelle<textarea maxlength="10000" rows="3"></textarea></label><button type="button">Enregistrer</button>';
    const check=controls.querySelector('input'),note=controls.querySelector('textarea');check.checked=mark.highlight;note.value=mark.note;paragraph.classList.toggle('passage-highlight',mark.highlight);
    controls.querySelector('button').onclick=()=>{prefs.marks[key]={highlight:check.checked,note:note.value};paragraph.classList.toggle('passage-highlight',check.checked);persist();};
    const bookmark=document.createElement('button');bookmark.type='button';
    const entry={courseKey:course.key,lessonId:lesson.id,section:index,title:heading.textContent};
    function refresh(){const active=(S.bookmarks||[]).some(b=>sameBookmark(b,entry));bookmark.textContent=active?'Retirer le signet':'Ajouter un signet';bookmark.setAttribute('aria-pressed',String(active));}
    bookmark.onclick=()=>{const list=validBookmarks(S.bookmarks)?(S.bookmarks||[]):[];S.bookmarks=list.some(b=>sameBookmark(b,entry))?list.filter(b=>!sameBookmark(b,entry)):[...list,entry];persist();refresh();};
    controls.append(bookmark);refresh();
    paragraph.after(controls);
  });
}

function sameBookmark(a,b){return a.courseKey===b.courseKey&&a.lessonId===b.lessonId&&a.section===b.section;}
function validBookmarks(value){return value===undefined||Array.isArray(value)&&value.length<=10000&&value.every(b=>b&&typeof b.courseKey==='string'&&typeof b.lessonId==='string'&&Number.isInteger(b.section)&&b.section>=0&&typeof b.title==='string'&&b.title.length<=1000);}
function bookmarkPanel(){
 const panel=document.createElement('details');panel.className='card';panel.innerHTML='<summary>Mes signets</summary><div></div>';
 const body=panel.querySelector('div');
 panel.ontoggle=()=>{
 if(!panel.open)return;
 const list=validBookmarks(S.bookmarks)?(S.bookmarks||[]):[];
 body.replaceChildren();
 if(!list.length){body.textContent='Aucun signet enregistré.';return;}
 list.forEach(b=>{
 const target=locateLesson(b.courseKey,b.lessonId);
 const row=document.createElement('div');row.className='bookmark-row';
 const open=document.createElement('button');open.type='button';open.className='title-action';open.textContent=(target?.lesson.title||b.lessonId)+' · '+b.title;
 open.disabled=!target;
 open.onclick=()=>{showLesson(target.course,target.index);const section=target.lesson.sections[b.section];jumpToStudySection(section&&section[0]===b.title?'lesson-section-'+b.section:'lesson-reading');};
 const remove=document.createElement('button');remove.type='button';remove.textContent='Retirer';remove.onclick=()=>{S.bookmarks=(S.bookmarks||[]).filter(item=>!sameBookmark(item,b));save();panel.ontoggle();};
 row.append(open,remove);body.append(row);
 });
 };
 return panel;
}
const universityGlossary=[
 ['Hypothèse','Proposition explicative provisoire dont on peut confronter les conséquences aux observations.'],
 ['Corrélation','Association entre variables, qui ne suffit pas à établir un lien causal.'],
 ['Biais de confirmation','Tendance à privilégier les éléments favorables à une conviction et à négliger ceux qui la contredisent.'],
 ['Variable indépendante','Facteur manipulé dans une expérience pour étudier ses effets.'],
 ['Variable dépendante','Résultat mesuré pour apprécier les effets du facteur étudié.'],
 ['Échantillon','Sous-ensemble de la population étudiée.'],
 ['Réfutabilité','Possibilité de mettre une proposition en défaut par des observations incompatibles avec elle.'],
 ['Théorie','Ensemble structuré de propositions expliquant des phénomènes observés.'],
 ['Validité','Degré auquel une mesure saisit effectivement ce qu’elle vise à mesurer.'],
 ['Réplication','Nouvelle réalisation d’une étude afin de vérifier si ses résultats se retrouvent.']
];
function glossaryPanel(){
 const panel=document.createElement('details');panel.className='card';panel.innerHTML='<summary>Glossaire universitaire</summary><label>Rechercher une notion <input type="search"></label><p role="status"></p><dl></dl><p><a href="https://openstax.org/books/psychology-2e/pages/2-key-terms" target="_blank" rel="noopener">Source : OpenStax, Psychology 2e, chapitre 2</a> · Définitions reformulées en français.</p>';
 const input=panel.querySelector('input'),list=panel.querySelector('dl');
 function draw(){const q=searchableText(input.value.trim());const terms=universityGlossary.filter(([term,def])=>searchableText(term+' '+def).includes(q));list.replaceChildren();terms.forEach(([term,def])=>{const dt=document.createElement('dt'),dd=document.createElement('dd');dt.textContent=term;dd.textContent=def;list.append(dt,dd);});panel.querySelector('[role=status]').textContent=terms.length+' notions';}
 input.oninput=draw;draw();return panel;
}
