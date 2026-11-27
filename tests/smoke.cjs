const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const html = fs.readFileSync('index.html','utf8');
const sw = fs.readFileSync('sw.js','utf8');
const manifest = JSON.parse(fs.readFileSync('manifest.json','utf8'));
const assets = vm.runInNewContext(sw.split('self.addEventListener')[0]+'; ASSETS');
for (const asset of assets) assert.ok(fs.existsSync(asset), 'Cache: '+asset);
for (const match of html.matchAll(/<script src="([^"]+)"/g)) {
  assert.ok(assets.includes('./'+match[1]), 'Script absent du cache: '+match[1]);
  new vm.Script(fs.readFileSync(match[1],'utf8'), {filename:match[1]});
}
for (const match of html.matchAll(/<script>([\s\S]*?)<\/script>/g)) new vm.Script(match[1]);
for (const icon of manifest.icons) assert.ok(fs.existsSync(icon.src));
assert.ok(fs.existsSync(manifest.start_url));
const version = html.match(/Campus numérique · V(\d+)\.(\d+)\.(\d+)/);
assert.ok(version, 'Version affichée absente');
assert.ok(sw.includes('academia-v'+version.slice(1).join('')), 'Version du cache incohérente');
console.log('Contrôles statiques réussis');

const sandbox = {};
vm.createContext(sandbox);
vm.runInContext(fs.readFileSync('notes.js','utf8'), sandbox);
assert.equal(vm.runInContext('safeBackupTree({notes:{a:"texte"},done:{a:true}})',sandbox),true);
assert.equal(vm.runInContext('safeBackupTree(JSON.parse(\'{"notes":{"__proto__":{}}}\'))',sandbox),false);
assert.equal(vm.runInContext('safeBackupTree({constructor:{}})',sandbox),false);
assert.equal(vm.runInContext('safeBackupTree(Array.from({length:45}).reduce(a=>({a}),{}))',sandbox),false);
console.log('Contrôles de structure des sauvegardes réussis');

vm.runInContext(fs.readFileSync('campus.js','utf8'),sandbox);
assert.equal(vm.runInContext('validStudyMinutes({"2026-11-27":45})',sandbox),true);
assert.equal(vm.runInContext('validStudyMinutes({"2026-11-27":-1})',sandbox),false);
assert.equal(vm.runInContext('validStudyMinutes(undefined)',sandbox),true);
assert.equal(vm.runInContext('studentWeek(new Date(2026,10,29,12))[0]',sandbox),'2026-11-23');
assert.ok(html.includes('studentDesk()'));
console.log('Contrôles du bureau étudiant réussis');

const readingSource=fs.readFileSync('civilisations.js','utf8');
vm.runInContext(readingSource.slice(readingSource.indexOf('function validReadingTools('),readingSource.indexOf('function installReadingTools(')),sandbox);
assert.equal(vm.runInContext('validReadingTools(undefined)',sandbox),true);
assert.equal(vm.runInContext('validReadingTools({theme:"sepia",size:115,marks:{a:{highlight:true,note:"test"}}})',sandbox),true);
assert.equal(vm.runInContext('validReadingTools({theme:"invalid",size:115,marks:{}})',sandbox),false);
console.log('Contrôles des préférences de lecture réussis');

vm.runInContext(readingSource.slice(readingSource.indexOf('function sameBookmark('),readingSource.indexOf('function bookmarkPanel(')),sandbox);
assert.equal(vm.runInContext('validBookmarks(undefined)',sandbox),true);
assert.equal(vm.runInContext('validBookmarks([{courseKey:"a",lessonId:"b",section:0,title:"Titre"}])',sandbox),true);
assert.equal(vm.runInContext('validBookmarks([{courseKey:"a",lessonId:"b",section:-1,title:"Titre"}])',sandbox),false);

assert.equal(vm.runInContext('nextMemoryReview(undefined,false,"2026-11-27").due',sandbox),'2026-11-28');
assert.equal(vm.runInContext('nextMemoryReview(undefined,true,"2026-11-27").due',sandbox),'2026-11-29');
assert.equal(vm.runInContext('nextMemoryReview(nextMemoryReview(undefined,true,"2026-11-27"),true,"2026-11-29").step',sandbox),1);
assert.equal(vm.runInContext('nextMemoryReview(nextMemoryReview(undefined,true,"2026-11-27"),true,"2026-11-27").step',sandbox),0);
assert.equal(vm.runInContext('validMemoryCards([{question:"Q",answer:"A"}])',sandbox),true);
assert.equal(vm.runInContext('validMemoryCards([{question:42,answer:"A"}])',sandbox),false);

assert.equal(vm.runInContext('validLibraryShelf(undefined)',sandbox),true);
assert.equal(vm.runInContext('validLibraryShelf({"https://example.org":"read"})',sandbox),true);
assert.equal(vm.runInContext('validLibraryShelf({"https://example.org":"invalid"})',sandbox),false);
assert.equal(vm.runInContext('validLibraryShelf({"javascript:alert(1)":"read"})',sandbox),false);

assert.equal(vm.runInContext('editorialStatus({})',sandbox),'Structure à compléter');
assert.equal(vm.runInContext('editorialStatus({goal:"g",prerequisite:"p",sections:[["titre","texte [1]"]],activity:"a",correction:"c",quiz:["q",["r"],0,"j"],sources:[["a","t","2026","https://example.org","preuve"]],review:"r"})',sandbox),'Structure complète');
assert.equal(vm.runInContext('editorialChecks({sections:[["t","[2]"]],sources:[["a","t","2026","https://example.org","p"]]}).find(x=>x[0].startsWith("Renvois"))[1]',sandbox),false);

assert.equal(vm.runInContext('validPracticeProjects(undefined)',sandbox),true);
assert.equal(vm.runInContext('validPracticeProjects([{id:"1",kind:"Laboratoire",title:"Test",steps:["","","",""],status:"draft"}])',sandbox),true);
assert.equal(vm.runInContext('validPracticeProjects([{id:"1",kind:"Laboratoire",title:"Test",steps:[],status:"draft"}])',sandbox),false);

const readingCss=fs.readFileSync('civilisations.css','utf8');
assert.ok(readingCss.includes('.history-overview,.card,blockquote,pre,details'));
function luminance(hex){const rgb=hex.match(/../g).map(x=>parseInt(x,16)/255).map(x=>x<=0.04045?x/12.92:((x+0.055)/1.055)**2.4);return rgb[0]*0.2126+rgb[1]*0.7152+rgb[2]*0.0722;}
for(const [fg,bg] of [['f0f3ed','293936'],['a7e4d4','293936'],['233b36','f2f7f5'],['17665b','f2f7f5'],['382d20','eee0c3'],['65451e','eee0c3'],['302a17','f8e6a1']]){const a=luminance(fg),b=luminance(bg);assert.ok((Math.max(a,b)+0.05)/(Math.min(a,b)+0.05)>=4.5);}

vm.runInContext(fs.readFileSync('civilisations-data.js','utf8'),sandbox);
assert.equal(vm.runInContext('civilisations.filter(l=>l.id==="evolution-humaine").length',sandbox),1);
assert.equal(vm.runInContext('civilisations.find(l=>l.id==="evolution-humaine").sources.length',sandbox),7);
assert.ok(readingSource.includes("function evolutionQuiz()"));
assert.ok(readingSource.includes("function evolutionAnatomy()"));

assert.equal(vm.runInContext('civilisations[1].id',sandbox),'migrations-humaines');
assert.equal(vm.runInContext('civilisations[1].sources.length',sandbox),8);
assert.equal(vm.runInContext('civilisations[1].quiz[2]',sandbox),1);

const migrationSource=fs.readFileSync('civilisations.js','utf8');
assert.ok(migrationSource.includes('function migrationMap(lesson)'));
assert.ok(migrationSource.includes('bindMigrationMap(v);'));
assert.ok(migrationSource.includes('data-migration-pin'));

assert.ok(migrationSource.includes('function migrationFlashcards(lesson)'));
assert.ok(migrationSource.includes('bindMigrationFlashcards(v,course,lesson);'));

assert.ok(migrationSource.includes('lessonCardKey(course,lesson,i)'));
assert.ok(migrationSource.includes('nextMemoryReview(S.reviews[key],correct,localStudyDate())'));
assert.ok(fs.readFileSync('campus.js','utf8').includes('...builtinDue.map'));

assert.ok(migrationSource.includes('function lessonCardDefinitions(lesson)'));
assert.ok(migrationSource.includes('function builtinStudyCards()'));

assert.equal(vm.runInContext('civilisations.find(l=>l.id==="mobilites").flashcards.length',sandbox),20);
assert.equal(vm.runInContext('civilisations.filter(l=>l.id==="mobilites").length',sandbox),1);
assert.equal(vm.runInContext('civilisations.find(l=>l.id==="mobilites").sources.length',sandbox),4);

assert.equal(vm.runInContext('civilisations.find(l=>l.id==="neolithiques").flashcards.length',sandbox),28);
assert.equal(vm.runInContext('civilisations.filter(l=>l.id==="neolithiques").length',sandbox),1);
assert.equal(vm.runInContext('civilisations.find(l=>l.id==="neolithiques").sources.length',sandbox),5);
assert.ok(vm.runInContext('civilisations.find(l=>l.id==="neolithiques").flashcards.every(c=>c.length===2&&c.every(t=>typeof t==="string"&&t.length))',sandbox));

// Execute the actual lesson-specific rendering, not merely a source-string check.
const extrasStart=readingSource.indexOf('function evolutionExtras(');
const extrasEnd=readingSource.indexOf('function showLesson(',extrasStart);
vm.runInContext('function e(x){return String(x)};function evolutionAnatomy(){return ""};function evolutionFossils(){return ""};'+readingSource.slice(extrasStart,extrasEnd),sandbox);
assert.ok(vm.runInContext('evolutionExtras(civilisations[0]).includes("Chronologie graphique")',sandbox));
assert.equal(vm.runInContext('evolutionExtras(civilisations[1])',sandbox),'');

assert.equal(vm.runInContext('civilisations[4].id',sandbox),'villages-neolithiques');
assert.equal(vm.runInContext('civilisations[5].id',sandbox),'methodes-archeologiques');
assert.equal(vm.runInContext('civilisations[4].flashcards.length',sandbox),20);
assert.equal(vm.runInContext('civilisations[5].flashcards.length',sandbox),28);
assert.equal(vm.runInContext('new Set(civilisations.map(l=>l.id)).size',sandbox),vm.runInContext('civilisations.length',sandbox));

assert.equal(vm.runInContext('philosophie[0].id',sandbox),'introduction-philosophie');
assert.equal(vm.runInContext('philosophie[1].id',sandbox),'socrate');
assert.equal(vm.runInContext('philosophie[0].flashcards.length',sandbox),30);
assert.ok(vm.runInContext('philosophie[0].flashcards.every(c=>c.length===2&&c.every(s=>typeof s==="string"&&s.length>0))',sandbox));
