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
  v.querySelector('.lesson-list').before(offlineCourseControls(course));
  v.querySelectorAll('[data-lesson]').forEach(button => {
    button.addEventListener('click', () => showLesson(course, Number(button.dataset.lesson)));
  });
}

function lessonProgressKey(courseKey, lessonId) {
  return courseKey === 'histoire' ? lessonId : `${courseKey}:${lessonId}`;
}

function evolutionFossils(){
const docs=[['Jebel Irhoud · Maroc','Reconstruction scientifique par tomodensitométrie de plusieurs fossiles originaux, environ 300 000 ans. Philipp Gunz, MPI EVA Leipzig, CC BY-SA 2.0 (image signalée sur la page source).','https://humanorigins.si.edu/research/whats-hot-human-origins/our-species-arose-least-300000-years-ago','Comparez le profil facial et la forme de la boîte crânienne.','La face relativement moderne coexiste avec une boîte crânienne allongée.'],['Lucy · AL 288-1 · Hadar, Éthiopie','Squelette partiel d’Australopithecus afarensis, environ 3,2 millions d’années. La page présente notamment un squelette reconstitué, crédit Chip Clark, Smithsonian.','https://humanorigins.si.edu/evidence/human-fossils/fossils/al-288-1','Quels caractères du bassin renseignent sur la bipédie ?','Un bassin court et large participe au maintien du tronc lors de la marche.'],['La Ferrassie 1 · Dordogne, France','Crâne néandertalien découvert en 1909 ; photographies créditées au Smithsonian, James Di Loreto et Donald H. Hurlbert pour le profil.','https://humanorigins.si.edu/evidence/human-fossils/fossils/la-ferrassie','Observez le front et l’ouverture nasale.','Le front est bas et incliné ; l’ouverture nasale est large. Ces caractères ne démontrent pas une infériorité cognitive.'],['Collection 3D · Smithsonian','Numérisations de fossiles, dont Cro-Magnon 1 et La Ferrassie 1. Consulter la notice individuelle pour distinguer original et moulage.','https://humanorigins.si.edu/evidence/3d-collection/fossils','Comparez les profils dans une orientation similaire.','Une comparaison de forme exige des orientations et des échelles contrôlées.']];
return '<h3>Atlas : observer les documents scientifiques</h3><p>Notices consultées le 27/11/2026. Documents hébergés par les institutions, accès internet requis. Aucune photographie protégée reproduite localement.</p>'+docs.map(([title,desc,url,q,a])=>'<section class="card"><h4>'+e(title)+'</h4><p>'+e(desc)+'</p><a target="_blank" rel="noopener" href="'+e(url)+'">Observer le document institutionnel</a><p>'+e(q)+'</p><details><summary>Correction</summary><p>'+e(a)+'</p></details></section>').join('');
}

function evolutionAnatomy(){
return '<figure class="history-overview"><svg viewBox="0 0 340 150" width="100%" role="img" aria-label="Comparaison schématique de deux formes de boîte crânienne"><g fill="none" stroke="currentColor" stroke-width="2"><path d="M20 85 Q5 20 85 25 Q145 25 145 75 L125 95 L125 116 L90 116 L70 96 Z"/><path d="M190 85 Q165 12 235 12 Q300 12 305 75 L285 95 L285 116 L250 116 L230 96 Z"/><path d="M82 89 L112 89 M242 89 L272 89"/></g><g fill="currentColor" font-size="10" text-anchor="middle"><text x="83" y="135">Forme allongée</text><text x="247" y="135">Forme plus globulaire</text></g></svg><figcaption>Schéma conceptuel, non métrique, non reproduction de fossiles : évolution en mosaïque de la face et de la boîte crânienne. Voir Hublin et al. [3].</figcaption></figure>';
}
function evolutionQuiz(){
const qs=[['Que date la thermoluminescence du silex ?',['La dernière chauffe suffisante','La naissance du fabricant','La formation de la roche'],0,'Le signal est réinitialisé par une chauffe suffisante.'],['Quel est le recouvrement des deux intervalles publiés ?',['254 000–349 000','281 000–318 000','286 000–315 000'],1,'Le maximum des bornes basses et le minimum des bornes hautes donnent 281 000–318 000.'],['Que signifie évolution en mosaïque ?',['Tous les caractères changent ensemble','Les caractères évoluent à des rythmes différents','Les espèces suivent une échelle'],1,'La face et la boîte crânienne peuvent évoluer différemment.'],['Que démontre le génome étudié par Slon et al. ?',['Une origine unique de Sapiens','Une filiation directe de tous les humains','Une reproduction entre Néandertaliens et Denisoviens'],2,'Cet individu avait une mère néandertalienne et un père denisovien.']];
return '<h3>Quiz complémentaire</h3>'+qs.map(([q,opts,a,why],i)=>'<fieldset><legend>'+e(q)+'</legend>'+opts.map((o,j)=>'<label class="quiz-option"><input type="radio" name="evo-extra-'+i+'" value="'+j+'"> '+e(o)+'</label>').join('')+'<button type="button" data-evo-answer="'+a+'" data-evo-why="'+e(why)+'">Vérifier</button><p role="status"></p></fieldset>').join('');
}

function migrationCardDefinitions(){return [["Que prouve une occupation datée ?","Une présence locale, pas une filiation ni un itinéraire."],["Où se trouve Dmanisi ?","Dans le Caucase, en Géorgie."],["Âge des occupations de Dmanisi selon l’étude de 2022 ?","Environ 1,80–1,76 Ma."],["Volume endocrânien de D4500 ?","546 cm³."],["Que désigne le Sahul ?","Australie et Nouvelle-Guinée réunies lors des bas niveaux marins."],["Quel fossile a été découvert à Misliya ?","Un maxillaire attribué à Homo sapiens."],["Datation proposée de Misliya ?","194–177 ka, estimation discutée."],["Datation proposée de Madjedbebe ?","Environ 65 ka, estimation discutée."],["Que trouve-t-on à White Sands ?","Des empreintes humaines datées vers 23–21 ka."],["Que mesure la luminescence OSL ?","Le temps depuis la dernière exposition lumineuse des grains."],["Quel biais affecte les graines aquatiques ?","Le carbone ancien peut augmenter leur âge apparent."],["1,80 Ma équivaut à combien de ka ?","1 800 ka."]];}
function lessonCardDefinitions(lesson){return lesson.flashcards || (lesson.id==='migrations-humaines'?migrationCardDefinitions():lesson.id==='evolution-humaine'?[['Pourquoi un arbre plutôt qu’une échelle ?','Divergence, coexistence et échanges génétiques.'],['Évolution en mosaïque ?','Caractères évoluant à des rythmes différents.'],['Âge des silex ?','315 000 ± 34 000 ans.'],['Un fossile date-t-il la naissance de son espèce ?','Non, il atteste sa présence.'],['Parents de l’individu étudié en 2018 ?','Mère néandertalienne et père denisovien.'],['Modèle panafricain ?','Participation possible de plusieurs populations africaines.']]:lesson.quiz?[[lesson.quiz[0],lesson.quiz[1][lesson.quiz[2]]+' · '+lesson.quiz[3]]]:[]);}
function lessonCardKey(course,lesson,i){return lesson.id==='migrations-humaines'?'builtin:migrations-humaines:'+i:'builtin:'+course.key+':'+lesson.id+':'+i;}
function builtinStudyCards(){return allStudyCourses().flatMap(course=>course.lessons.flatMap(lesson=>lessonCardDefinitions(lesson).map(([question,answer],i)=>({question,answer,key:lessonCardKey(course,lesson,i)}))));}
function migrationFlashcards(lesson){
 const cards=lessonCardDefinitions(lesson);if(!cards.length)return '';
 return '<section class="card" id="migration-flashcards"><h3>Flashcards · rappel actif</h3><p>Formulez votre réponse avant de retourner la carte.</p><p id="migration-card-count" role="status"></p><h4 id="migration-card-question"></h4><details id="migration-card-answer"><summary>Retourner la carte</summary><p></p></details><p id="migration-card-level"></p><div><button type="button" id="migration-card-missed">À revoir</button> <button type="button" id="migration-card-known">Retrouvé sans aide</button></div><div><button type="button" id="migration-card-prev">Précédente</button> <button type="button" id="migration-card-next">Suivante</button></div><script type="application/json" id="migration-card-data">'+JSON.stringify(cards)+'</script></section>';
}
function bindMigrationFlashcards(v,course,lesson){
 const root=v.querySelector('#migration-flashcards');if(!root)return;
 const cards=JSON.parse(root.querySelector('#migration-card-data').textContent);let i=0;
 const answer=root.querySelector('#migration-card-answer');
 function render(){root.querySelector('#migration-card-count').textContent=(i+1)+' / '+cards.length;root.querySelector('#migration-card-question').textContent=cards[i][0];answer.querySelector('p').textContent=cards[i][1];answer.open=false;const review=S.reviews?.[lessonCardKey(course,lesson,i)];root.querySelector('#migration-card-level').textContent=review?'Niveau '+(review.step+1)+'/5 · prochain rappel '+reviewDate(review):'Non évaluée';root.querySelector('#migration-card-known').disabled=true;root.querySelector('#migration-card-missed').disabled=true;}
 answer.ontoggle=()=>{root.querySelector('#migration-card-known').disabled=!answer.open;root.querySelector('#migration-card-missed').disabled=!answer.open;};
 for(const [id,correct] of [['migration-card-known',true],['migration-card-missed',false]])root.querySelector('#'+id).onclick=()=>{if(!answer.open)return;S.reviews??={};const key=lessonCardKey(course,lesson,i);S.reviews[key]=nextMemoryReview(S.reviews[key],correct,localStudyDate());save();i=(i+1)%cards.length;render();};
 root.querySelector('#migration-card-prev').onclick=()=>{i=(i+cards.length-1)%cards.length;render();};
 root.querySelector('#migration-card-next').onclick=()=>{i=(i+1)%cards.length;render();};render();
}

function migrationMap(lesson){
 if(lesson.id!=='migrations-humaines')return '';
 const sites=[['Dmanisi',41.33,44.34,1800,'1,80–1,76 Ma','Outils et fossiles',1],['Misliya',32.74,34.97,194,'194–177 ka, discuté','Maxillaire',4],['Madjedbebe',-12.5,132.9,65,'65 ka, discuté','Outils et sédiments',6],['White Sands',32.8,-106.2,23,'23–21 ka','Empreintes et datations indépendantes',7]];
 const xy=(lat,lon)=>[180+lon,90-lat];
 const land=['M12 30 L32 19 65 15 85 25 100 48 82 62 65 59 58 76 48 72 35 55 18 48Z','M78 77 L104 81 119 100 111 127 96 148 85 133 78 110Z','M151 38 L174 24 207 25 225 15 270 19 313 27 345 45 325 65 299 69 282 85 263 72 250 91 233 73 216 65 199 58 184 58 171 51Z','M165 65 L195 63 213 82 204 110 190 125 178 112 169 91 155 79Z','M286 111 L307 103 330 115 335 132 312 139 291 130Z','M265 93 L285 98 300 102 295 106 273 102Z','M110 8 L145 6 140 23 125 32 112 23Z'];
 return '<section class="card" id="migration-map"><h3>Atlas interactif : quatre sites, quatre preuves</h3><p>Fond schématique des continents actuels, non paléogéographique. Positions approximatives. Aucun itinéraire démontré.</p><label for="migration-time">Horizon chronologique</label><select id="migration-time"><option value="0">Tous les sites</option><option value="1000">Au moins 1 Ma</option><option value="100">Au moins 100 ka</option><option value="50">Au moins 50 ka</option><option value="20">Au moins 20 ka</option></select><svg viewBox="0 0 360 180" width="100%" role="img" aria-label="Carte schématique des quatre sites"><rect width="360" height="180" fill="#dcebf4"/>'+land.map(d=>'<path d="'+d+'" fill="#d6d3ad" stroke="#64745b" stroke-width=".7"/>').join('')+sites.map(([name,lat,lon,age],i)=>{const [x,y]=xy(lat,lon);return '<g data-migration-pin="'+i+'" data-age="'+age+'"><circle cx="'+x+'" cy="'+y+'" r="4" fill="#8b3028" stroke="white"/><text x="'+(x+(i===1?-6:6))+'" y="'+(y+(i===1?10:-5))+'" text-anchor="'+(i===1?'end':'start')+'" font-size="7" fill="#172c3c">'+(i+1)+'</text></g>'}).join('')+'</svg><div>'+sites.map(([name,lat,lon,age,date,proof,source],i)=>'<details data-migration-site="'+i+'" data-age="'+age+'"><summary>'+(i+1)+'. '+e(name)+' · '+e(date)+'</summary><p>'+e(proof)+'. <a href="'+e(lesson.sources[source-1][3])+'" target="_blank" rel="noopener">Publication ['+source+']</a></p></details>').join('')+'</div><p role="status" id="migration-status">4 sites affichés.</p></section>';
}
function bindMigrationMap(v){
 const root=v.querySelector('#migration-map');if(!root)return;
 const filter=root.querySelector('#migration-time');
 filter.onchange=()=>{let n=0;root.querySelectorAll('[data-age]').forEach(el=>{const show=Number(el.dataset.age)>=Number(filter.value);el.style.display=show?'':'none';if(show&&el.matches('details'))n++;});root.querySelector('#migration-status').textContent=n+' sites affichés.';};
 root.querySelectorAll('[data-migration-pin]').forEach(pin=>{pin.style.cursor='pointer';pin.onclick=()=>{const d=root.querySelector('[data-migration-site="'+pin.dataset.migrationPin+'"]');d.open=true;d.querySelector('summary').focus();};});
}

function evolutionExtras(lesson){
 if(lesson.id!=='evolution-humaine')return '';
 const species=[['Sahelanthropus',7,6],['Orrorin',6.1,5.7],['Ardipithecus kadabba',5.8,5.2],['Ardipithecus ramidus',4.4,4.4],['A. anamensis',4.2,3.8],['A. afarensis',3.85,2.95],['A. africanus',3.3,2.1],['P. boisei',2.3,1.2],['H. habilis',2.4,1.4],['H. erectus',1.89,.11],['H. heidelbergensis',.7,.2],['Néandertal',.4,.04],['H. naledi',.335,.236],['H. floresiensis',.1,.06],['H. sapiens',.3,0]];
 const timeline=max=>'<svg viewBox="0 0 340 350" width="100%" role="img" aria-label="Chronologie des fossiles, millions d’années avant le présent"><text x="145" y="12" fill="currentColor" font-size="10">'+max+' Ma</text><text x="325" y="12" fill="currentColor" font-size="10">0</text>'+species.filter(s=>s[2]<max).map((s,i)=>'<text x="2" y="'+(32+i*21)+'" font-size="10" fill="currentColor">'+e(s[0])+'</text><rect x="'+(145+185*(1-Math.min(max,s[1])/max))+'" y="'+(22+i*21)+'" width="'+Math.max(2,185*(Math.min(max,s[1])-s[2])/max)+'" height="12" rx="2" fill="#39766a" stroke="currentColor" stroke-width=".5"/>').join('')+'</svg>';
 
 return evolutionAnatomy()+evolutionFossils()+'<h3>Chronologie graphique</h3><figure class="history-overview">'+timeline(7)+'<figcaption>Intervalles fossiles indicatifs, non filiations. Source : Smithsonian [7].</figcaption><details><summary>Zoom sur le dernier million d’années</summary>'+timeline(1)+'</details></figure>';
}

function showLesson(course, index, {offset,fromNote} = {}) {
  saveReading();
  const {key, lessons} = course;
  const lesson = lessons[index];
  rememberCampusRoute('lesson',{key,id:lesson.id,...(fromNote?{fromNote}:{})});
  const [caption, columns, rows] = lesson.diagram || [];
  const [question, options, answer, rationale] = lesson.quiz;
  const candidate = key === 'histoire' ? historySeminars[lesson.id] : undefined;
  const seminar = candidate && lesson.sources?.[candidate.source] ? candidate : undefined;
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
      ${evolutionExtras(lesson)}
      ${migrationMap(lesson)}
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
      <div id="written-exercise"></div>
      <form id="history-quiz" tabindex="-1">
        <fieldset><legend>${question}</legend>
          ${options.map((option, n) => `<label class="quiz-option"><input type="radio" name="answer" value="${n}" required> ${option}</label>`).join('')}
        </fieldset>
        <button>Vérifier ma réponse</button>
        <p role="status" id="quiz-result"></p>
      </form>
      ${lesson.id==='evolution-humaine'?evolutionQuiz():''}
      <h3>Séminaire</h3><p>${lesson.seminar}</p>
      <h3>Révision espacée</h3><p>${lesson.review}</p>${migrationFlashcards(lesson)}
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
  v.querySelectorAll('[data-evo-answer]').forEach(button=>button.onclick=()=>{const field=button.closest('fieldset');const selected=field.querySelector('input:checked');field.querySelector('[role=status]').textContent=selected?((selected.value===button.dataset.evoAnswer?'Correct. ':'À revoir. ')+button.dataset.evoWhy):'Choisissez une réponse.';});
  bindMigrationMap(v);
  bindMigrationFlashcards(v,course,lesson);
  if(course.key==='physique')bindPhysicsLab(v,lesson);
  const exercise=v.querySelector('#written-exercise');
  if(lesson.activity&&lesson.correction)exercise.replaceWith(writtenExercise(course,lesson));
  installReadingTools(course,lesson);
  v.append(tutorPanel(course,lesson));
  if(S.studySession?.key===lessonProgressKey(course.key,lesson.id)){
    const resume=document.createElement('button');
    resume.textContent='Reprendre la séance guidée';
    resume.onclick=()=>showStudySession(S.studySession.key);
    v.querySelector('#history-back').after(resume);
  }
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
    captureQuizEvidence(course,lesson,selected,selected===answer);
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

function physicsModel(id,p,t){
 if(id==='intro-physique')return 2*Math.PI*Math.sqrt(p/9.81);
 if(id==='mesures')return 15.1+p;
 if(id==='maths-physicien')return 2+p*t;
 if(id==='referentiels')return 8-p*t;
 if(id==='vitesse-acceleration')return p*t;
 if(id==='forces')return p/2;
 return t+0.5*p*t*t;
}
function bindPhysicsLab(v,lesson){
 const specs={
 'intro-physique':['Longueur du pendule (m)',0.2,0.8,0.1,0.4,'Période (s)','À petite amplitude, prévoir l’effet d’une longueur quadruplée.','T = 2π√(L/g) ; g = 9,81 m/s².'],
 'forces':['Force appliquée vers la droite (N)',0,20,1,6,'Accélération (m/s²)','Prévoir l’accélération d’un chariot de 2 kg sans frottement.','Dans ce modèle, la force horizontale résultante vaut F et a = F/m.'],
 'mesures':['Biais ajouté (cm)',-0.5,0.5,0.1,0,'Moyenne (cm)','Prévoir si un biais modifie la demi-étendue.','Lectures fictives : 15,0 ; 15,1 ; 15,2 cm. Demi-étendue constante : 0,1 cm.'],
 'maths-physicien':['Pente (m/s)',-3,3,0.5,1,'Position (m)','Prévoir le signe de la pente.','x = 2 + pt.'],
 'referentiels':['Vitesse du repère (m/s)',-3,3,0.5,2,'Position relative (m)','Prévoir la position dans le repère mobile à 3 s.','xB = 8 − Ut ; objet fixe dans A.'],
 'vitesse-acceleration':['Accélération (m/s²)',-3,3,0.5,2,'Vitesse (m/s)','Prévoir le signe de la vitesse à 3 s.','v = at ; vitesse initiale nulle.'],
 'prevoir-mouvement':['Accélération (m/s²)',-3,3,0.5,2,'Position (m)','Prévoir la position à 3 s.','x = t + ½at² ; x₀ = 0 m, v₀ = 1 m/s.']
 };
 const s=specs[lesson.id];if(!s)return;
 const root=document.createElement('section');root.className='card';root.innerHTML='<h3>Laboratoire virtuel</h3><p></p><p></p><label>'+s[0]+' <input type="range" min="'+s[1]+'" max="'+s[2]+'" step="'+s[3]+'" value="'+s[4]+'"></label><p data-param></p><label>Votre prédiction numérique à t = 3 s (ou résultat indépendant du temps) <input type="number" step="any"></label><button type="button">Comparer au modèle</button><p role="status"></p><figure><svg viewBox="0 0 320 180" width="100%" role="img"></svg><figcaption></figcaption></figure><p>Modèle idéal, données calculées et non mesures expérimentales.</p>';
 root.querySelectorAll('p')[0].textContent=s[6];root.querySelectorAll('p')[1].textContent=s[7];
 const range=root.querySelector('input[type=range]'), guess=root.querySelector('input[type=number]'), status=root.querySelector('[role=status]'), svg=root.querySelector('svg');
 function draw(){
 const p=Number(range.value), independent=['intro-physique','mesures','forces'].includes(lesson.id);
 const xs=Array.from({length:31},(_,i)=>independent?s[1]+(s[2]-s[1])*i/30:i/10);
 const ys=xs.map(x=>physicsModel(lesson.id,independent?x:p,independent?3:x));
 const lo=Math.min(0,...ys),hi=Math.max(0,...ys),span=hi-lo||1;
 const X=i=>42+i*260/30,Y=y=>145-(y-lo)/span*115;
 svg.innerHTML='<path d="M42 20 V145 H302" fill="none" stroke="currentColor"/><text x="4" y="12" font-size="10" fill="currentColor">'+s[5]+'</text><text x="4" y="32" font-size="10" fill="currentColor">'+hi.toFixed(2)+'</text><text x="4" y="145" font-size="10" fill="currentColor">'+lo.toFixed(2)+'</text><polyline fill="none" stroke="#4387cc" stroke-width="2.5" points="'+ys.map((y,i)=>X(i)+','+Y(y)).join(' ')+'"/><text x="42" y="162" font-size="10" fill="currentColor">'+xs[0]+'</text><text x="270" y="162" font-size="10" fill="currentColor">'+xs[30]+'</text><text x="160" y="177" text-anchor="middle" font-size="10" fill="currentColor">'+(independent?s[0]:'Temps (s)')+'</text>';
 svg.setAttribute('aria-label',s[5]+' selon '+(independent?s[0]:'le temps'));
 root.querySelector('[data-param]').textContent=s[0]+' : '+p;
 root.querySelector('figcaption').textContent='Courbe calculée. Valeurs aux extrémités : '+ys[0].toFixed(3)+' et '+ys[30].toFixed(3)+'.';
 status.textContent='';
 }
 range.oninput=draw;root.querySelector('button').onclick=()=>{if(guess.value.trim()===''||!Number.isFinite(Number(guess.value))){status.textContent='Saisissez une prédiction numérique.';return;}const actual=physicsModel(lesson.id,Number(range.value),3);status.textContent=s[5]+' : '+actual.toFixed(3)+' ; écart prédiction − modèle : '+(Number(guess.value)-actual).toFixed(3);};draw();
 v.querySelector('#lesson-reading')?.append(root);
}
