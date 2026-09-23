'use strict';
const shareButton=document.querySelector('[data-share-contact]');
if(shareButton)shareButton.addEventListener('click',async()=>{
 const status=document.querySelector('[data-share-status]');
 const download=document.querySelector('.card-save');
 try{
  const response=await fetch(download.href);if(!response.ok)throw new Error('Contact unavailable');
  const file=new File([await response.blob()],'Atelier-dArc-Edwin-Imani.vcf',{type:'text/vcard'});
  if(navigator.canShare&&navigator.canShare({files:[file]})){await navigator.share({title:'Edwin Imani — Atelier d’Arc',files:[file]});status.textContent='';}
  else{download.click();status.textContent='Le fichier contact est prêt à être transmis.';}
 }catch(error){if(error.name!=='AbortError'){download.click();status.textContent='Téléchargez le contact, puis transmettez ce fichier.';}}
});
