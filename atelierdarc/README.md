# Atelier d’Arc

Site public : https://www.hypervision-solution.fr/atelierdarc/

Carte numérique : https://www.hypervision-solution.fr/atelierdarc/carte/

Ce dossier est publié par le GitHub Pages existant du dépôt Hypervision, depuis la branche main. Aucun hébergement séparé ni compilation n’est nécessaire. Les liens internes sont relatifs à ce dossier.

Modifier index.html, carte/index.html et assets/ pour mettre le site à jour. Conserver LICENSE-Adex.txt et les licences des polices dans assets/fonts/. Les fichiers de carte et le contact téléchargeable sont dans downloads/.

## Synchroniser le contact

La source des coordonnées est `downloads/atelier-darc-contact.vcf`. Elle comprend le téléphone et l’URL publique d’Atelier d’Arc. Après modification, lancer `python3 scripts/build_contact.py` depuis ce dossier (Python 3 et dépendance `qrcode==8.2`). Le script synchronise le QR de la carte numérique et les coordonnées intégrées à la carte HTML hors ligne. Les cartes papier archivées V1/V2 ne sont pas régénérées.
