# Academia Universalis

*Sapere aude — Ose savoir.*

Université personnelle indépendante et cosmopolite, sans diplôme officiel. PWA en français, sans API payante. Quatre années, 32 disciplines ; le cursus reste en construction.

## Version et accès

- Version de référence de cette branche : V0.30.1 (planning mobile et durées par jour).
- [Campus](https://webfourmi.github.io/Academia-Universalis/)
- [Charte fondatrice](docs/Academia_Universalis_charte.pdf)
- [Contrôle éditorial](docs/controle-editorial.html)
- [Suivi de la charte](docs/suivi-charte.html)

## Architecture

Application statique HTML/CSS/JavaScript. Les fichiers de données pédagogiques sont chargés par index.html. Le manifeste et sw.js assurent le socle PWA ; pwa.js gère l'installation et les mises à jour. campus-history.js gère la navigation, notes.js les exports et imports. Les données personnelles restent dans localStorage (clé au).

## Développement local

Depuis la racine du dépôt, lancer `python3 -m http.server 8000` puis ouvrir http://localhost:8000. Ne pas utiliser file:// pour tester le service worker.

## Règles de contribution

- Travailler sur une branche dédiée ; fusion après validation.
- Aucun abonnement supplémentaire, aucune API payante.
- Préserver les données existantes et la compatibilité des sauvegardes.
- Tester navigation, retour mobile, notes, évaluations, révisions, hors connexion et mises à jour.
- Synchroniser la version affichée et le nom du cache lors d'une publication.
- Documenter les anomalies restantes et ne jamais déclarer un test réussi sans l'avoir exécuté.
- Vérifier les sources, licences et références de chaque leçon ; distinguer validation interne et expertise indépendante.

## Suivi de l’audit V0.29.0

| Point | V0.30.0 | Travaux complémentaires |
| --- | --- | --- |
| A. Planning | Créneaux sur 14 jours, durée distincte pour chaque jour, priorité, vacances et révisions. La progression suit l’ordre des leçons d’un parcours. | Prérequis entre matières et estimation de la charge par leçon. |
| B. Séance | Quatre étapes, chronomètre, pause, reprise après rechargement, correction des minutes et journal. | Distinguer le temps passé sur chaque étape. |
| C. Compétences | Résultats des quiz et autoévaluation des exercices écrits avec réponse conservée, corrigé et trois critères explicites. | Modèle de compétences transversal et évaluation externe et suivi des travaux de synthèse. |
| D. Erreurs | Dernière erreur par quiz, passage du cours et examen personnalisé. | Historique de toutes les tentatives et questions inédites. |
| E. Ateliers | Simulations et quatre ateliers interactifs corrigés en histoire, physique, philosophie et littérature. | Chronologies comparées, nouveaux scénarios physiques et comparaison de traductions. |
| F. Atlas | Cinq parcours thématiques et index filtrable des leçons par notion et année. | Index transversal exhaustif et enrichissement documentaire. |
| G. Tuteur | Sept modes et prompt contextualisé à copier depuis les leçons. | — |
| H. Vie du campus | Première sélection avec conférence, livre, séminaire et découverte, fondée sur les ressources déjà référencées dans le campus. | Renouveler les sélections au fil des versions. |
| Qualité académique | Fiche de contrôle en neuf points et quatre statuts. | Documenter chaque contrôle, compléter les métadonnées et obtenir des relectures indépendantes. |
| Sauvegardes | Espace Mes données, export daté, restauration validée et transfert manuel entre appareils. | Étudier IndexedDB et la synchronisation selon les besoins de capacité et de mobilité. |
| Performances et PWA | Pagination du catalogue et scénarios Chromium sur deux formats. | Mesures sur téléphone réel. Chaque cours propose une copie HTML autonome à enregistrer ou télécharger. La PWA conserve aussi son cache historique. |
| V1.0 | Les outils avancent sur le corpus disponible. | Première année complète, évaluations de synthèse et contrôle scientifique du corpus. |

## Vérification

Lancer `node tests/smoke.cjs`. Le scénario navigateur utilise Playwright avec Chromium.
Le chargement, la navigation et le hors connexion sont vérifiés sur deux dimensions de fenêtre.
Les temps mesurés en environnement local ne représentent pas les performances sur téléphone réel.
