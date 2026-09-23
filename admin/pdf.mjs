import {fonts} from './pdf-fonts.mjs';
import {totals,lineTotals,money} from './core.mjs';
export function buildPDF(d,c,client,PDF=globalThis.jspdf?.jsPDF){
  if(!PDF)throw new Error('Le module PDF n’est pas disponible. Rechargez la page.');
  const pdf=new PDF({unit:'mm',format:'a4',compress:true});
  pdf.addFileToVFS('Inter-Regular.ttf',fonts.regular);pdf.addFont('Inter-Regular.ttf','Inter','normal');
  pdf.addFileToVFS('Inter-Semibold.ttf',fonts.bold);pdf.addFont('Inter-Semibold.ttf','Inter','bold');
  const brand=d.brand==='atelier'?'Atelier d’Arc':'Hypervision Solutions',kind=d.type==='quote'?'DEVIS':'FACTURE',ref=d.number||'BROUILLON',blue=[12,95,255],ink=[17,24,39],muted=[96,109,130],left=17,right=193,bottom=272;
  const date=value=>value?new Date(value+'T12:00:00').toLocaleDateString('fr-FR'):'—';
  const euros=value=>money(value).replace(/[\u00a0\u202f]/g,' ');
  pdf.setProperties({title:`${kind} ${ref} — ${brand}`,author:c.legalName||brand,subject:d.title,creator:'Hypervision Studio'});
  function style(size=9,bold=false,color=ink){pdf.setFont('Inter',bold?'bold':'normal');pdf.setFontSize(size);pdf.setTextColor(...color);}
  function pageHeader(){style(15,true);pdf.text(brand,left,18);style(9,true,blue);pdf.text(`${kind} · ${ref}`,right,18,{align:'right'});pdf.setDrawColor(...blue);pdf.setLineWidth(.65);pdf.line(left,24,right,24);if(d.status==='draft'){style(8,true,muted);pdf.text('BROUILLON — NON ÉMIS',right,29,{align:'right'});}}
  pageHeader();let y=37;
  function newPage(){pdf.addPage();pageHeader();y=37;}
  function ensure(height){if(y+height>bottom)newPage();}
  function paragraph(text,{size=9,bold=false,color=ink,width=176,gap=4}={}){if(!text)return;style(size,bold,color);const lines=pdf.splitTextToSize(String(text),width),step=size*.46;for(const line of lines){ensure(step);style(size,bold,color);pdf.text(line,left,y);y+=step;}y+=gap;}
  const seller=[c.legalName||'Entreprise à renseigner',c.form+(c.capital?' · Capital : '+c.capital:''),c.address,'SIRET : '+(c.siret||'À renseigner'),c.register,c.vatMode==='taxable'?'TVA : '+c.vatNumber:'',c.phone,c.email].filter(Boolean);
  const buyer=[client.name||'Client à choisir',client.address,client.siren?'SIREN : '+client.siren:'',client.vatNumber?'TVA : '+client.vatNumber:'',client.email].filter(Boolean);
  pdf.autoTable({startY:y,margin:{top:37,left,right:17,bottom:27},tableWidth:176,theme:'plain',styles:{font:'Inter',fontSize:9,cellPadding:{top:2,right:10,bottom:2,left:0},textColor:ink,overflow:'linebreak'},headStyles:{fontStyle:'bold',fontSize:8,textColor:muted},columnStyles:{0:{cellWidth:95},1:{cellWidth:81}},head:[['ÉMETTEUR','CLIENT']],body:[[seller.join('\n'),buyer.join('\n')]],didDrawPage:pageHeader});
  y=pdf.lastAutoTable.finalY+10;
  paragraph(d.title||'Objet à renseigner',{size:13,bold:true,gap:5});
  paragraph(`Date : ${date(d.date)} · ${d.type==='quote'?'Validité du devis':'Échéance de paiement'} : ${date(d.dueDate)}`,{size:9,color:muted,gap:1});
  if(d.type==='invoice')paragraph('Date de prestation / livraison : '+date(d.serviceDate),{size:9,color:muted,gap:1});
  paragraph(d.category,{size:9,color:muted,gap:1});
  if(d.schedule)paragraph('Calendrier : '+d.schedule,{size:9,color:muted,gap:1});
  if(d.orderRef)paragraph('Commande : '+d.orderRef,{size:9,color:muted,gap:1});
  if(d.sourceQuoteNumber)paragraph('Devis de référence : '+d.sourceQuoteNumber,{size:9,color:muted,gap:1});
  if(d.siteAddress)paragraph('Chantier / livraison : '+d.siteAddress,{size:9,color:muted,gap:1});
  y+=6;
  pdf.autoTable({startY:y,margin:{top:37,left,right:17,bottom:27},tableWidth:176,theme:'plain',styles:{font:'Inter',fontSize:8.5,cellPadding:3,textColor:ink,overflow:'linebreak',lineColor:[229,233,239],lineWidth:{bottom:.15}},headStyles:{fillColor:[240,245,254],textColor:muted,fontStyle:'bold',fontSize:7.5},columnStyles:{0:{cellWidth:64},1:{cellWidth:23,halign:'right'},2:{cellWidth:25,halign:'right'},3:{cellWidth:18,halign:'right'},4:{cellWidth:17,halign:'right'},5:{cellWidth:29,halign:'right'}},head:[['PRESTATION','QTÉ / UNITÉ','PU HT','REMISE','TVA','TOTAL HT']],body:d.lines.map(l=>[l.description||'Prestation à décrire',`${l.quantity} ${l.unit}`,euros(Math.round(l.price*100)),`${l.discount||0} %`,`${c.vatMode==='exempt'?0:l.vat} %`,euros(lineTotals(l,c.vatMode==='exempt').net)]),didDrawPage:pageHeader});
  y=pdf.lastAutoTable.finalY+10;const t=totals(d,c),totalLines=[['Total HT',t.net],...Object.entries(t.groups).map(([rate,value])=>[`TVA ${rate} %`,value]),['Total TTC',t.total]];ensure(totalLines.length*7+10);
  totalLines.forEach(([label,value],index)=>{const last=index===totalLines.length-1;style(last?12:9,last,last?blue:ink);if(last){pdf.setDrawColor(219,227,239);pdf.line(117,y-4,right,y-4);}pdf.text(label,117,y);pdf.text(euros(value),right,y,{align:'right'});y+=last?10:7;});y+=4;
  if(c.vatMode==='exempt')paragraph('TVA non applicable, art. 293 B du CGI.',{size:9,color:muted});
  if(d.notes)paragraph(d.notes,{size:9});
  paragraph('RÈGLEMENT',{size:8,bold:true,color:muted,gap:2});paragraph(c.paymentTerms,{size:9,gap:2});
  if(c.iban)paragraph('IBAN : '+c.iban,{size:9,gap:2});
  if(d.status==='paid')paragraph('Règlement enregistré le '+date(d.paidDate),{size:9,bold:true,gap:2});
  if(d.type==='quote'){ensure(32);y+=4;pdf.setDrawColor(207,216,227);pdf.rect(left,y,176,26);style(9,true);pdf.text('Bon pour accord',left+4,y+7);style(8,false,muted);pdf.text('Date, nom et signature du client :',left+4,y+13);y+=34;}
  y+=5;paragraph(c.discountTerms,{size:8,color:muted,gap:2});
  if(client.kind==='business'&&d.type==='invoice'){paragraph('Pénalités de retard : '+c.lateRate,{size:8,color:muted,gap:2});paragraph('Indemnité forfaitaire pour frais de recouvrement : 40 € en cas de retard de paiement (client professionnel).',{size:8,color:muted,gap:2});}
  if(c.insurance)paragraph('Assurance professionnelle : '+c.insurance,{size:8,color:muted,gap:2});
  if(c.extraLegal)paragraph(c.extraLegal,{size:8,color:muted,gap:2});
  const pages=pdf.getNumberOfPages();for(let i=1;i<=pages;i++){pdf.setPage(i);style(7,false,muted);pdf.setDrawColor(225,230,237);pdf.line(left,280,right,280);const footer=pdf.splitTextToSize(`${c.legalName||brand} · ${ref}`,145).slice(0,2);pdf.text(footer,left,285);pdf.text(`${i} / ${pages}`,right,285,{align:'right'});}
  return pdf;
}
