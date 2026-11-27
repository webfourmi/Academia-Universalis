const elasticitySource = ['OpenStax','Principles of Economics 3e · Price Elasticity of Demand and Price Elasticity of Supply','2022','https://openstax.org/books/principles-economics-3e/pages/5-1-price-elasticity-of-demand-and-price-elasticity-of-supply','Élasticité-prix, méthode du point milieu et recettes.'];
const syncopationSource = ['Open Music Theory','Syncopation in pop/rock music','s. d.','https://openmusictheory.github.io/syncopation.html','Anticipations et décalage entre accent et pulsation.'];
const colorSource = ['OpenStax','Astronomy 2e · Colors of Stars','2022','https://openstax.org/books/astronomy-2e/pages/17-2-colors-of-stars','Couleur du rayonnement stellaire, filtres et température.'];
const focalizationSource = ['Universität Tübingen','Narrative Dynamics · Focalisation','s. d.','https://uni-tuebingen.de/en/233930','Étendue et restriction de l’information narrative.'];

economicsLessons.push(consolidationLesson('elasticite','Économie · Élasticité et recettes','Calculer une élasticité par le point milieu et interpréter la variation des recettes.',[
  ['Mesurer une réaction relative','Une baisse de dix unités vendues ne dit pas à elle seule si la demande réagit fortement. L’élasticité-prix rapporte la variation relative de la quantité à celle du prix. On exprime souvent l’élasticité de la demande en valeur absolue. [1]'],
  ['Choisir une même base dans les deux sens','Dans un cas fictif, le prix passe de 10 à 12 et les ventes de 100 à 90. Le prix varie de 2/11, la quantité de −10/95. La valeur absolue du quotient est proche de 0,58. Les moyennes au dénominateur rendent le résultat indépendant du sens de lecture des deux observations. [1]'],
  ['Comparer prix et recettes','Dans ce cas, les recettes passent de 1 000 à 1 080. Si la quantité tombait de 100 à 70, les recettes passeraient de 1 000 à 840. La réaction des quantités compte autant que la variation du prix. Une comparaison observée entre deux dates ne permet pas d’isoler l’effet du prix si la clientèle ou les conditions de vente ont changé.']
],'Un atelier fait passer le prix de 20 à 24. Les inscriptions passent de 60 à 45. Calculez l’élasticité par le point milieu, puis comparez les recettes. Proposez une explication concurrente à l’effet du prix.',
'La variation du prix vaut 4/22 et celle de la quantité −15/52,5. Leur quotient vaut environ −1,57. Les recettes baissent de 1 200 à 1 080. Un changement d’horaire pourrait avoir touché les inscriptions en même temps que le prix.',
['Quelle base utilise le point milieu ?', ['La moyenne des deux valeurs de la variable.', 'Toujours la première valeur.', 'La somme des recettes.'],0,'Le prix et la quantité utilisent chacun la moyenne de leurs deux valeurs.'],elasticitySource));

Object.assign(cycleContinuations, {
  musicologie:consolidationLesson('syncope','Musicologie · Entendre la syncope','Garder une pulsation régulière et localiser un accent déplacé.',[
    ['Séparer le battement et les attaques','Comptez à voix haute « un et deux et trois et quatre et ». Les nombres désignent ici les temps et « et » leur subdivision intermédiaire. Faites sonner une note sur le « et » de deux, puis prolongez-la sur trois. La pulsation reste régulière, tandis que l’attaque est anticipée. [1]'],
    ['Comparer deux versions','Jouez les mêmes notes d’abord sur les nombres, puis avancez une attaque d’une demi-pulsation en la tenant au-delà de la suivante. Le déplacement met en relief un endroit intermédiaire. Écoutez la version avec un accompagnement stable, car sans contexte métrique l’effet peut être moins perceptible.'],
    ['Annoter avant d’interpréter','Marquez les temps, le début des notes et les notes prolongées. Distinguez une nouvelle attaque sur le temps fort d’un son commencé auparavant. La seconde situation peut créer la tension métrique de l’exemple.']
  ],'Tapez quatre pulsations régulières du pied. Avec les mains, remplacez l’attaque de trois par une attaque sur le « et » de deux et tenez mentalement le son jusqu’après trois. Annotez le décalage.',
  'La note commence une demi-pulsation avant trois. Aucune attaque nouvelle ne marque trois, alors que le pied continue à compter. Le rythme anticipé peut faire entendre une syncope.',
  ['Quel repère reste constant pendant l’exercice ?', ['La pulsation battue du pied.', 'Le moment de chaque attaque des mains.', 'Le nombre d’accents de la mélodie.'],0,'Le décalage s’entend par rapport à une pulsation maintenue.'],syncopationSource),

  astronomie:consolidationLesson('couleur','Astronomie · Lire la couleur d’une étoile','Relier le maximum d’un spectre thermique à la température et discuter les limites de l’indice.',[
    ['Décrire un spectre','Un spectre compare l’intensité du rayonnement à différentes longueurs d’onde. Dans l’approximation du corps noir, le maximum représenté en fonction de la longueur d’onde se déplace vers les longueurs d’onde plus courtes quand la température augmente. [1]'],
    ['Comparer deux maxima','Pour des spectres idéalisés avec des maxima à 500 et 750 nm, la loi de Wien donne un rapport des températures de 750/500, donc 1,5. Le premier objet est plus chaud dans le modèle. Il faut comparer deux maxima définis selon la même convention spectrale.'],
    ['Passer à l’observation','Un indice de couleur compare les magnitudes mesurées dans deux bandes. L’extinction interstellaire peut rougir la lumière observée et imiter une température plus faible. Une estimation de température demande donc d’examiner les mesures, leur calibration et la présence de poussières. [1]']
  ],'Deux spectres thermiques idéaux culminent à 400 et 800 nm. Comparez les températures et dites quelle information supplémentaire serait nécessaire pour appliquer le raisonnement à une étoile réelle.',
  'Le premier objet est deux fois plus chaud dans le modèle. Pour une étoile réelle, examinez la correction d’extinction et le degré d’accord du spectre avec le modèle thermique.',
  ['Pour deux spectres thermiques comparables, quel maximum indique la température la plus élevée ?', ['Celui à 400 nm.', 'Celui à 800 nm.', 'Les deux températures sont égales.'],0,'Le maximum se déplace vers les longueurs d’onde plus courtes quand la température augmente.'],colorSource),

  narratologie:consolidationLesson('focalisation','Narratologie · Qui sait quoi dans le récit ?','Distinguer la voix qui raconte de l’information à laquelle donne accès le récit.',[
    ['Poser deux questions','Qui raconte ? Et sur quelles perceptions ou connaissances le récit s’appuie-t-il ? Dans une narration à la troisième personne, le récit peut être limité à ce qu’un seul personnage sait pendant une scène. L’identité du narrateur et la limitation de l’information sont deux objets d’analyse. [1]'],
    ['Repérer un indice de restriction','Dans « Lina vit le portail ouvert. Derrière, quelqu’un retenait son souffle, mais elle ne l’entendit pas », la deuxième phrase informe le lecteur de quelque chose que Lina ignore. Remplacer cette phrase par « Tout lui parut silencieux » réduit l’accès du lecteur à l’information.'],
    ['Contrôler la portée','Une scène limitée au savoir d’un personnage ne suffit pas pour attribuer la même focalisation à tout le récit. Localisez les changements en suivant les pensées, perceptions ou anticipations que le texte rend accessibles, puis examinez l’effet produit sur l’attente.']
  ],'Réécrivez la scène de Lina en quatre lignes limitées à ses perceptions. Justifiez deux choix qui modifient l’information du lecteur.',
  'On peut faire entendre une feuille qui craque sans dire qui l’a écrasée. Le texte peut décrire le silence tel qu’il est perçu et laisser ouverte la présence derrière le portail. La situation demeure compatible avec la version initiale.',
  ['Que révèle la phrase sur le souffle retenu ?', ['Un fait auquel Lina n’a pas accès.', 'Que Lina raconte nécessairement elle-même.', 'Que le récit ne contient aucun personnage.'],0,'La phrase donne au lecteur plus d’information que le personnage n’en perçoit.'],focalizationSource)
});

libraryAdditions.push(...[
  ['Amériques',elasticitySource,'economie','elasticite'],
  ['International',syncopationSource,'musicologie','syncope'],
  ['Amériques',colorSource,'astronomie','couleur'],
  ['Europe',focalizationSource,'narratologie','focalisation']
].map(([region,[author,title,year,url,evidence],courseKey,lessonId]) => ({
  region,author,title,year,url,evidence,courseKey,lessonId,language:'anglais',level:'premier cycle',
  access:'lecture publique',rights:'Conditions de réutilisation indiquées par la source',consulted:'27/11/2026'
})));

const compositionSource=['J. Paul Getty Museum','Understanding Formal Analysis · Principles of Design','s. d.','https://www.getty.edu/education/teachers/building_lessons/principles_design.pdf','Équilibre, accentuation et mouvement du regard.'];
const cycleSource=['OpenStax','Biology 2e · Biogeochemical Cycles','2018','https://openstax.org/books/biology-2e/pages/46-3-biogeochemical-cycles','Réservoirs et transferts du cycle de l’azote.'];
const playtestSource=['MIT OpenCourseWare','Introduction to Game Design Methods · Syllabus','2016','https://ocw.mit.edu/courses/cms-301-introduction-to-game-design-methods-spring-2016/pages/syllabus/','Prototypage rapide, tests avec des joueurs et itération.'];

Object.assign(cycleContinuations,{
  art:consolidationLesson('composition','Histoire de l’art · Suivre le regard','Justifier une lecture de composition par deux indices visuels.',[
    ['Repérer l’accent','Un contraste de valeur, une grande forme ou un détail isolé peut attirer l’attention. Sur une image, décrivez d’abord le contraste et sa position, puis demandez dans quelle mesure d’autres éléments lui disputent la priorité. [1]'],
    ['Éprouver une interprétation','Esquissez la distribution des masses sans le détail. Puis cachez la zone qui attire votre regard. Si une diagonale reste perceptible, elle contribue à la composition indépendamment de la figure masquée. Ce test aide à formuler une lecture argumentée.'],
    ['Distinguer structure et intention','Décrire un effet visuel s’appuie sur des éléments de l’œuvre. Attribuer cet effet à une intention documentée suppose des sources supplémentaires, par exemple un dessin préparatoire ou un texte contemporain.']
  ],'Comparez deux miniatures fictives : une tache claire au milieu d’un fond sombre, puis trois taches claires de même taille alignées. Justifiez une différence de lecture.',
  'Dans la première, l’isolement renforce l’accent central. Dans la seconde, la répétition peut distribuer l’attention le long de l’axe. Un contraste supplémentaire ou la proximité d’un bord pourrait modifier cet effet.',
  ['Quel indice soutient directement une analyse de composition ?', ['La position relative des trois taches.', 'Le nom du propriétaire seul.', 'Une date de restauration sans description.'],0,'La relation spatiale entre les éléments peut être vérifiée dans l’image.'],compositionSource),
  ecologie:consolidationLesson('azote','Écologie · Suivre l’azote dans un écosystème','Distinguer réservoir, transfert interne et sortie d’un système.',[
    ['Délimiter le système','Un bassin versant peut contenir de l’azote dans des sols, des organismes et des eaux. Pour établir son bilan, annoncez un périmètre et une durée. Un transfert du sol à une plante modifie la répartition dans le bassin si les deux y sont inclus. [1]'],
    ['Décrire une sortie','L’azote transporté par une rivière qui quitte le bassin franchit la frontière choisie. Une transformation chimique peut modifier la forme de l’azote, tandis qu’un transfert franchissant la frontière modifie la quantité comptabilisée. Ces questions doivent être suivies séparément. [1]'],
    ['Fermer un bilan fictif','Si 14 unités arrivent et 9 quittent le bassin pendant une année, le stock total augmente de 5 unités dans ce modèle à flux exhaustifs. Le calcul ne permet pas de localiser l’accumulation sans mesures des réservoirs.']
  ],'Un bassin reçoit 18 unités et en exporte 11. Les plantes absorbent aussi 6 unités présentes dans son sol. Calculez la variation totale et expliquez le traitement de ces 6 unités.',
  'Le stock augmente de 7 unités si tous les flux d’entrée et de sortie sont comptabilisés. L’absorption des 6 unités est un transfert interne, donc elle ne s’ajoute pas aux entrées.',
  ['Quel flux réduit directement le stock du bassin ?', ['L’export par la rivière à sa sortie.', 'Le transfert local du sol aux racines.', 'Le déplacement entre deux parcelles du bassin.'],0,'L’export franchit la frontière du système étudié.'],cycleSource),
  jeu:consolidationLesson('observation','Game design · Mener un test de jeu','Distinguer une observation de test et une décision de conception.',[
    ['Définir une question de test','Choisissez une règle de votre prototype et la conduite attendue. Si une règle doit créer un arbitrage, relevez les options réellement envisagées. Préparez le même scénario de départ afin de comparer plusieurs essais. [1]'],
    ['Observer avant d’intervenir','Notez les premiers choix, les hésitations et les erreurs de compréhension. Si vous devez expliquer une règle, indiquez le moment de votre intervention. Un court entretien après la partie permet de vérifier pourquoi la personne a agi ainsi.'],
    ['Préparer une itération','Un comportement peut venir du coût de l’action ou d’un manque de lisibilité. Choisissez une hypothèse, modifiez un seul élément et testez à nouveau. Conservez un exemple qui contredit votre attente pour guider la suite. [1]']
  ],'Trois joueurs ignorent une action de secours. Écrivez deux hypothèses et un plan de test qui mesure séparément visibilité et intérêt.',
  'Vérifiez d’abord si les joueurs peuvent décrire l’action après lecture. Comparez ensuite, dans des situations similaires, leur usage avec le même affichage et un coût différent. Une option connue mais rarement rentable suggère une autre intervention qu’une option passée inaperçue.',
  ['Quelle note constitue une observation directe ?', ['Deux joueurs n’ont jamais utilisé l’action de secours.', 'L’action est inutile dans tous les cas.', 'Les joueurs détestent cette règle.'],0,'La fréquence observée ne présuppose pas les motivations ni une conclusion générale.'],playtestSource)
});

libraryAdditions.push(...[
  [compositionSource,'art','composition'],
  [cycleSource,'ecologie','azote'],
  [playtestSource,'jeu','observation']
].map(([[author,title,year,url,evidence],courseKey,lessonId])=>({
  region:'Amériques',author,title,year,url,evidence,courseKey,lessonId,language:'anglais',
  level:'premier cycle',access:'lecture publique',rights:'Conditions de réutilisation indiquées par la source',consulted:'27/11/2026'
})));
