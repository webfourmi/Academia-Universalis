const writtenProjects = [
  {
    id:'histoire', title:'Histoire · Un document peut-il expliquer un changement ?',
    question:'Compare une tablette administrative d’Uruk et une inscription d’Auguste. En 700 à 1 000 mots, explique ce que chaque document montre du pouvoir et ce qu’il laisse hors champ. Choisis une affirmation politique et précise une source indépendante qui permettrait de la tester.',
    rubric:['Description contextualisée et référencement des deux documents · 6 points','Comparaison des usages et de leurs publics · 6 points','Limite et contrôle indépendant · 6 points','Organisation de l’argument · 2 points'],
    correction:'La tablette renseigne sur une pratique de comptabilité et ses catégories. Les Res Gestae organisent un récit public de l’autorité augustéenne. Ces documents n’ont ni les mêmes destinataires ni le même but. Une comparaison convaincante précise ce que chacun autorise à dire, puis ajoute par exemple des inscriptions non autobiographiques et des données sur l’administration des provinces.'
  },
  {
    id:'humanites', title:'Humanités · Un argument et sa mise en récit',
    question:'Compare l’Apologie et Le Loup et l’Agneau. Distingue les raisons fournies par les personnages et les moyens dont ils disposent pour imposer l’issue de la discussion. En 600 à 900 mots, reconstitue un argument, formule une objection et analyse deux choix d’écriture.',
    rubric:['Reconstruction logique · 5 points','Deux détails textuels analysés · 6 points','Comparaison et objection · 7 points','Clarté et références · 2 points'],
    correction:'Une réponse peut comparer la justification du refus de se taire et la succession des griefs du Loup. Montre ce que changent le cadre judiciaire et la morale placée en tête. L’objection doit viser une prémisse précise. Par exemple, reconnaître la valeur de l’examen ne démontre pas que le silence exclut tout examen écrit ou privé.'
  },
  {
    id:'sciences', title:'Sciences · Concevoir un test et interpréter la mesure',
    question:'Une équipe teste si un mouvement périodique affiché à l’écran change la précision d’une tâche visuelle. Propose un protocole comparant deux fréquences, une méthode pour vérifier la période et une mesure de performance. Indique une explication concurrente et le contrôle correspondant.',
    rubric:['Hypothèse et contrôle des conditions · 6 points','Mesure de la période et unités · 4 points','Mesure et analyse de la performance · 6 points','Biais, limites et reproductibilité · 4 points'],
    correction:'On peut comparer des groupes affectés au hasard, avec un affichage dont seule la fréquence change. Mesurer le temps de dix cycles et diviser par dix limite une partie de l’imprécision du chronométrage. Un même test de cibles et une durée commune rendent les scores comparables. La luminosité, l’ordre de passage et la fatigue sont des explications concurrentes à contrôler.'
  },
  {
    id:'economie-langue', title:'Économie et chinois · Échanger et normaliser',
    question:'Rédige une note de 500 à 800 mots sur une norme commune qui facilite les échanges. Appuie-toi sur une fonction de la monnaie et sur un exemple tiré du cours Qin ou Han. Propose une trace qui aiderait à vérifier l’application locale de la norme. Ajoute en annexe un échange bref de présentation en mandarin avec traduction et pinyin.',
    rubric:['Fonction de la monnaie et mécanisme de coordination · 6 points','Contexte Qin ou Han et vérification documentaire · 7 points','Échange, pinyin et traduction · 5 points','Structure et références · 2 points'],
    correction:'Une unité de compte commune améliore la comparabilité des prix. Une mesure normalisée peut faciliter l’administration sans impliquer une adoption uniforme. Compare des objets ou documents datés provenant de plusieurs lieux et distingue norme annoncée et pratique observée. Annexe possible : Nǐ hǎo! Nǐ jiào shénme míngzi? — Wǒ jiào Ānnà.'
  }
];

function showWrittenProjects() {
  rememberCampusRoute('projects');
  v.innerHTML = '<button onclick="showAssessments()">Retour aux évaluations</button><h2>Travaux de synthèse · Année 1</h2><p>Prépare les travaux à ton rythme, relis les leçons et compare ton brouillon avec le barème et le plan indicatif. Le Carnet conserve tes brouillons.</p>'+
    writtenProjects.map(project => `<article class="card"><details><summary>${project.title}</summary>
      <p>${project.question}</p><h3>Barème sur 20</h3><ul>${project.rubric.map(item=>`<li>${item}</li>`).join('')}</ul>
      <label for="project-${project.id}">Mon brouillon</label>
      <textarea id="project-${project.id}" data-project="${project.id}" rows="7">${e(S.notes['synthese:'+project.id])}</textarea>
      <details><summary>Lire le plan indicatif</summary><p>${project.correction}</p></details>
    </details></article>`).join('');
  v.querySelectorAll('[data-project]').forEach(input => {
    input.oninput = () => {S.notes['synthese:'+input.dataset.project]=input.value;save();};
  });
}

function noteTitle(key) {
  const project = writtenProjects.find(item => key==='synthese:'+item.id);
  if (project) return project.title;
  for (const course of allStudyCourses()) {
    const lesson = course.lessons.find(item => key===course.key+':'+item.id);
    if (lesson) return lesson.title;
  }
  return key;
}
