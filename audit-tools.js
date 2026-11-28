const studyDays = ['Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi','Dimanche'];
const auditDate = value => typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value);
const studySteps = ['Rappel des connaissances','Lecture de la leçon','Exercice d’application','Synthèse personnelle'];
const tutorModes = {
  Professeur:'Réexplique la notion avec un exemple puis vérifie ma compréhension.',
  Socrate:'Pose une question à la fois et attends ma réponse avant de proposer une piste.',
  Examinateur:'Conduis un oral progressif puis donne un retour argumenté.',
  'Directeur de mémoire':'Aide-moi à formuler une question, une méthode et un plan de recherche.',
  Correcteur:'Demande mon texte et le barème, puis évalue chaque critère séparément.',
  Chercheur:'Propose des pistes bibliographiques et indique les références qui restent à vérifier.',
  Contradicteur:'Cherche un contre-exemple et formule la meilleure objection possible.'
};

function validAuditState(data) {
  const {studyPlan:p, studySession:s, quizEvidence:q,studyJournal:j,exerciseEvidence:w} = data || {};
  const planOK = p===undefined || p && (p.dailyMinutes===undefined
    ? Array.isArray(p.days)&&p.days.length<=7&&p.days.every(d=>Number.isInteger(d)&&d>=0&&d<7)&&
      new Set(p.days).size===p.days.length&&validDailyMinutes(p.minutes)
    : Array.isArray(p.dailyMinutes)&&p.dailyMinutes.length===7&&
      p.dailyMinutes.every(minutes=>minutes===0||validDailyMinutes(minutes))) &&
    typeof p.priority==='string'&&p.priority.length<=120 &&
    (p.from===''&&p.to===''||auditDate(p.from)&&auditDate(p.to)&&p.from<=p.to);
  const sessionOK = s===undefined || s && typeof s.key==='string'&&s.key.length<=240 &&
    Number.isInteger(s.step)&&s.step>=0&&s.step<4 && Number.isFinite(s.elapsed)&&s.elapsed>=0&&s.elapsed<=86400000 &&
    (s.minutes===undefined||validDailyMinutes(s.minutes)) &&
    (s.started===null||Number.isFinite(s.started)&&s.started>0);
  const evidenceOK = q===undefined || q && typeof q==='object'&&!Array.isArray(q) &&
    Object.entries(q).length<=5000 && Object.entries(q).every(([key,item])=>key.length<=240 && item &&
      Array.isArray(item.success)&&item.success.length<=2&&item.success.every(auditDate) &&
      new Set(item.success).size===item.success.length &&
      (item.error===null||auditDate(item.error?.date)&&typeof item.error.answer==='string'&&item.error.answer.length<=5000));
  const journalOK = j===undefined || Array.isArray(j)&&j.length<=1000&&j.every(row=>row&&
    auditDate(row.date)&&typeof row.key==='string'&&row.key.length<=240&&
    Number.isInteger(row.minutes)&&row.minutes>=0&&row.minutes<=1440);
  const writtenOK = w===undefined || w && typeof w==='object'&&!Array.isArray(w) &&
    Object.entries(w).length<=1000&&Object.entries(w).every(([key,row])=>key.length<=240&&row&&
      auditDate(row.date)&&Number.isInteger(row.revision)&&row.revision>=1&&
      typeof row.answer==='string'&&row.answer.trim()!==''&&row.answer.length<=12000&&
      (row.criteria===null||Array.isArray(row.criteria)&&row.criteria.length===exerciseCriteria.length&&
        row.criteria.every(value=>Number.isInteger(value)&&value>=0&&value<=2)));
  return Boolean(planOK&&sessionOK&&evidenceOK&&journalOK&&writtenOK);
}

function auditSave(fields) {
  const next = {...S,...fields};
  try {
    localStorage.au = JSON.stringify(next);
    S = next;
    return true;
  } catch {
    alert('Enregistrement impossible. Exporte tes données puis vérifie l’espace disponible.');
    return false;
  }
}

function studyItems() {
  return allStudyCourses().flatMap(course=>course.lessons.map((lesson,index)=>({
    course,lesson,index,key:lessonProgressKey(course.key,lesson.id)
  })));
}

function validDailyMinutes(minutes) {
  return Number.isInteger(minutes)&&minutes>=5&&minutes<=240;
}

function plannedMinutes(plan,weekday) {
  return plan.dailyMinutes?.[weekday]??(plan.days.includes(weekday)?plan.minutes??45:0);
}

function adaptiveSchedule(plan, items, today = new Date()) {
  const dates = Array.from({length:14},(_,offset)=>{
    const date = new Date(today);
    date.setDate(date.getDate()+offset);
    return {day:localStudyDate(date),weekday:(date.getDay()+6)%7};
  }).filter(({day,weekday})=>plannedMinutes(plan,weekday)>0&&!(plan.from&&day>=plan.from&&day<=plan.to));
  const used = new Set();
  const ordered = [...items].sort((a,b)=>Number(b.course.key===plan.priority)-Number(a.course.key===plan.priority));
  return dates.map(({day,weekday})=>{
    const review = ordered.find(item=>{
      const entry=S.reviews?.[item.key];
      return !used.has(item.key)&&entry&&reviewDate(entry)<=day;
    });
    // The preceding lesson in each course supplies the progression dependency.
    const next = ordered.find(item=>!S.history?.[item.key]&&!used.has(item.key)&&
      (item.index===0||S.history?.[lessonProgressKey(item.course.key,item.course.lessons[item.index-1].id)]));
    const item = review||next;
    if(item) used.add(item.key);
    return {day,minutes:plannedMinutes(plan,weekday),item,review:Boolean(review)};
  });
}

function planningPanel(message='') {
  const plan=S.studyPlan||{days:[0,2,4],minutes:S.hours*20,priority:'',from:'',to:''};
  const schedule=adaptiveSchedule(plan,studyItems());
  const durations=studyDays.map((_,i)=>plannedMinutes(plan,i));
  const total=durations.reduce((sum,minutes)=>sum+minutes,0);
  const panel=document.createElement('section');
  panel.className='card personal-planning';
  panel.innerHTML=`<header class="planning-heading"><h3>Planning personnalisé</h3>
    <p>${total} min par semaine · ${durations.filter(Boolean).length} jours d’étude</p></header>
    <form>
      <fieldset><legend>Durée par jour</legend><p id="planning-hint">Laisse 0 pour un jour sans séance. Les séances durent de 5 à 240 min.</p>
      <div class="planning-days">${studyDays.map((day,i)=>`<label><span>${day}</span><input type="number" name="day-${i}" min="0" max="240" step="1" required aria-label="${day}, minutes" aria-describedby="planning-hint" value="${durations[i]}"><span aria-hidden="true">min</span></label>`).join('')}</div></fieldset>
      <label class="planning-priority">Matière prioritaire <select name="priority"><option value="">Toutes les matières</option>${allStudyCourses().map(c=>`<option value="${e(c.key)}" ${c.key===plan.priority?'selected':''}>${e(c.title)} · année ${c.year||1}</option>`).join('')}</select></label>
      <details class="planning-break" ${plan.from?'open':''}><summary>Vacances</summary><div>
        <label>Du <input type="date" name="from" value="${e(plan.from)}"></label>
        <label>Au <input type="date" name="to" value="${e(plan.to)}"></label></div></details>
      <button class="active">Enregistrer le planning</button><p role="status">${e(message)}</p>
    </form>
    <h4>Les 14 prochains jours</h4>${schedule.length?`<ol class="planning-agenda">${schedule.map(({day,minutes,item,review},i)=>`<li><div><time datetime="${day}">${new Date(day+'T12:00:00').toLocaleDateString('fr-FR',{weekday:'short',day:'numeric',month:'short'})}</time><span>${minutes} min</span></div>${item?`<button class="title-action" data-slot="${i}">${review?'Réviser':'Étudier'} · ${e(item.lesson.title)}</button>`:'Relecture ou exercice libre'}</li>`).join('')}</ol>`:'<p>Aucun créneau disponible sur cette période.</p>'}`;
  const form=panel.querySelector('form');
  form.onsubmit=event=>{
    event.preventDefault();
    const fields=new FormData(form);
    const dailyMinutes=studyDays.map((_,i)=>Number(fields.get('day-'+i)));
    const next={dailyMinutes,priority:fields.get('priority'),from:fields.get('from'),to:fields.get('to')};
    const status=panel.querySelector('[role=status]');
    if(dailyMinutes.some(minutes=>minutes!==0&&!validDailyMinutes(minutes))){
      status.textContent='Indique 0 pour un jour sans séance, ou de 5 à 240 minutes.';
      return;
    }
    if(!validAuditState({studyPlan:next})){
      status.textContent='Indique une période de vacances complète, avec une fin égale ou postérieure au début.';
      return;
    }
    if(auditSave({studyPlan:next})){
      const updated=planningPanel('Planning enregistré.');
      panel.replaceWith(updated);
      updated.querySelector('button').focus({preventScroll:true});
    }
  };
  panel.querySelectorAll('[data-slot]').forEach(button=>button.onclick=()=>{
    const slot=schedule[Number(button.dataset.slot)];
    showStudySession(slot.item.key,slot.minutes);
  });
  return panel;
}

function sessionElapsed(session) {
  return Math.min(86400000, session.elapsed+(session.started===null?0:Math.max(0,Date.now()-session.started)));
}

function studentSessionCard() {
  const items=studyItems();
  const item=items.find(i=>i.key===S.studySession?.key);
  const next=adaptiveSchedule(S.studyPlan||{days:[0,1,2,3,4,5,6],priority:''},items).find(slot=>slot.item);
  const key=item?.key||next?.item.key;
  const journal=(S.studyJournal||[]).slice(-7).reverse();
  const titles=new Map(items.map(i=>[i.key,i.lesson.title]));
  return `<section class="card"><h3>Séance guidée</h3>${key?`<button id="desk-session" data-session-key="${e(key)}" data-session-minutes="${S.studySession?.minutes??next?.minutes??45}" class="title-action">${item?'Reprendre la séance':'Préparer une séance'} · ${e((item||next.item).lesson.title)}</button>`:'<p>Choisis une leçon dans le campus pour étudier à ton rythme.</p>'}<p><button onclick="showSpace('Planning')">Planning personnalisé</button> <button onclick="showSpace('Compétences et erreurs')">Compétences et erreurs</button></p><details><summary>Journal des séances guidées</summary>${journal.length?`<ul>${journal.map(row=>`<li>${row.date} · ${e(titles.get(row.key)||'Leçon archivée')} · ${row.minutes} min</li>`).join('')}</ul>`:'<p>Aucune séance enregistrée.</p>'}</details></section>`;
}

function showStudySession(key,planned) {
  const session = S.studySession;
  if(session && key && session.key!==key) {
    alert('Termine la séance en cours avant d’en démarrer une autre.');
    key=session.key;
  }
  key ||= session?.key;
  const item=studyItems().find(i=>i.key===key);
  const weekday=(new Date().getDay()+6)%7;
  const minutes=session?.minutes||(session?S.studyPlan?.minutes:planned)||(S.studyPlan?plannedMinutes(S.studyPlan,weekday):0)||45;
  rememberCampusRoute('session',{key,minutes});
  if(!item){v.innerHTML='<h2>Séance terminée</h2><button onclick="go(0)">Accueil</button>';return;}
  const state=session?{...session,minutes}:{key,step:0,elapsed:0,started:null,minutes};
  const durations=[5,20,15,5].map(weight=>Math.floor(minutes*weight/45));
  for(let i=0;durations.reduce((a,b)=>a+b,0)<minutes;i++) durations[i%4]++;
  const section=['history-quiz','lesson-reading','lesson-exercise','history-notes'][state.step];
  v.innerHTML=`<h2>Séance guidée</h2><article class="card"><h3>${e(item.lesson.title)}</h3>
    <ol>${studySteps.map((label,i)=>`<li ${i===state.step?'aria-current="step"':''}>${label} · ${durations[i]} min</li>`).join('')}</ol>
    <p>Temps écoulé <output id="session-time"></output></p>
    <button id="session-toggle">${state.started!==null?'Pause':session?'Reprendre':'Démarrer'}</button>
    <button id="session-open">Ouvrir l’étape</button>
    <button id="session-prev" ${state.step===0?'disabled':''}>Étape précédente</button>
    <button id="session-next" ${state.step===3?'disabled':''}>Étape suivante</button>
    <form id="session-finish"><p><label>Temps à inscrire au journal (minutes) <input name="minutes" type="number" min="0" max="1440" step="1" placeholder="Temps chronométré"></label></p><button ${session?'':'disabled'}>Terminer et enregistrer</button></form></article>`;
  const timer=v.querySelector('#session-time');
  const tick=()=>{
    if(!timer.isConnected)return;
    const seconds=Math.floor(sessionElapsed(state)/1000);
    timer.value=Math.floor(seconds/60)+':'+String(seconds%60).padStart(2,'0');
    setTimeout(tick,1000);
  };
  tick();
  v.querySelector('#session-toggle').onclick=()=>{
    if(auditSave({studySession:{...state,elapsed:sessionElapsed(state),started:state.started!==null?null:Date.now()}}))showStudySession(key);
  };
  for(const [id,delta] of [['session-prev',-1],['session-next',1]]){
    v.querySelector('#'+id).onclick=()=>{
      if(auditSave({studySession:{...state,step:state.step+delta}}))showStudySession(key);
    };
  }
  v.querySelector('#session-open').onclick=()=>{
    if(!S.studySession&&!auditSave({studySession:{...state,started:Date.now()}}))return;
    showLesson(item.course,item.index);
    jumpToStudySection(section);
  };
  v.querySelector('#session-finish').onsubmit=event=>{
    event.preventDefault();
    if(!S.studySession)return;
    const correction=event.currentTarget.elements.minutes.value;
    const elapsed=correction===''?Math.round(sessionElapsed(S.studySession)/60000):Number(correction);
    const date=localStudyDate();
    if(!Number.isInteger(elapsed)||elapsed<0||elapsed>1440)return;
    const studyJournal=[...(S.studyJournal||[]),{date,key,minutes:elapsed}].slice(-1000);
    const studyMinutes={...S.studyMinutes,[date]:Math.min(1440,(S.studyMinutes?.[date]||0)+elapsed)};
    if(auditSave({studySession:undefined,studyMinutes,studyJournal})) {
      go(0);

    }
  };
}

function captureQuizEvidence(course,lesson,selected,correct) {
  const key=lessonProgressKey(course.key,lesson.id);
  const evidence=S.quizEvidence?.[key]||{success:[],error:null};
  const date=localStudyDate();
  const success=correct?[...new Set([...evidence.success,date])].slice(-2):[];
  const error=correct?evidence.error:{date,answer:String(lesson.quiz[1][selected]??'').slice(0,5000)};
  auditSave({quizEvidence:{...S.quizEvidence,[key]:{success,error}}});
}

const exerciseCriteria = [
  'La réponse traite toutes les demandes de la consigne.',
  'Les notions du cours sont utilisées avec exactitude.',
  'La démarche est justifiée et les résultats sont expliqués.'
];

function exercisePracticeLabel(record,lesson) {
  if(!record) return 'Exercice à faire';
  if(record.revision!==(lesson.revision??1)) return 'À relire après la mise à jour du cours';
  if(!record.criteria) return 'Réponse enregistrée · à relire';
  return record.criteria.every(value=>value===2)
    ? 'Exercice réussi en autoévaluation'
    : 'Exercice à consolider selon ton autoévaluation';
}

function writtenExercise(course,lesson) {
  const form=document.createElement('form');
  form.className='written-exercise';
  const key=lessonProgressKey(course.key,lesson.id);
  const saved=S.exerciseEvidence?.[key];
  const revision=lesson.revision??1;
  form.innerHTML=`<label>Ma réponse à l’exercice <textarea name="answer" maxlength="12000" required rows="6"></textarea></label>
    <button id="save-exercise">Enregistrer ma réponse</button>
    <details><summary>Lire le corrigé et relire ma réponse</summary><p>${lesson.correction}</p>
    <fieldset><legend>Autoévaluation</legend>${exerciseCriteria.map((criterion,index)=>`<p><label>${criterion}
      <select name="criterion-${index}"><option value="">Choisir</option><option value="0">À revoir</option><option value="1">Partiellement atteint</option><option value="2">Atteint</option></select></label></p>`).join('')}
    <button type="button" id="save-exercise-review">Enregistrer mon autoévaluation</button></fieldset></details>
    <p role="status"></p>`;
  const status=form.querySelector('[role=status]');
  const answer=form.elements.answer;
  const picks=exerciseCriteria.map((_,index)=>form.elements['criterion-'+index]);
  answer.value=saved?.answer||'';
  const redraw=record=>{
    status.textContent=exercisePracticeLabel(record,lesson);
    picks.forEach((pick,index)=>pick.value=record?.revision===revision&&record.criteria?String(record.criteria[index]):'');
  };
  redraw(saved);
  const saveButton=form.querySelector('#save-exercise');
  let editing=!saved?.answer;
  function mode(){answer.readOnly=!editing;saveButton.textContent=editing?'Enregistrer ma réponse':'Modifier';}
  mode();
  function persist(review){
    if(!form.reportValidity())return;
    const text=answer.value.trim();
    if(!text){status.textContent='Écris une réponse avant de l’enregistrer.';return;}
    const previous=S.exerciseEvidence?.[key];
    if(review&&(previous?.answer!==text||previous.revision!==revision)){
      status.textContent='Enregistre d’abord cette version de ta réponse.';
      return;
    }
    if(review&&picks.some(pick=>pick.value==='')){
      status.textContent='Renseigne chaque critère en comparant ta réponse au corrigé.';
      return;
    }
    const criteria=review?picks.map(pick=>Number(pick.value)):
      previous?.answer===text&&previous.revision===revision?previous.criteria:null;
    const record={answer:text,criteria,revision,date:localStudyDate()};
    const exerciseEvidence={...S.exerciseEvidence,[key]:record};
    if(!validAuditState({exerciseEvidence})){
      status.textContent='La réponse dépasse la capacité de stockage prévue pour les exercices.';
      return;
    }
    if(auditSave({exerciseEvidence})){redraw(record);editing=false;mode();}
  }
  form.onsubmit=event=>{event.preventDefault();if(!editing){editing=true;mode();answer.focus();return;}persist(false);};
  form.querySelector('#save-exercise-review').onclick=()=>persist(true);
  return form;
}

function showCompetencies() {
  const items=studyItems().filter(i=>i.lesson.quiz||i.lesson.activity&&i.lesson.correction);
  const errors=items.filter(i=>S.quizEvidence?.[i.key]?.error);
  v.innerHTML=`<h2>Compétences et carnet des erreurs</h2>
    <p>Une réponse correcte ouvre la consolidation. Deux réussites à des dates différentes documentent le rappel de la question. Pour les exercices écrits, le suivi indique le résultat de ton autoévaluation après comparaison au corrigé.</p>
    <section class="card"><h3>Mes erreurs · ${errors.length}</h3><button id="personal-test" ${errors.length?'':'disabled'}>Réviser mes difficultés</button><div id="error-list"></div></section>
    <details class="card"><summary>Cartographie par leçon</summary><ul>${items.map((i,index)=>{
      const n=S.quizEvidence?.[i.key]?.success.length||0;
      const label=i.lesson.quiz?['Quiz à faire','Quiz en consolidation','Quiz réussi à deux dates'][n]:'';
      const practice=i.lesson.activity&&i.lesson.correction?exercisePracticeLabel(S.exerciseEvidence?.[i.key],i.lesson):'';
      return `<li><button class="title-action" data-competency="${index}">${e(i.lesson.goal||i.lesson.title)}</button><br>${[label,practice].filter(Boolean).join(' · ')}</li>`;
    }).join('')}</ul></details>`;
  v.querySelectorAll('[data-competency]').forEach(button=>button.onclick=()=>{
    const item=items[Number(button.dataset.competency)];
    showLesson(item.course,item.index);
    if(item.lesson.activity&&item.lesson.correction)jumpToStudySection('lesson-exercise');
  });
  const list=v.querySelector('#error-list');
  for(const item of errors){
    const {lesson}=item;
    const error=S.quizEvidence[item.key].error;
    const card=document.createElement('details');
    card.innerHTML=`<summary>${e(lesson.title)} · ${error.date}</summary><p>${e(lesson.quiz[0])}</p><p>Réponse donnée · ${e(error.answer)}</p><p>Correction · ${e(lesson.quiz[1][lesson.quiz[2]])} · ${e(lesson.quiz[3])}</p><button>Relire le passage</button>`;
    card.querySelector('button').onclick=()=>{showLesson(item.course,item.index);jumpToStudySection(quizReadingTarget(lesson));};
    list.append(card);
  }
  v.querySelector('#personal-test').onclick=()=>showPersonalExam(errors.sort((a,b)=>S.quizEvidence[a.key].success.length-S.quizEvidence[b.key].success.length).slice(0,10));
}

function showPersonalExam(items) {
  let index=0,score=0;
  function draw(){
    v.innerHTML='<h2>Examen de révision</h2>';
    const item=items[index];
    if(!item){
      v.insertAdjacentHTML('beforeend',`<p>Résultat · ${score} / ${items.length}</p><button onclick="showCompetencies()">Retour au carnet</button>`);
      return;
    }
    const [question,options,answer,rationale]=item.lesson.quiz;
    v.insertAdjacentHTML('beforeend',`<form class="card"><fieldset><legend>${e(question)}</legend>${options.map((label,i)=>`<p><label><input type="radio" name="answer" value="${i}" required> ${e(label)}</label></p>`).join('')}</fieldset><button>Valider</button><p role="status"></p><button type="button" hidden>Continuer</button></form>`);
    const form=v.querySelector('form');
    form.onsubmit=event=>{
      event.preventDefault();
      const selected=Number(new FormData(form).get('answer'));
      captureQuizEvidence(item.course,item.lesson,selected,selected===answer);
      recordReview(item.course,item.lesson,selected===answer);
      score+=Number(selected===answer);
      form.querySelector('fieldset').disabled=true;
      form.querySelector('button').disabled=true;
      form.querySelector('[role=status]').textContent=options[answer]+' · '+rationale;
      const next=form.querySelector('[hidden]');
      next.hidden=false;
      next.onclick=()=>{index++;draw();};
    };
  }
  draw();
}

function tutorPanel(course,lesson) {
  const panel=document.createElement('details');
  panel.className='card';
  panel.innerHTML=`<summary>Tuteur universitaire</summary><label>Mode <select>${Object.keys(tutorModes).map(mode=>`<option>${mode}</option>`).join('')}</select></label>
    <p>Copie le prompt pour l’utiliser dans ChatGPT ou Claude. Il contient le contexte du cours.</p>
    <label>Prompt <textarea readonly rows="7"></textarea></label><button>Copier le prompt</button><p role="status"></p>`;
  const select=panel.querySelector('select'), prompt=panel.querySelector('textarea');
  const draw=()=>{
    const sources=(lesson.sources||[]).slice(0,8).map(([author,title,year,url])=>`- ${author}, ${title} (${year}) · ${url}`);
    prompt.value=`Rôle : ${select.value}. ${tutorModes[select.value]}\nCours : ${course.title} · ${lesson.title}\nObjectif : ${lesson.goal||''}\nNotions : ${(lesson.sections||[]).map(s=>s[0]).join(', ')}\nRéférences du cours :\n${sources.join('\n')}\nRéponds en français. Signale les incertitudes et distingue les références vérifiées des pistes de recherche.`;
  };
  draw();
  select.onchange=draw;
  panel.querySelector('button').onclick=async()=>{
    const status=panel.querySelector('[role=status]');
    try{await navigator.clipboard.writeText(prompt.value);status.textContent='Prompt copié.';}
    catch{prompt.select();status.textContent='Sélection prête à copier.';}
  };
  return panel;
}

const atlasPaths = [
  ['Qu’est-ce que l’humain ?', 'Évolution, migrations, pensée critique, récit et cognition', [['evolution-humaine','migrations-humaines'],['uruk'],['odyssee'],['methodes'],['intro-physique']], ['philosophie']],
  ['Comment établir une preuve ?', 'Archéologie, expérience, mesure et raisonnement', [['uruk'],['methodes'],['mesures'],['premisses']], []],
  ['Qui raconte le passé ?', 'Ulysse, Athènes, Antiquité grecque, Auguste et mémoire', [['odyssee'],['athenes','auguste'],['achebe']], []],
  ['Comment mesurer le changement ?', 'Mouvement, perception et comparaison des observations', [['mesures','vitesse-acceleration','methodes']], []],
  ['Comment les sociétés s’organisent-elles ?', 'Premières villes, pouvoir impérial et institutions', [['uruk','comparaison','auguste','athenes']], []]
];

function showTransversalAtlas() {
  const panel=document.createElement('section');
  panel.className='card';
  panel.innerHTML='<h3>Parcours transversaux</h3><label>Explorer <input type="search" placeholder="Œuvre, personnage, époque, notion…"></label><div data-atlas-results></div>';
  const all=studyItems();
  const input=panel.querySelector('input');
  const filter=document.createElement('label');
  filter.innerHTML=`Année <select><option value="">Toutes les années</option>${[1,2,3,4].map(year=>`<option>${year}</option>`).join('')}</select>`;
  input.parentElement.after(' ',filter);
  const year=filter.querySelector('select');
  panel.insertAdjacentHTML('beforeend','<details><summary>Index des leçons</summary><p data-atlas-count role="status"></p><ul data-atlas-index></ul><button data-atlas-more>Afficher plus de leçons</button></details>');
  const index=panel.querySelector('[data-atlas-index]');
  const more=panel.querySelector('[data-atlas-more]');
  let limit=20;
  const searchCorpus=all.map(i=>({item:i,text:searchableText([i.lesson.title,i.lesson.goal,i.course.title,...(i.lesson.sections||[]).map(section=>section[0])].join(' '))}));
  const results=panel.querySelector('[data-atlas-results]');
  function draw(){
    results.replaceChildren();
    const query=searchableText(input.value.trim()).split(/\s+/);
    atlasPaths.forEach(([title,description,groups,courses])=>{
      const items=all.filter(i=>groups.flat().includes(i.lesson.id)||courses.includes(i.course.key)&&i.index===0);
      const text=searchableText([title,description,...items.map(i=>i.lesson.title+' '+i.course.title)].join(' '));
      if(!query.every(word=>text.includes(word)))return;
      const section=document.createElement('section');
      section.innerHTML=`<h4>${e(title)}</h4><p>${e(description)}</p><ul>${items.map((i,n)=>`<li><button class="title-action" data-item="${n}">${e(i.lesson.title)}</button> · ${e(i.course.title)}</li>`).join('')}</ul>`;
      section.querySelectorAll('button').forEach(b=>b.onclick=()=>{const i=items[Number(b.dataset.item)];showLesson(i.course,i.index);});
      results.append(section);
    });
    if(!results.children.length) results.textContent='Aucun parcours trouvé.';
    const matches=searchCorpus.filter(({item,text})=>(!year.value||Number(year.value)===(item.course.year||1))&&query.every(word=>text.includes(word)));
    panel.querySelector('[data-atlas-count]').textContent=matches.length+' leçons trouvées';
    index.innerHTML=matches.slice(0,limit).map(({item},i)=>`<li><button class="title-action" data-result="${i}">${e(item.lesson.title)}</button> · ${e(item.course.title)} · Année ${item.course.year||1}</li>`).join('');
    index.querySelectorAll('button').forEach(button=>button.onclick=()=>{
      const {item}=matches[Number(button.dataset.result)];
      showLesson(item.course,item.index);
    });
    more.hidden=matches.length<=limit;
  }
  input.oninput=year.onchange=()=>{
    limit=20;
    if(input.value.trim()||year.value)index.closest('details').open=true;
    draw();
  };
  more.onclick=()=>{limit+=20;draw();};
  draw();
  v.prepend(panel);
}

function showCampusLife() {
  v.innerHTML=`<button onclick="go(11)">Retour aux espaces</button><h2>Vie du campus</h2><p>Sélection éditoriale de la V0.30</p>
    <article class="card"><h3>Conférence de la semaine</h3><p>Choisis une séance de Yale sur la Grèce antique et formule une question à partir d’un document cité par l’enseignant.</p><a target="_blank" rel="noopener" href="https://online.yale.edu/courses/introduction-ancient-greek-history">Yale · Introduction to Ancient Greek History</a></article>
    <article class="card"><h3>Grand livre du mois</h3><p>Lis le récit d’Ulysse et relève les passages qui peuvent infléchir le jugement de son auditoire.</p><button onclick="spaceLesson('litterature','odyssee')">L’Odyssée · dossier et éditions</button></article>
    <article class="card"><h3>Séminaire</h3><p>Quels critères permettent de comparer l’urbanisation de deux sociétés ? Prépare une thèse et une objection à partir du dossier.</p><button onclick="spaceLesson('histoire','comparaison')">Comparer les civilisations</button></article>
    <article class="card"><h3>Découverte scientifique</h3><p>Compare les indices et leurs limites dans le dossier sur les migrations humaines. Repère la publication qui fonde chaque datation.</p><button id="campus-discovery">Étudier les migrations humaines</button></article>`;
  v.querySelector('#campus-discovery').onclick=()=>{
    const item=studyItems().find(i=>i.lesson.id==='migrations-humaines');
    if(item)showLesson(item.course,item.index);
  };
}

const academicCriteria = [
  'Objectifs pédagogiques définis','Sources universitaires identifiées','Sources effectivement consultées',
  'Affirmations scientifiques vérifiées','Illustrations et licences contrôlées','Perspectives internationales examinées',
  'Exercices et corrections vérifiés','Évaluation des compétences','Relecture critique indépendante'
];
const academicStatuses = ['En rédaction','Relu','Validé éditorialement','Expertisé indépendamment'];
// Add documentary evidence here after a review has actually been performed.
const academicReviews = {};
function academicReviewSheet(key) {
  const entry=academicReviews[key];
  const sheet=document.createElement('section');
  sheet.innerHTML=`<h4>Fiche de contrôle scientifique</h4><p>Statut · ${academicStatuses[entry?.stage??0]}</p>
    <ul>${academicCriteria.map((label,i)=>`<li>${label} · ${entry?.checks?.[i]?e(entry.checks[i]):'À documenter'}</li>`).join('')}</ul>`;
  return sheet;
}

function addDisciplineWorkshops(name) {
  const cases=campusWorkshopCases.filter(item=>item.kind===name);
  if(!cases.length)return;
  const panel=document.createElement('section');
  panel.className='card';
  panel.innerHTML='<h3>Ateliers disciplinaires</h3>';
  cases.forEach((item,index)=>panel.append(workshopActivity(item,index)));
  v.append(panel);
}

const offlineCourseCache='academia-packs-v1';

function offlineCourseURL(course) {
  return new URL('cours-hors-ligne/'+encodeURIComponent(course.key)+'.html',location.href);
}

function offlineCourseDocument(course) {
  const text=value=>{
    const template=document.createElement('template');
    template.innerHTML=String(value??'');
    return e(template.content.textContent);
  };
  const lessons=course.lessons.map((lesson,index)=>{
    const [caption,columns,rows]=lesson.diagram||[];
    const table=lesson.diagram?`<table><caption>${text(caption)}</caption><thead><tr>${columns.map(col=>`<th scope="col">${text(col)}</th>`).join('')}</tr></thead><tbody>${rows.map(row=>`<tr>${row.map(cell=>`<td>${text(cell)}</td>`).join('')}</tr>`).join('')}</tbody></table>`:'';
    const quiz=lesson.quiz?`<h3>Quiz</h3><p>${text(lesson.quiz[0])}</p><ol>${lesson.quiz[1].map(option=>`<li>${text(option)}</li>`).join('')}</ol><details><summary>Réponse</summary><p>${text(lesson.quiz[1][lesson.quiz[2]])} · ${text(lesson.quiz[3])}</p></details>`:'';
    const sources=(lesson.sources||[]).map(([author,title,year,url])=>`<li>${text(author)} · ${text(title)} (${text(year)})${/^https?:\/\//i.test(url)?` · <a href="${e(url)}" target="_blank" rel="noopener">${e(url)}</a>`:''}</li>`).join('');
    return `<article id="lecon-${index+1}"><h2>${text(lesson.title)}</h2><p>${text(lesson.goal)}</p><p>${text(lesson.overview)}</p>
      ${lesson.sections.map(([title,body])=>`<h3>${text(title)}</h3><p>${text(body)}</p>`).join('')}${table}
      ${lesson.dossier?`<h3>Dossier</h3><p>${text(lesson.dossier)}</p>`:''}
      ${lesson.activity?`<h3>Exercice</h3><p>${text(lesson.activity)}</p><details><summary>Corrigé</summary><p>${text(lesson.correction)}</p></details>`:''}
      ${quiz}${sources?`<h3>Références</h3><ol>${sources}</ol>`:''}
      <p><a href="#sommaire">Retour au sommaire</a></p></article>`;
  }).join('');
  return `<!doctype html><html lang="fr"><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${text(course.title)} · Academia Universalis</title>
    <style>body{color:#183b38;background:#f4f6f5;font:1rem/1.65 system-ui,sans-serif;max-width:56rem;margin:auto;padding:1rem}article{border-top:1px solid #b8cbc5;padding-block:1rem}a{color:#17665b;overflow-wrap:anywhere}td,th{padding:.35rem;text-align:left;border:1px solid #b8cbc5;overflow-wrap:anywhere}table{border-collapse:collapse;width:100%;table-layout:fixed}summary{cursor:pointer}</style>
    <h1>${text(course.title)}</h1><p>Academia Universalis · Année ${course.year||1} · Copie du ${localStudyDate()}</p><p>Les références externes s’ouvrent avec Internet. Pour retrouver tes notes et enregistrer ta progression, ouvre le campus.</p>
    <h2 id="sommaire">Sommaire</h2><ol>${course.lessons.map((lesson,index)=>`<li><a href="#lecon-${index+1}">${text(lesson.title)}</a></li>`).join('')}</ol>${lessons}</html>`;
}

function offlineCourseControls(course) {
  const panel=document.createElement('section');
  panel.className='card';
  panel.innerHTML='<h3>Lecture hors connexion</h3><button data-save-pack>Enregistrer sur cet appareil</button> <button data-download-pack>Télécharger le fichier HTML</button> <a data-open-pack hidden>Lire la copie enregistrée</a> <button data-remove-pack hidden>Retirer la copie</button><p role="status"></p>';
  const save=panel.querySelector('[data-save-pack]');
  const remove=panel.querySelector('[data-remove-pack]');
  const link=panel.querySelector('a');
  const status=panel.querySelector('[role=status]');
  const url=offlineCourseURL(course);
  link.href=url.href;
  link.target='_blank';
  link.rel='noopener';
  function mark(available){
    link.hidden=remove.hidden=!available;
    save.textContent=available?'Actualiser la copie':'Enregistrer sur cet appareil';
    status.textContent=available?'Copie disponible hors connexion sur cet appareil.':'Aucune copie enregistrée pour ce cours.';
  }
  async function cache(){
    if(!navigator.serviceWorker?.controller) throw new Error('Service worker unavailable');
    return caches.open(offlineCourseCache);
  }
  function initialize(){
    cache().then(async store=>mark(Boolean(await store.match(url.href)))).catch(()=>{
      save.disabled=true;
      status.textContent='Le fichier HTML reste disponible au téléchargement.';
    });
  }
  initialize();
  if(!navigator.serviceWorker?.controller)navigator.serviceWorker?.addEventListener('controllerchange',()=>{save.disabled=false;initialize();},{once:true});
  async function change(write){
    save.disabled=remove.disabled=true;
    try{
      const store=await cache();
      if(write)await store.put(url.href,new Response(offlineCourseDocument(course),{headers:{'Content-Type':'text/html; charset=utf-8'}}));
      else await store.delete(url.href);
      mark(write);
    }catch{status.textContent='Impossible de modifier la copie sur cet appareil.';}
    finally{save.disabled=remove.disabled=false;}
  }
  save.onclick=()=>change(true);
  remove.onclick=()=>change(false);
  panel.querySelector('[data-download-pack]').onclick=()=>{
    const download=URL.createObjectURL(new Blob([offlineCourseDocument(course)],{type:'text/html;charset=utf-8'}));
    const a=document.createElement('a');
    a.href=download;
    a.download='academia-'+course.key+'.html';
    a.click();
    setTimeout(()=>URL.revokeObjectURL(download),1000);
  };
  return panel;
}

const campusWorkshopCases = [
  {
    kind:'Laboratoire',title:'Forces · retrouver une accélération signée',course:'physique',lesson:'forces',
    prompt:'Un chariot de 2 kg reçoit une poussée de 6 N vers la droite et un frottement de 10 N vers la gauche. La droite est le sens positif. Quelle est son accélération ?',
    choices:['+8 m/s²','−2 m/s²','+2 m/s²'],answer:1,
    feedback:'La force résultante vaut 6 − 10 = −4 N. La masse de 2 kg donne une accélération de −2 m/s².'
  },
  {
    kind:'Atelier',title:'Histoire · comparer deux chronologies',course:'histoire',lesson:'uruk',
    prompt:'Sur une frise d’exercice, une couche contenant une tablette est datée entre 3400 et 3200 avant notre ère. Une couche d’un autre site contenant un sceau est datée entre 3300 et 3100 avant notre ère. Quelle conclusion respecte les deux intervalles ?',
    choices:['La tablette est forcément plus ancienne.','Le sceau est forcément plus ancien.','Les intervalles se recouvrent entre 3300 et 3200 avant notre ère.'],answer:2,
    feedback:'Les deux datations sont compatibles avec des événements contemporains. Pour établir un ordre strict, il faudrait des données plus précises.'
  },
  {
    kind:'Atelier',title:'Philosophie · chercher la prémisse manquante',course:'logique',lesson:'premisses',
    prompt:'« Cette décision déplaît à la majorité, donc elle est injuste. » Quelle prémisse suffirait à relier la raison donnée à la conclusion ?',
    choices:['Toute décision qui déplaît à la majorité est injuste.','Certaines décisions sont difficiles à prendre.','Toute décision injuste déplaît à la majorité.'],answer:0,
    feedback:'La première prémisse permet la déduction. Sa vérité reste à discuter. Cherche un exemple de décision juste qui déplaît à la majorité.'
  },
  {
    kind:'Atelier',title:'Littérature · comparer deux rendus d’une scène',course:'litterature',lesson:'odyssee',
    prompt:'Deux reformulations libres du même épisode donnent « Je me nomme Personne » et « Personne est mon nom ». Quel effet la seconde formulation produit-elle ?',
    choices:['Elle annonce « Personne » dès le début de la phrase.','Elle supprime la première personne dans tout le récit.','Elle transforme le discours direct en résumé indirect.'],answer:0,
    feedback:'L’antéposition expose immédiatement le mot-clé. Vérifie ensuite, dans les éditions liées au dossier, où les traducteurs placent ce mot et comment la ruse est reprise.'
  }
];

function workshopActivity(item,index) {
  const panel=document.createElement('details');
  panel.className='card';
  panel.innerHTML=`<summary>${e(item.title)}</summary><form><fieldset><legend>${e(item.prompt)}</legend>
    ${item.choices.map((choice,n)=>`<p><label><input type="radio" name="atelier-${index}" value="${n}" required> ${e(choice)}</label></p>`).join('')}
    </fieldset><button>Vérifier mon raisonnement</button><p role="status"></p></form>
    <button type="button">Relire la leçon associée</button>`;
  const form=panel.querySelector('form');
  form.onsubmit=event=>{
    event.preventDefault();
    const selected=Number(new FormData(form).get('atelier-'+index));
    form.querySelector('[role=status]').textContent=(selected===item.answer?'Correct. ':'À revoir. ')+item.feedback;
  };
  panel.lastElementChild.onclick=()=>spaceLesson(item.course,item.lesson);
  return panel;
}
