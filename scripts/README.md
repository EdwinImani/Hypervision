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
