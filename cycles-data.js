// Leçons d’ouverture des matières prévues par la charte pour les années 2 à 4.
const upperYears = [
  [
    {
      key:'anthropologie', title:'Anthropologie · Observer et interpréter',
      goal:'Distinguer une observation, une interprétation et le point de vue d’un interlocuteur.',
      sections:[
        ['Construire un terrain','L’ethnographie associe des observations situées, des échanges et des documents. Au lieu de présumer qu’un comportement a le même sens pour chaque participant, l’enquêteur examine son contexte et confronte des interprétations. La présence de l’enquêteur peut elle-même modifier la situation. [1]'],
        ['Décrire avant de catégoriser','Lors d’un repas, trois personnes se lèvent au même moment. Cette coïncidence peut marquer la fin d’un service, une règle de politesse ou un événement local. Notez d’abord qui fait quoi, l’ordre des actions et le lieu. Comparez ensuite plusieurs occasions et demandez aux personnes comment elles comprennent leur propre conduite.'],
        ['Rendre visibles les limites','Une observation ne représente pas un groupe entier. Signalez les absents, les moments non observés et votre position. Utilisez un scénario fictif pour cet exercice et évitez d’enregistrer des personnes sans leur accord.']
      ],
      task:'Écrivez une note fictive de terrain avec trois observations. Proposez deux interprétations concurrentes et une question ouverte pour les comparer.',
      answer:'« Trois convives se lèvent lorsque le plat est retiré » est observable. « Ils suivent une règle de politesse » est une interprétation. Une autre explication serait l’annonce d’un changement de salle. Demandez « Comment avez-vous décidé du moment de vous lever ? » sans suggérer la règle.',
      quiz:['Que peut-on noter comme observation directe ?',['Le groupe valorise l’hospitalité.','Une personne pose trois assiettes sur la table.','La coutume est immuable.'],1,'Le geste et le nombre sont observables. Les autres énoncés demandent d’autres preuves.'],
      source:['OpenStax','Introduction to Anthropology · Methods','2022','https://openstax.org/books/introduction-anthropology/pages/2-introduction','Méthodes de l’enquête et ethnographie.']
    },
    {
      key:'medievale',title:'Histoire médiévale · L’autorité carolingienne',
      goal:'Comparer une prescription royale et les moyens locaux de sa mise en œuvre.',
      sections:[
        ['Un pouvoir à plusieurs échelles','Le cours de Yale replace Charlemagne dans la formation d’un vaste pouvoir et le renouveau carolingien. Pour comprendre ce pouvoir, distinguez la cour, les agents du souverain et les lieux où les décisions sont appliquées. L’étendue d’une carte politique ne dit pas à quelle fréquence les agents rendent compte de leur action. [1]'],
        ['Lire une norme','Une prescription royale témoigne d’une priorité du pouvoir à une date donnée. Sa répétition peut signaler la volonté de renforcer son application, une difficulté persistante, ou un usage administratif régulier. Pour trancher, croisez le prescrit avec des actes locaux et les circonstances de leur production.'],
        ['Comparer des situations','Demandez quelles ressources sont nécessaires à un représentant du pouvoir : temps de déplacement, relais écrits, autorité reconnue localement. Ces conditions expliquent comment une même prescription peut avoir une portée différente d’un lieu à l’autre.']
      ],
      task:'Une instruction fictive demande un rapport annuel dans trois comtés. Deux rapports ont été conservés. Proposez deux interprétations pour le troisième et un indice pour les départager.',
      answer:'Le troisième rapport peut n’avoir jamais été produit ou avoir disparu. Un registre d’arrivée attestant qu’il a été reçu favoriserait la seconde hypothèse. Une relance répétée et contextualisée pourrait renforcer la première.',
      quiz:['Que prouve directement une instruction conservée ?',['L’obéissance de chaque comté.','La prescription formulée par son auteur.','La conservation de tous les rapports.'],1,'Le document atteste le contenu de l’instruction, tandis que la pratique demande d’autres traces.'],
      source:['Paul Freedman · Open Yale Courses','The Early Middle Ages, 284–1000','2011','https://oyc.yale.edu/history/hist-210','Cours ouvert, notamment les séances carolingiennes.']
    },
    {
      key:'neurosciences',title:'Neurosciences · Du neurone au signal',
      goal:'Distinguer le potentiel d’action et la transmission entre deux cellules.',
      sections:[
        ['Repérer les structures','Un neurone possède des régions spécialisées. Dans un schéma typique, les dendrites reçoivent de nombreux signaux, l’axone conduit le potentiel d’action et ses terminaisons participent à la transmission vers d’autres cellules. Les cellules gliales ont des rôles distincts, dont la myélinisation pour certaines. [1]'],
        ['Suivre deux échelles','Le potentiel d’action est une variation transitoire du potentiel électrique membranaire qui se propage le long de l’axone. Dans une synapse chimique, son arrivée peut provoquer la libération d’un neurotransmetteur. L’effet sur la cellule suivante dépend notamment des récepteurs présents. [1]'],
        ['Lire un enregistrement','Un tracé qui change après stimulation montre un signal enregistré à un endroit donné. Pour dire qu’il s’est propagé, comparez les instants d’arrivée en deux points. Pour parler d’une transmission à une autre cellule, identifiez également le contexte synaptique.']
      ],
      task:'Tracez une chaîne en quatre étapes de la réception d’un signal à la réponse d’une autre cellule. Indiquez où intervient la transmission chimique.',
      answer:'Des signaux sont intégrés, un potentiel d’action peut être déclenché, il se propage le long de l’axone, et sa présence à une terminaison peut provoquer une libération chimique qui agit sur la cellule cible.',
      quiz:['Dans une synapse chimique, qu’est-ce qui traverse la fente ?', ['Le neurotransmetteur libéré.','L’axone lui-même.','Le potentiel d’action sous sa forme axonale.'],0,'Le signal électrique entraîne une libération chimique.'],
      source:['OpenStax','Psychology 2e · Cells of the Nervous System','2020','https://assets.openstax.org/oscms-prodcms/media/documents/Psychology2e_WEB.pdf','Section 3.2 : neurones, cellules gliales et transmission.']
    },
    {
      key:'geopolitique',title:'Géopolitique · Frontières et corridors',
      goal:'Distinguer distance, temps de trajet et coût institutionnel dans un corridor.',
      sections:[
        ['Choisir l’échelle','Un corridor relie des lieux par un ensemble d’infrastructures et de règles. La distance physique sépare les lieux, le temps dépend du réseau, et le passage d’une frontière peut introduire des procédures ou des coûts. Les trois dimensions peuvent évoluer séparément. [1]'],
        ['Identifier les acteurs','Un État peut privilégier la souveraineté douanière, une entreprise la prévisibilité des livraisons et une ville l’accessibilité. Étudier un corridor revient à comparer leurs objectifs, leurs écarts de pouvoir et les points du réseau où une décision peut modifier les flux.'],
        ['Tester une explication','Si le trafic augmente après une réforme, vérifiez si la demande, les itinéraires alternatifs ou la capacité des infrastructures ont changé en même temps. Une comparaison avec un passage inchangé donne un point d’appui, à condition que les contextes restent comparables.']
      ],
      task:'Deux villes sont séparées de 200 km. Le temps passe de six à trois heures après simplification des formalités. Distinguez ce qui a changé et proposez deux mesures pour expliquer le résultat.',
      answer:'La distance physique est inchangée. Les temps d’attente et leur variabilité ont pu diminuer. Comparez les temps au poste de contrôle et les temps en circulation, et vérifiez si le volume du trafic a changé.',
      quiz:['Quel indicateur cible la friction de passage ?',['La latitude des villes.','Le temps d’attente au poste.','La longueur de la frontière nationale.'],1,'Le temps d’attente renseigne directement sur les conditions du passage étudié.'],
      source:['Banque mondiale','Structural Transformation and Rural Change Revisited','2012','https://documents1.worldbank.org/curated/en/633201468003009411/pdf/Structural-transformation-and-rural-change-revisited-challenges-for-late-developing-countries-in-a-globalizing-world.pdf','Reprise des dimensions de densité, distance et division.']
    },
    {
      key:'art',title:'Histoire de l’art · Décrire une composition',
      goal:'Produire une description visuelle puis justifier un effet de composition.',
      sections:[
        ['Décrire les formes','L’analyse visuelle commence par décrire des éléments observables : lignes, formes, valeurs, échelles ou positions. Dire qu’une figure occupe le tiers supérieur et présente le contraste le plus marqué donne des indices qu’un autre regard peut discuter. [1]'],
        ['Analyser un effet','Le contraste peut attirer le regard vers une figure. Vérifiez si d’autres caractéristiques, comme des lignes convergentes ou l’espace vide alentour, renforcent cet effet. Un effet visuel plausible ne suffit pas à attribuer une intention individuelle à l’artiste.'],
        ['Introduire le contexte','Le support, la commande, le lieu de présentation ou les conventions iconographiques peuvent modifier la lecture d’une image. Cherchez une notice fiable et distinguez les données documentées des interprétations proposées.']
      ],
      task:'Choisissez un exemple illustré dans [1]. Relevez trois traits visibles, puis défendez une hypothèse sur le trajet du regard en 150 mots.',
      answer:'Une bonne réponse localise les trois indices et montre leur relation. Elle distingue direction du regard et sens historique, qui peuvent demander une notice, une comparaison ou des archives distinctes.',
      quiz:['Quelle phrase relève de la description ?',['Le peintre voulait inquiéter le public.','Un cercle clair est placé au centre d’un fond sombre.','L’œuvre condamne une institution.'],1,'Le placement et le contraste sont observables.'],
      source:['J. Paul Getty Museum','Understanding Formal Analysis','s. d.','https://www.getty.edu/education/teachers/building_lessons/formal_analysis.html','Éléments de l’art et analyse de la composition.']
    },
    {
      key:'musicologie',title:'Musicologie · Entendre la pulsation et la mesure',
      goal:'Distinguer la pulsation, la subdivision et le regroupement des temps.',
      sections:[
        ['Trouver un battement régulier','La pulsation est un repère de battements réguliers. Les notes peuvent tomber entre ces battements ou être tenues plus longtemps. Leur succession compose le rythme entendu. Battre du pied fournit un repère possible, qu’il faut comparer aux accents et à la répétition. [1]'],
        ['Découper le battement','Un mètre simple présente une division du temps en deux parties égales, un mètre composé en trois. Deux groupes de trois croches peuvent correspondre à deux temps subdivisés en trois. Trois groupes de deux croches suggèrent trois temps subdivisés en deux, malgré le même nombre total de croches. [1]'],
        ['Comparer deux écoutes','Tapez six coups réguliers. Accentuez le premier et le quatrième, puis le premier, le troisième et le cinquième. Le matériau temporel reste identique et le regroupement change. Écoutez si l’accentuation seule suffit à faire sentir le battement principal.']
      ],
      task:'Notez les accents de deux versions de six croches. Expliquez comment chacune pourrait suggérer un mètre différent.',
      answer:'Les accents 1 et 4 groupent les croches par trois, compatible avec deux temps composés. Les accents 1, 3 et 5 groupent les croches par deux, compatibles avec trois temps simples.',
      quiz:['Que précise la distinction simple/composé dans ce cadre ?',['La vitesse du tempo.','La subdivision habituelle d’un temps.','L’instrument principal.'],1,'Elle porte sur le nombre de parties égales qui subdivisent un temps.'],
      source:['Open Music Theory','Meter','s. d.','https://open-musictheory.github.io/docs/fundamentals/meter/','Pulsation, métriques simples et composées.']
    },
    {
      key:'religions',title:'Religions comparées · Situer les pratiques',
      goal:'Construire une comparaison qui laisse place à la diversité interne et aux changements dans le temps.',
      sections:[
        ['Nommer l’unité comparée','Comparer des religions entières produit vite des généralisations trop larges. Choisissez des pratiques datées, des communautés précises ou des textes situés. Harvard propose de traiter les religions comme diverses en interne, changeantes et inscrites dans la culture. [1]'],
        ['Lire avec deux perspectives','Une personne peut décrire un rite comme une obligation, un événement familial ou une manière d’entretenir une relation. Le chercheur observe aussi le calendrier, l’organisation et les différences entre participants. Séparer ces perspectives aide à comprendre leur relation sans imposer une interprétation unique.'],
        ['Garder une question commune','Comparer deux cas demande une question identique : qui participe, qui décide de la forme du rite, ou comment il s’est transformé ? Conservez les mots employés par les participants puis expliquez les catégories de comparaison que vous introduisez.']
      ],
      task:'Proposez deux questions comparatives sur un repas rituel observé dans deux contextes. Évitez de déduire une croyance à partir du seul geste.',
      answer:'On peut comparer les conditions d’accès au repas et la manière dont les participants justifient sa forme. Une même règle observable peut recevoir plusieurs interprétations, à documenter séparément.',
      quiz:['Quel énoncé est le mieux délimité ?', ['Cette tradition est toujours identique.','Ces participants décrivent cette pratique dans ce lieu et à cette date.','Tous ses membres interprètent ce geste de la même façon.'],1,'La formulation borne la portée du témoignage.'],
      source:['Harvard Divinity School · Religion and Public Life','Our Approach','s. d.','https://rpl.hds.harvard.edu/what-we-do/our-approach','Principes de littératie religieuse dans une approche académique.']
    },
    {
      key:'archeologie',title:'Archéologie · Comprendre une coupe stratigraphique',
      goal:'Établir un ordre relatif et reconnaître un dépôt remanié.',
      sections:[
        ['Observer les relations','Une coupe montre les contacts entre couches, fosses et remblais. Dans une séquence non perturbée, une couche inférieure est déposée avant celle qui la recouvre. Une fosse qui traverse les couches est plus récente que les dépôts qu’elle coupe.'],
        ['Associer un objet à son contexte','Un objet ancien trouvé dans le remblai d’une fosse peut avoir été prélevé dans une couche antérieure. Sa présence fournit un indice chronologique, avec une réserve sur le remploi. Le contexte comprend les relations entre les matériaux et le sédiment qui les contient. [1]'],
        ['Justifier une séquence','Décrivez les contacts avant de leur donner une date. Un schéma annoté où chaque trait correspond à une observation facilite la vérification. Comparez la datation relative à une datation indépendante lorsqu’elle est disponible.']
      ],
      task:'Une fosse traverse deux couches et contient un tesson similaire à ceux de la couche basse. Écrivez l’ordre relatif et expliquez l’origine possible du tesson.',
      answer:'La couche basse précède la haute dans une séquence intacte, et les deux précèdent le creusement. Le comblement est postérieur au creusement. Le tesson peut être résiduel, remonté depuis la couche basse ou apporté avec un remblai.',
      quiz:['Quel événement est nécessairement postérieur à une couche coupée ?', ['Le creusement de la fosse.', 'La fabrication de tous les objets de la fosse.', 'Le dépôt de la couche inférieure.'],0,'La couche devait exister pour être recoupée.'],
      source:['Society for American Archaeology','Geoarchaeology Task Force Statement','2025','https://www.saa.org/common/Uploaded%20files/saadocs/CareerPractice/SAA%20Statements%20and%20Guidelines/saa-gtf-statement-on-deep-testing-and-qualifications-for-geoarchaeologists-07mar25.pdf','Importance du contexte et de la relation entre dépôts et matériaux.']
    }
  ],
  [
    {
      key:'ia',title:'Intelligence artificielle · Mesurer la généralisation',
      goal:'Identifier un surapprentissage et proposer une séparation de données adaptée.',
      sections:[
        ['Séparer les usages des données','L’entraînement ajuste le modèle. La validation aide à choisir un réglage. Le test évalue la performance sur des données mises de côté. Si on modifie le modèle à partir des résultats du test, ce test participe alors au choix du modèle. [1]'],
        ['Comparer les performances','Un modèle qui obtient 98 % en entraînement et 67 % en validation peut avoir appris des particularités de ses exemples. Vérifiez aussi que les distributions et la définition du score sont comparables. Une différence géographique, temporelle ou de population peut expliquer une partie de l’écart.'],
        ['Prévenir les doublons','Dans un corpus qui contient plusieurs images du même objet, répartir les images au hasard peut placer presque le même exemple dans les trois jeux. Séparez plutôt les objets si le but est d’évaluer la performance sur de nouveaux objets.']
      ],
      task:'On veut reconnaître des fleurs inédites à partir de photographies prises plusieurs fois sur chaque plante. Proposez une séparation pour évaluer de nouvelles plantes.',
      answer:'Attribuez chaque plante entière à un seul ensemble. Séparez ensuite validation et test afin que le test soit conservé pour la mesure finale.',
      quiz:['Quel écart justifie d’examiner un surapprentissage ?', ['Score d’entraînement élevé et validation basse.', 'Même score de part et d’autre par définition.', 'Un changement de police du tableau.'],0,'Un score qui s’effondre sur des exemples nouveaux signale un défaut potentiel de généralisation.'],
      source:['Google for Developers','Machine Learning Crash Course · Overfitting','s. d.','https://developers.google.com/machine-learning/crash-course/overfitting/overfitting','Surapprentissage et représentativité des jeux de données.']
    },
    {
      key:'robotique',title:'Robotique · Configurations et degrés de liberté',
      goal:'Décrire une configuration et distinguer espace de configuration et espace de travail.',
      sections:[
        ['Décrire l’état géométrique','La configuration d’un robot est une description de la position de ses parties. Pour un bras plan idéal à deux articulations pivot, deux angles indépendants suffisent pour décrire la configuration. Les deux angles donnent ensuite la position de l’extrémité via la géométrie du bras. [1]'],
        ['Comparer les espaces','L’espace de configuration réunit les angles accessibles. L’espace de travail décrit les positions atteignables par l’extrémité. Plusieurs configurations peuvent atteindre la même position, comme des versions « coude haut » et « coude bas ». Une butée réduit l’ensemble des angles admissibles.'],
        ['Introduire l’obstacle','Une configuration peut être géométriquement possible sans être autorisée si un segment coupe un obstacle. Vérifier seulement la position finale ignore le trajet et les segments intermédiaires. Un chemin sûr s’examine dans l’ensemble des configurations admissibles.']
      ],
      task:'Dessinez deux configurations d’un bras à deux segments qui atteignent le même point. Ajoutez un obstacle qui rend l’une des configurations impossible.',
      answer:'Sur un point accessible et hors de l’alignement complet des segments, refléter le coude par rapport à la ligne base-cible fournit une deuxième position possible. Placez l’obstacle sur un segment du premier tracé.',
      quiz:['Que décrivent les deux angles ?',['La configuration du bras.','La couleur de l’extrémité.','L’énergie électrique consommée.'],0,'Ils déterminent les positions relatives des segments dans le modèle.'],
      source:['Kevin Lynch et Frank Park · Northwestern University','Modern Robotics · Configuration Space','2017','https://modernrobotics.northwestern.edu/chapters/chapter2/','Articulations, configurations et degrés de liberté.']
    },
    {
      key:'evolution',title:'Génétique et évolution · Dérive et hasard',
      goal:'Distinguer l’effet d’un échantillonnage aléatoire et celui de la sélection.',
      sections:[
        ['Changer d’échelle','L’évolution d’une population se décrit notamment par la fréquence de variantes héréditaires au fil des générations. Une fréquence peut varier parce que le nombre de copies transmises est aléatoire, même lorsque les variantes ont le même effet sur la reproduction. [1]'],
        ['Un modèle avec des jetons','Placez cinq jetons clairs et cinq foncés dans un sac. Tirez dix fois avec remise, puis notez le nombre de jetons clairs. La valeur attendue est cinq, mais chaque tirage complet peut s’en écarter. Des échantillons plus petits produisent en général des écarts relatifs plus importants.'],
        ['Interpréter une trajectoire','Une différence entre deux générations ne suffit pas à attribuer un avantage à une variante. Des répétitions, un modèle de hasard et des informations sur les différences de reproduction peuvent aider à comparer dérive et sélection.']
      ],
      task:'Faites six séries fictives de taille 4 puis six de taille 20 par tirage avec remise. Comparez la dispersion des proportions et discutez une limite.',
      answer:'La proportion varie plus fortement dans les petits échantillons en moyenne. Six répétitions ne garantissent pas cet ordre dans chaque essai. Le modèle suppose des tirages indépendants et des variantes de même chance initiale.',
      quiz:['Quel constat est compatible avec la dérive seule ?', ['Un écart de fréquence entre générations dans une petite population.','Une cause déterministe démontrée par définition.','L’absence absolue de hasard de reproduction.'],0,'Le hasard d’échantillonnage peut entraîner un écart sans différence de succès attendue.'],
      source:['OpenStax','Biology 2e · Population and Community Genetics, Chapter 19 Summary','2018','https://openstax.org/books/biology-2e/pages/19-chapter-summary','Évolution des fréquences et dérive génétique.']
    },
    {
      key:'medecine',title:'Médecine du futur · Lire un essai clinique',
      goal:'Interpréter un résultat fictif en distinguant comparateur, ampleur et limites.',
      sections:[
        ['Situer la phase','Les phases d’un développement clinique posent des questions différentes, de la sécurité initiale à l’efficacité et à la surveillance. Pour lire une étude, identifiez ce qu’elle cherche à apprendre au regard de sa phase et de la population incluse. [1]'],
        ['Préciser la comparaison','Un essai peut comparer une intervention à des soins usuels ou à un placebo selon la question et les contraintes éthiques. L’affectation aléatoire aide à répartir les différences initiales. La définition du résultat, sa durée de suivi et les personnes ayant quitté l’étude conditionnent l’interprétation.'],
        ['Lire un résultat fictif','Si un critère favorable est observé chez 60 sur 100 dans un groupe et 50 sur 100 dans l’autre, l’écart brut vaut dix points de pourcentage. Avant de généraliser, vérifiez la précision statistique, les événements indésirables, la durée et la pertinence pour la population considérée.']
      ],
      task:'À partir des chiffres fictifs, indiquez quelle question chaque donnée écoute : intervalle de confiance, durée du suivi et critères d’inclusion.',
      answer:'L’intervalle renseigne sur la précision de l’écart. Le suivi indique à quel horizon le résultat est mesuré. L’inclusion délimite la population à laquelle l’étude se rapporte directement.',
      quiz:['Quel résultat correspond à l’écart brut du scénario ?', ['Dix points de pourcentage.','Dix patients en tout.','Soixante points de pourcentage.'],0,'On soustrait 50 % de 60 %.'],
      source:['National Institutes of Health','Clinical Research Trials and You · The Basics','s. d.','https://www.nih.gov/health-information/nih-clinical-research-trials-you/basics','Principes et objectifs des différentes phases de recherche clinique.']
    },
    {
      key:'astronomie',title:'Astronomie · Relier orbite et période',
      goal:'Calculer un rapport de périodes avec la troisième loi de Kepler dans un modèle simple.',
      sections:[
        ['Mesurer l’ellipse','Le demi-grand axe a caractérise la taille de l’orbite elliptique. Sur une orbite circulaire, il est égal au rayon. La période T désigne la durée nécessaire pour parcourir une orbite complète. [1]'],
        ['Comparer dans le même système','Pour deux petits corps orbitant autour du même astre dans le modèle de Kepler, T²/a³ est une constante commune. Si a est multiplié par quatre, T est multipliée par huit, puisque 4^(3/2) = 8. [1]'],
        ['Vérifier les conditions','Comparer directement deux systèmes centrés sur des masses très différentes suppose de tenir compte de la masse centrale. Pour tester la loi sur des observations, annoncez les unités et séparez incertitude de mesure et limites du modèle.']
      ],
      task:'Une planète fictive a un demi-grand axe double de celui de la Terre autour du Soleil. Estimez sa période en années.',
      answer:'Le rapport des périodes vaut 2^(3/2) = √8, environ 2,83. Avec un an pour la Terre, cela donne environ 2,83 ans dans le modèle.',
      quiz:['Si le demi-grand axe est multiplié par quatre, la période est multipliée par…',['2.','4.','8.'],2,'T est proportionnelle à a puissance 3/2.'],
      source:['OpenStax','Astronomy 2e · The Laws of Planetary Motion','2022','https://openstax.org/books/astronomy-2e/pages/3-1-the-laws-of-planetary-motion','Lois de Kepler et relation entre demi-grand axe et période.']
    },
    {
      key:'finance',title:'Finance · Comparer des flux datés',
      goal:'Actualiser un montant fictif et rendre explicite l’hypothèse de taux.',
      sections:[
        ['Mettre les montants à la même date','Avec un taux annuel constant r et une capitalisation annuelle, un montant initial V devient V × (1+r)^n au bout de n années. L’opération inverse ramène un montant futur à une valeur présente dans le même modèle. [1]'],
        ['Distinguer scénario et promesse','Un taux choisi pour un exercice rend les calculs comparables. Il ne constitue pas une prévision de rendement. Des risques, des frais ou des échéances différentes exigeraient de modifier la comparaison. Ici les flux sont certains par hypothèse et aucun frais n’est inclus.'],
        ['Examiner la sensibilité','Lorsque r monte, une même somme future se traduit par une valeur présente plus basse. Comparez deux taux pour voir si une conclusion tient uniquement à un paramètre particulier.']
      ],
      task:'Dans un exercice fictif, actualisez 121 unités dues dans deux ans avec un taux de 10 %, puis avec un taux nul.',
      answer:'À 10 %, 121/(1,10)² = 100 unités. À taux nul, la valeur présente reste 121. L’écart vient entièrement de la convention de taux appliquée.',
      quiz:['Quel montant change si on augmente le taux dans cet exercice ?', ['La valeur présente calculée.','Le flux futur de 121 fixé dans l’énoncé.','La date du versement.'],0,'Les deux autres quantités sont fixées.'],
      source:['OpenStax','Principles of Finance · Time Value of Money Basics','2022','https://openstax.org/books/principles-finance/pages/7-2-time-value-of-money-tvm-basics','Capitalisation et actualisation dans un modèle à taux constant.']
    },
    {
      key:'ecologie',title:'Écologie · Comparer des flux d’énergie',
      goal:'Calculer un rendement trophique en contrôlant la compatibilité des mesures.',
      sections:[
        ['Distinguer stock et flux','La biomasse représente un stock mesuré à un instant. La production représente un flux sur une durée. Comparer deux niveaux trophiques demande des unités et des périodes compatibles. Une biomasse importante ne signifie pas automatiquement une production élevée. [1]'],
        ['Calculer une efficacité','Dans un exercice, un niveau produit 1 000 unités énergétiques par an et le niveau suivant 120. L’efficacité de transfert de production vaut 12 % si les productions se rapportent à la même aire et à la même période. Les valeurs réelles varient selon les systèmes. [1]'],
        ['Identifier les voies de transfert','Une partie de la production n’est pas consommée par le niveau suivant. Une autre alimente respiration et métabolisme ou rejoint la voie détritique. Vérifiez quelles mesures sont intégrées à votre bilan avant d’attribuer les écarts à un seul mécanisme.']
      ],
      task:'Calculez le rendement pour 500 et 75 kJ par m² et par an. Expliquez pourquoi diviser 75 kJ par une biomasse instantanée en kilogrammes poserait problème.',
      answer:'75/500 donne 15 %. Dans le deuxième calcul, les grandeurs et leurs dimensions diffèrent, donc le rapport ne mesure pas une fraction de production transférée.',
      quiz:['Que doivent partager les deux mesures ?',['La même aire et la même durée de référence.','La même valeur numérique.','La même masse par organisme.'],0,'Des bases communes rendent le rapport interprétable.'],
      source:['OpenStax','Biology 2e · Energy Flow through Ecosystems','2018','https://openstax.org/books/biology-2e/pages/46-2-energy-flow-through-ecosystems','Flux entre niveaux trophiques et efficacité des transferts.']
    },
    {
      key:'ethique',title:'Éthique · Conséquences, devoirs et vertus',
      goal:'Formuler trois justifications d’un choix et traiter une objection à chacune.',
      sections:[
        ['Trois angles de raisonnement','Une approche conséquentialiste évalue les effets. Une approche déontologique s’intéresse notamment aux devoirs et aux droits. Une approche par les vertus examine les dispositions et le jugement pratique de l’agent. Chacune donne une raison différente de soutenir ou de rejeter une action. [1]'],
        ['Séparer critères et données','Dans un exemple fictif, une université répartit un nombre limité de places pour un atelier. Un critère d’impact examine les bénéfices; un critère de devoir peut privilégier une procédure loyale; une approche par les vertus interroge les pratiques de justice et de discernement. Pour comparer, expliquez quelles données appuient chaque raison.'],
        ['Éprouver le jugement','Une réponse rigoureuse formule ce qui ferait changer la décision. Cherchez un cas où une procédure apparemment impartiale produit des obstacles inégaux, ou un cas où une augmentation du bénéfice global impose un coût important à un groupe.']
      ],
      task:'Comparez tirage au sort et priorité aux personnes sans autre accès. Donnez une objection à votre option préférée et une réponse.',
      answer:'Le tirage préserve l’égalité des chances formelle. La priorité cherche à corriger un écart d’accès. Une réponse peut défendre l’une ou combiner les deux si elle indique le critère prioritaire et ses limites.',
      quiz:['Quel énoncé invoque directement les conséquences ?', ['Cette procédure accroît le nombre de personnes qui en bénéficient.', 'Il faut tenir la promesse faite.', 'La personne fait preuve d’intégrité.'],0,'Le critère cité porte sur l’effet de la procédure.'],
      source:['OpenStax','Introduction to Philosophy · Normative Moral Theory, Summary','2022','https://openstax.org/books/introduction-philosophy/pages/9-summary','Approches conséquentialistes, déontologiques et par les vertus.']
    }
  ],
  [
    {
      key:'ecriture',title:'Écriture créative · Réviser un point de vue',
      goal:'Réécrire une scène en contrôlant l’information accessible au lecteur.',
      sections:[
        ['Lire de près','La lecture rapprochée s’appuie sur les choix précis du texte : formulation, image, rythme ou point de vue. Pour préparer une révision, sélectionnez un passage court et indiquez quel détail produit l’effet que vous cherchez à modifier. [1]'],
        ['Écrire une première version','Une personne traverse un couloir et entend une porte se fermer. À partir de sa perception, le lecteur peut ignorer qui est derrière la porte. Réécrivez la scène du point de vue du personnage derrière la porte : les faits restent stables, les indices accessibles changent.'],
        ['Réviser sur preuve','Soulignez dans chaque version une phrase où l’accès à l’information diffère. Faites lire les deux passages séparément et demandez à quel moment le lecteur comprend la situation. Modifiez un indice précis en fonction du retour.']
      ],
      task:'Écrivez deux paragraphes de 90 à 120 mots et annotez trois informations accessibles dans une seule version.',
      answer:'La correction compare les informations précises données au lecteur. On vérifiera que les faits communs restent compatibles et que les différences de révélation viennent des choix de perspective.',
      quiz:['Quel indice doit être justifié par la perspective retenue ?', ['Ce que le personnage peut savoir au moment de la scène.','Le nombre de pages du cours.','Le choix de police de caractère.'],0,'Le point de vue organise l’accès à l’information.'],
      source:['Purdue Online Writing Lab','Close Reading · Writing about Fiction','s. d.','https://owl.purdue.edu/owl/subject_specific_writing/writing_in_literature/writing_about_fiction/index.html','Méthode d’analyse des choix textuels.']
    },
    {
      key:'narratologie',title:'Narratologie · Ordre, durée et fréquence',
      goal:'Appliquer les trois catégories du temps narratif à un récit court.',
      sections:[
        ['Ordre des faits et du récit','Un récit qui commence par un procès peut revenir ensuite sur l’événement jugé. L’ordre de présentation diffère alors de l’ordre chronologique. La relation entre les deux permet de décrire un retour en arrière sans supposer encore son effet. [1]'],
        ['Durée de la narration','Un paragraphe peut condenser une décennie, tandis que plusieurs pages détaillent quelques secondes. L’écart entre durée des événements et place accordée à leur récit modifie l’attention que le lecteur peut leur porter. [1]'],
        ['Fréquence','Un texte peut raconter plusieurs fois un événement unique, ou regrouper plusieurs événements semblables dans un seul énoncé. Répéter une scène depuis un autre point de vue ajoute parfois une information. Résumer plusieurs visites par une habitude permet une autre économie du récit. [1]']
      ],
      task:'Analysez : « Au procès, elle se souvint de ses visites du lundi. Elle revit alors le jour où la lettre avait disparu. » Identifiez un effet d’ordre et un effet de fréquence.',
      answer:'Le souvenir place des faits antérieurs après le récit du procès. L’expression « ses visites du lundi » rassemble une série de visites. Le jour de la lettre sélectionne un épisode particulier dans la série.',
      quiz:['Le récit rapporte plusieurs fois une même scène. Quelle dimension est concernée ?', ['La fréquence.','La topographie.','La taille de police.'],0,'La fréquence compare le nombre d’occurrences racontées au nombre d’occurrences de l’événement.'],
      source:['Universität Tübingen','Narratology · Time','s. d.','https://uni-tuebingen.de/en/233933','Ordre, durée et fréquence dans le cadre de Genette.']
    },
    {
      key:'jeu',title:'Game design · Prototyper et tester une règle',
      goal:'Formuler une hypothèse sur une mécanique et construire un test observable.',
      sections:[
        ['Isoler l’action centrale','Dans un prototype de jeu papier, la mécanique centrale peut être « dépenser une ressource pour déplacer un pion ». Précisez le choix proposé, l’information disponible et le retour donné après l’action. Ce niveau de description permet de tester la règle avant d’ajouter des éléments narratifs ou graphiques. [1]'],
        ['Fixer une observation','Si votre hypothèse est que la règle crée un dilemme, observez les choix automatiques et les justifications. Notez quand une personne hésite et demandez ensuite ce qu’elle a compris. Une hésitation peut venir du dilemme ou de la formulation mal comprise.'],
        ['Itérer une variable','Modifiez un coût ou une règle de placement et testez la nouvelle version, en gardant les autres conditions aussi proches que possible. Une amélioration dans un seul essai doit être confirmée sur d’autres situations et avec d’autres participants.']
      ],
      task:'Concevez une règle à deux choix avec neuf jetons. Définissez un résultat qui signalerait un choix dominant et une modification à tester.',
      answer:'Si chaque personne fait systématiquement le même choix dans des situations distinctes et l’explique par un meilleur rendement, modifiez un seul coût pour tester l’hypothèse de domination. Contrôlez que la règle est comprise.',
      quiz:['Quel changement aide à expliquer un effet après test ?', ['Modifier une seule règle d’abord.','Changer graphisme, règles et joueurs en même temps.','Retirer les observations du protocole.'],0,'Limiter le nombre de changements rend l’interprétation plus précise.'],
      source:['MIT Learn · OpenCourseWare','Introduction to Game Design · Iterative Design','s. d.','https://learn.mit.edu/?resource=17503&resource_title=introduction-to-game-design','Mécanique centrale et tests itératifs.']
    },
    {
      key:'bonheur',title:'Philosophie du bonheur · Trois conceptions du bien-être',
      goal:'Comparer plaisir, satisfaction des désirs et biens objectifs à partir d’un cas.',
      sections:[
        ['Définir ce qui est en jeu','Le bien-être philosophique demande ce qui rend une vie meilleure pour la personne qui la vit. Des conceptions mettent l’accent sur le plaisir, la satisfaction des désirs ou certains biens tels que des relations et des activités significatives. Ces critères peuvent diverger. [1]'],
        ['Construire un contre-exemple','Imaginons une personne qui choisit un projet difficile et éprouve peu de plaisir pendant son exécution, mais estime son projet important. Le cas invite à distinguer les expériences immédiates, les préférences à long terme et la valeur accordée par une théorie à l’activité elle-même.'],
        ['Comparer sans caricaturer','Une objection à une théorie doit viser sa version la plus plausible. Demandez si l’hédoniste peut compter les plaisirs futurs, si la théorie du désir distingue un désir informé et si une liste de biens laisse place au jugement de la personne.']
      ],
      task:'Appliquez les trois critères à un même cas et indiquez quelle information pourrait changer votre analyse.',
      answer:'Une conclusion possible distingue le déplaisir actuel, la satisfaction d’un projet choisi et la valeur de l’apprentissage. L’analyse changerait si le choix était contraint ou si la douleur durait sans bénéfice attendu.',
      quiz:['Quel critère met l’accent sur la qualité de l’expérience vécue ?', ['Le prix du projet.','Le plaisir et la douleur.','L’orthographe de l’objectif.'],1,'Dans l’approche hédoniste évaluative, les expériences occupent une place centrale.'],
      source:['Stanford Encyclopedia of Philosophy','Well-Being','s. d.','https://plato.stanford.edu/entries/well-being/','Présentation comparée des conceptions du bien-être.']
    },
    {
      key:'esthetique',title:'Esthétique et savoir-faire · Lire la fabrication d’un motif',
      goal:'Relier un choix de forme aux contraintes d’un procédé et justifier une variation.',
      sections:[
        ['Observer répétition et variation','Un motif répétitif relie une unité de dessin à la surface qu’elle doit couvrir. Repérez la taille de l’unité, la symétrie éventuelle et les raccords. Un raccord visible peut relever du procédé, d’une décision ou d’une dégradation postérieure.'],
        ['Comparer deux supports','Un même dessin peut être transposé entre papier peint, tissu ou décor. Reproduire l’image seule ne donne pas le même ouvrage : support, résistance et raccord orientent la fabrication. Les collections du V&A permettent de situer les motifs de William Morris dans des objets et des projets de décor. [1]'],
        ['Éprouver le geste','Dessinez une unité et répétez-la à main levée, puis au pochoir sur papier. Comparez le temps, la régularité et les solutions possibles quand deux bords ne se rejoignent pas. L’essai aide à expliquer des choix de forme.']
      ],
      task:'Créez un motif répétitif sur papier et proposez une modification qui facilite son raccord sur un tissu. Expliquez l’effet visuel.',
      answer:'Une variation peut préserver le motif central tout en plaçant un contour simple au bord de l’unité. Elle facilite la continuité du raccord, avec un éventuel changement de densité sur la surface.',
      quiz:['Quel indice renseigne directement sur le raccord ?', ['La relation entre les bords de deux unités voisines.','Le nom du musée seul.','L’année de votre visite.'],0,'La juxtaposition des bords rend visible la continuité de la répétition.'],
      source:['Victoria and Albert Museum','William Morris and the V&A','s. d.','https://www.vam.ac.uk/articles/william-morris-and-the-va/','Objets, motifs et décors dans les collections.']
    },
    {
      key:'applications',title:'Conception d’applications · Tester un parcours accessible',
      goal:'Décrire une tâche et identifier un obstacle au clavier.',
      sections:[
        ['Définir une tâche courte','Prenez un formulaire fictif d’inscription à une bibliothèque. Demandez d’entrer un nom et d’envoyer la demande. Précisez le résultat attendu et la façon dont l’interface confirme la réussite ou indique un champ à corriger.'],
        ['Essayer sans souris','Utilisez Tab pour passer d’un contrôle au suivant et vérifiez que l’élément actif reste visible. Les boutons et champs doivent avoir des noms compréhensibles. Un composant qui capture le clavier peut empêcher d’accéder au reste du parcours. [1]'],
        ['Vérifier les erreurs','Si un champ est incomplet, ajoutez un message qui précise ce qui manque et comment le corriger. Associez le message au contrôle et testez la navigation jusqu’à lui. Un parcours praticable au clavier est un aspect de l’accessibilité à compléter par d’autres essais.']
      ],
      task:'Rédigez un test en quatre étapes pour un formulaire. Incluez une erreur volontaire et la reprise normale du parcours.',
      answer:'Partir avant le formulaire, atteindre chaque champ au clavier, tenter l’envoi avec un champ manquant, puis corriger et constater la confirmation. Notez l’ordre du focus et l’identification de l’erreur.',
      quiz:['Quel résultat montre un obstacle concret ?', ['On entre dans une zone au clavier et on ne peut plus en sortir.','Le bouton a deux mots.','L’écran est utilisé en mode clair.'],0,'Le piège au clavier bloque la suite du parcours.'],
      source:['W3C · Web Accessibility Initiative','Accessibility Principles','s. d.','https://www.w3.org/WAI/fundamentals/accessibility-principles/','Accessibilité au clavier, focus et identification des contrôles.']
    },
    {
      key:'pedagogie',title:'Pédagogie · Aligner objectif, exercice et évaluation',
      goal:'Construire une activité et une évaluation qui observent le comportement annoncé.',
      sections:[
        ['Définir ce qui sera observable','« Comprendre les arguments » laisse ouverte la performance attendue. « Entourer une prémisse et justifier son rôle dans un paragraphe inédit » précise une tâche qui peut être observée. L’objectif donne ainsi un critère pour concevoir l’exercice et l’évaluation. [1]'],
        ['Planifier l’entraînement','L’exercice présente d’abord un exemple annoté, puis un autre que l’apprenant doit traiter avec une aide décroissante. Le retour vise le raisonnement : ce qui est donné comme raison et ce que cette raison vise à établir.'],
        ['Évaluer le transfert','Proposer le même paragraphe avec les mêmes indices peut mesurer la mémoire de l’exercice. Un paragraphe inédit du même niveau de difficulté aide à vérifier si l’apprenant applique la méthode. Le barème distingue alors le repérage et la justification.']
      ],
      task:'Écrivez un objectif sur la lecture d’une source, puis un exercice et deux critères d’évaluation.',
      answer:'Objectif : distinguer une observation et une interprétation dans une notice. Exercice : annoter deux phrases d’abord avec un modèle. Évaluation : traiter une notice inédite; un critère porte sur le classement, l’autre sur sa justification.',
      quiz:['Quelle évaluation correspond à un objectif de justification ?', ['Demander une raison à côté du choix.','Compter le nombre de lignes lues.','Réciter la date du cours.'],0,'La tâche d’évaluation doit rendre observable la justification annoncée.'],
      source:['Carnegie Mellon University · Eberly Center','Align Assessments, Objectives, Instructional Strategies','s. d.','https://www.cmu.edu/teaching/assessment/basics/alignment.html','Alignement pédagogique entre objectifs, activités et évaluation.']
    },
    {
      key:'memoire-recherche',title:'Mémoire de recherche · De la question à la revue de littérature',
      goal:'Délimiter une question et construire un tableau comparatif de sources.',
      sections:[
        ['Délimiter une question','« L’étude est-elle efficace ? » laisse indéterminés le public, la méthode et le résultat. « Chez des étudiants débutants, quel effet a le rappel actif sur la rétention de mots après sept jours ? » indique un public, une intervention et un critère. Une question délimitée permet de choisir des sources pertinentes.'],
        ['Regrouper des résultats','Une revue de littérature compare les méthodes, les résultats et leurs limites. Elle peut être organisée par question, par méthode ou par contradiction. Une liste exhaustive de résumés n’explique pas comment les études se répondent. [1]'],
        ['Préparer un argument','Construisez une ligne par étude avec population, méthode, résultat et limite. Cherchez deux études comparables et identifiez une raison plausible de divergence. La conclusion devra préciser ce que les sources permettent d’affirmer et ce qui reste à établir.']
      ],
      task:'Écrivez une question de recherche et préparez un tableau de cinq colonnes pour comparer trois publications. Donnez un critère explicite d’inclusion.',
      answer:'Incluez les références, la population, la méthode, le résultat et la limite. Un critère peut porter sur l’existence d’un test différé et sur une population définie. Expliquez ce que ce choix exclut et pourquoi.',
      quiz:['Que doit faire une revue thématique ?', ['Comparer plusieurs études autour d’une même question.','Reporter seulement leurs titres.','Additionner des résultats incomparables.'],0,'Une synthèse met en relation les preuves et leurs conditions de production.'],
      source:['University of Nevada, Reno · Writing & Speaking Center','Literature Review Basics','s. d.','https://www.unr.edu/writing-speaking-center/writing-speaking-resources/literature-review-basics','Organisation d’une revue, comparaison et limites des recherches.']
    }
  ]
];

function upperYearCourse(year, index) {
  const entry = upperYears[year-1]?.[index];
  if (!entry) return undefined;
  const {key,title,goal,sections,task,answer,quiz,source} = entry;
  const continuation = cycleContinuations[key];
  return {
    year:year+1,
    key, title, introduction:goal,
    lessons:[{
      id:'ouverture', title, goal, sections, prerequisite:'Méthode de lecture et de vérification des sources de l’Année 1.',
      dossier:'Lecture externe [1]. Repère la définition ou le passage cité, puis indique ce qu’il permet de vérifier dans le cours.',
      activity:task, correction:answer, quiz, sources:[source],
      seminar:'Présente ton raisonnement et défends une limite de ta réponse à partir du cours et de la lecture.',
      review:'À J+2, refais l’exercice sans le corrigé. À J+7, change une hypothèse et vérifie ce qui se modifie dans ta réponse.'
    }, ...(continuation ? [continuation] : [])]
  };
}

function allStudyCourses() {
  return [...campusCatalog(), ...upperYears.flatMap((entries, yearIndex) =>
    entries.map((_, subjectIndex) => upperYearCourse(yearIndex+1,subjectIndex)))];
}
