'use strict';
const english=document.documentElement.lang.startsWith('en');
const navbar=document.querySelector('[data-navbar]');
const navToggle=document.querySelector('[data-nav-toggler]');
if(navbar&&navToggle){
 const setMenu=open=>{navbar.classList.toggle('active',open);navToggle.setAttribute('aria-expanded',String(open));navToggle.setAttribute('aria-label',open?(english?'Close menu':'Fermer le menu'):(english?'Open menu':'Ouvrir le menu'));};
 navToggle.addEventListener('click',()=>setMenu(navToggle.getAttribute('aria-expanded')!=='true'));
 navbar.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>setMenu(false)));
 document.addEventListener('keydown',event=>{if(event.key==='Escape'&&navToggle.getAttribute('aria-expanded')==='true'){setMenu(false);navToggle.focus();}});
 document.addEventListener('click',event=>{if(!event.target.closest('.site-header'))setMenu(false);});
 window.matchMedia('(min-width: 851px)').addEventListener('change',event=>{if(event.matches)setMenu(false);});
}
document.querySelectorAll('[data-year]').forEach(el=>el.textContent=new Date().getFullYear());
const smsBody=english?'Hello Atelier d’Arc, I would like to discuss an electrical project. Work needed: … Postcode / area: … Preferred dates: …':'Bonjour Atelier d’Arc, je souhaite échanger sur un projet électrique. Travaux ou problème : … Commune / arrondissement : … Créneaux souhaités : …';
const separator=/iPad|iPhone|iPod/.test(navigator.userAgent)?'&':'?';
document.querySelectorAll('[data-sms]').forEach(link=>link.href=`sms:+33767690805${separator}body=${encodeURIComponent(smsBody)}`);
document.querySelectorAll('[data-copy]').forEach(button=>button.addEventListener('click',async()=>{const status=document.querySelector('[data-copy-status]');try{await navigator.clipboard.writeText('07 67 69 08 05');if(status)status.textContent=english?'Number copied.':'Numéro copié.';}catch{if(status)status.textContent=english?'Copy: +33 7 67 69 08 05':'À copier : 07 67 69 08 05';}}));
