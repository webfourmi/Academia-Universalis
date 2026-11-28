const mathSpaces = {
  laboratoire: 'Laboratoire mathématique',
  demonstration: 'Atelier de démonstration',
  problemes: 'Cabinet des problèmes',
  formulaire: 'Formulaire intelligent',
  carnet: 'Mes notes de maths'
};

const mathCampusSpaces = {
  'Laboratoire':['laboratoire'],
  'Atelier':['demonstration','problemes']
};

const mathReferences = {
  derivation: ['Gilbert Strang et Edwin Herman', 'Calculus Volume 1, § 3.1', '2016', 'https://openstax.org/books/calculus-volume-1/pages/3-1-defining-the-derivative', 'Taux de variation, sécante et dérivée'],
  recurrence: ['Eric Lehman, F. Thomson Leighton et Albert R. Meyer', 'Mathematics for Computer Science, § 5.1', '2015', 'https://ocw.mit.edu/courses/6-042j-mathematics-for-computer-science-spring-2015/mit6_042js15_textbook.pdf', 'Principe de récurrence'],
  discriminant: ['Jay Abramson', 'College Algebra 2e, § 2.5', '2021', 'https://openstax.org/books/college-algebra-2e/pages/2-5-quadratic-equations', 'Discriminant des équations du second degré'],
  binomiale: ['Barbara Illowsky et Susan Dean', 'Introductory Statistics 2e, § 4.3', '2023', 'https://openstax.org/books/introductory-statistics-2e/pages/4-3-binomial-distribution', 'Hypothèses et probabilités de la loi binomiale']
};

const mathExercises = [
  {id:'recurrence', group:'demonstration', level:'Preuve guidée', title:'La somme des premiers nombres impairs',
    prompt:'Prouve que 1 + 3 + ⋯ + (2n − 1) = n² pour tout entier n ≥ 1. En supposant le résultat vrai au rang n, quel terme faut-il ajouter pour passer au rang n + 1 ? Justifie ta réponse.',
    hint:'Remplace n par n + 1 dans le terme général 2n − 1.', answer:2,
    options:['2n − 1','2n','2n + 1'],
    correction:'Au rang 1, 1 = 1². Supposons la formule vraie pour un entier n ≥ 1. Au rang suivant, la somme vaut n² + (2n + 1) = (n + 1)². L’initialisation et l’hérédité établissent la formule pour tout entier n ≥ 1.',
    transfer:'Peux-tu retrouver cette identité en entourant un carré de côté n avec une rangée et une colonne ?'},
  {id:'derivee', ref:'derivation', group:'demonstration', level:'Contre-exemple', title:'Quand une pente unique n’existe pas',
    prompt:'Une fonction continue est-elle toujours dérivable ? Trouve un contre-exemple et compare les taux de variation à gauche et à droite du point choisi.',
    hint:'Essaie x = 0 et calcule (f(h) − f(0))/h.', answer:0,
    options:['f(x) = |x| au point 0','f(x) = x² au point 0','f(x) = 2x au point 0'],
    correction:'La fonction |x| est continue en 0. Son taux de variation depuis 0 vaut −1 si h < 0 et 1 si h > 0. La limite bilatérale n’existe donc pas : |x| est un contre-exemple.',
    transfer:'Compare avec x² : le même quotient vaut h et tend vers 0 des deux côtés.'},
  {id:'discriminant', group:'problemes', level:'Calcul', title:'Nombre de solutions réelles',
    prompt:'Combien de solutions réelles distinctes possède 2x² − 4x + 2 = 0 ? Calcule d’abord Δ.',
    hint:'Δ = b² − 4ac ici, avec a = 2, b = −4 et c = 2.', answer:1,
    options:['Aucune','Une','Deux'],
    correction:'Δ = 16 − 16 = 0. Il y a une racine réelle double, x = −b/(2a) = 1. On vérifie en écrivant 2x² − 4x + 2 = 2(x − 1)².',
    transfer:'Remplace le terme constant 2 par 3 et explique le changement.'},
  {id:'derivee-calcul', ref:'derivation', group:'problemes', level:'Interprétation', title:'Vitesse à un instant',
    prompt:'Pour t ≥ 0, s(t) = t² désigne une position en mètres, t en secondes, avec un coefficient de 1 m/s². Quelle vitesse instantanée obtient-on à t = 3 s ?',
    hint:'Calcule s′(t) ou prends la limite de 6 + h lorsque h tend vers 0, en secondes.', answer:2,
    options:['3 m/s','9 m/s','6 m/s'],
    correction:'La dérivée de la position vaut 2t numériquement en m/s. À 3 s, elle vaut donc 6 m/s. Les 9 m représentent la position, dans une autre unité.',
    transfer:'Compare les vitesses moyenne et instantanée entre t = 3 et t = 4.'},
  {id:'binomiale', group:'problemes', level:'Application', title:'Un succès en trois essais',
    prompt:'Trois essais indépendants ont la même probabilité de succès p = 0,2. Quelle est la probabilité d’obtenir exactement un succès ?',
    hint:'Compte les positions possibles du succès parmi les trois essais.', answer:1,
    options:['12,8 %','38,4 %','48,8 %'],
    correction:'Il y a trois positions possibles pour l’unique succès. Chacune a une probabilité de 0,2 × 0,8² = 0,128. Leur somme est 0,384. La probabilité d’au moins un succès vaut 1 − 0,8³ = 0,488.',
    transfer:'Dans un tirage sans remise, vérifie si les essais restent indépendants avant de réutiliser la formule.'}
];

const mathFormulas = [
  {id:'derivation', title:'Pente de la tangente', formula:'f′(a) = lim (f(a + h) − f(a))/h, quand h → 0',
    conditions:'a est intérieur au domaine. Le quotient est défini pour h ≠ 0 assez petit et sa limite doit exister dans ℝ.',
    example:'Pour x² au point a = 2, le quotient vaut 4 + h, donc la pente de la tangente est 4.',
    question:'Quel quotient faut-il faire tendre vers une limite pour obtenir la pente de la tangente ?'},
  {id:'discriminant', title:'Discriminant', formula:'Δ = b² − 4ac',
    conditions:'Pour ax² + bx + c = 0 avec a, b, c réels et a ≠ 0.',
    example:'Δ > 0 donne deux racines réelles distinctes, Δ = 0 une racine réelle double et Δ < 0 aucune racine réelle.',
    question:'Comment le signe du discriminant détermine-t-il le nombre de racines réelles ?'},
  {id:'binomiale', title:'Probabilité binomiale', formula:'P(X = k) = C(n,k) pᵏ (1 − p)ⁿ⁻ᵏ',
    conditions:'n essais indépendants à deux issues, même probabilité p pour chaque essai et 0 ≤ k ≤ n entier.',
    example:'C(n,k) compte les choix de k positions parmi n. Pour n = 2 et p = 0,5, P(X = 1) = 2 × 0,5 × 0,5 = 0,5.',
    question:'Quelles hypothèses et quelle formule permettent de calculer la probabilité de k succès ?'},
  {id:'recurrence', title:'Principe de récurrence', formula:'P(1) et [P(n) ⇒ P(n + 1) pour tout n ≥ 1] entraînent P(n) pour tout n ≥ 1.',
    conditions:'Fixe le premier rang et effectue l’étape d’hérédité pour tout entier à partir de ce rang.',
    example:'Si la somme des n premiers impairs vaut n², l’ajout de 2n + 1 donne (n + 1)². Au premier rang, la somme vaut 1.',
    question:'Quelles sont les deux étapes à justifier dans une preuve par récurrence ?'}
];

function mathSource(id) {
  const [author, title, year, url, claim] = mathReferences[id];
  const publisher = id === 'recurrence' ? 'MIT OpenCourseWare' : 'OpenStax (Rice University)';
  const license = id === 'recurrence' ? 'CC BY-NC-SA 3.0' : 'CC BY-NC-SA';
  return `<p><small>${author} · ${publisher} · ${year} · anglais · accès libre · ${license} · référence citée par lien · consultée le 28/11/2026. <a href="${url}" target="_blank" rel="noopener">${title}</a> · ${claim}.</small></p>`;
}

function mathProgress() {
  const count = mathExercises.filter(item=>S.done[`math-${item.id}`]).length;
  return `${count} sur ${mathExercises.length} exercices réussis`;
}

function showMath(space = 'accueil') {
  if(space==='carnet'){openSubjectNotebook('Mathématiques');return;}
  rememberCampusRoute('mathematiques',{space});
  const names=Object.entries(mathSpaces);
  v.innerHTML = `<button type="button" onclick="${space === 'accueil' ? 'go(1)' : 'showMath()'}">${space === 'accueil' ? 'Retour à l’année 1' : 'Retour aux mathématiques'}</button>
    <h2 tabindex="-1">${mathSpaces[space] || 'Mathématiques · Année 1'}</h2>
    <p data-math-progress role="status">${mathProgress()}</p>
    <nav class="lesson-jumps" aria-label="Espaces mathématiques">${names.map(([id,name])=>`<button type="button" data-math-space="${id}" ${id===space?'aria-current="page"':''}>${name}</button>`).join('')}</nav>
    <section data-math-content></section>`;
  v.querySelectorAll('[data-math-space]').forEach(button=>button.onclick=()=>showMath(button.dataset.mathSpace));
  const content = v.querySelector('[data-math-content]');
  if (space === 'laboratoire') showMathLab(content);
  else if (space === 'demonstration' || space === 'problemes') showMathExercises(content,space);
  else if (space === 'formulaire') showMathFormulas(content);
  else content.innerHTML = '<p>Explore les sécantes, construis une preuve, résous un problème puis consigne ton raisonnement dans le carnet. Les activités couvrent la récurrence, le second degré, la dérivation et les probabilités binomiales.</p><p>Programme complet de 36 leçons en préparation.</p>';
  v.querySelector('h2').focus();
}

function showMathLab(content) {
  content.innerHTML = `<article class="card">
    <h3>De la sécante à la tangente</h3>
    <p>Pour f(x) = x², prédis la pente entre x = a et x = a + h. Rapproche h de zéro par valeurs positives et négatives. Les axes et pentes sont sans unité.</p>
    <p><label>Abscisse a <input name="point" type="range" min="-2" max="2" step="0.25" value="1"></label> <output data-point>1</output></p>
    <p><label>Écart h <select name="gap"><option>-1</option><option>-0.5</option><option>-0.1</option><option>-0.01</option><option>0.01</option><option>0.1</option><option>0.5</option><option selected>1</option></select></label></p>
    <svg viewBox="0 0 360 240" width="100%" style="max-width:36rem" aria-hidden="true">
      <path d="M30 218H330 M180 225V12" fill="none" stroke="currentColor"/>
      <path data-curve fill="none" stroke="#087f75" stroke-width="3"/>
      <line data-secant stroke="#ab4c19" stroke-width="2"/>
      <circle data-a r="4" fill="#ab4c19"/><circle data-b r="4" fill="#ab4c19"/>
    </svg>
    <p data-lab-result role="status"></p>
    <details><summary>Expliquer le résultat</summary><p>(a + h)² − a² = 2ah + h². En divisant par h ≠ 0, on obtient exactement 2a + h, qui tend vers 2a. Le graphique illustre la limite. Le calcul la justifie pour tout a réel.</p></details>
    <p>À essayer ensuite. Pour a = 0, compare l’effet du signe de h pour x² et pour |x| dans l’atelier.</p>
    ${mathSource('derivation')}</article>
    <article class="card">
      <h3>Comparer une simulation à une probabilité</h3>
      <p>Chaque série contient trois essais indépendants. Modifie la probabilité de succès par essai et estime la fréquence des séries qui donnent exactement un succès.</p>
      <form data-simulation><label>Probabilité par essai <select name="probability">
        <option value="0.2">20 %</option><option value="0.5">50 %</option><option value="0.8">80 %</option>
      </select></label> <button type="submit">Simuler 1 000 séries</button></form>
      <p data-simulation-result role="status"></p>
      <p>La fréquence observée varie d’une simulation à l’autre. La valeur théorique repose sur les hypothèses d’indépendance et de probabilité constante.</p>
      ${mathSource('binomiale')}</article>`;
  const point = content.querySelector('[name="point"]');
  const gap = content.querySelector('[name="gap"]');
  const format = value=>value.toLocaleString('fr-FR',{maximumFractionDigits:4});
  const x = value=>180+50*value;
  const y = value=>218-22*value;
  const setCoordinates = (selector, coordinates)=>Object.entries(coordinates)
    .forEach(([name,value])=>content.querySelector(selector).setAttribute(name,value));
  const curve = Array.from({length:61},(_,i)=>i/10-3);
  setCoordinates('[data-curve]',{d:curve.map((value,i)=>`${i?'L':'M'}${x(value)} ${y(value**2)}`).join(' ')});
  function update() {
    const a = Number(point.value);
    const h = Number(gap.value);
    const b = a+h;
    content.querySelector('[data-point]').value=format(a);
    point.setAttribute('aria-valuetext',format(a));
    setCoordinates('[data-a]',{cx:x(a),cy:y(a**2)});
    setCoordinates('[data-b]',{cx:x(b),cy:y(b**2)});
    setCoordinates('[data-secant]',{x1:x(a),y1:y(a**2),x2:x(b),y2:y(b**2)});
    content.querySelector('[data-lab-result]').textContent =
      `Points (${format(a)} ; ${format(a**2)}) et (${format(b)} ; ${format(b**2)}). Pente de la sécante ${format(2*a+h)}. Pente de la tangente en a ${format(2*a)}.`;
  }
  point.oninput=gap.onchange=update;
  update();
  const simulation=content.querySelector('[data-simulation]');
  const result=content.querySelector('[data-simulation-result]');
  simulation.onchange=()=>{result.textContent='';};
  simulation.onsubmit=event=>{
    event.preventDefault();
    const p=Number(simulation.elements.probability.value);
    let count=0;
    for (let series=0;series<1000;series++) {
      const trials=Array.from({length:3},()=>Math.random()<p);
      if(trials.filter(Boolean).length===1) count++;
    }
    result.textContent=`Fréquence observée ${format(count/10)} %. Probabilité théorique ${format(300*p*(1-p)**2)} %.`;
  };
}

function storeMathRecord(field,key,value) {
  const record = {...S[field],[key]:value};
  try {
    localStorage.au=JSON.stringify({...S,[field]:record});
    S[field]=record;
    return true;
  } catch {
    return false;
  }
}

function showMathExercises(content,group) {
  const items = mathExercises.filter(item=>item.group===group);
  content.innerHTML = items.map(item=>`<article class="card"><h3>${item.title}</h3><p>${item.level}</p>
    <p>${item.prompt}</p><details><summary>Voir un indice</summary><p>${item.hint}</p></details>
    <form data-math-exercise="${item.id}"><fieldset style="min-inline-size:0"><legend>Ta réponse</legend>
    ${item.options.map((option,i)=>`<p><label><input required type="radio" name="choice" value="${i}"> ${option}</label></p>`).join('')}
    </fieldset><button type="submit">Vérifier ma réponse</button></form><p role="status"></p><div data-math-correction></div>
    ${mathSource(item.ref || item.id)}</article>`).join('');
  items.forEach(item=>{
    const form=content.querySelector(`[data-math-exercise="${item.id}"]`);
    const card=form.closest('article');
    const status=card.querySelector('[role="status"]');
    const correction=card.querySelector('[data-math-correction]');
    form.onsubmit=event=>{
      event.preventDefault();
      const correct=Number(new FormData(form).get('choice'))===item.answer;
      const saved=!correct || storeMathRecord('done',`math-${item.id}`,true);
      status.textContent=correct ? (saved?'Réponse correcte.':'Réponse correcte. La progression n’a pas pu être enregistrée.') : 'Réponse à revoir.';
      correction.innerHTML = `<p>${item.correction}</p><p>${item.transfer}</p>`;
      v.querySelector('[data-math-progress]').textContent=mathProgress();
    };
  });
}

function showMathFormulas(content) {
  content.innerHTML = `<label>Chercher une formule <input type="search"></label> <label><input type="checkbox" name="due"> Rappels à faire</label><p role="status"></p><div data-formulas></div>`;
  const results=content.querySelector('[data-formulas]');
  const search=content.querySelector('input');
  const due=content.querySelector('[name="due"]');
  function draw() {
    const term=searchableText(search.value.trim());
    const cards=mathFormulas.filter(item=>{
      const review=S.reviews?.[`math-formule-${item.id}`];
      return searchableText(item.title+' '+item.conditions).includes(term)
        && (!due.checked || !review || reviewDue(review));
    });
    content.querySelector('[role="status"]').textContent=`${cards.length} formule(s)`;
    results.replaceChildren();
    cards.forEach(item=>{
      const card=document.createElement('article');
      card.className='card';
      const key=`math-formule-${item.id}`;
      const review=S.reviews?.[key];
      card.innerHTML=`<h3>${item.title}</h3><p>${item.question}</p>
        <details><summary>Afficher la formule et ses hypothèses</summary>
        <p><strong>${item.formula}</strong></p><p>${item.conditions}</p><p>${item.example}</p>
        <button type="button" data-recalled="yes">Retrouvée de mémoire</button>
        <button type="button" data-recalled="no">À revoir</button>
        </details><p role="status">${review?'Prochain rappel le '+e(reviewDate(review)):'Carte à découvrir'}</p>${mathSource(item.id)}`;
      card.querySelectorAll('[data-recalled]').forEach(button=>button.onclick=()=>{
        const next=nextMemoryReview(S.reviews?.[key],button.dataset.recalled==='yes',localStudyDate());
        card.querySelector('[role="status"]').textContent=storeMathRecord('reviews',key,next)
          ? 'Prochain rappel le '+reviewDate(next) : 'Le rappel n’a pas pu être enregistré.';
      });
      results.append(card);
    });
  }
  search.oninput=due.onchange=draw;
  draw();
}

function showMathNotebook(content) {
  const fields={conjectures:'Conjectures',essais:'Essais',erreurs:'Erreurs à revoir',solutions:'Solutions et notes'};
  content.innerHTML=`<article class="card"><h3>Mes notes de travail</h3>
    <form>${Object.entries(fields).map(([id,label])=>`<p><label>${label}<textarea name="${id}" maxlength="20000">${e(S.notes[`math-carnet-${id}`])}</textarea></label></p>`).join('')}
    <button type="submit">Enregistrer le carnet</button><p role="status"></p></form>
    <p>La sauvegarde complète permet d’exporter et de restaurer le carnet, les exercices réussis et les dates de rappel.</p>
    <button type="button" onclick="go(15)">Exporter ou restaurer mes données</button></article>`;
  const form=content.querySelector('form');
  form.onsubmit=event=>{
    event.preventDefault();
    const notes={...S.notes};
    for (const [id,value] of new FormData(form)) notes[`math-carnet-${id}`]=value;
    try {
      localStorage.au=JSON.stringify({...S,notes});
      S.notes=notes;
      form.querySelector('[role="status"]').textContent='Carnet enregistré sur cet appareil.';
    } catch {
      form.querySelector('[role="status"]').textContent='Le carnet n’a pas pu être enregistré.';
    }
  };
}
