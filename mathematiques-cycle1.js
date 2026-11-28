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
  return `<p><a href="${url}" target="_blank" rel="noopener">${title}</a> · ${credit} · ${language} · accès libre, référence citée par lien · ${scope} · consulté le 28/11/2026.</p>`;
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
    <p>Pour une séance, lis le cours puis rédige l’exercice. Pour approfondir, fais le problème de transfert avant d’ouvrir son corrigé et consulte la lecture associée.</p></article>`;
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
  const reviewKey=key+'-rappel';
  const review=S.reviews?.[reviewKey];
  const initial=S.notes[key+'-tentative'] || '';
  content.innerHTML=`<article class="card">
    <p><strong>Prérequis</strong> · ${lesson.prerequisite}</p>
    <p><strong>Objectif</strong> · ${lesson.objective}</p>
    ${lesson.sections.map(([title,body])=>`<section><h3>${title}</h3><p>${body}</p></section>`).join('')}
    <h3>Lecture guidée et bibliographie</h3>${mathFoundationSource(lesson.source)}
    ${lesson.id==='fondements-6'?mathSource('recurrence'):''}
    <h3>Exercice rédigé</h3><p>${lesson.prompt}</p>
    <form data-math-proof><label for="math-reasoning">Mon raisonnement</label><textarea id="math-reasoning" name="reasoning" required maxlength="12000">${e(S.notes[key+'-brouillon'])}</textarea>
    <button type="submit">Comparer au corrigé</button><p role="status"></p></form>
    <section data-math-solution hidden><h4>Corrigé</h4><p>${lesson.solution}</p>
    <details><summary>Retrouver ma première tentative</summary><p data-math-first style="white-space:pre-wrap"></p></details>
    <p>Relis ton raisonnement à partir de ce critère.</p>
    <label><input type="checkbox" data-math-assessed ${S.done[key]?'checked':''}> ${lesson.criterion}</label>
    <p data-math-assessment-status role="status"></p></section>
    <h3>Problème de transfert</h3><p>${lesson.transfer}</p>
    <label for="math-transfer">Mon essai de transfert</label><textarea id="math-transfer" data-math-transfer maxlength="12000">${e(S.notes[key+'-transfert'])}</textarea>
    <p data-math-transfer-status role="status"></p>
    <details><summary>Consulter le corrigé du transfert</summary><p>${lesson.transferSolution}</p></details>
    <h3>Révision espacée</h3><p>${lesson.recall[0]}</p>
    <details><summary>Révéler la réponse</summary><p>${lesson.recall[1]}</p>
    <button type="button" data-math-recall="yes">Retrouvée de mémoire</button>
    <button type="button" data-math-recall="no">À revoir</button></details>
    <p data-math-review-status role="status">${review?'Prochain rappel le '+e(reviewDate(review)):'Carte à découvrir'}</p>
  </article>`;
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
    const next=nextMemoryReview(S.reviews?.[reviewKey],button.dataset.mathRecall==='yes',localStudyDate());
    content.querySelector('[data-math-review-status]').textContent=storeMathRecord('reviews',reviewKey,next)
      ? 'Prochain rappel le '+reviewDate(next) : 'Le rappel n’a pas pu être enregistré.';
  });
}
