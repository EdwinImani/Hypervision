export const money = cents => new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(cents / 100);
export const today = () => { const d = new Date(); return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`; };
export const uid = () => crypto.randomUUID();
export function defaults() {
  return { schema: 1, revision: 0, company: { legalName:'', form:'', capital:'', address:'', siret:'', register:'', vatMode:'', vatNumber:'', phone:'07 67 69 08 05', email:'', iban:'', insurance:'', paymentTerms:'Paiement par virement bancaire.', lateRate:'', discountTerms:'Escompte pour paiement anticipé : néant.', extraLegal:'', nextInvoice:1, nextQuote:1 }, clients:[], documents:[] };
}
export function lineTotals(line, exempt=false) {
  const quantity=Number(line.quantity), price=Number(line.price), discount=Number(line.discount||0), vat=exempt?0:Number(line.vat);
  if (![quantity,price,discount,vat].every(Number.isFinite) || quantity<=0 || quantity>1000000 || price<0 || price>10000000 || discount<0 || discount>100 || vat<0 || vat>100) throw new Error('Vérifiez les quantités, prix, remises et taux de TVA.');
  const net=Math.round(quantity*Math.round(price*100)*(1-discount/100));
  const tax=Math.round(net*vat/100);
  return {net,tax,total:net+tax,vat};
}
export function totals(doc, company) {
  const groups={}; let net=0,tax=0;
  for(const line of doc.lines) { const t=lineTotals(line,company.vatMode==='exempt');net+=t.net;tax+=t.tax;groups[t.vat]=(groups[t.vat]||0)+t.tax; }
  return {net,tax,total:net+tax,groups};
}
export function createDraft(type='quote',brand='hypervision') {
  const date=today(),due=new Date(date+'T12:00:00');due.setDate(due.getDate()+30);
  return {id:uid(),type,brand,number:'',status:'draft',date,dueDate:`${due.getFullYear()}-${String(due.getMonth()+1).padStart(2,'0')}-${String(due.getDate()).padStart(2,'0')}`,serviceDate:date,clientId:'',title:'',siteAddress:'',orderRef:'',category:'Prestations de services',schedule:'',notes:'',lines:[{description:'',quantity:1,unit:'u',price:0,vat:20,discount:0}],createdAt:new Date().toISOString()};
}
export function issueErrors(doc,data) {
  const c=data.company,client=data.clients.find(x=>x.id===doc.clientId),e=[];
  if(!c.legalName.trim()||!c.form.trim()||!c.address.trim())e.push('Complétez la raison sociale, la forme juridique et l’adresse dans Paramètres.');
  if(!/^\d{14}$/.test(c.siret.replace(/\s/g,'')))e.push('Renseignez un SIRET de 14 chiffres dans Paramètres.');
  if(!['taxable','exempt'].includes(c.vatMode))e.push('Choisissez votre régime de TVA dans Paramètres.');
  if(c.vatMode==='taxable'&&!c.vatNumber.trim())e.push('Renseignez le numéro de TVA de l’entreprise.');
  if(!client?.name?.trim()||!client?.address?.trim())e.push('Choisissez un client avec un nom et une adresse de facturation.');
  if(client?.kind==='business'&&!/^\d{9}$/.test((client.siren||'').replace(/\s/g,'')))e.push('Renseignez le SIREN du client professionnel.');
  if(!doc.title.trim())e.push('Ajoutez un objet au document.');
  if(!/^\d{4}-\d{2}-\d{2}$/.test(doc.date)||!doc.dueDate||doc.dueDate<doc.date)e.push('Vérifiez les dates : l’échéance doit suivre la date du document.');
  if(doc.type==='invoice'&&!doc.serviceDate)e.push('Renseignez la date de la prestation.');
  if(doc.type==='quote'&&!doc.schedule.trim())e.push('Précisez la date ou le délai prévu pour les travaux.');
  if(!doc.lines.length||doc.lines.some(l=>!l.description.trim()))e.push('Décrivez chaque ligne de prestation.');
  try{totals(doc,c);}catch(error){e.push(error.message);}
  if(!c.paymentTerms.trim())e.push('Renseignez vos conditions de paiement.');
  if(doc.type==='invoice'&&client?.kind==='business'&&!c.lateRate.trim())e.push('Renseignez les pénalités de retard dans Paramètres.');
  const last=data.documents.filter(d=>d.type===doc.type&&d.status!=='draft').map(d=>d.date).sort().at(-1);
  if(last&&doc.date<last)e.push('La date ne peut pas précéder celle du dernier document émis de cette série.');
  return e;
}
export function issue(doc,data) {
  if(doc.status!=='draft')throw new Error('Ce document a déjà été émis.');
  const errors=issueErrors(doc,data);if(errors.length)throw new Error(errors.join('\n'));
  const key=doc.type==='quote'?'nextQuote':'nextInvoice',seq=Number(data.company[key]);
  if(!Number.isSafeInteger(seq)||seq<1)throw new Error('Séquence de numérotation invalide.');
  doc.number=`${doc.type==='quote'?'DEV':'FAC'}-${doc.date.slice(0,4)}-${String(seq).padStart(5,'0')}`;
  if(data.documents.some(d=>d.id!==doc.id&&d.number===doc.number))throw new Error('Ce numéro existe déjà. Vérifiez la séquence.');
  doc.issuer=structuredClone(data.company);doc.customer=structuredClone(data.clients.find(x=>x.id===doc.clientId));
  doc.status='issued';doc.issuedAt=new Date().toISOString();data.company[key]=seq+1;
  return doc;
}
export function validateData(data) {
  if(data?.schema!==1||!data.company||!Array.isArray(data.clients)||!Array.isArray(data.documents)||!Number.isSafeInteger(data.revision)||data.revision<0)throw new Error('Format de sauvegarde non reconnu.');
  if(data.clients.length>10000||data.documents.length>10000)throw new Error('Sauvegarde trop volumineuse.');
  for(const key of Object.keys(defaults().company))if(typeof data.company[key]!==typeof defaults().company[key])throw new Error('Paramètres invalides.');
  for(const key of ['nextInvoice','nextQuote'])if(!Number.isSafeInteger(data.company[key])||data.company[key]<1)throw new Error('Séquence invalide.');
  const ids=new Set(),numbers=new Set();
  for(const d of data.documents){
    if(!d||typeof d.id!=='string'||ids.has(d.id)||!['quote','invoice'].includes(d.type)||!['hypervision','atelier'].includes(d.brand)||!['draft','issued','accepted','declined','paid'].includes(d.status)||!Array.isArray(d.lines)||d.lines.length>500)throw new Error('Document invalide dans la sauvegarde.');
    ids.add(d.id);for(const key of ['number','date','dueDate','title','notes','clientId','serviceDate','siteAddress','orderRef','category','schedule'])if(typeof d[key]!=='string')throw new Error('Document incomplet dans la sauvegarde.');
    for(const l of d.lines){if(typeof l.description!=='string'||typeof l.unit!=='string')throw new Error('Ligne invalide.');lineTotals(l);}
    if(d.status!=='draft'){if(!d.issuer||!d.customer||!d.number||numbers.has(d.number))throw new Error('Document émis invalide.');numbers.add(d.number);}
  }
  const clients=new Set();for(const c of data.clients){if(!c||typeof c.id!=='string'||clients.has(c.id)||!['private','business'].includes(c.kind)||['name','address','email','phone','siren','vatNumber'].some(k=>typeof c[k]!=='string'))throw new Error('Client invalide.');clients.add(c.id);}
  return data;
}
