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
