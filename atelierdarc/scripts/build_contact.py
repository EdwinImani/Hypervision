"""Synchronize the contact QR and offline card from downloads/atelier-darc-contact.vcf.

Run with Python 3 and qrcode 8.2. The VCF is the single source of contact data.
This does not regenerate or change archived paper cards.
"""
from pathlib import Path
import base64
import re
import qrcode

ROOT = Path(__file__).resolve().parents[1]
vcf = (ROOT / 'downloads/atelier-darc-contact.vcf').read_bytes()
assert vcf.startswith(b'BEGIN:VCARD\r\n') and vcf.endswith(b'END:VCARD\r\n')
assert b'URL:https://www.hypervision-solution.fr/atelierdarc/\r\n' in vcf

qr_path = ROOT / 'assets/contact-qr.svg'
offline_path = ROOT / 'downloads/Atelier-dArc-carte-numerique.html'
old_qr = base64.b64encode(qr_path.read_bytes()).decode('ascii')
offline = offline_path.read_text()
old_uri = 'data:image/svg+xml;base64,' + old_qr
if offline.count(old_uri) != 1:
    raise ValueError('The offline card must contain exactly one copy of the current contact QR.')

qr = qrcode.QRCode(error_correction=qrcode.constants.ERROR_CORRECT_M, border=4)
qr.add_data(vcf)
qr.make(fit=True)
matrix = qr.get_matrix()
n = len(matrix)
rects = ''.join(f'<rect x="{x}" y="{y}" width="1" height="1"/>'
                for y, row in enumerate(matrix) for x, filled in enumerate(row) if filled)
svg = (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {n} {n}">'
       f'<rect width="{n}" height="{n}" fill="white"/>'
       f'<g fill="#111827">{rects}</g></svg>').encode('utf-8')
offline = offline.replace(old_uri, 'data:image/svg+xml;base64,' + base64.b64encode(svg).decode('ascii'))
offline, count = re.subn(r'data:text/vcard;charset=utf-8;base64,[A-Za-z0-9+/=]+',
                        'data:text/vcard;charset=utf-8;base64,' + base64.b64encode(vcf).decode('ascii'), offline)
if count != 1:
    raise ValueError('The offline card must contain exactly one downloadable vCard.')

qr_path.write_bytes(svg)
offline_path.write_text(offline)
print(f'Synchronized contact QR ({n} modules including quiet zone) and offline vCard.')
