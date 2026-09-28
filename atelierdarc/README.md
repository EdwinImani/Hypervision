# Atelier d’Arc

Site public : https://www.hypervision-solution.fr/atelierdarc/

Carte numérique : https://www.hypervision-solution.fr/atelierdarc/carte/

Ce dossier est publié par le GitHub Pages existant du dépôt Hypervision, depuis la branche main. Aucun hébergement séparé ni compilation n’est nécessaire. Les liens internes sont relatifs à ce dossier.

Modifier index.html, carte/index.html et assets/ pour mettre le site à jour. Conserver LICENSE-Adex.txt et les licences des polices dans assets/fonts/. Les fichiers de carte et le contact téléchargeable sont dans downloads/.

## Synchroniser le contact

La source des coordonnées est `downloads/atelier-darc-contact.vcf`. Elle comprend le téléphone et l’URL publique d’Atelier d’Arc. Après modification, lancer `python3 scripts/build_contact.py` depuis ce dossier (Python 3 et dépendance `qrcode==8.2`). Le script synchronise le QR de la carte numérique et les coordonnées intégrées à la carte HTML hors ligne. Les cartes papier archivées V1/V2 ne sont pas régénérées.

## Cartes numériques V2

La carte utilise le style et les interactions communs `../assets/cards-v2.css` et `../assets/cards-v2.js`. Le téléchargement PDF et le visuel PNG présentent la V2 approuvée. Le PDF minimaliste V1 est conservé dans `downloads/archives/Atelier-dArc-carte-V1.pdf`.

Pour reconstruire les deux cartes numériques et leurs versions HTML autonomes après un changement de présentation, lancer `python3 scripts/build_digital_cards.py` depuis la racine du dépôt. Le script lit les deux fichiers VCF et inclut les polices, logos, QR et coordonnées dans les versions hors ligne. Les téléchargements PDF/PNG et les liens vers les sites restent accessibles sur Internet.
