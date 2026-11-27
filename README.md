# Academia Universalis

*Sapere aude — Ose savoir.*

Université personnelle indépendante et cosmopolite, sans diplôme officiel. PWA en français, sans API payante. Quatre années, 32 disciplines ; le cursus reste en construction.

## Version et accès

- Version de référence de cette branche : V0.21.0 (ergonomie et accessibilité).
- V0.20.0 : fiabilisation et sauvegardes.
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

## Feuille de route proposée

V0.20 fiabilisation ; V0.21 ergonomie ; V0.22 bureau étudiant ; V0.23 lecture ; V0.24 mémorisation ; V0.25 bibliothèque ; V0.26 contrôle pédagogique ; V0.27 campus vivant.

## Historique documentaire

# Academia Universalis

*Sapere aude.*

Université personnelle cosmopolite, fondée sur des sources académiques vérifiées. Programme de quatre années et 32 disciplines. Application PWA en français, sans API payante.

Le campus V0.3.0 prolonge la V0.2.2, issue de la V0.2.1.

[Charte fondatrice et cahier des charges](docs/Academia_Universalis_charte.pdf)

## V0.3.0 · La naissance des civilisations

Huit leçons, des mobilités des chasseurs-cueilleurs au séminaire sur le progrès,
avec dossiers commentés, exercices, quiz, bibliographie et révisions espacées.
Le cycle et ses tableaux sont utilisables hors connexion. Les sources externes
s’ouvrent en ligne. Les données du campus restent sur l’appareil et peuvent être
exportées depuis le carnet.

[Programmes consultés et contrôle éditorial](docs/controle-editorial.html)

### Avancement par rapport à la charte fondatrice

La V0.6.0 ouvre une introduction à chacune des huit matières de l’année 1.
Les années 2 à 4 disposent de leurs programmes et de 24 leçons d’ouverture.
Le catalogue des matières n’équivaut pas à un cursus intégralement rédigé.

Le planning propose 52 leçons sur 40 semaines et une reprise toutes les dix semaines.
Les volumes de 120, 240 ou 400 heures incluent le temps personnel indiqué dans
la charte. Les trois rythmes suggèrent des activités dont la durée reste indicative.
L’onglet Espaces du campus donne accès aux ateliers et au rappel actif à J+2,
J+7 et J+30. Les échéances et les données d’étude sont locales et exportables.

La bibliothèque contient des notices de départ sur les cinq régions, en plus
de l’Atlas de prospection. La couverture des références de la charte, la
rédaction des cours avancés, les évaluations de fin d’année et la relecture
indépendante sont des travaux à poursuivre avant de qualifier le cursus
de complet.

Le Carnet permet aussi un export JSON des seules notes et un import avec conservation de la version locale en cas de conflit.

La V0.10.0 ajoute vingt-quatre leçons d’ouverture aux années 2 à 4 et quatre travaux de synthèse pour l’année 1. La page « Suivi de la charte » présente la couverture et les validations encore à mener.
