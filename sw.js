const C='academia-v0323';const ASSETS=['./','./index.html','./manifest.json','./icon.svg','./icon-192.png','./icon-512.png','./icon-maskable.png','./academia-logo.png','./pwa.js','./civilisations.css','./civilisations.js','./civilisations-data.js','./histoire-approfondissement.js','./antiquite-data.js','./humanites-data.js','./sciences-data.js','./fondements-data.js','./campus.js','./mathematiques.js','./mathematiques-cycle1.js','./audit-tools.js','./evaluations.js','./methode-data.js','./reperes-histoire.js','./annee1-suite.js','./notes.js','./annee1-complements.js','./cycles-data.js','./cycles-suite.js','./parcours-suite.js','./progression.js','./navigation.js','./campus-search.js','./campus-history.js','./syntheses.js','./docs/suivi-charte.html','./docs/controle-editorial.html','./docs/chronologie.html','./docs/Academia_Universalis_charte.pdf'];
self.addEventListener('install',e=>e.waitUntil(caches.open(C).then(c=>c.addAll(ASSETS.map(path=>new Request(path,{cache:'reload'}))))));
self.addEventListener('message',e=>{if(e.data==='SKIP_WAITING')self.skipWaiting()});
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>/^academia-v[0-9]+$/.test(k)&&k!==C).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{if(e.request.method!=='GET'||new URL(e.request.url).origin!==location.origin)return;
 const packs=new URL('cours-hors-ligne/',self.registration.scope);
 if(new URL(e.request.url).pathname.startsWith(packs.pathname)){
   e.respondWith(caches.open('academia-packs-v1').then(async cache=>await cache.match(e.request)||
     new Response('Cette copie du cours a été retirée. Ouvrez le campus pour la recréer.',{status:404,headers:{'Content-Type':'text/plain;charset=utf-8'}})));
   return;
 }
 e.respondWith(caches.open(C).then(async c=>{const url=new URL(e.request.url);if(e.request.mode==='navigate'&&['./','./index.html'].some(path=>new URL(path,self.registration.scope).pathname===url.pathname))return (await c.match('./index.html'))||fetch(e.request);return (await c.match(e.request))||fetch(e.request)}))});
