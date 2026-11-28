const mathFoundationSources = {
  logique: ['Exo7 · Logique et raisonnements', 'https://exo7.emath.fr/cours/ch_logique.pdf', 'français', 'Connecteurs, quantificateurs et méthodes de preuve', 'Arnaud Bodin, Benjamin Boutin et Pascal Romon · date non indiquée'],
  reels: ['Exo7 · Les nombres réels', 'https://exo7.emath.fr/cours/ch_reels.pdf', 'français', 'Ensembles numériques et calcul dans ℝ', 'Arnaud Bodin, Niels Borne et Laura Desideri · date non indiquée'],
  ensembles: ['Exo7 · Ensembles et applications', 'https://exo7.emath.fr/cours/ch_ensembles.pdf', 'français', 'Opérations sur les ensembles, applications et relations', 'Arnaud Bodin, Benjamin Boutin et Pascal Romon · date non indiquée'],
  diagnostic: ['OpenStax (Rice University) · Prealgebra 2e', 'https://openstax.org/books/prealgebra-2e/pages/1-introduction', 'anglais', 'Calcul de base, équations et coordonnées', 'Lynn Marecek, MaryAnne Anthony-Smith et Andrea Honeycutt Mathis · 2020 · CC BY-NC-SA']
};

const mathFoundationLessons = [
  {
    id: 'fondements-1', title: 'Qu’est-ce que les mathématiques ?', source: 'logique', prerequisite: 'Savoir reconnaître un nombre entier pair.',
    objective: 'Distinguer définition, axiome, conjecture et théorème. Identifier ce qui permet de passer d’une observation à une preuve.',
    sections: [
      ['Définir et poser les règles', 'Une définition fixe le sens d’un terme. Dire que n est pair signifie qu’il existe un entier k tel que n = 2k. Un axiome est un énoncé admis comme point de départ dans une théorie. Sa fonction est de permettre des déductions. Par exemple, la commutativité de l’addition des entiers permet de permuter deux termes.'],
      ['Observer puis démontrer', 'Une conjecture est un énoncé proposé dont on cherche une preuve ou une réfutation. Un théorème est un énoncé établi par une démonstration. Les exemples 2 + 4 et 6 + 8 suggèrent que deux entiers pairs ont une somme paire. Pour le prouver, prends deux entiers pairs quelconques a = 2k et b = 2m. Alors a + b = 2(k + m), et k + m est entier.'],
      ['Contrôler la portée', 'La même démonstration couvre les nombres pairs négatifs. Elle ne suffit pas pour établir un résultat sur des nombres impairs. Une preuve doit préciser les objets auxquels s’appliquent ses hypothèses. Dans la lecture Exo7, repère comment le choix des mots « tout » et « il existe » change la portée d’une phrase.']
    ],
    prompt: 'Démontre que la somme de deux entiers impairs est paire. Explique pourquoi les exemples 3 + 5 et 7 + 9 ne suffisent pas.',
    solution: 'Deux entiers impairs quelconques s’écrivent 2k + 1 et 2m + 1 avec k et m entiers. Leur somme vaut 2(k + m + 1). Comme k + m + 1 est entier, la somme est paire. Les deux exemples n’examinent que deux couples parmi tous les couples possibles.',
    criterion: 'J’ai pris deux entiers impairs quelconques et ramené la conclusion à la définition de la parité.',
    transfer: 'La somme d’un entier pair et d’un entier impair peut-elle être paire ? Justifie.',
    transferSolution: 'Avec 2k et 2m + 1, la somme est 2(k + m) + 1, donc toujours impaire.',
    recall: ['Quel travail transforme une conjecture en théorème ?', 'Une démonstration qui déduit l’énoncé des hypothèses et des résultats admis ou prouvés.']
  },
  {
    id: 'fondements-2', title: 'Nombres, opérations et structures numériques', source: 'reels', prerequisite: 'Savoir comparer et simplifier des fractions.',
    objective: 'Classer des nombres dans ℕ, ℤ, ℚ et ℝ, puis vérifier si une opération conserve un ensemble.',
    sections: [
      ['Des ensembles emboîtés', 'On prend ici ℕ = {0, 1, 2, …}. ℤ y ajoute les entiers négatifs. ℚ contient les quotients a/b d’entiers avec b ≠ 0. ℝ contient ℚ et des nombres irrationnels, par exemple √2. Les inclusions ℕ ⊂ ℤ ⊂ ℚ ⊂ ℝ sont strictes, comme le montrent −1, 1/2 et √2.'],
      ['Stabilité d’une opération', 'Une opération interne prend deux éléments de l’ensemble et y donne un résultat pour chaque couple. L’addition et la multiplication sont internes sur ℕ. La soustraction ne l’est pas, car 1 − 3 donne −2. La division entre rationnels reste rationnelle lorsque le diviseur est non nul.'],
      ['Propriétés de calcul', 'La commutativité permet de permuter les facteurs ou les termes. L’associativité permet de déplacer les parenthèses dans une somme ou un produit. La distributivité donne a(b + c) = ab + ac. Ces propriétés dépendent de l’opération. Par exemple, (8 − 3) − 2 = 3 tandis que 8 − (3 − 2) = 7. Dans Exo7, relève les propriétés de la somme et du produit dans ℝ.']
    ],
    prompt: 'Donne le plus petit ensemble parmi ℕ, ℤ, ℚ et ℝ contenant chacun de ces nombres. −15/3, 0, √9 et 0,125. Explique ensuite pourquoi ℤ n’est pas stable par division de deux entiers dont le diviseur est non nul.',
    solution: '−15/3 = −5 relève de ℤ. 0 et √9 = 3 relèvent de ℕ. 0,125 = 1/8 relève de ℚ. Enfin, 1 et 2 appartiennent à ℤ et 1/2 n’y appartient pas.',
    criterion: 'J’ai simplifié chaque écriture et donné un contre-exemple avec un diviseur autorisé.',
    transfer: 'Justifie que la somme de deux rationnels est rationnelle, même si les dénominateurs diffèrent.',
    transferSolution: 'Si b et d sont non nuls, a/b + c/d = (ad + bc)/(bd), quotient de deux entiers dont le dénominateur est non nul.',
    recall: ['Que signifie « stable par multiplication » ?', 'Le produit de deux éléments de l’ensemble appartient encore à cet ensemble.']
  },
  {
    id: 'fondements-3', title: 'Ensembles, relations et applications', source: 'ensembles', prerequisite: 'Reconnaître une égalité et savoir lire une paire ordonnée.',
    objective: 'Calculer une union et une intersection, puis déterminer si une relation est une application.',
    sections: [
      ['Appartenance et inclusion', 'La notation x ∈ A concerne un élément, alors que A ⊆ B indique que chaque élément de A appartient à B. Pour A = {1, 2} et B = {2, 3}, A ∪ B = {1, 2, 3} et A ∩ B = {2}. La différence A ∖ B vaut {1}.'],
      ['Des couples aux applications', 'Une relation entre A et B est un sous-ensemble de A × B, l’ensemble des couples (a, b). Elle représente une application A → B si chaque a de A possède exactement une image dans B. Sur A = {0, 1}, les couples (0, 2) et (1, 2) définissent une application vers {2, 3}. L’image vaut {2}, alors que l’ensemble d’arrivée vaut {2, 3}.'],
      ['Comparer les images', 'Une application est injective si des éléments distincts ont des images distinctes. Elle est surjective si chaque élément d’arrivée est atteint, et bijective si les deux conditions sont réunies. Une relation peut aussi servir à regrouper des éléments. Sur ℤ, avoir la même parité forme deux classes, celle des pairs et celle des impairs. Dans Exo7, compare les diagrammes des applications injectives et surjectives.']
    ],
    prompt: 'Soient A = {1, 2, 3} et B = {2, 3, 4}. Donne A ∩ B et A ∪ B. Les couples (1, 2), (2, 2), (3, 4) définissent-ils une application A → B ? Est-elle injective ou surjective ?',
    solution: 'A ∩ B = {2, 3} et A ∪ B = {1, 2, 3, 4}. Chaque élément de A a une image unique dans B. L’application n’est pas injective puisque 1 et 2 ont la même image. Elle n’est pas surjective puisque 3 dans B n’a pas d’antécédent.',
    criterion: 'J’ai contrôlé chaque élément de départ, puis identifié une collision et un élément d’arrivée non atteint.',
    transfer: 'Change un seul des trois couples pour rendre l’application bijective.',
    transferSolution: 'Remplace (2, 2) par (2, 3). Les trois images sont alors distinctes et couvrent B.',
    recall: ['Quelles conditions distinguent une relation et une application ?', 'Chaque élément de départ a une image, et cette image est unique.']
  },
  {
    id: 'fondements-4', title: 'Logique et quantificateurs', source: 'logique', prerequisite: 'Savoir lire les symboles ∈ et ⊆.',
    objective: 'Nier une proposition quantifiée et distinguer implication, réciproque et contraposée.',
    sections: [
      ['Quantifier', '∀ signifie « pour tout » et ∃ signifie « il existe au moins un ». Il faut indiquer le domaine. « Pour tout entier n, il existe un entier m tel que m > n » est vrai avec m = n + 1. « Il existe un entier m plus grand que tous les entiers n » est faux, en prenant n = m. L’ordre des quantificateurs compte.'],
      ['Nier sans changer le domaine', 'La négation de ∀x P(x) est ∃x ¬P(x), et celle de ∃x P(x) est ∀x ¬P(x). On inverse chaque quantificateur dans le même ordre et on nie le prédicat final. Par exemple, la négation de « tous les x de A sont positifs ou nuls » est « au moins un x de A est strictement négatif ».'],
      ['Relier deux propositions', 'P ⇒ Q est fausse exactement lorsque P est vraie et Q fausse. Sa réciproque est Q ⇒ P. Sa contraposée est ¬Q ⇒ ¬P et elle a toujours la même valeur de vérité que l’implication. Relis dans Exo7 la table de vérité et explique pourquoi un cas où P est fausse ne réfute pas l’implication.']
    ],
    prompt: 'Nie la phrase « Pour tout entier n, il existe un entier m tel que m > n ». Écris ensuite la réciproque de « si n est divisible par 6, alors n est divisible par 3 » et teste-la.',
    solution: 'La négation est « il existe un entier n tel que, pour tout entier m, m ≤ n ». La réciproque affirme que tout multiple de 3 est multiple de 6, ce que contredit n = 9.',
    criterion: 'J’ai inversé les deux quantificateurs dans le même ordre, nié correctement l’inégalité et testé la réciproque.',
    transfer: 'Écris la contraposée de l’implication sur la divisibilité et explique pourquoi elle est vraie.',
    transferSolution: 'Si n n’est pas divisible par 3, alors il n’est pas divisible par 6. En effet, tout n = 6k s’écrit aussi n = 3(2k).',
    recall: ['Comment nier « ∀x ∈ A, ∃y ∈ B, P(x,y) » ?', '∃x ∈ A, ∀y ∈ B, ¬P(x,y).']
  },
  {
    id: 'fondements-5', title: 'Démonstrations et contre-exemples', source: 'logique', prerequisite: 'Manier l’implication et sa contraposée.',
    objective: 'Choisir entre une preuve directe, une contraposée, un raisonnement par l’absurde et un contre-exemple.',
    sections: [
      ['Preuve directe', 'Partir des hypothèses et déduire la conclusion. Si n est divisible par 4, alors n = 4k pour un entier k. Donc n = 2(2k) est pair. La rédaction fait apparaître l’entier 2k qui satisfait la définition.'],
      ['Contraposée et absurde', 'Pour montrer que n² pair entraîne n pair, suppose n impair. Alors n = 2k + 1 et n² = 2(2k² + 2k) + 1 est impair. C’est la contraposée. Pour une preuve par l’absurde, on suppose les hypothèses et la négation de la conclusion, puis on déduit une contradiction. Ici, supposer n² pair et n impair conduit à dire que n² est à la fois pair et impair.'],
      ['Réfuter un énoncé universel', 'Un seul contre-exemple suffit s’il respecte les hypothèses et contredit la conclusion. L’énoncé « tout entier positif impair est premier » est réfuté par 9 = 3 × 3. Un exemple de nombre pair et composé ne convient pas. Dans Exo7, repère les hypothèses conservées dans les preuves par contraposée.']
    ],
    prompt: 'Prouve par contraposée que si le produit ab de deux entiers est impair, alors a et b sont impairs. Donne ensuite un contre-exemple à « si ab est pair, alors a et b sont pairs ». ',
    solution: 'Si a ou b est pair, le produit est pair, car un facteur s’écrit 2k et ab est donc un multiple de 2. Cela prouve la première implication par contraposée. Avec a = 2 et b = 3, ab est pair et b est impair, ce qui réfute le second énoncé.',
    criterion: 'J’ai bien nié « a et b sont impairs » et vérifié les hypothèses de mon contre-exemple.',
    transfer: 'En utilisant le résultat sur n², montre par l’absurde qu’il n’existe pas d’entiers n et k tels que n² = 4k + 2.',
    transferSolution: 'Cette égalité rend n² pair, donc n pair. Alors n = 2m et n² = 4m². L’égalité imposerait 4(m² − k) = 2, ce qui est impossible dans ℤ.',
    recall: ['Que doit vérifier un contre-exemple à « pour tout x, P(x) ⇒ Q(x) » ?', 'Il doit appartenir au domaine, vérifier P et rendre Q fausse.']
  },
  {
    id: 'fondements-6', title: 'Récurrence, conjectures et résolution de problèmes', source: 'logique', prerequisite: 'Comprendre les implications et calculer avec des expressions littérales.',
    objective: 'Établir une conjecture par récurrence et expliquer le rôle du premier rang.',
    sections: [
      ['Explorer un motif', 'Les sommes 1, 1 + 2 et 1 + 2 + 3 donnent 1, 3 et 6. On peut conjecturer que la somme Sₙ des entiers de 1 à n vaut n(n + 1)/2. L’égalité doit encore être établie pour tous les entiers n ≥ 1.'],
      ['Initialiser et transmettre', 'Au rang 1, S₁ = 1 = 1 × 2/2. Pour un n ≥ 1 arbitraire, suppose Sₙ = n(n + 1)/2. Alors Sₙ₊₁ = Sₙ + n + 1 = (n + 1)(n + 2)/2. Le principe de récurrence conclut pour tous les rangs à partir de 1.'],
      ['Repérer une chaîne sans départ', 'L’implication P(n) ⇒ P(n + 1) peut être vraie alors même que P(1) est fausse. Pour P(n) : « n ≥ 10 », l’implication est vraie dès n ≥ 1, mais le premier rang où P devient vraie est 10. Dans Exo7 et au MIT, repère à quel rang commence chaque preuve et à quelles valeurs elle s’applique.']
    ],
    prompt: 'Démontre par récurrence que 2 + 4 + ⋯ + 2n = n(n + 1) pour tout entier n ≥ 1.',
    solution: 'Pour n = 1, 2 = 1 × 2. Supposons l’égalité vraie au rang n. En ajoutant 2(n + 1), on obtient n(n + 1) + 2(n + 1) = (n + 1)(n + 2). C’est exactement l’égalité au rang n + 1. On conclut par récurrence.',
    criterion: 'J’ai donné le premier rang, annoncé l’hypothèse au rang n et obtenu exactement la formule au rang n + 1.',
    transfer: 'Démontre que 3ⁿ ≥ 1 + 2n pour tout n ≥ 0.',
    transferSolution: 'Pour n = 0, les deux membres valent 1. Si 3ⁿ ≥ 1 + 2n, alors 3ⁿ⁺¹ ≥ 3 + 6n ≥ 3 + 2n = 1 + 2(n + 1), car n ≥ 0.',
    recall: ['Quelles sont les deux vérifications d’une récurrence simple ?', 'Prouver le premier rang, puis établir P(n) ⇒ P(n + 1) pour un n arbitraire à partir de ce rang.']
  }
];

const mathDiagnosticItems = [
  ['Fractions', 'Combien vaut 1/2 + 1/3 ?', ['2/5', '5/6', '1/6'], 1, 'Pour additionner, exprime les deux fractions en sixièmes. 3/6 + 2/6 = 5/6.', 'Calcule 1/4 + 1/6.', '5/12'],
  ['Puissances', 'Combien vaut 2³ × 2² ?', ['32', '64', '16'], 0, 'Même base et produit de puissances. On additionne les exposants, donc 2⁵ = 32.', 'Calcule 3² × 3³.', '243'],
  ['Racines', 'Combien vaut √49 ?', ['−7', '−7 ou 7', '7'], 2, 'La racine carrée donne le nombre positif ou nul dont le carré vaut 49. L’équation x² = 49 admet deux solutions.', 'Calcule √81.', '9'],
  ['Pourcentages', 'Combien vaut 15 % de 80 ?', ['12', '15', '68'], 0, 'Multiplie la quantité par 15/100. 80 × 0,15 = 12.', 'Calcule 25 % de 60.', '15'],
  ['Calcul littéral', 'Quelle expression est égale à 3(x − 2) + x ?', ['3x − 6', '4x − 6', '4x − 2'], 1, 'Distribue 3 à chacun des deux termes, puis regroupe 3x et x.', 'Développe et réduis 2(x + 3) − x.', 'x + 6'],
  ['Équations', 'Résous 3x − 4 = 8.', ['12', '4/3', '4'], 2, 'Ajoute 4 aux deux membres, puis divise les deux membres par 3.', 'Résous 2x + 5 = 13.', '4'],
  ['Lecture graphique', 'Sur le graphique, quelle est l’ordonnée du point d’abscisse 2 ?', ['2', '3', '4'], 1, 'Repère 2 sur l’axe horizontal, rejoins le point A puis lis la hauteur 3 sur l’axe vertical.', 'Quelle est l’ordonnée de B, d’abscisse 1 ?', '1']
];

function mathFoundationSource(key) {
  const [title,url,language,scope,credit] = mathFoundationSources[key];
  return `<p><a href="${url}" target="_blank" rel="noopener">${title}</a> · ${credit} · ${language} · accès libre, connexion requise · ${scope} · consulté le 28/11/2026.</p>`;
}

function showMathFoundationIndex(content) {
  const done = mathFoundationLessons.filter(({id})=>S.done['math-'+id]).length;
  const lessons=mathFoundationLessons.map(({id,title})=>{
    const review=S.reviews?.['math-'+id+'-rappel'];
    const reminder=review ? (reviewDue(review) ? ' · Rappel à faire' : ' · Rappel le '+e(reviewDate(review))) : '';
    return `<li><button type="button" class="title-action" data-math-open="${id}">${title}${S.done['math-'+id]?' ✓':''}</button>${reminder}</li>`;
  }).join('');
  content.innerHTML = `<article class="card"><h3>Commencer le cycle</h3>
    <p>Apprendre à formuler un énoncé précis, à vérifier un raisonnement et à rédiger une preuve. Le diagnostic est facultatif. Toutes les leçons sont accessibles.</p>
    <button type="button" data-math-open="diagnostic">Faire le diagnostic</button>
    <p>${done} / ${mathFoundationLessons.length} leçons autoévaluées</p>
    <ol>${lessons}</ol>
    <p>Pour une séance, lis le cours, fais le quiz puis rédige l’exercice. Le parcours universitaire ajoute le transfert et le séminaire. Chaque leçon propose aussi une recherche facultative.</p></article>`;
  content.querySelectorAll('[data-math-open]').forEach(button=>button.onclick=()=>showMath(button.dataset.mathOpen));
}

function showMathDiagnostic(content) {
  const key = 'math-diagnostic';
  const saved = (S.notes[key]||'').split(',');
  const graph = `<figure><svg viewBox="0 0 220 176" width="220" style="max-width:100%" role="img" aria-label="Repère gradué. A est à l’intersection de la verticale x égale 2 et de l’horizontale y égale 3. B est à l’intersection de x égale 1 et y égale 1.">
    <path d="M40 145H205 M40 155V13" stroke="currentColor" fill="none"/>
    <path d="M75 145V110H40 M110 145V40H40" stroke="currentColor" stroke-dasharray="4 4" fill="none"/>
    <circle cx="75" cy="110" r="4" fill="currentColor"/><circle cx="110" cy="40" r="4" fill="currentColor"/>
    <g font-size="14" fill="currentColor"><text x="70" y="166">1</text><text x="105" y="166">2</text><text x="26" y="114">1</text><text x="26" y="44">3</text><text x="118" y="36">A</text><text x="83" y="105">B</text><text x="198" y="136">x</text><text x="46" y="23">y</text></g>
  </svg></figure>`;
  content.innerHTML = `<article class="card"><h3>Sept repères pour démarrer</h3>
    <p>Réponds aux questions que tu peux traiter. Les questions laissées vides donnent aussi accès à une remise à niveau.</p>
    <form>${mathDiagnosticItems.map(([topic,prompt,choices],i)=>`<fieldset style="min-inline-size:0"><legend>${topic}</legend><p>${prompt}</p>${i===6?graph:''}
      ${choices.map((choice,j)=>`<p><label><input type="radio" name="q${i}" value="${j}" ${saved[i]===String(j)?'checked':''}> ${choice}</label></p>`).join('')}</fieldset>`).join('')}
      <button type="submit">Voir mon bilan</button></form><p role="status"></p><div data-diagnostic-result></div>
      ${mathFoundationSource('diagnostic')}</article>`;
  const form = content.querySelector('form');
  const result = content.querySelector('[data-diagnostic-result]');
  function showResult(answers, stored) {
    const revision = mathDiagnosticItems.filter((item,i)=>answers[i]!==String(item[3]));
    content.querySelector('[role="status"]').textContent = `${mathDiagnosticItems.length-revision.length} / ${mathDiagnosticItems.length} repères acquis.${stored?'':' Le bilan n’a pas pu être enregistré.'}`;
    result.innerHTML = revision.map(([topic,,,,explanation,retry,answer])=>`<details><summary>Revoir ${topic.toLowerCase()}</summary>
      <p>${explanation}</p><p>${retry}</p><details><summary>Vérifier</summary><p>${answer}</p></details></details>`).join('');
  }
  if (S.notes[key]!==undefined) showResult(saved,true);
  form.onsubmit = event=>{
    event.preventDefault();
    const data = new FormData(form);
    const answers = mathDiagnosticItems.map((_,i)=>data.get('q'+i)||'');
    showResult(answers,storeMathRecord('notes',key,answers.join(',')));
  };
}

function showMathFoundationLesson(content,lesson) {
  const key='math-'+lesson.id;
  const model=lesson.id==='fondements-1';
  const guide=mathFoundationGuides[lesson.id];
  const quiz=model ? mathModelQuiz : guide.quiz;
  const cards=mathFoundationCards(lesson);
  const initial=S.notes[key+'-tentative'] || '';
  content.innerHTML=`<article class="card">
    <p><strong>Prérequis</strong> · ${lesson.prerequisite}</p>
    ${model ? mathModelCourse() : mathFoundationCourse(lesson,guide)}
    <h3>Lecture guidée et bibliographie</h3>${mathFoundationSource(lesson.source)}
    ${lesson.id==='fondements-6'?mathSource('recurrence'):''}
    ${mathModelQuizMarkup(quiz)}
    <h3>Exercice rédigé</h3><p>${lesson.prompt}</p>
    <p>${model?'Objectif 2':'Objectifs 1 et 2'} · ${mathSectionLinks(model?[3]:guide.exercise)}</p>
    <form data-math-proof><label for="math-reasoning">Mon raisonnement</label><textarea id="math-reasoning" name="reasoning" required maxlength="12000">${e(S.notes[key+'-brouillon'])}</textarea>
    <button type="submit">Comparer au corrigé</button><p role="status"></p></form>
    <section data-math-solution hidden><h4>Corrigé</h4><p>${lesson.solution}</p>
    <details><summary>Retrouver ma première tentative</summary><p data-math-first style="white-space:pre-wrap"></p></details>
    <p>Relis ton raisonnement à partir de ce critère.</p>
    ${model?'<ul><li>Écritures des impairs correctes.</li><li>Factorisation justifiée.</li><li>Conclusion générale et portée des exemples expliquées.</li></ul><p><a href="#math-section-2" data-math-jump>Revoir la portée de la preuve (section 2)</a></p>':''}
    <label><input type="checkbox" data-math-assessed ${S.done[key]?'checked':''}> ${lesson.criterion}</label>
    <p data-math-assessment-status role="status"></p></section>
    <h3>Problème de transfert</h3><p>${lesson.transfer}</p>
    <label for="math-transfer">Mon essai de transfert</label><textarea id="math-transfer" data-math-transfer maxlength="12000">${e(S.notes[key+'-transfert'])}</textarea>
    <p data-math-transfer-status role="status"></p>
    <details><summary>Consulter le corrigé du transfert</summary><p>${lesson.transferSolution}</p></details>
    ${model ? mathModelSeminar() : mathFoundationSeminar(key,guide)}
    <h3>Révision espacée</h3>
    ${cards.map(({key:cardKey,question,answer},i)=>{
      const review=S.reviews?.[cardKey];
      return `<section data-math-card="${i}"><p>${question}</p>
        <details><summary>Révéler la réponse</summary><p>${answer}</p>
        <button type="button" data-math-recall="yes">Retrouvée de mémoire</button>
        <button type="button" data-math-recall="no">À revoir</button></details>
        <p data-math-review-status role="status">${review?'Prochain rappel le '+e(reviewDate(review)):'Carte à découvrir'}</p></section>`;
    }).join('')}
    <details><summary>Bilan éditorial</summary><p>Contrôle interne des raisonnements, des renvois et de la couverture des objectifs. Les lectures externes sont facultatives. ${model?'La proposition d’Euclide est citée par lien et reformulée dans le cours.':'Les tableaux et les cas calculés sont des supports pédagogiques originaux. Les lectures mathématiques sont citées par lien.'} Relecture indépendante à organiser.</p></details>
  </article>`;
  bindMathAssessments(content,quiz,key);
  const form=content.querySelector('[data-math-proof]');
  const reasoning=form.elements.reasoning;
  const status=form.querySelector('[role="status"]');
  const solution=content.querySelector('[data-math-solution]');
  const first=content.querySelector('[data-math-first]');
  const assessed=content.querySelector('[data-math-assessed]');
  function reveal(attempt) {
    first.textContent=attempt;
    solution.hidden=false;
  }
  if(initial) reveal(initial);
  reasoning.oninput=()=>{status.textContent=storeMathRecord('notes',key+'-brouillon',reasoning.value)?'Brouillon enregistré.':'Enregistrement impossible sur cet appareil.';};
  form.onsubmit=event=>{
    event.preventDefault();
    const attempt=reasoning.value.trim();
    if(!attempt){status.textContent='Rédige ton raisonnement avant de consulter le corrigé.';return;}
    const original=S.notes[key+'-tentative'] || attempt;
    if(!storeMathRecord('notes',key+'-tentative',original)){status.textContent='La tentative n’a pas pu être enregistrée.';return;}
    reveal(original);
    status.textContent='Tentative enregistrée. Le corrigé est disponible ci-dessous.';
  };
  assessed.onchange=()=>{
    const saved=storeMathRecord('done',key,assessed.checked);
    if(!saved) assessed.checked=Boolean(S.done[key]);
    content.querySelector('[data-math-assessment-status]').textContent=saved?'Autoévaluation enregistrée.':'Enregistrement impossible.';
  };
  const transfer=content.querySelector('[data-math-transfer]');
  transfer.oninput=()=>{
    content.querySelector('[data-math-transfer-status]').textContent=storeMathRecord('notes',key+'-transfert',transfer.value)?'Essai enregistré.':'Enregistrement impossible.';
  };
  content.querySelectorAll('[data-math-recall]').forEach(button=>button.onclick=()=>{
    const card=button.closest('[data-math-card]');
    const reviewKey=cards[Number(card.dataset.mathCard)].key;
    const next=nextMemoryReview(S.reviews?.[reviewKey],button.dataset.mathRecall==='yes',localStudyDate());
    card.querySelector('[data-math-review-status]').textContent=storeMathRecord('reviews',reviewKey,next)
      ? 'Prochain rappel le '+reviewDate(next) : 'Le rappel n’a pas pu être enregistré.';
  });
}

const mathModelObjectives = [
  'Classer un énoncé parmi définition, axiome, conjecture et théorème, puis justifier ce classement.',
  'Expliquer la différence entre des exemples et une preuve générale, puis rédiger une preuve de parité.'
];

const mathModelQuiz = [
  [0, 1, '« Un entier pair est un entier de la forme 2k » fixe le sens du mot pair. De quel type d’énoncé s’agit-il ?',
    ['Définition', 'Axiome', 'Théorème'], 0, 'La phrase précise le sens d’un terme.'],
  [0, 1, 'Une règle est admise comme point de départ d’une théorie. Quel est son rôle ?',
    ['Conjecture', 'Axiome', 'Théorème'], 1, 'Un axiome fournit une prémisse que la théorie admet.'],
  [0, 2, 'Après dix essais, une règle générale semble vraie. Aucune preuve n’a encore été donnée. Quel est son statut ?',
    ['Théorème', 'Définition', 'Conjecture'], 2, 'Les essais motivent une conjecture. Une démonstration est nécessaire pour en faire un théorème.'],
  [0, 2, 'La somme de deux entiers pairs a été démontrée paire pour tous les entiers pairs. Quel est désormais le statut de ce résultat ?',
    ['Conjecture', 'Théorème', 'Axiome'], 1, 'Le résultat découle d’une preuve qui porte sur deux entiers pairs quelconques.'],
  [1, 3, 'Quelle démarche prouve que la somme de deux entiers impairs est paire ?',
    ['Vérifier trois sommes', 'Supposer les deux nombres positifs', 'Écrire les deux entiers 2k + 1 et 2m + 1, puis factoriser la somme'], 2,
    'Les paramètres entiers k et m sont quelconques. La somme vaut 2(k + m + 1), ce qui vérifie la définition.']
];

function mathFoundationCards(lesson) {
  if (lesson.id === 'fondements-1') return mathModelCards(lesson);
  const key='math-'+lesson.id+'-rappel';
  return [lesson.recall,...mathFoundationGuides[lesson.id].terms].map(([question,answer],i)=>({
    key:key+(i ? '-notion-'+i : ''),question,answer
  }));
}

function mathModelCards(lesson) {
  const key='math-'+lesson.id+'-rappel';
  return [
    {key,question:lesson.recall[0],answer:lesson.recall[1]},
    {key:key+'-definition',question:'Quel rôle joue une définition ?',answer:'Elle fixe le sens d’un terme. Par exemple, être pair signifie être de la forme 2k avec k entier.'},
    {key:key+'-axiome',question:'À quoi reconnaît-on un axiome dans une théorie ?',answer:'Il y est admis comme point de départ pour déduire des résultats.'},
    {key:key+'-conjecture',question:'Quel statut donner à une règle suggérée par quelques exemples et encore à démontrer ?',answer:'C’est une conjecture.'},
    {key:key+'-portee',question:'Comment faire apparaître la portée générale d’une preuve de parité ?',answer:'Partir d’entiers quelconques satisfaisant les hypothèses, les écrire avec des paramètres entiers, puis déduire la conclusion sans fixer leurs valeurs.'},
    {key:key+'-transfert',question:'Quelle expression justifie que deux entiers impairs ont une somme paire ?',answer:'(2k + 1) + (2m + 1) = 2(k + m + 1), où k + m + 1 est entier.'}
  ];
}

function mathModelCourse() {
  return `<section aria-labelledby="math-problem"><h3 id="math-problem">Problématique</h3>
    <p>Qu’est-ce qui autorise à dire qu’une règle est vraie pour tous les cas ? On suivra un résultat depuis les premiers essais jusqu’à une preuve, puis on examinera un exemple de construction géométrique.</p>
    <p><strong>Objectifs</strong></p><ol>${mathModelObjectives.map(text=>`<li>${text}</li>`).join('')}</ol>
    <nav aria-label="Plan de la leçon"><h3>Plan</h3><ol>
      <li><a href="#math-section-1" data-math-jump>Définir et poser les règles</a></li>
      <li><a href="#math-section-2" data-math-jump>Passer de l’observation à la preuve</a></li>
      <li><a href="#math-section-3" data-math-jump>Contrôler la portée d’une preuve</a></li>
      <li><a href="#math-section-4" data-math-jump>Étudier une construction d’Euclide</a></li>
      <li><a href="#math-section-5" data-math-jump>Synthèse</a></li>
    </ol></nav></section>
    <p><strong>Socle essentiel · 30 à 45 min</strong> · Sections 1 à 3 et synthèse, quiz et exercice rédigé.</p>
    <section><h3 id="math-section-1" tabindex="-1">1. Définir et poser les règles</h3>
    <p>Une définition fixe le sens d’un terme. Un entier pair s’écrit 2k et un entier impair s’écrit 2k + 1, avec k entier. Par exemple, −5 = 2 × (−3) + 1 est impair. Une définition permet de reconnaître un objet ou de traduire une propriété en écriture exploitable.</p>
    <p>Un axiome est un énoncé admis comme point de départ d’une théorie. Il sert de prémisse dans une démonstration. En géométrie euclidienne, on admet par exemple qu’on peut tracer un segment joignant deux points. On rencontre aussi le terme « postulat » pour une règle initiale de ce type.</p></section>
    <section><h3 id="math-section-2" tabindex="-1">2. Passer de l’observation à la preuve</h3>
    <p>Les sommes 2 + 4 et 6 + 8 sont paires. Elles suggèrent une conjecture, c’est-à-dire un énoncé proposé dont on cherche une preuve ou une réfutation. Un théorème est un énoncé établi par une démonstration.</p>
    <p>Prenons deux entiers pairs quelconques a et b. Par définition, il existe des entiers k et m tels que a = 2k et b = 2m. Par distributivité, a + b = 2(k + m). Comme la somme k + m est entière, a + b est pair. Le raisonnement couvre tous les choix de a et b qui satisfont l’hypothèse.</p></section>
    <section><h3 id="math-section-3" tabindex="-1">3. Contrôler la portée d’une preuve</h3>
    <p>Avant d’utiliser une preuve, relève ses hypothèses et sa conclusion. La preuve de la section 2 couvre les nombres pairs négatifs, puisque k et m peuvent être négatifs. Pour les impairs, l’écriture de départ change. Entraîne-toi à poser a = 2k + 1 et b = 2m + 1, puis à regrouper les termes constants avant de factoriser par 2.</p>
    <p>Une preuve universelle explique pourquoi aucun cas autorisé n’échappe à l’argument. Un contre-exemple suffit à réfuter une règle universelle dès lors qu’il satisfait les hypothèses et contredit la conclusion.</p></section>
    <p><strong>Approfondissement universitaire · 1 h 30 à 2 h au total</strong> · Ajoute l’étude du document, le problème de transfert et le séminaire.</p>
    <section><h3 id="math-section-4" tabindex="-1">4. Étudier une construction d’Euclide</h3>
    <p><strong>Document étudié</strong> · Euclide, <cite>Éléments</cite>, livre I, proposition 1. L’édition numérique commentée de David E. Joyce (Clark University) est citée par lien. Le résumé ci-dessous est une reformulation pédagogique. </p>
    <figure><svg viewBox="0 0 240 160" width="240" style="max-width:100%" role="img" aria-label="Deux cercles de même rayon. A et B sont leurs centres. Le point C est sur les deux cercles. Le triangle ABC relie ces trois points.">
      <g fill="none" stroke="currentColor" stroke-width="1.4"><circle cx="89" cy="80" r="62"/><circle cx="151" cy="80" r="62"/><path d="M89 80H151L120 26.306Z" stroke-width="2.8"/></g>
      <g fill="currentColor" font-size="12"><text x="78" y="94">A</text><text x="153" y="94">B</text><text x="116" y="20">C</text></g>
    </svg><figcaption>Schéma original. Construction idéale à partir du segment AB.</figcaption></figure>
    <p>À partir d’un segment AB de longueur positive, on trace deux cercles de rayon AB, centrés sur A et B. En choisissant un point commun C, on obtient AC = AB et BC = AB parce que C est sur les deux cercles. On déduit AC = BC et les trois côtés sont donc égaux. La construction illustre le rôle distinct d’une règle de tracé, des définitions et des déductions.</p>
    <p><strong>Limite</strong> · L’existence du point commun est utilisée. Le dessin peut guider l’intuition. La justification de cette intersection demande un argument supplémentaire dans une formalisation rigoureuse.</p>
    <p><a href="https://mathcs.clarku.edu/~djoyce/elements/bookI/propI1.html" target="_blank" rel="noopener">Lire la proposition et son commentaire (anglais, connexion requise)</a> · Consulté le 28/11/2026.</p></section>
    <section><h3 id="math-section-5" tabindex="-1">5. Synthèse</h3>
    <dl><dt>Définition</dt><dd>Fixe le sens d’un terme.</dd><dt>Axiome</dt><dd>Fournit un point de départ admis dans la théorie.</dd>
    <dt>Conjecture</dt><dd>Énoncé proposé dont le statut reste à établir.</dd><dt>Théorème</dt><dd>Énoncé établi par une démonstration.</dd></dl>
    <p>Dans une preuve, indique le domaine, les hypothèses et la conclusion. Vérifie que chaque étape s’applique à tous les cas annoncés.</p></section>
    <section><h3>Recherche facultative · 3 à 5 h au total</h3>
    <p>Compare la proposition, les définitions et le commentaire de Joyce. Repère les étapes d’Euclide qui mobilisent une définition ou une règle initiale. Discute ce qu’il faudrait ajouter pour justifier l’existence de C. La recherche externe et cette extension sont facultatives.</p></section>`;
}

function mathModelQuizMarkup(quiz) {
  return `<section><h3>Quiz de compréhension</h3><form data-math-model-quiz>
  ${quiz.map(([objective,section,question,options],i)=>`<fieldset style="min-inline-size:0"><legend>${i+1}. ${question}</legend>
    <p>Objectif ${objective+1} · <a href="#math-section-${section}" data-math-jump>Section ${section}</a></p>
    ${options.map((option,j)=>`<p><label><input required type="radio" name="item${i}" value="${j}"> ${option}</label></p>`).join('')}
    <p data-math-quiz-feedback role="status"></p></fieldset>`).join('')}
    <button type="submit">Corriger le quiz</button><p data-math-quiz-score role="status"></p></form></section>`;
}

function mathModelSeminar() {
  return `<section><h3>Séminaire · Évaluer une justification</h3>
  <p><strong>Dossier intégré</strong> · Ana affirme que la somme de deux impairs est paire parce que 3 + 5 = 8 et 5 + 7 = 12. Bilal pose deux entiers impairs quelconques et les écrit 2k + 1 et 2m + 1. Les écritures de parité et la portée des exemples sont traitées aux sections 1 à 3.</p>
  <p>Compare les deux démarches. Rédige l’argument de Bilal jusqu’à la conclusion, puis explique pourquoi l’hypothèse « deux nombres impairs » est importante en donnant un contre-exemple si l’un des deux est pair.</p>
  <label for="math-seminar">Ma réponse au séminaire</label><textarea id="math-seminar" maxlength="12000">${e(S.notes['math-fondements-1-seminaire'])}</textarea><p data-math-seminar-status role="status"></p>
  <details><summary>Corrigé indicatif et barème sur 6</summary>
    <ol><li>2 points · Deux exemples soutiennent la conjecture. Ils ne vérifient que deux couples (section 2).</li>
    <li>2 points · Pour k et m entiers quelconques, (2k + 1) + (2m + 1) = 2(k + m + 1), avec k + m + 1 entier (sections 1 et 3).</li>
    <li>2 points · Par exemple, 2 + 3 = 5. Ce couple montre que la conclusion peut échouer si l’un des deux entiers est pair (section 3).</li></ol>
    <p>Une autre rédaction ou un autre contre-exemple correct reçoit les mêmes points.</p>
  </details></section>`;
}

function bindMathAssessments(content,quiz,key) {
  content.querySelectorAll('[data-math-jump]').forEach(link=>link.onclick=event=>{
    event.preventDefault();
    const heading=content.querySelector(link.getAttribute('href'));
    heading.focus();
    heading.scrollIntoView({block:'start'});
  });
  const form=content.querySelector('[data-math-model-quiz]');
  form.onsubmit=event=>{
    event.preventDefault();
    const answers=new FormData(form);
    const feedback=form.querySelectorAll('[data-math-quiz-feedback]');
    let score=0;
    quiz.forEach(([,section,,options,expected,explanation],i)=>{
      const correct=answers.get('item'+i)===String(expected);
      if(correct) score++;
      feedback[i].textContent=`${correct?'Correct.':'À revoir.'} ${options[expected]}. ${explanation} Voir section ${section}.`;
    });
    form.querySelector('[data-math-quiz-score]').textContent=`${score} / ${quiz.length} réponses correctes.`;
  };
  const seminar=content.querySelector('#math-seminar');
  seminar.oninput=()=>{
    content.querySelector('[data-math-seminar-status]').textContent=storeMathRecord('notes',key+'-seminaire',seminar.value)
      ? 'Brouillon enregistré.' : 'Enregistrement impossible.';
  };
}

const mathFoundationGuides = {
  'fondements-2': {
    question: 'Pourquoi une opération familière peut-elle faire sortir d’un ensemble de nombres ?',
    objectives: ['Identifier le plus petit ensemble contenant un nombre donné après simplification.', 'Justifier une stabilité ou la réfuter par un contre-exemple admissible.'],
    exercise: [1, 2],
    method: ['Choisir le domaine avant de calculer', 'La fermeture doit être vérifiée pour tous les couples autorisés. Pour démontrer la stabilité de ℚ par addition, écris a/b + c/d = (ad + bc)/(bd). Les deux termes du quotient sont entiers et bd ≠ 0. Pour réfuter une stabilité, un seul résultat extérieur suffit. La division exige toujours un deuxième opérande non nul.'],
    table: [['Addition dans ℕ','2 + 3 = 5','La somme de deux naturels est toujours naturelle.'],['Soustraction dans ℕ','2 − 3 = −1','Ce résultat extérieur réfute la stabilité.'],['Division dans ℤ','1 ÷ 2 = 1/2','Le diviseur est autorisé, mais le quotient sort de ℤ.']],
    quiz: [
      [0,1,'Quel est le plus petit ensemble qui contient −12/4 ?',['ℕ','ℤ','ℚ'],1,'La fraction vaut −3, entier négatif.'],
      [1,2,'Quel calcul réfute la stabilité de ℕ par soustraction ?',['4 − 2','0 − 1','2 + 1'],1,'Les deux opérandes sont naturels et le résultat −1 ne l’est pas.'],
      [1,4,'Pourquoi la somme de deux rationnels reste-t-elle rationnelle ?',['Le dénominateur commun bd est non nul','Toute somme est entière','Les dénominateurs sont forcément égaux'],0,'La mise au même dénominateur donne un quotient d’entiers dont le dénominateur est non nul.']
    ],
    seminar: ['Un corrigé annonce que 0,75 appartient seulement à ℝ, que la soustraction est interne dans ℕ et que le produit de rationnels est rationnel. Examine séparément les trois affirmations.', ['0,75 = 3/4. Son plus petit ensemble dans la chaîne est ℚ (section 1).','0 − 1 = −1 réfute la stabilité par soustraction (section 2).','Le produit ac/bd est rationnel puisque a, b, c et d sont entiers et bd ≠ 0 (sections 2 et 4).']],
    research: 'À partir de la lecture Exo7, distingue les propriétés du produit dans ℝ et celles de la division restreinte aux diviseurs non nuls. Rédige un tableau et justifie deux propriétés.',
    terms: [['Ensemble ℚ','Quotients d’entiers a/b avec b non nul.'],['Opération interne','Opération définie sur tous les couples d’un ensemble et dont les résultats y restent.'],['Distributivité','Dans ℝ, a(b + c) = ab + ac.']]
  },
  'fondements-3': {
    question: 'Comment déterminer si un tableau de correspondances définit une application, et ce qu’elle atteint ?',
    objectives: ['Déterminer union, intersection et différence à partir d’ensembles donnés.', 'Contrôler l’existence et l’unicité des images, puis l’injectivité et la surjectivité.'],
    exercise: [1, 2, 3],
    method: ['Contrôler une correspondance dans les deux sens', 'Sur A = {a, b, c} et B = {1, 2, 3}, lis une fois chaque ligne du tableau. Après avoir constaté une image unique par élément de A, compte les antécédents par élément de B. Une image répétée réfute l’injectivité et une valeur de B absente des images réfute la surjectivité. Modifier B en {1, 2} rend cette application surjective, mais ne supprime pas la collision.'],
    table: [['a','1','1 possède deux antécédents.'],['b','1','La collision entre a et b réfute l’injectivité.'],['c','2','Aucune ligne ne donne 3 comme image.']],
    quiz: [
      [0,1,'Pour A = {1,2} et B = {2,4}, que vaut A ∩ B ?',['{1,2,4}','{2}','{4}'],1,'Seul 2 appartient simultanément à A et à B.'],
      [1,2,'Quand une relation de A vers B est-elle une application ?',['Chaque a de A a exactement une image dans B','Chaque b a un antécédent unique','Deux images par a sont nécessaires'],0,'L’existence et l’unicité concernent les éléments de départ.'],
      [1,4,'Quel changement rend la correspondance du tableau surjective sans la rendre injective ?',['Ajouter 4 à l’arrivée','Retirer 1 de l’arrivée','Prendre {1,2} comme ensemble d’arrivée'],2,'Chaque valeur restante est atteinte, et a et b ont toujours la même image.']
    ],
    seminar: ['Soit f de {0,1,2} vers {4,5,6}, donnée par f(0)=4, f(1)=5 et f(2)=4. Justifie que f est une application, détermine les propriétés qui échouent, puis modifie une image pour rendre f bijective.', ['Chaque élément initial possède exactement une image dans l’ensemble d’arrivée (section 2).','0 et 2 ont la même image, et 6 n’est jamais atteint (sections 3 et 4).','Poser f(2)=6 donne trois images distinctes et couvre l’arrivée (sections 3 et 4).']],
    research: 'Dessine deux diagrammes inspirés des définitions Exo7 : une injection non surjective et une surjection non injective. Explique pourquoi un ensemble d’arrivée explicite est indispensable.',
    terms: [['Intersection','Ensemble des éléments communs aux deux ensembles.'],['Image d’une application','Ensemble des valeurs effectivement atteintes.'],['Bijection','Application injective et surjective.']]
  },
  'fondements-4': {
    question: 'Comment contester précisément une affirmation contenant « tous », « il existe » ou « si » ?',
    objectives: ['Nier une proposition quantifiée sans changer les domaines.', 'Distinguer implication, réciproque et contraposée à partir de leur sens.'],
    exercise: [1, 2, 3],
    method: ['Chercher le cas qui décide', 'Pour nier « pour tout a de A, il existe b de B avec b > a », cherche un a dans A tel qu’aucun b de B ne soit plus grand. Avec A = {1,3} et B = {2,3}, a = 3 suffit, car les deux valeurs de B sont inférieures ou égales à 3. Pour réfuter P ⇒ Q, cherche le cas P vrai et Q faux indiqué dans le tableau.'],
    table: [['P vraie','Q vraie','P ⇒ Q vraie.'],['P vraie','Q fausse','P ⇒ Q fausse.'],['P fausse','Q vraie ou fausse','P ⇒ Q vraie dans les deux cas.']],
    quiz: [
      [0,1,'Quel ordre permet de choisir m = n + 1 ?',['Il existe m tel que, pour tout n, m > n','Pour tout n, il existe m tel que m > n','Pour tout m, pour tout n, m > n'],1,'m peut dépendre de n lorsqu’il est quantifié après n.'],
      [0,2,'Quelle est la négation de « tout entier de A est strictement positif » ?',['Tout entier de A est négatif','Un entier de A vaut nécessairement zéro','Il existe un entier de A inférieur ou égal à zéro'],2,'On échange ∀ et ∃, puis on nie strictement positif.'],
      [1,3,'Quelle formule est la contraposée de P ⇒ Q ?',['¬Q ⇒ ¬P','Q ⇒ P','¬P ⇒ ¬Q'],0,'La contraposée inverse l’ordre et nie les deux propositions.']
    ],
    seminar: ['Dans A = {1,4} et B = {2,3}, examine « tout a admet un b > a ». Écris sa négation et un témoin. Pour l’implication « multiple de 10 ⇒ multiple de 5 », écris la contraposée puis réfute la réciproque.', ['La négation est ∃a ∈ A, ∀b ∈ B, b ≤ a. Le témoin a = 4 convient (sections 2 et 4).','Si n n’est pas multiple de 5, alors n n’est pas multiple de 10 (section 3).','La réciproque échoue pour n = 5, multiple de 5 mais pas de 10 (section 3).']],
    research: 'Compare la table de vérité du cours avec celle d’Exo7. Construis les quatre lignes pour l’implication et sa contraposée, puis explique leur équivalence ligne par ligne.',
    terms: [['Quantificateur universel','∀x affirme la propriété pour chaque élément du domaine.'],['Quantificateur existentiel','∃x affirme qu’au moins un élément du domaine possède la propriété.'],['Réciproque','De P ⇒ Q, on obtient Q ⇒ P en inversant hypothèse et conclusion.']]
  },
  'fondements-5': {
    question: 'Quelle méthode choisir pour démontrer une implication ou réfuter une règle universelle ?',
    objectives: ['Construire une preuve directe ou une preuve par contraposée ou par l’absurde.', 'Construire un contre-exemple qui respecte les hypothèses et contredit la conclusion.'],
    exercise: [1, 2, 3],
    method: ['Rédiger et contrôler le point de départ', 'Pour prouver que n² impair entraîne n impair, le départ direct n = 2k + 1 supposerait déjà la conclusion. Par contraposée, on prend n pair, n = 2k. Alors n² = 4k² = 2(2k²), donc n² est pair. Par l’absurde, on ajoute à cette hypothèse n² impair et on obtient une contradiction. Le même calcul peut servir aux deux raisonnements si le rôle des hypothèses est correctement annoncé. Rappel : tout entier est pair ou impair par division euclidienne par 2. Dans le transfert, un carré d’un entier pair vaut 4m². Il ne peut différer d’un autre multiple de 4 de seulement 2.'],
    table: [['Preuve directe','Supposer P','Déduire Q.'],['Contraposée','Supposer ¬Q','Déduire ¬P.'],['Absurde','Supposer P et ¬Q','Déduire une contradiction.']],
    quiz: [
      [0,1,'Comment commencer une preuve directe de « divisible par 4 ⇒ pair » ?',['Écrire n = 4k pour un entier k','Écrire n = 2k + 1','Supposer n pair'],0,'La preuve directe traduit l’hypothèse de départ.'],
      [0,2,'Que suppose une preuve par l’absurde de P ⇒ Q ?',['Q seule','P et ¬Q','¬P et Q'],1,'On combine l’hypothèse et la négation de la conclusion.'],
      [1,3,'Quel nombre réfute « tout entier positif impair est premier » ?',['2','7','9'],2,'9 est positif, impair et composé.']
    ],
    seminar: ['Prouve de deux manières que n² impair entraîne n impair, puis teste la règle « tout entier composé est pair ». Explique le rôle de chaque hypothèse et donne un contre-exemple si nécessaire.', ['Par contraposée, n = 2k entraîne n² = 2(2k²), pair (sections 2 et 4).','Par l’absurde, supposer n² impair et n pair donne n² pair et impair (sections 2 et 4).','9 est composé (3 × 3) et impair. C’est un contre-exemple admissible (section 3).']],
    research: 'Compare deux démonstrations du chapitre Exo7. Pour chacune, écris le domaine, les hypothèses et la conclusion, puis explique le choix de méthode sans reprendre le texte.',
    terms: [['Contraposée','Preuve de ¬Q ⇒ ¬P pour établir P ⇒ Q.'],['Raisonnement par l’absurde','On suppose les hypothèses et le contraire de la conclusion pour obtenir une contradiction.'],['Contre-exemple','Cas autorisé qui satisfait l’hypothèse et contredit la conclusion.']]
  },
  'fondements-6': {
    question: 'Comment prouver une formule pour tous les rangs sans vérifier une infinité de cas ?',
    objectives: ['Rédiger une récurrence complète et annoncer son domaine de validité.', 'Repérer le rôle du premier rang et distinguer des essais d’une preuve.'],
    exercise: [1, 2, 3],
    method: ['Choisir la bonne expression au rang suivant', 'Pour une somme, isole son dernier terme. Si Tₙ = 2 + 4 + ⋯ + 2n, alors Tₙ₊₁ = Tₙ + 2(n + 1). Une fois l’hypothèse de récurrence substituée, factorise jusqu’à obtenir la formule attendue au rang n + 1. Pour une inégalité, vérifie aussi le signe des multiplicateurs et les conditions du rang.'],
    table: [['Motif','1, 3, 6','Ces premiers calculs suggèrent une formule.'],['Initialisation','S₁ = 1','Le premier rang est prouvé directement.'],['Hérédité','Sₙ₊₁ = Sₙ + n + 1','On déduit la propriété au rang suivant.']],
    quiz: [
      [0,2,'Pour prouver une propriété pour tout n ≥ 1, quels contrôles sont nécessaires ?',['P(1) et l’hérédité pour tout n ≥ 1','L’hérédité seule','P(1), P(2) et P(3) seulement'],0,'Le premier rang démarre la chaîne et l’hérédité la prolonge.'],
      [1,3,'Si P(n) signifie n ≥ 10, que constate-t-on à partir de 1 ?',['P(1) est vraie','L’hérédité est vraie mais P(1) est fausse','L’hérédité échoue pour n = 10'],1,'Dès que la propriété est vraie, elle reste vraie, mais la chaîne ne peut pas démarrer à 1.'],
      [0,4,'Quel terme ajouter à Tₙ = 2 + 4 + ⋯ + 2n pour obtenir Tₙ₊₁ ?',['2n','n + 1','2(n + 1)'],2,'Le nouveau dernier terme est le double du rang n + 1.']
    ],
    seminar: ['Les premières sommes 1, 1+3 et 1+3+5 valent 1, 4 et 9. Établis la formule Uₙ = n² pour les n premiers impairs positifs, puis explique pourquoi les trois essais ne suffisent pas.', ['Au premier rang, U₁ = 1 = 1² (section 2).','Si Uₙ = n², alors Uₙ₊₁ = n² + (2n + 1) = (n + 1)², pour un n ≥ 1 arbitraire (sections 2 et 4).','Les essais suggèrent la règle. L’initialisation et l’hérédité la prouvent pour chaque n ≥ 1 (sections 1 à 3).']],
    research: 'Compare la récurrence sur les sommes avec une preuve par récurrence de la lecture du MIT. Repère le rang initial, l’hypothèse utilisée et la transition.',
    terms: [['Initialisation','Vérification directe de la propriété au premier rang annoncé.'],['Hérédité','Pour un rang arbitraire autorisé, preuve de P(n) ⇒ P(n + 1).'],['Conjecture','Énoncé suggéré par l’exploration et qui reste à établir.']]
  }
};

function mathSectionLinks(sections) {
  return sections.map(section=>`<a href="#math-section-${section}" data-math-jump>Section ${section}</a>`).join(' · ');
}

function mathFoundationCourse(lesson,guide) {
  const synthese = ['Synthèse et glossaire',lesson.objective];
  const sections = [...lesson.sections,guide.method,synthese];
  const renderSection = ([title,body],index)=>`<section><h3 id="math-section-${index+1}" tabindex="-1">${index+1}. ${title}</h3>
    <p>${body}</p>${index===3?`<div class="lesson-table" tabindex="0" role="region" aria-label="Cas commentés">
      <table><caption>Tableau pédagogique original</caption><thead><tr><th scope="col">Cas</th><th scope="col">Repère</th><th scope="col">Interprétation</th></tr></thead>
      <tbody>${guide.table.map(([label,example,meaning])=>`<tr><th scope="row">${label}</th><td>${example}</td><td>${meaning}</td></tr>`).join('')}</tbody></table></div>`:''}
    ${index===4?`<dl>${guide.terms.map(([term,definition])=>`<dt>${term}</dt><dd>${definition}</dd>`).join('')}</dl>`:''}</section>`;
  return `<h3>Introduction et problématique</h3><p>${guide.question}</p>
    <h3>Objectifs</h3><ol>${guide.objectives.map(objective=>`<li>${objective}</li>`).join('')}</ol>
    <nav aria-label="Plan de la leçon"><h3>Plan</h3><ol>
      <li>Notions du socle<ol>${sections.slice(0,3).map(([title],i)=>`<li><a href="#math-section-${i+1}" data-math-jump>1.${i+1} ${title}</a></li>`).join('')}</ol></li>
      <li><a href="#math-section-4" data-math-jump>${guide.method[0]}</a></li>
      <li><a href="#math-section-5" data-math-jump>Synthèse et glossaire</a></li>
    </ol></nav>
    <p><strong>Socle essentiel · 30 à 45 min</strong> · Lis le cours, puis fais le quiz et l’exercice rédigé.</p>
    ${sections.map(renderSection).join('')}
    <p><strong>Approfondissement universitaire · 1 h 30 à 2 h au total</strong> · Ajoute le transfert et le séminaire.</p>
    <details><summary>Recherche facultative · 3 à 5 h au total</summary><p>${guide.research}</p></details>`;
}

function mathFoundationSeminar(key,guide) {
  const [prompt,rubric]=guide.seminar;
  return `<section><h3>Séminaire · Justifier une démarche</h3>
    <p><strong>Dossier intégré</strong> · ${prompt}</p><p>Repères · ${mathSectionLinks([1,2,3,4])}</p>
    <label for="math-seminar">Ma réponse au séminaire</label><textarea id="math-seminar" maxlength="12000">${e(S.notes[key+'-seminaire'])}</textarea>
    <p data-math-seminar-status role="status"></p>
    <details><summary>Corrigé indicatif et barème sur 6</summary><ol>
      ${rubric.map(item=>`<li>2 points · ${item}</li>`).join('')}
    </ol><p>Toute démarche équivalente, explicitement justifiée, vaut les mêmes points.</p></details></section>`;
}
