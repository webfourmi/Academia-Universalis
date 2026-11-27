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
