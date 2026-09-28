"""Build both V2 digital cards and self-contained offline copies.

Python 3 + qrcode==8.2. Contact data comes from the public VCF files.
Run from any directory. Print PDFs and preview PNGs are versioned assets.
"""
from pathlib import Path
from urllib.parse import urlsplit
import base64
import html
import re
import qrcode

ROOT = Path(__file__).resolve().parents[1]
BASE = 'https://www.hypervision-solution.fr'
VERSION = '20260928'
BRANDS = [
    dict(key='hypervision', name='Hypervision Solutions', page='/business-card.html', home='/',
         title='HYPER<span>VISION</span><small>SOLUTIONS</small>', role='CONNECTER & PILOTER',
         services='GTB · Automatisation<br>Supervision', symbol='/assets/img/favicon.png',
         qr='/assets/hypervision-contact-qr.svg', vcf='/downloads/hypervision-contact.vcf',
         pdf='/downloads/Hypervision-carte-V2.pdf', png='/downloads/Hypervision-carte-V2.png',
         offline='/downloads/Hypervision-carte-numerique.html',
         archive='/downloads/archives/Hypervision-carte-V1.pdf',
         sibling='Atelier d’Arc', sibling_page='/atelierdarc/carte/', sibling_services='Électricité · Rénovation · Bâtiment',
         email='hypervision.paris@gmail.com', filename='Hypervision-Edwin-Imani.vcf'),
    dict(key='atelier', name='Atelier d’Arc', page='/atelierdarc/carte/', home='/atelierdarc/',
         title='atelier<span>d’arc</span>', role='INSTALLER & RÉNOVER',
         services='Électricité · Rénovation<br>Bâtiment', symbol='/atelierdarc/assets/arc-symbol.svg',
         qr='/atelierdarc/assets/contact-qr.svg', vcf='/atelierdarc/downloads/atelier-darc-contact.vcf',
         pdf='/atelierdarc/downloads/Atelier-dArc-carte-de-visite-impression.pdf',
         png='/atelierdarc/downloads/Atelier-dArc-carte-de-visite.png',
         offline='/atelierdarc/downloads/Atelier-dArc-carte-numerique.html',
         archive='/atelierdarc/downloads/archives/Atelier-dArc-carte-V1.pdf',
         sibling='Hypervision Solutions', sibling_page='/business-card.html', sibling_services='GTB · Automatisation · Supervision',
         email='', filename='Atelier-dArc-Edwin-Imani.vcf'),
]

def file(path):
    return ROOT / urlsplit(path).path.lstrip('/')

def data_uri(path, mime):
    return 'data:' + mime + ';base64,' + base64.b64encode(file(path).read_bytes()).decode()

def qr_svg(payload):
    qr = qrcode.QRCode(error_correction=qrcode.constants.ERROR_CORRECT_M, border=4)
    qr.add_data(payload); qr.make(fit=True)
    matrix = qr.get_matrix(); n = len(matrix)
    cells = ''.join(f'<rect x="{x}" y="{y}" width="1" height="1"/>'
                    for y,row in enumerate(matrix) for x,on in enumerate(row) if on)
    return f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {n} {n}"><rect width="{n}" height="{n}" fill="white"/><g fill="#111827">{cells}</g></svg>'

def make_page(b):
    email = f'<a class="email" href="mailto:{b["email"]}">{b["email"]}</a>' if b['email'] else ''
    return f'''<!doctype html>
<html lang="fr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Edwin Imani — {b['name']} | Carte de visite</title>
<meta name="description" content="Contactez Edwin Imani chez {b['name']} au 07 67 69 08 05. Enregistrez ses coordonnées et découvrez nos deux expertises.">
<meta name="theme-color" content="#0c5fff"><link rel="canonical" href="{BASE+b['page']}">
<link rel="icon" href="{b['symbol']}"><link rel="stylesheet" href="/assets/cards-v2.css?v={VERSION}">
<script src="/assets/cards-v2.js?v={VERSION}" defer></script></head>
<body class="{b['key']}" data-brand="{b['name']}">
<a class="skip" href="#contact">Aller aux coordonnées</a>
<main class="shell"><nav class="topbar" aria-label="Navigation de la carte"><a href="{b['home']}">← Découvrir {b['name']}</a><span class="family-label">Une entreprise. Deux expertises.</span></nav>
<article class="card" aria-label="Carte de visite {b['name']}">
<header class="brand-face"><p class="brand-kicker">{b['role']}</p><h1 class="brand-name" aria-label="{b['name']}">{b['title']}</h1>
<img class="brand-symbol" src="{b['symbol']}" alt="" aria-hidden="true"><p class="brand-services">{b['services']}</p></header>
<section class="contact-face" id="contact" aria-labelledby="person"><div class="person"><h2 id="person">Edwin Imani</h2><p>{b['name']}</p></div>
<a class="phone" href="tel:+33767690805">07 67 69 08 05</a>
<div class="actions"><a class="action primary card-save" data-save-contact href="{b['vcf']}?v={VERSION}" download="{b['filename']}">Enregistrer le contact <span aria-hidden="true">↓</span></a>
<a class="action" href="tel:+33767690805">Appeler ↗</a><a class="action" href="sms:+33767690805" data-sms>Envoyer un SMS</a></div>
{email}<div class="utilities"><button class="text-button" data-copy type="button">Copier le numéro</button><button class="text-button" data-share type="button">Partager le contact</button></div>
<p class="status" data-status role="status" aria-live="polite"></p>
<div class="qr-row"><img src="{b['qr']}?v={VERSION}" width="132" height="132" alt="QR pour enregistrer le contact Edwin Imani, {b['name']}">
<div><h3>Gardons le contact.</h3><p>Scannez pour enregistrer le téléphone et le site, même hors ligne.</p></div></div></section></article>
<div class="below"><section aria-label="Notre autre expertise"><p class="eyebrow">Une entreprise. Deux expertises.</p>
<a class="sibling" href="{b['sibling_page']}"><span><strong>{b['sibling']}</strong><small>{b['sibling_services']}</small></span><span aria-hidden="true">↗</span></a>
<a class="services-link" href="{b['home']}">Découvrir nos services ↗</a></section>
<section class="download-section" aria-label="Téléchargements"><p class="eyebrow">À emporter</p><div class="downloads">
<a href="{b['pdf']}?v={VERSION}" download>Carte imprimée V2 <span>PDF · recto verso ↓</span></a>
<a href="{b['png']}?v={VERSION}" download>Visuel à partager <span>PNG ↓</span></a>
<a data-offline-download href="{b['offline']}?v={VERSION}" download>Carte utilisable hors ligne <span>HTML ↓</span></a></div>
<details class="archive"><summary>Version précédente</summary><a href="{b['archive']}" download>Conserver la carte V1 (PDF) ↓</a></details></section></div>
<p class="footnote">Un projet ? Précisez votre besoin et votre commune. Les deux activités se complètent, des travaux au pilotage du bâtiment.</p>
<div class="bottom-signature" aria-hidden="true"><i></i><i></i></div></main></body></html>'''

def offline_page(page, b):
    css = file('/assets/cards-v2.css').read_text()
    css = re.sub(r"url\('([^']+\.woff2)'\)", lambda m: "url('"+data_uri(m[1], 'font/woff2')+"')", css)
    page = re.sub(r'<link rel="stylesheet"[^>]+>', lambda _: '<style>'+css+'</style>', page)
    js = file('/assets/cards-v2.js').read_text()
    page = re.sub(r'<script src="[^"]+" defer></script>', '', page)
    page = page.replace('</body>', '<script>'+js+'</script></body>')
    for path,mime in [(b['symbol'],'image/png' if b['symbol'].endswith('.png') else 'image/svg+xml'),
                       (b['qr'],'image/svg+xml'),(b['vcf'],'text/vcard;charset=utf-8')]:
        uri=data_uri(path,mime)
        page=page.replace('"'+path+'?v='+VERSION+'"','"'+uri+'"').replace('"'+path+'"','"'+uri+'"')
    page=re.sub(r'<a data-offline-download[^>]+>.*?</a>', '', page)
    page=page.replace('href="/', 'href="'+BASE+'/')
    page=page.replace('<p class="footnote">', '<p class="footnote">Cette carte et son contact sont disponibles hors ligne. Les liens vers le site et les PDF nécessitent Internet. ')
    return page

for b in BRANDS:
    payload=file(b['vcf']).read_bytes()
    assert b'URL:' in payload and b'TEL;TYPE=CELL,VOICE:+33767690805' in payload
    file(b['qr']).write_text(qr_svg(payload))
    page=make_page(b)
    dest=file(b['page']+'index.html' if b['page'].endswith('/') else b['page'])
    dest.parent.mkdir(parents=True,exist_ok=True);dest.write_text(page)
    file(b['offline']).write_text(offline_page(page,b))
    print('Built',dest.relative_to(ROOT),'and offline card')
