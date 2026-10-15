# Cartes numériques V2

Les pages publiques sont `/business-card.html` (Hypervision) et `/atelierdarc/carte/` (Atelier d’Arc). Les deux utilisent `assets/cards-v2.css` et `assets/cards-v2.js`.

Les coordonnées de référence sont `downloads/hypervision-contact.vcf` et `atelierdarc/downloads/atelier-darc-contact.vcf`. L’adresse e-mail Hypervision conserve celle de la carte précédemment publiée. Atelier d’Arc n’a pas d’adresse e-mail renseignée.

Après modification des coordonnées ou du style, exécuter depuis la racine :

```sh
python3 -m pip install qrcode==8.2
python3 scripts/build_digital_cards.py
```

Le générateur met à jour les pages, QR de contact et cartes HTML autonomes. Les versions hors ligne embarquent toutes leurs ressources d’affichage et le fichier contact. Les boutons d’appel et SMS utilisent les applications de l’appareil ; les sites et téléchargements PDF/PNG nécessitent Internet.

Les PDF V2 sont les exemplaires approuvés, sans modification de contenu. Les QR des PDF conduisent aux pages publiques ; les QR des cartes numériques contiennent directement les coordonnées. Les visuels PNG montrent le recto et le verso imprimés V2. Les fichiers PDF V1 restent accessibles sous les dossiers `downloads/archives/` de chaque marque.

Avant publication : vérifier les deux pages à 320, 390 et 1024 pixels, les liens réciproques, les téléchargements, le décodage des deux QR et l’identité des coordonnées entre VCF, QR et HTML hors ligne. Vérifier que les PDF archivés sont inchangés.

# Partenaires professionnels

La page commune `/partenaires/` utilise `assets/partners.css`. Elle est accessible depuis le guide des deux expertises et les pieds de page des deux sites. Les nouveaux libellés de la page Hypervision sont aussi traduits en anglais dans `script.js` ; la page partenaires est en français.

La fiche téléchargeable `downloads/Hypervision-Atelier-dArc-partenaires.pdf` se régénère avec :

```sh
python3 -m pip install reportlab 'fonttools[woff]' qrcode
python3 scripts/build_partner_sheet.py
```

Le générateur embarque Inter à partir des polices WOFF2 déjà présentes, crée un PDF A4 d’une page avec téléphone cliquable et QR vers `/partenaires/`. L’option `--output chemin.pdf` permet d’écrire ailleurs. Après modification, rendre le PDF en image, vérifier sa lisibilité et décoder son QR avant publication.

La prise de contact passe par appel ou SMS ; aucune soumission de formulaire, collecte automatique ou prospection n’est ajoutée. Pour mesurer l’utilité de la page, compter manuellement les demandes identifiées « partenaire » et les suites données sur 30 jours après diffusion. Les compétences proviennent des sites existants ; aucune zone d’intervention, disponibilité garantie, certification ou référence client n’est présumée.

# Local visibility — Paris, Essonne and English — 15 October 2026

The Atelier homepage now links to `/atelierdarc/electricien-paris/`, `/atelierdarc/electricien-essonne/` and `/atelierdarc/en/`. The English page is rendered as HTML without relying on a language-toggle script. The homepage and English page declare reciprocal French/English alternatives; the regional French pages have their own canonical URLs. The shared company homepage links to the English electrical offer.

`atelierdarc/assets/local.css` extends the existing identity. `script.js` uses the document language for menu labels, copy feedback and the prefilled SMS. Phone and SMS actions use the existing business number; there is no new form service, tracking tag or paid dependency.

The content uses the owner's confirmed Paris/Essonne coverage, English language and evening/weekend availability. Appointments and overnight requests are subject to confirmation. There are no fabricated customer reviews, qualifications, prices, response times or additional office addresses. The business JSON-LD describes the two activities' relationship and uses the same Atelier entity across the local pages. A postal address and exact opening hours are intentionally omitted until confirmed for publication.

`robots.txt` points to `sitemap.xml`, which lists eight public pages and excludes the admin dashboard. The existing admin noindex metadata remains present. The discovery files do not submit or verify the site with Google or Bing; Search Console, Bing Webmaster Tools and the real business listing still need the appropriate account access and ownership verification.

Validation before publication: one H1 and canonical per page, valid JSON-LD and sitemap XML, reciprocal language links, existing internal resources and anchor targets, mobile navigation, French/English SMS text, FAQ expansion and responsive layouts. Track qualified enquiries and booked jobs manually by source and language for the next month; no search position or AI citation is guaranteed.
