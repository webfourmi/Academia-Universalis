const assert = require('node:assert/strict');
const {chromium} = require('playwright');

async function verifyMath(browser,viewport) {
  const context=await browser.newContext({viewport,isMobile:viewport.width<500,hasTouch:viewport.width<500});
  const page=await context.newPage();
  const errors=[];
  page.on('pageerror',error=>errors.push(error.message));
  page.on('dialog',dialog=>dialog.accept());
  await page.goto(process.env.CAMPUS_URL || 'http://localhost:8765/');
  await page.evaluate(()=>go(1));
  await page.getByRole('button',{name:'Mathématiques',exact:true}).click();
  const open=name=>page.getByRole('button',{name,exact:true}).click();
  await open('Laboratoire mathématique');
  await page.locator('[name=gap]').selectOption('-0.1');
  assert.match(await page.locator('[data-lab-result]').innerText(),/sécante 1,9/);
  await open('Simuler 1 000 séries');
  assert.match(await page.locator('[data-simulation-result]').innerText(),/théorique 38,4 %/);
  await open('Atelier de démonstration');
  const proof=page.locator('[data-math-exercise=recurrence]');
  await proof.locator('input').first().check();
  await proof.getByRole('button').click();
  assert.match(await proof.locator('..').getByRole('status').innerText(),/à revoir/);
  assert.match(await page.locator('[data-math-progress]').innerText(),/^0 sur 5/);
  await proof.locator('input').last().check();
  await proof.getByRole('button').click();
  await proof.getByRole('button').click();
  assert.match(await page.locator('[data-math-progress]').innerText(),/^1 sur 5/);
  await open('Cabinet des problèmes');
  const problem=page.locator('[data-math-exercise=binomiale]');
  await problem.locator('input').nth(1).check();
  await problem.getByRole('button').click();
  await page.goBack();
  await page.getByRole('heading',{name:'Atelier de démonstration'}).waitFor();
  await open('Formulaire intelligent');
  await page.getByRole('searchbox').fill('discriminant');
  assert.equal(await page.locator('[data-formulas] article').count(),1);
  await page.getByText('Afficher la formule et ses hypothèses').click();
  await open('Retrouvée de mémoire');
  assert.match(await page.locator('[data-formulas] [role=status]').innerText(),/Prochain rappel le/);
  await open('Mes notes de maths');
  await page.getByRole('heading',{name:'Mon carnet',exact:true}).waitFor();
  assert.equal(await page.locator('.notebook-tabs [aria-pressed=true]').innerText(),'Mathématiques');
  await page.getByLabel('Conjectures').fill('Je teste la somme des impairs.');
  await open('Enregistrer le carnet');
  await page.locator('.notebook-tabs').getByRole('button',{name:'Littérature',exact:true}).click();
  await page.getByRole('heading',{name:'Notes de lecture',exact:true}).waitFor();
  assert.equal(await page.locator('#notebook-math').isVisible(),false);
  await page.locator('.notebook-tabs').getByRole('button',{name:'Mathématiques',exact:true}).click();
  assert.equal(await page.getByLabel('Conjectures').inputValue(),'Je teste la somme des impairs.');
  await open('Exporter ou restaurer mes données');
  const download=page.waitForEvent('download');
  await open('Exporter ma sauvegarde');
  const file=await download;
  await page.evaluate(()=>{delete S.notes['math-carnet-conjectures']; delete S.done['math-recurrence']; delete S.reviews['math-formule-discriminant']; save();});
  await page.locator('input[onchange="restore(this)"]').setInputFiles(await file.path());
  await page.getByText('Sauvegarde restaurée.').waitFor();
  await page.waitForFunction(()=>navigator.serviceWorker.controller);
  await context.setOffline(true);
  await page.reload();
  await page.evaluate(()=>go(1));
  await open('Mathématiques');
  assert.match(await page.locator('[data-math-progress]').innerText(),/^2 sur 5/);
  await open('Cycle I · Fondements');
  assert.equal(await page.locator('[data-math-open^="fondements-"]').count(),6);
  await open('Faire le diagnostic');
  await page.locator('[name=q0][value="1"]').check();
  await open('Voir mon bilan');
  await page.getByText('1 / 7 repères acquis.').waitFor();
  assert.equal(await page.locator('[data-diagnostic-result] > details').count(),6);
  await open('Retour au cycle I');
  await open('Qu’est-ce que les mathématiques ?');
  const reasoning=page.getByLabel('Mon raisonnement',{exact:true});
  await reasoning.fill('Brouillon conservé hors connexion.');
  await page.goBack();
  await open('Qu’est-ce que les mathématiques ?');
  assert.equal(await reasoning.inputValue(),'Brouillon conservé hors connexion.');
  await open('Comparer au corrigé');
  await page.getByRole('heading',{name:'Corrigé',exact:true}).waitFor();
  await reasoning.fill('Réponse révisée.');
  await open('Comparer au corrigé');
  assert.equal(await page.locator('[data-math-first]').textContent(),'Brouillon conservé hors connexion.');
  await page.locator('[data-math-assessed]').check();
  assert.equal(await page.locator('[data-math-card]').count(),6);
  const card=page.locator('[data-math-card="0"]');
  await card.getByText('Révéler la réponse').click();
  await card.getByRole('button',{name:'Retrouvée de mémoire'}).click();
  assert.match(await card.locator('[data-math-review-status]').innerText(),/Prochain rappel le/);
  assert.equal(await page.evaluate(()=>memoryPanel().textContent.includes('Quel travail transforme une conjecture en théorème ?')),true);
  const quiz=page.locator('[data-math-model-quiz]');
  for(const [i,answer] of [0,1,2,1,0].entries()) {
    await quiz.locator(`[name=item${i}][value="${answer}"]`).check();
  }
  await open('Corriger le quiz');
  await page.getByText('4 / 5 réponses correctes.').waitFor();
  await quiz.getByRole('link',{name:'Section 3',exact:true}).click();
  assert.equal(await page.evaluate(()=>document.activeElement.id),'math-section-3');
  await page.getByLabel('Ma réponse au séminaire').fill('Deux exemples ne suffisent pas.');
  assert.equal(await page.evaluate(()=>S.notes['math-fondements-1-seminaire']),'Deux exemples ne suffisent pas.');
  await open('Retour au cycle I');
  await page.getByText('1 / 6 leçons autoévaluées').waitFor();
  for (const id of ['fondements-2','fondements-3','fondements-4','fondements-5','fondements-6']) {
    await page.locator(`[data-math-open="${id}"]`).click();
    const plan=page.getByRole('navigation',{name:'Plan de la leçon'});
    assert.equal(await plan.getByRole('link').count(),5);
    await plan.getByRole('link').last().click();
    assert.equal(await page.evaluate(()=>document.activeElement.id),'math-section-5');
    const lessonQuiz=page.locator('[data-math-model-quiz]');
    for(const question of await lessonQuiz.locator('fieldset').all()) {
      await question.getByRole('radio').first().check();
    }
    await open('Corriger le quiz');
    assert.equal(await lessonQuiz.locator('[data-math-quiz-feedback]').filter({hasText:/Voir section/}).count(),3);
    await page.getByLabel('Ma réponse au séminaire').fill('Démarche et justification.');
    await open('Retour au cycle I');
    await page.locator(`[data-math-open="${id}"]`).click();
    assert.equal(await page.getByLabel('Ma réponse au séminaire').inputValue(),'Démarche et justification.');
    await open('Retour au cycle I');
  }

  await open('Faire le diagnostic');
  assert.equal(await page.locator('[name=q0][value="1"]').isChecked(),true);
  await open('Mes notes de maths');
  await page.getByRole('heading',{name:'Mon carnet',exact:true}).waitFor();
  assert.equal(await page.locator('.notebook-tabs [aria-pressed=true]').innerText(),'Mathématiques');
  assert.equal(await page.getByLabel('Conjectures').inputValue(),'Je teste la somme des impairs.');
  await page.goBack();
  await open('Formulaire intelligent');
  assert.equal(await page.getByText(/Prochain rappel le/).count(),1);
  await open('Laboratoire mathématique');
  await page.getByText(/Pente de la sécante/).waitFor();
  await open('Atelier de démonstration');
  await open('Cabinet des problèmes');
  assert.equal(await page.locator('[data-math-exercise]').count(),3);
  await open('Mes notes de maths');
  await page.getByLabel('Conjectures').fill('Le carnet conserve aussi un brouillon.');
  await page.goBack();
  await open('Formulaire intelligent');
  await page.getByRole('searchbox').fill('binomiale');
  await page.getByLabel('Rappels à faire').check();
  await page.getByText('Afficher la formule et ses hypothèses').click();
  await open('Retrouvée de mémoire');
  assert.equal(await page.locator('[data-formulas] article').count(),0);
  await open('Mes notes de maths');
  assert.equal(await page.getByLabel('Conjectures').inputValue(),'Le carnet conserve aussi un brouillon.');
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);
  assert.deepEqual(errors,[]);
  console.log(`Mathématiques ${viewport.width}×${viewport.height} · cinq espaces, progression, restauration et hors connexion`);
  await context.close();
}

async function verify(browser,viewport) {
  const context=await browser.newContext({viewport, isMobile:viewport.width<500, hasTouch:viewport.width<500});
  const page=await context.newPage();
  page.setDefaultTimeout(7000);
  const errors=[];
  page.on('pageerror',error=>errors.push(error.message));
  page.on('dialog',dialog=>dialog.accept());
  await page.goto(process.env.CAMPUS_URL || 'http://localhost:8765/');
  await page.locator('#desk-session').click();
  await page.locator('#session-toggle').click();
  await page.locator('#session-toggle').click();
  await page.locator('#session-next').click();
  await page.reload();
  await page.locator('#desk-session').click();
  assert.equal(await page.locator('[aria-current="step"]').innerText(),'Lecture de la leçon · 20 min');
  await page.locator('#session-open').click();
  await page.locator('summary').filter({hasText:'Tuteur universitaire'}).click();
  assert.match(await page.locator('textarea[readonly]').first().inputValue(),/Références du cours/);
  await page.goBack();
  await page.locator('#session-finish input').fill('12');
  await page.locator('#session-finish button').click();
  assert.match(await page.locator('#desk-time input').inputValue(),/^12$/);
  await page.getByRole('button',{name:'Planning personnalisé',exact:true}).click();
  const planning=page.locator('.personal-planning');
  const priority=planning.locator('select[name=priority]');
  const rect=await priority.boundingBox();
  assert.ok(rect && rect.x>=0 && rect.x+rect.width<=viewport.width,'Le select déborde du viewport');
  const old=await page.evaluate(()=>plannedMinutes({days:[1],minutes:55},1));
  assert.equal(old,55);
  await priority.selectOption('physique');
  for(const input of await planning.locator('input[type=number]').all())await input.fill('0');
  await planning.locator('[name=day-0]').fill('35');
  await planning.locator('[name=day-4]').fill('80');
  await page.getByRole('button',{name:'Enregistrer le planning'}).click();
  assert.match(await planning.locator('header').innerText(),/115 min par semaine · 2 jours/);
  assert.deepEqual((await planning.locator('.planning-agenda li span').allTextContents()).sort(),['35 min','35 min','80 min','80 min']);
  await planning.locator('.planning-agenda li').filter({hasText:'80 min'}).locator('button').first().click();
  const minutes=(await page.locator('#view article ol li').allTextContents()).reduce((sum,step)=>sum+Number(step.match(/(\d+) min/)[1]),0);
  assert.equal(minutes,80);
  await page.goBack();
  assert.equal(await planning.locator('[name=day-4]').inputValue(),'80');
  await page.evaluate(()=>go(5));
  await page.locator('#library-next').click();
  assert.match(await page.locator('#library-page').innerText(),/Page 2/);
  await page.evaluate(()=>go(8));
  assert.equal(await page.locator('[data-atlas-results] section').count(),5);
  await page.locator('[data-atlas-results]').locator('..').locator('select').selectOption('2');
  assert.match(await page.locator('[data-atlas-index] li').first().innerText(),/Année 2/);
  await page.evaluate(()=>showSpace('Atelier'));
  await page.getByText('Histoire · comparer deux chronologies',{exact:true}).click();
  const workshop=page.locator('details').filter({hasText:'Histoire · comparer deux chronologies'}).filter({has:page.locator('input[type=radio]')}).last();
  await workshop.locator('input[type=radio]').last().check();
  await workshop.getByRole('button',{name:'Vérifier mon raisonnement'}).click();
  assert.match(await workshop.getByRole('status').innerText(),/^Correct/);
  await page.evaluate(()=>showCourse(allStudyCourses().find(course=>course.key==='physique')));
  await page.waitForFunction(()=>navigator.serviceWorker.controller);
  await page.locator('[data-save-pack]').click();
  await page.getByText('Copie disponible hors connexion sur cet appareil.').waitFor();
  const packURL=await page.locator('[data-open-pack]').getAttribute('href');
  const packDownload=page.waitForEvent('download');
  await page.locator('[data-download-pack]').click();
  assert.equal((await packDownload).suggestedFilename(),'academia-physique.html');
  await page.evaluate(()=>{
    const item=studyItems().find(i=>i.lesson.quiz);
    showLesson(item.course,item.index);
  });
  const source=page.locator('li[id^="source-"] a').first();
  const sourceURL=await source.getAttribute('href');
  const lessonHeading=await page.locator('#view h2').innerText();
  await context.route(sourceURL,route=>route.fulfill({contentType:'text/html',body:'<title>Source de test</title>'}));
  const popupPromise=page.waitForEvent('popup');
  await source.click();
  const popup=await popupPromise;
  await popup.waitForLoadState();
  assert.equal(await popup.title(),'Source de test');
  assert.equal(await page.locator('#view h2').innerText(),lessonHeading);
  await popup.close();
  const passage=page.locator('.passage-tools').first();
  await passage.locator('summary').click();
  const selectText=async (locator,start,end)=>locator.evaluate((root,[a,b])=>{
    const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);
    const node=walker.nextNode();
    const range=document.createRange();
    range.setStart(node,a);
    range.setEnd(node,b);
    const selection=window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
    return range.toString();
  },[start,end]);
  const paragraph=page.locator('#lesson-section-0 + p');
  const highlighted=await selectText(paragraph,0,5);
  await passage.getByRole('button',{name:'Surligner la sélection'}).click();
  assert.equal(await paragraph.locator('mark').innerText(),highlighted);
  assert.equal(await paragraph.evaluate(p=>p.classList.contains('passage-highlight')),false);
  const note=passage.getByRole('textbox',{name:'Annotation personnelle'});
  await note.fill('Une annotation à relire.');
  for(const format of ['bold','italic','highlight']){
    await selectText(note,0,3);
    await passage.locator('[data-format='+format+']').click();
  }
  await passage.getByRole('button',{name:'Enregistrer l’annotation'}).click();
  const preview=passage.locator('[data-note-preview]');
  assert.equal(await preview.locator('b,strong').innerText(),'Une');
  assert.equal(await preview.locator('i,em').innerText(),'Une');
  assert.equal(await preview.locator('mark').innerText(),'Une');
  await page.evaluate(()=>{
    const item=studyItems().find(i=>i.lesson.quiz);
    showLesson(item.course,item.index);
  });
  await passage.locator('summary').click();
  assert.equal(await paragraph.locator('mark').innerText(),highlighted);
  await passage.getByRole('button',{name:'Modifier l’annotation'}).click();
  assert.equal(await note.innerText(),'Une annotation à relire.');
  await passage.getByRole('button',{name:'Effacer les surlignages'}).click();
  assert.equal(await paragraph.locator('mark').count(),0);
  const exercise=page.locator('.written-exercise');
  await exercise.locator('textarea').fill('Une réponse rédigée avec une justification.');
  await exercise.locator('#save-exercise').click();
  await exercise.locator('summary').click();
  for(const select of await exercise.locator('select').all())await select.selectOption('2');
  await exercise.locator('#save-exercise-review').click();
  assert.match(await exercise.locator('[role=status]').innerText(),/réussi en autoévaluation/);
  assert.equal(await page.locator('#save-exercise').textContent(),'Modifier');
  await page.locator('#save-exercise').click();
  await exercise.locator('textarea').fill('Une version révisée de ma réponse.');
  await exercise.locator('#save-exercise').click();
  assert.match(await exercise.locator('[role=status]').innerText(),/à relire/);
  await exercise.locator('select').first().selectOption('1');
  for(const select of (await exercise.locator('select').all()).slice(1))await select.selectOption('2');
  await exercise.locator('#save-exercise-review').click();
  assert.match(await exercise.locator('[role=status]').innerText(),/à consolider/);
  await page.evaluate(()=>{
    const form=document.querySelector('#history-quiz');
    const item=studyItems().find(i=>i.lesson.quiz);
    form.querySelectorAll('input[type=radio]')[(item.lesson.quiz[2]+1)%item.lesson.quiz[1].length].checked=true;
    form.requestSubmit();
    showSpace('Compétences et erreurs');
  });
  assert.equal(await page.locator('#error-list details').count(),1);
  await page.locator('#personal-test').click();
  await page.locator('form input[type=radio]').first().check();
  await page.getByRole('button',{name:'Valider',exact:true}).click();
  await page.getByRole('button',{name:'Continuer',exact:true}).click();
  assert.match(await page.locator('#view').innerText(),/Résultat · [01] \/ 1/);
  await page.evaluate(()=>go(15));
  const download=page.waitForEvent('download');
  await page.getByRole('button',{name:'Exporter ma sauvegarde'}).click();
  const file=await download;
  assert.match(file.suggestedFilename(),/^academia-sauvegarde-.*\.json$/);
  await page.locator('input[onchange="restore(this)"]').setInputFiles(await file.path());
  await page.getByText('Sauvegarde restaurée.').waitFor();
  assert.equal(await page.evaluate(()=>Object.values(S.exerciseEvidence)[0].answer),'Une version révisée de ma réponse.');
  await page.waitForFunction(()=>navigator.serviceWorker.controller);
  await context.setOffline(true);
  const packPage=await context.newPage();
  await packPage.goto(packURL);
  await packPage.getByRole('heading',{name:'Sommaire'}).waitFor();
  assert.ok(await packPage.locator('article').count()>0);
  assert.equal(await packPage.locator('article a[href^="http"]').first().getAttribute('target'),'_blank');
  await packPage.close();
  await page.evaluate(()=>showCourse(allStudyCourses().find(course=>course.key==='physique')));
  await page.locator('[data-remove-pack]').click();
  await page.getByText('Aucune copie enregistrée pour ce cours.').waitFor();
  await page.reload();
  await page.locator('#desk-session').waitFor();
  const navigation=await page.evaluate(()=>Math.round(performance.getEntriesByType('navigation')[0].domContentLoadedEventEnd));
  assert.deepEqual(errors,[]);
  console.log(`Chromium ${viewport.width}×${viewport.height} · navigation, sauvegarde et hors connexion · DOM local hors ligne ${navigation} ms`);
  await context.close();
}

async function verifyHistory(browser, viewport) {
  const context = await browser.newContext({viewport,isMobile:viewport.width<500,hasTouch:viewport.width<500});
  const page = await context.newPage();
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  const url = process.env.CAMPUS_URL || 'http://localhost:8765/';
  await page.goto(url);
  const lessons = await page.evaluate(() => [histoire,antiquite].flatMap(course => course.lessons.map(
    (lesson,index) => ({key:course.key,index,sections:lesson.sections.length})
  )));
  assert.equal(lessons.length,16);
  for (const {key,index,sections} of lessons) {
    await page.evaluate(({key,index}) => showLesson(key==='histoire'?histoire:antiquite,index),{key,index});
    const plan = page.locator('.lesson-plan');
    assert.equal(await plan.locator('a[href^="#lesson-section-"]').count(),sections);
    const last = '#lesson-section-'+(sections-1);
    await plan.locator('a[href="'+last+'"]').click();
    assert.equal(await page.locator(last).textContent(),'Synthèse');
    assert.equal(await page.evaluate(()=>document.activeElement.id),last.slice(1));
    await page.locator('a[href="#lesson-plan"]').last().click();
    assert.equal(await page.evaluate(()=>document.activeElement.id),'lesson-plan');
  }

  await page.evaluate(()=>spaceLesson('histoire','nil','lesson-dossier'));
  assert.equal(await page.evaluate(()=>document.activeElement.id),'lesson-dossier');
  await page.evaluate(()=>showLesson(antiquite,3));
  await page.locator('.lesson-jumps [data-jump="history-quiz"]').click();
  const quiz = page.locator('#history-quiz');
  await quiz.getByRole('radio').nth(1).check();
  await quiz.getByRole('button',{name:'Vérifier ma réponse'}).click();
  await quiz.getByRole('button',{name:'Relire le passage du cours'}).click();
  assert.equal(await page.evaluate(()=>document.activeElement.id),'lesson-section-1');
  await page.locator('#history-done').check();
  await page.locator('.written-exercise textarea').fill('Comparaison de deux passages et du commandement provincial.');
  await page.locator('#save-exercise').click();

  await page.waitForFunction(()=>navigator.serviceWorker.controller);
  await context.setOffline(true);
  await page.reload();
  await page.evaluate(()=>showLesson(antiquite,3));
  await page.locator('.lesson-plan').waitFor();
  assert.equal(await page.locator('#history-done').isChecked(),true);
  assert.equal(await page.locator('.written-exercise textarea').inputValue(),'Comparaison de deux passages et du commandement provincial.');
  assert.equal(await page.locator('.lesson-plan a').count(),7);
  assert.deepEqual(errors,[]);
  console.log(`Histoire ${viewport.width}×${viewport.height} · 16 plans, dossier, remédiation, progression, réponse et rechargement hors ligne`);
  await context.close();
}

async function verifyPhilosophy(browser, viewport) {
  const context = await browser.newContext({viewport, isMobile: viewport.width < 500, hasTouch: viewport.width < 500});
  const page = await context.newPage();
  await page.goto(process.env.CAMPUS_URL || 'http://localhost:8765/');
  const openLesson = index => page.evaluate(i => showLesson({key: 'philosophie', lessons: philosophie}, i), index);

  for (let index = 0; index < 6; index++) {
    await openLesson(index);
    const plan = page.locator('.lesson-plan');
    assert.ok(await plan.locator('a').count() >= 13);
    await plan.locator('a[href="#lesson-section-0"]').click();
    assert.equal(await page.evaluate(() => document.activeElement.id), 'lesson-section-0');
  }

  await openLesson(1);
  await page.locator('summary').filter({hasText: /^Quiz$/}).click();
  const practice = page.locator('#lesson-practice-quiz');
  await practice.getByRole('radio').nth(1).check();
  await practice.getByRole('button').click();
  assert.match(await practice.getByRole('status').textContent(), /Réponse correcte/);
  await page.locator('#history-done').check();

  await page.waitForFunction(() => navigator.serviceWorker.controller);
  await context.setOffline(true);
  await page.reload();
  await openLesson(1);
  assert.equal(await page.locator('#history-done').isChecked(), true);
  assert.ok(await page.locator('.lesson-plan a').count() >= 13);
  await context.close();
}

async function verifyLiterature(browser, viewport) {
  const context = await browser.newContext({viewport, isMobile: viewport.width < 500, hasTouch: viewport.width < 500});
  const page = await context.newPage();
  await page.goto(process.env.CAMPUS_URL || 'http://localhost:8765/');
  const openLesson = index => page.evaluate(i => showLesson({key:'litterature',lessons:litterature},i),index);
  for (let index=0; index<7; index++) {
    await openLesson(index);
    const plan = page.locator('.lesson-plan');
    assert.ok(await plan.getByRole('link').count() >= 8);
    await plan.locator('a[href="#lesson-section-0"]').click();
    assert.equal(await page.evaluate(()=>document.activeElement.id),'lesson-section-0');
    await page.getByText('Barème et pistes de réponse',{exact:true}).click();
    await page.getByRole('heading',{name:'Barème sur 20'}).waitFor();
  }
  await page.locator('summary').filter({hasText:/^Quiz$/}).click();
  const quiz=page.locator('#history-quiz');
  await quiz.getByRole('radio').last().check();
  await quiz.getByRole('button',{name:'Vérifier ma réponse'}).click();
  await quiz.getByRole('button',{name:'Relire le passage du cours'}).click();
  assert.equal(await page.evaluate(()=>document.activeElement.id),'lesson-section-2');
  await page.locator('#history-done').check();
  await page.waitForFunction(()=>navigator.serviceWorker.controller);
  await context.setOffline(true);
  await page.reload();
  await openLesson(6);
  assert.equal(await page.locator('#history-done').isChecked(),true);
  assert.match(await page.locator('#lesson-dossier').textContent(),/commissaire/);
  await context.close();
}

async function verifyPhysics(browser, viewport) {
  const context = await browser.newContext({viewport, isMobile: viewport.width < 500, hasTouch: viewport.width < 500});
  const page = await context.newPage();
  await page.goto(process.env.CAMPUS_URL || 'http://localhost:8765/');
  const openLesson = index => page.evaluate(i => showLesson(firstYearCourses[3], i), index);
  for (let index=0; index<11; index++) {
    await openLesson(index);
    const plan=page.locator('.lesson-plan');
    await plan.locator('a[href="#lesson-section-0"]').click();
    assert.equal(await page.evaluate(()=>document.activeElement.id),'lesson-section-0');
    await page.getByText('Barème et pistes de réponse',{exact:true}).click();
    await page.getByRole('heading',{name:'Barème sur 20'}).waitFor();
  }
  await openLesson(7);
  await page.locator('summary').filter({hasText:/^Quiz$/}).click();
  const quiz=page.locator('#history-quiz');
  await quiz.getByRole('radio').first().check();
  await quiz.getByRole('button',{name:'Vérifier ma réponse'}).click();
  await quiz.getByRole('button',{name:'Relire le passage du cours'}).click();
  assert.equal(await page.evaluate(()=>document.activeElement.id),'lesson-section-0');
  await page.locator('#history-done').check();
  await page.waitForFunction(()=>navigator.serviceWorker.controller);
  await context.setOffline(true);
  await page.reload();
  await openLesson(7);
  assert.equal(await page.locator('#history-done').isChecked(),true);
  assert.match(await page.locator('#lesson-dossier').textContent(),/caisse/);
  await context.close();
}

async function verifyPsychology(browser, viewport) {
  const context = await browser.newContext({viewport, isMobile: viewport.width < 500, hasTouch: viewport.width < 500});
  const page = await context.newPage();
  await page.goto(process.env.CAMPUS_URL || 'http://localhost:8765/');
  const openLesson = index => page.evaluate(i => showLesson(firstYearCourses[4], i), index);
  for (let index=0; index<5; index++) {
    await openLesson(index);
    await page.locator('.lesson-plan a[href="#lesson-section-0"]').click();
    assert.equal(await page.evaluate(()=>document.activeElement.id),'lesson-section-0');
    await page.getByText('Barème et pistes de réponse',{exact:true}).click();
    await page.getByRole('heading',{name:'Barème sur 20'}).waitFor();
  }
  await openLesson(2);
  await page.locator('summary').filter({hasText:/^Quiz$/}).click();
  const quiz=page.locator('#history-quiz');
  await quiz.getByRole('radio').first().check();
  await quiz.getByRole('button',{name:'Vérifier ma réponse'}).click();
  await quiz.getByRole('button',{name:'Relire le passage du cours'}).click();
  assert.equal(await page.evaluate(()=>document.activeElement.id),'lesson-section-0');
  await page.locator('#history-done').check();
  await page.waitForFunction(()=>navigator.serviceWorker.controller);
  await context.setOffline(true);
  await page.reload();
  await openLesson(2);
  assert.equal(await page.locator('#history-done').isChecked(),true);
  assert.match(await page.locator('#lesson-dossier').textContent(),/swahili/);
  await context.close();
}

(async()=>{
  const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||undefined});
  try{
    for(const viewport of [{width:390,height:844},{width:1366,height:768}]){await verify(browser,viewport);await verifyMath(browser,viewport);await verifyHistory(browser,viewport);await verifyPhilosophy(browser,viewport);await verifyLiterature(browser,viewport);await verifyPhysics(browser,viewport);await verifyPsychology(browser,viewport);}
  }finally{await browser.close();}
})().catch(error=>{console.error(error);process.exitCode=1;});
