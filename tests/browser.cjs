const assert = require('node:assert/strict');
const {chromium} = require('playwright');

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
  await page.locator('input[name=minutes]').fill('35');
  await page.getByRole('button',{name:'Recalculer le planning'}).click();
  assert.match(await page.locator('[data-slot]').first().locator('..').innerText(),/35 min/);
  await page.evaluate(()=>go(5));
  await page.locator('#library-next').click();
  assert.match(await page.locator('#library-page').innerText(),/Page 2/);
  await page.evaluate(()=>go(8));
  assert.equal(await page.locator('[data-atlas-results] section').count(),3);
  await page.evaluate(()=>{
    const item=studyItems().find(i=>i.lesson.quiz);
    showLesson(item.course,item.index);
  });
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
  await page.waitForFunction(()=>navigator.serviceWorker.controller);
  await context.setOffline(true);
  await page.reload();
  await page.locator('#desk-session').waitFor();
  const navigation=await page.evaluate(()=>Math.round(performance.getEntriesByType('navigation')[0].domContentLoadedEventEnd));
  assert.deepEqual(errors,[]);
  console.log(`Chromium ${viewport.width}×${viewport.height} · navigation, sauvegarde et hors connexion · DOM local hors ligne ${navigation} ms`);
  await context.close();
}

(async()=>{
  const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||undefined});
  try{
    for(const viewport of [{width:390,height:844},{width:1366,height:768}])await verify(browser,viewport);
  }finally{await browser.close();}
})().catch(error=>{console.error(error);process.exitCode=1;});
