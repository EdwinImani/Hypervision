'use strict';
const profile = document.body.dataset;
const status = document.querySelector('[data-status]');
const save = document.querySelector('[data-save-contact]');
const tell = text => { status.textContent = text; };
// Use a Blob download for the embedded offline contact, preserving its UTF-8 bytes.
save.addEventListener('click', event => {
  if (!save.href.startsWith('data:text/vcard;')) return;
  event.preventDefault();
  const bytes = Uint8Array.from(atob(save.href.split(',')[1]), character => character.charCodeAt(0));
  const url = URL.createObjectURL(new Blob([bytes], {type:'text/vcard;charset=utf-8'}));
  const link = document.createElement('a');
  link.href = url;
  link.download = save.download;
  document.body.append(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 30000);
});
const sms = document.querySelector('[data-sms]');
if (sms) {
  const separator = /iPad|iPhone|iPod/.test(navigator.userAgent) ? '&' : '?';
  sms.href = `sms:+33767690805${separator}body=${encodeURIComponent(`Bonjour ${profile.brand}, je souhaite échanger sur un projet. Mon besoin : … Commune : …`)}`;
}
document.querySelector('[data-copy]').addEventListener('click', async () => {
  try { await navigator.clipboard.writeText('07 67 69 08 05'); tell('Numéro copié.'); }
  catch { tell('À copier : 07 67 69 08 05'); }
});
document.querySelector('[data-share]').addEventListener('click', async () => {
  try {
    const response = await fetch(save.href);
    if (!response.ok) throw new Error('Contact unavailable');
    const file = new File([await response.blob()], save.download, {type:'text/vcard'});
    if (navigator.canShare && navigator.canShare({files:[file]})) {
      await navigator.share({title:`Edwin Imani - ${profile.brand}`,files:[file]});
      tell('');
    } else { save.click(); tell('Transmettez le fichier contact téléchargé.'); }
  } catch (error) {
    if (error.name !== 'AbortError') { save.click(); tell('Enregistrez le contact pour le transmettre.'); }
  }
});
