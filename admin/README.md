# Hypervision Studio

Espace de gestion statique, en français, pour Hypervision Solutions et Atelier d’Arc.
Adresse : https://www.hypervision-solution.fr/admin/

## Première utilisation

1. Se connecter avec l’identifiant `admin` et le mot de passe communiqué au propriétaire.
2. Dans **Paramètres**, renseigner l’identité juridique commune aux deux marques, l’adresse, le SIRET, la TVA et les modalités de règlement. Les coordonnées légales ne sont pas préremplies.
3. Créer un client, puis un devis ou une facture. Enregistrer un brouillon avant de quitter l’éditeur.
4. Vérifier le document avant émission. L’émission attribue un numéro et fige les coordonnées et les montants. Les factures partagent une séquence entre les deux marques ; les devis ont leur propre séquence.
5. Télécharger le PDF, ou imprimer. Un devis émis peut être converti en facture ; un règlement intégral reçu peut être enregistré.
6. Exporter régulièrement une sauvegarde chiffrée et la conserver hors du navigateur. Le mot de passe peut être modifié dans Paramètres.

## Stockage et limites

GitHub Pages sert uniquement les fichiers publics de l’application. Aucun compte serveur ni base de données distante n’est créé. Les clients, documents et paramètres sont chiffrés dans le stockage local du navigateur (AES-GCM, clé dérivée par PBKDF2-SHA256, 600 000 itérations). Le mot de passe initial n’est pas conservé en clair dans le dépôt. La connexion déverrouille un coffre local ; elle ne protège pas une route serveur.

Utiliser un seul navigateur de référence pour la numérotation. Les appareils et navigateurs ne se synchronisent pas. Une restauration remplace le coffre local, elle ne fusionne pas les documents. Effacer les données du site ou perdre le mot de passe sans sauvegarde exploitable peut rendre les documents irrécupérables. Le verrouillage automatique intervient après 15 minutes d’inactivité ; enregistrer les modifications avant de laisser un formulaire ouvert.

L’application ne gère pas les acomptes, règlements partiels, avoirs, signatures électroniques, comptabilité complète ou transmission réglementaire de factures électroniques. Les PDF et contrôles de champs ne constituent pas une certification de conformité. Vérifier les informations et mentions adaptées à l’entreprise avant émission. Les validations de SIRET portent sur le format, pas sur l’existence de l’entreprise.

## Développement

Servir la racine du dépôt sur localhost ou HTTPS (Web Crypto requis). Aucun build ni service externe n’est nécessaire.

```sh
python3 -m http.server 4173
node --test _tests/admin.test.mjs
```

Les tests couvrent les calculs de TVA/remise, les séquences, les instantanés de documents, la validation des sauvegardes, le chiffrement, les mots de passe et les écritures concurrentes. Les données de test ne sont pas livrées dans le coffre de production.

PDF : jsPDF 4.2.1 et jsPDF-AutoTable 5.0.8, embarqués localement avec leurs licences dans `vendor/`. Police Inter, licence OFL dans `../atelierdarc/assets/fonts/Inter-OFL.txt`.
