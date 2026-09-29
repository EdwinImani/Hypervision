"""Build the one-page partner sheet. Requires reportlab, fonttools[woff], qrcode.
Run from any directory; optionally pass --output path/to/file.pdf.
"""
from pathlib import Path
import argparse
import tempfile
from xml.sax.saxutils import escape
from fontTools.ttLib import TTFont as FontToolsFont
from reportlab.pdfgen import canvas
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.lib.colors import HexColor
from reportlab.lib.styles import ParagraphStyle
from reportlab.platypus import Paragraph
import qrcode

ROOT=Path(__file__).resolve().parents[1]
URL='https://www.hypervision-solution.fr/partenaires/'
parser=argparse.ArgumentParser();parser.add_argument('--output',type=Path,default=ROOT/'downloads/Hypervision-Atelier-dArc-partenaires.pdf');args=parser.parse_args()
args.output.parent.mkdir(parents=True,exist_ok=True)
W,H=595.2756,841.8898
BLUE='#0c5fff';INK='#202129';PAPER='#f7f4ea';MUTED='#596171'
with tempfile.TemporaryDirectory() as temp:
 for weight,label in [(400,'Inter'),(500,'InterMedium'),(600,'InterBold')]:
  font=FontToolsFont(ROOT/f'atelierdarc/assets/fonts/Inter-{weight}.woff2');font.flavor=None
  path=Path(temp)/f'{label}.ttf';font.save(path);pdfmetrics.registerFont(TTFont(label,str(path)))
 pdfmetrics.registerFontFamily('Inter',normal='Inter',bold='InterBold',italic='Inter',boldItalic='InterBold')
 c=canvas.Canvas(str(args.output),pagesize=(W,H),pageCompression=1)
 c.setTitle('Partenaires professionnels | Hypervision Solutions & Atelier d’Arc')
 c.setAuthor('Hypervision Solutions & Atelier d’Arc')
 c.setSubject('Électricité, rénovation, GTB, automatisation et supervision pour les professionnels')
 def box(x,top,w,h,color):
  c.setFillColor(HexColor(color));c.rect(x,H-top-h,w,h,fill=1,stroke=0)
 def text(x,top,txt,size=10,color=INK,font='Inter'):
  c.setFillColor(HexColor(color));c.setFont(font,size);c.drawString(x,H-top-size,txt)
 def para(x,top,txt,w,size=10,color=INK,leading=None):
  p=Paragraph(txt,ParagraphStyle('body',fontName='Inter',fontSize=size,leading=leading or size*1.5,textColor=HexColor(color)))
  _,h=p.wrap(w,H);p.drawOn(c,x,H-top-h);return h
 def line(x,top,w,color='#d7d9d7'):
  c.setStrokeColor(HexColor(color));c.setLineWidth(.65);c.line(x,H-top,x+w,H-top)
 box(0,0,W,H,'#fbfaf6')
 text(38,30,'Hypervision',16,INK,'InterBold');text(38,51,'SOLUTIONS',6.9,MUTED)
 text(343,30,'atelier d’arc',19,INK,'InterMedium');text(344,55,'ÉLECTRICITÉ & RÉNOVATION',6.5,MUTED)
 box(543,34,14,28,BLUE);line(38,78,519)
 text(38,95,'PARTENAIRES PROFESSIONNELS',8,BLUE,'InterBold')
 text(38,117,'Vos projets. Deux expertises.',28,INK,'InterMedium')
 text(38,149,'Un interlocuteur.',28,BLUE,'InterMedium')
 para(38,191,'Architectes, syndics, intégrateurs : associons nos compétences,<br/>de l’installation électrique au pilotage du bâtiment.',500,10.5,MUTED,16)
 box(38,242,252,118,PAPER);box(302,242,255,118,INK)
 text(52,256,'01 / INSTALLER & RÉNOVER',7,BLUE,'InterBold')
 text(52,277,'Atelier d’Arc',18,INK,'InterMedium')
 para(52,307,'Électricité du bâtiment<br/>Rénovation & aménagement<br/>Tableaux, circuits, prises et éclairages',224,9,MUTED,14)
 text(316,256,'02 / CONNECTER & PILOTER',7,'#9cbbff','InterBold')
 text(316,277,'Hypervision Solutions',18,'#ffffff','InterMedium')
 para(316,307,'GTB / GTC, automatisation et supervision<br/>Suivi énergétique<br/>Assistance EBO, BACnet et Modbus',227,9,'#d4dbe7',14)
 text(38,383,'QUEL PROJET FAIRE AVANCER ENSEMBLE ?',8,BLUE,'InterBold')
 rows=[('01','Architectes &\nmaîtres d’œuvre','Interventions électriques et rénovation intérieure. Un périmètre à définir avec vous, du tableau aux finitions.'),('02','Syndics &\ngestionnaires','Travaux électriques, éclairage et besoins de supervision ou de suivi des consommations, selon les équipements.'),('03','Intégrateurs GTB &\nbureaux d’études','Assistance EBO, BACnet et Modbus. Synoptiques, logiques de commande, tests fonctionnels et mise en service.')]
 for i,(number,title,body) in enumerate(rows):
  y=408+i*70;line(38,y,519);text(38,y+14,number,8,BLUE,'InterMedium')
  para(69,y+12,escape(title).replace('\n','<br/>'),173,10,INK,14)
  para(264,y+12,escape(body),293,9,MUTED,14)
 line(38,618,519)
 text(38,633,'UN BESOIN. UN PÉRIMÈTRE. UNE SUITE CONVENUE.',7.5,BLUE,'InterBold')
 para(38,651,'Indiquez votre activité, la commune, la mission et le délai envisagé.<br/>Nous précisons ensemble les interventions, les conditions et la disponibilité.',515,9,MUTED,14)
 box(38,696,519,101,BLUE)
 text(53,709,'VOTRE INTERLOCUTEUR : EDWIN IMANI',7,'#ffffff','InterMedium')
 text(53,729,'07 67 69 08 05',24,'#ffffff','InterMedium')
 text(53,766,'Appel ou SMS : précisez « partenaire ».',8.5,'#ffffff')
 c.linkURL('tel:+33767690805',(53,H-760,333,H-729),relative=0,thickness=0)
 qr=qrcode.QRCode(error_correction=qrcode.constants.ERROR_CORRECT_M,border=4);qr.add_data(URL);qr.make(fit=True)
 matrix=qr.get_matrix();size=71;module=size/len(matrix);qx,qy=468,710
 box(qx,qy,size,size,'#ffffff')
 for yy,row in enumerate(matrix):
  for xx,on in enumerate(row):
   if on:box(qx+xx*module,qy+yy*module,module,module,INK)
 c.linkURL(URL,(qx,H-qy-size,qx+size,H-qy),relative=0,thickness=0)
 text(38,813,'hypervision-solution.fr/partenaires/',7.5,MUTED)
 text(372,813,'Une entreprise. Deux expertises.',7.5,MUTED)
 c.linkURL(URL,(38,H-825,270,H-810),relative=0,thickness=0)
 c.showPage();c.save()
 print(args.output)
