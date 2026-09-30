# Hypervision Studio : devis, frais et justificatifs

Espace local en français pour Hypervision Solutions et Atelier d’Arc : https://www.hypervision-solution.fr/admin/

## Utilisation

1. Se connecter avec l’identifiant et le mot de passe existants. L’ouverture migre automatiquement l’ancien coffre vers le nouveau stockage local, après déchiffrement réussi. Les anciennes sauvegardes restent importables.
2. **Devis** : clients, brouillons, émission numérotée, acceptation/refus, PDF et impression. Renseigner l’identité légale commune et les conditions dans Paramètres. Les coordonnées légales ne sont pas inventées.
3. **Frais & justificatifs** : saisir date, fournisseur, motif professionnel, chantier/projet, activité (dont frais communs), catégorie et TTC en euros. La TVA est le montant indiqué sur la pièce, ou laissée vide si inconnue. Ce montant n’est pas assimilé à de la TVA récupérable.
4. Indiquer paiement par l’entreprise ou avance personnelle, nom de l’avanceur et date de remboursement lorsqu’il a été effectué. Un montant remboursé reste une dépense ; il quitte uniquement le total « avances à rembourser ».
5. Ajouter jusqu’à cinq PDF, JPEG, PNG ou WebP de 5 Mo maximum chacun. HEIC n’est pas pris en charge : convertir en JPEG/PNG. La limite globale est de 50 Mo de justificatifs par coffre. Les fichiers sont conservés sans recompression, avec leur nom sécurisé et leur extension normalisée.
6. **Enregistrer le frais**. La saisie peut être enregistrée sans justificatif : elle est alors signalée « À compléter ». Revenir sur la dépense pour ajouter une pièce, modifier le classement ou enregistrer le remboursement. Le tableau est initialement filtré sur le mois courant ; « Tout afficher » retire les filtres.
7. **Exporter CSV** ou **Dossier + justificatifs ZIP** : export de la sélection filtrée, avec références stables et chemins des pièces. Le ZIP inclut le CSV et les originaux joints. Ces copies ne sont pas chiffrées et ne sont pas un FEC.
8. Exporter régulièrement la **sauvegarde chiffrée complète**, qui inclut clients, devis, archives, frais et justificatifs. Enregistrer les modifications avant l’export. Pour restaurer, sélectionner le JSON, saisir son mot de passe puis confirmer le remplacement du coffre.

## Facturation retirée

Aucune nouvelle facture, conversion devis-facture, modification ou saisie de règlement de facture n’est disponible. Les anciennes factures éventuelles, y compris leurs brouillons, sont conservées : **Paramètres > Consulter les archives antérieures**, en lecture seule, avec export PDF/impression. Elles ne figurent pas dans les indicateurs actuels. Les compteurs historiques restent dans les données pour préserver l’existant. La facturation est réalisée sur la plateforme agréée du propriétaire.

## Stockage, sauvegarde et limites

GitHub Pages héberge uniquement le code public. Aucune donnée client, dépense ou pièce jointe n’est envoyée à GitHub ou à un serveur. Le coffre utilise IndexedDB, avec AES-GCM et clé dérivée par PBKDF2-SHA256 (600 000 itérations). Les justificatifs sont inclus dans le contenu chiffré ; il n’existe pas de stockage de pièces en clair. La sauvegarde v2 utilise le même chiffrement ; le format v1 reste lisible et est migré. Après migration réussie, une petite référence remplace le coffre historique dans localStorage pour éviter la réouverture par une ancienne version de l’application.

La migration et les sauvegardes utilisent une écriture atomique avec détection des conflits entre onglets. La limite d’import/export du coffre complet est de 110 Mo. Une erreur d’enregistrement de frais laisse sa fiche ouverte sans annoncer de réussite. Un justificatif surdimensionné ou de format non accepté est refusé avant l’enregistrement.

**Un seul navigateur de référence : pas de synchronisation entre appareils.** Effacer les données du site, perdre le mot de passe ou perdre l’appareil sans sauvegarde exploitable peut rendre les informations irrécupérables. Le verrouillage automatique reste fixé à 15 minutes d’inactivité : enregistrer avant de s’éloigner. Les saisies non enregistrées ne sont pas sauvegardées automatiquement. Les quotas et possibilités d’effacement du navigateur s’appliquent aussi à IndexedDB. Conserver les originaux et une copie du coffre hors du navigateur.

Le suivi est destiné à la préparation comptable : il ne remplace ni la tenue complète des comptes, ni un archivage probant, ni la validation de la déductibilité par le comptable. Aucun OCR, connexion bancaire, envoi automatique, FEC ou calcul d’indemnité kilométrique n’est inclus.

## Développement et contrôles

Servir la racine en localhost ou HTTPS (Web Crypto nécessaire). Aucun build ni abonnement supplémentaire.

```sh
npm install --no-save fake-indexeddb@6.2.5
node --test _tests/admin.test.mjs _tests/expenses.test.mjs _tests/vault.test.mjs
python3 -m http.server 4173
```

Tests : calculs et séquence des devis, interdiction d’émettre une facture, migration sans perte d’archives, centimes/TVA, remboursements, filtres, justificatifs, export CSV protégé contre les formules, intégrité ZIP/CRC, chiffrement, restauration v1/v2, changement de mot de passe, conflits d’écriture et interruption par verrouillage. Python 3 est utilisé pour ouvrir le ZIP avec une bibliothèque indépendante.

Vérifications navigateur sur une origine locale dédiée et des données fictives : saisie avec photo, sauvegarde, réouverture, aperçu, remboursement, export ZIP et sauvegarde réellement téléchargés, restauration avec pièce jointe. Ne pas utiliser les données de production pour les essais.

Références : [stockage IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API), [notes de frais et justificatifs](https://www.francenum.gouv.fr/guides-et-conseils/pilotage-de-lentreprise/dematerialisation-des-documents/facturation-2), [conservation des documents d’entreprise](https://www.economie.gouv.fr/entreprises/gerer-sa-comptabilite-et-ses-demarches/entreprises-combien-de-temps-devez-vous).
