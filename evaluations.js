const synthesisQuestions = [
  ['histoire','mobilites','Deux couches d’un abri contiennent des traces de chasse, l’une d’automne et l’autre de printemps. Quelle conclusion est la plus solide ?', ['Le site a été occupé toute l’année sans interruption.','Le site a été utilisé à différentes saisons, possiblement au cours d’épisodes distincts.','Un même groupe est resté sur place entre les deux saisons.'],1,'Les indices renseignent sur les saisons d’utilisation. La continuité de résidence exige de relier les épisodes dans la stratigraphie.'],
  ['antiquite','auguste','Une inscription proclame le maintien des institutions. Quel contrôle aide à évaluer cette affirmation ?', ['Compter les titres cités.','Étudier uniquement le matériau de l’inscription.','Comparer les compétences officielles et le contrôle effectif du commandement.'],2,'Le vocabulaire de continuité doit être confronté au fonctionnement des institutions et aux ressources des acteurs.'],
  ['philosophie','socrate','Une personne accepte la valeur de l’examen de soi, mais estime qu’on peut le pratiquer par écrit. Quelle étape critique-t-elle ?', ['Le lien entre l’examen et la nécessité de parler.','La valeur de l’examen elle-même.','La présence de juges au procès.'],0,'Elle accepte provisoirement la finalité, puis discute le moyen jugé nécessaire.'],
  ['litterature','achebe','Deux récits décrivent le même événement. Le second tait les motifs des personnages. Quelle comparaison aide à interpréter ce changement ?', ['La longueur de tous les mots.','La date de lecture des deux textes.','Ce que chaque cadre permet au lecteur de connaître des acteurs.'],2,'Un cadre de récit sélectionne des informations. Comparer leurs conséquences sur la lecture rend cette sélection observable.'],
  ['physique','energie','Un objet se déplace en ligne droite à vitesse constante. Que peut-on dire du travail total des forces sur le trajet ?', ['Il vaut zéro.','Il est nécessairement positif.','Il est égal à la masse.'],0,'La norme de la vitesse ne change pas. L’énergie cinétique reste constante, donc le travail total est nul dans le modèle étudié.'],
  ['psychologie','methodes','Les étudiants qui relisent plus longtemps obtiennent de meilleures notes. Quel résultat permettrait de mieux isoler l’effet d’une méthode ?', ['Constater que les volontaires préfèrent la relecture.','Comparer deux groupes affectés au hasard, avec le même temps d’étude et le même test final.','Recruter uniquement des volontaires qui réussissent déjà.'],1,'L’affectation au hasard et la standardisation des conditions réduisent plusieurs explications concurrentes.'],
  ['economie','equilibre','À chaque prix, la quantité demandée augmente tandis que l’offre est inchangée. Quel changement décrit ce scénario ?', ['Une hausse qui suit la courbe de demande existante.','Une modification de la courbe d’offre.','Un déplacement de la courbe de demande.'],2,'La quantité demandée augmente à prix donné. Il faut donc modifier la demande du modèle, puis recalculer l’équilibre.'],
  ['logique','validite','Si un train est supprimé, le tableau indique une alerte. Le tableau indique une alerte. Comment tester « donc le train est supprimé » ?', ['Chercher un cas où l’alerte annonce seulement un retard.','Affirmer la conclusion plus clairement.','Vérifier que les deux phrases sont à la même voix.'],0,'Une alerte de retard fournit un cas où les deux prémisses sont vraies alors que la conclusion est fausse.'],
  ['chinois','tons','Quelle marque graphique indique le ton descendant sur cette syllabe ?', ['má','mà','mā'],1,'L’accent grave de mà correspond au quatrième ton en notation pinyin.']
];

function assessmentOptions() {
  const catalog = campusCatalog();
  const assessments = catalog.map(course => ({
    key: course.key,
    title: course.title,
    items: course.lessons.map((lesson, index) => ({course, lesson, index, quiz: lesson.quiz}))
  }));
  const items = synthesisQuestions.map(([key, id, ...quiz]) => {
    const course = catalog.find(entry => entry.key === key);
    const index = course.lessons.findIndex(lesson => lesson.id === id);
    return {course, lesson: course.lessons[index], index, quiz};
  });
  return [...assessments, {key:'synthese',title:'Bilan transversal de l’Année 1',items}];
}

function assessmentSection(options) {
  return `<section id="assessment-section" aria-labelledby="assessment-title">
    <h3 id="assessment-title" tabindex="-1">Évaluations</h3>
    <p>Les corrigés s’affichent à la fin du bilan.</p>
    <button onclick="showWrittenProjects()">Travaux de synthèse · Année 1</button>
    <div class="grid">${options.map(({key,title,items}) => {
      const saved = S.assessments?.[key];
      return `<article class="card"><h4><button class="title-action" data-assessment="${key}">${title}</button></h4><p>${items.length} questions</p>
      ${saved ? `<p>Dernier score : ${saved.last}/${saved.total} · Meilleur : ${saved.best}/${saved.total}</p>` : ''}
      </article>`;
    }).join('')}</div></section>`;
}

function showAssessments() {
  go(13);
  const heading = v.querySelector('#assessment-title');
  heading.focus({preventScroll:true});
  heading.scrollIntoView({block:'center'});
}

function showAssessment(assessment) {
  rememberCampusRoute('assessment',{key:assessment.key});
  const {title, items} = assessment;
  v.innerHTML = `<button onclick="showAssessments()">Retour aux évaluations</button><h2 tabindex="-1">${title}</h2>
    <p>Choisis une réponse par question. Tu peux refaire ce bilan à tout moment.</p>
    <form id="assessment-form" class="card lesson">${items.map(({quiz:[question, choices]}, index) => `
      <fieldset><legend>${index+1}. ${question}</legend>
        ${choices.map((choice, value) => `<label class="quiz-option"><input type="radio" name="question-${index}" value="${value}" required> ${choice}</label>`).join('')}
      </fieldset>`).join('')}
      <button type="submit">Corriger mon bilan</button>
    </form>`;
  v.querySelector('h2').focus();
  v.querySelector('#assessment-form').onsubmit = event => {
    event.preventDefault();
    const answers = new FormData(event.currentTarget);
    const selections = items.map((_, index) => Number(answers.get('question-'+index)));
    showAssessmentResult(assessment, selections);
  };
}

function showAssessmentResult(assessment, selections) {
  const {key, title, items} = assessment;
  rememberCampusRoute('assessment-result',{key,selections});
  const score = items.filter(({quiz}, index) => selections[index]===quiz[2]).length;
  const previous = S.assessments?.[key];
  const total = items.length;
  const best = previous?.total === total ? Math.max(score, previous.best) : score;
  if (!restoringCampusRoute) {
    S.assessments ??= {};
    S.assessments[key] = {last:score,best,total};
    items.forEach(({course, lesson, quiz}, index) => {
      // Le résultat d’un bilan inscrit la notion à revoir, sans simuler un rappel différé.
      if (selections[index] !== quiz[2]) {
        const reviewKey = lessonProgressKey(course.key, lesson.id);
        const today = localStudyDate();
        S.reviews ??= {};
        S.reviews[reviewKey] = {date:today,step:0,last:today,correct:false};
      }
    });
    save();
  }
  v.innerHTML = `<button onclick="showAssessments()">Retour aux évaluations</button><h2 tabindex="-1">Résultat · ${title}</h2>
    <p role="status"><strong>${score} sur ${total}</strong> · Meilleur résultat : ${best}/${total}</p>
    ${score < total ? '<p>Les leçons liées aux réponses à reprendre sont inscrites au planning de révision à partir de J+2.</p>' : ''}
    <ol>${items.map(({course, lesson, index, quiz}, position) => `
      <li class="card"><h3>${quiz[0]}</h3><p>${selections[position]===quiz[2]?'Réponse correcte.':'À revoir.'} <strong>${quiz[1][quiz[2]]}</strong></p>
      <p>${quiz[3]}</p><h4><button class="title-action" data-course="${course.key}" data-index="${index}">${e(lesson.title)}</button></h4></li>`).join('')}</ol>
    <button id="retry-assessment">Refaire le bilan</button>`;
  v.querySelector('h2').focus();
  v.querySelector('#retry-assessment').onclick = () => showAssessment(assessment);
  v.querySelectorAll('[data-course]').forEach(button => {
    button.onclick = () => showLesson(campusCatalog().find(course => course.key===button.dataset.course), Number(button.dataset.index));
  });
}

function validAssessments(records) {
  return records === undefined || Boolean(records && typeof records==='object' && !Array.isArray(records) &&
    Object.values(records).every(record => record && Number.isInteger(record.total) && record.total>0 &&
      Number.isInteger(record.last) && record.last>=0 && Number.isInteger(record.best) &&
      record.best>=record.last && record.best<=record.total));
}
