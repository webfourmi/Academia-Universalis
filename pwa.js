(() => {
const status=document.querySelector('#status'), install=document.querySelector('#install'), update=document.querySelector('#update'), check=document.querySelector('#check');let prompt,reg,reload=false;
const updateStatus=document.querySelector('#update-status');
const updatesLabel=document.querySelector('#updates-label');
const sayUpdate=text=>updateStatus.textContent=text;
const say=t=>status.textContent=t; const connection=()=>say(navigator.onLine?'Connecté · campus disponible':'Hors connexion · contenu intégré disponible si déjà mis en cache');
window.addEventListener('online',connection);window.addEventListener('offline',connection);connection();
window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();prompt=e;install.hidden=false});install.onclick=async()=>{if(prompt){await prompt.prompt();await prompt.userChoice;prompt=null;install.hidden=true}};window.addEventListener('appinstalled',()=>{install.hidden=true;say('Application installée')});
function waiting(){if(reg.waiting){update.hidden=false;updatesLabel.textContent='Mises à jour · Nouvelle version';document.querySelector('#campus-installation').dataset.updateAvailable='true';sayUpdate('Nouvelle version disponible. Tes notes sont conservées sur cet appareil.')}}
update.onclick=()=>{if(reg?.waiting){reload=true;reg.waiting.postMessage('SKIP_WAITING')}};
if(!('serviceWorker'in navigator)||!isSecureContext||location.protocol==='file:'){say('Aperçu local : installation et mises à jour nécessitent un site HTTPS.');check.disabled=true;return;}
navigator.serviceWorker.addEventListener('controllerchange',()=>{if(reload)location.reload()});
navigator.serviceWorker.register('./sw.js',{updateViaCache:'none'}).then(r=>{reg=r;waiting();r.addEventListener('updatefound',()=>{const w=r.installing;w?.addEventListener('statechange',()=>{if(w.state==='installed'&&navigator.serviceWorker.controller)waiting()})});check.onclick=async()=>{try{await r.update();if(r.waiting)waiting();else sayUpdate(r.installing?'Téléchargement de la mise à jour…':'Aucune nouvelle version détectée.')}catch{sayUpdate('Vérification impossible. Réessaie avec Internet.')}}}).catch(()=>say('Installation hors ligne indisponible sur ce navigateur.'));
})();
