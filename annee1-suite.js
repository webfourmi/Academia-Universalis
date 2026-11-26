physique.push(
  {
    id:'ondes', title:'Ondes · Mesurer la propagation',
    goal:'Distinguer période et longueur d’onde et calculer une vitesse de propagation.',
    prerequisite:'Savoir convertir des unités et calculer un rapport.',
    sections:[
      ['Deux regards sur une même onde','Un capteur fixe observe la succession des crêtes : le temps entre deux crêtes est la période T. Une photographie de l’onde à un instant compare deux crêtes voisines dans l’espace : leur séparation est la longueur d’onde λ. Le premier relevé est temporel, le second spatial. [1]'],
      ['Relier les mesures','Si le motif avance d’une longueur d’onde en une période, sa vitesse vaut v = λ/T = λf, où f = 1/T. Une longueur de 0,60 m et une fréquence de 5 Hz donnent 3,0 m/s. Vérifiez les unités : un hertz vaut une oscillation par seconde. [1]'],
      ['Séparer propagation et oscillation','Sur une corde idéale, un point de la corde oscille autour de son emplacement pendant que la perturbation progresse. Marquez mentalement un point et une crête : suivre le point et suivre la crête répondent à deux questions différentes. [1]'],
      ['Prévoir un changement','Si la vitesse reste la même lorsque la fréquence double, la longueur d’onde est divisée par deux. Ce résultat suppose que la vitesse de propagation reste constante. Si le milieu et la vitesse changent également, il faut connaître la nouvelle vitesse avant de conclure.']
    ],
    diagram:['Deux mesures complémentaires',['Observation','Grandeur'],[['À un point fixe','Période T, en secondes.'],['Sur une image instantanée','Longueur d’onde λ, en mètres.'],['Sur un trajet de crête','Vitesse v, en mètres par seconde.']]],
    dossier:'Dans [1], comparez fréquence, période et vitesse. Dessinez une courbe selon le temps puis une courbe selon la position et indiquez ce que vous lisez en abscisse.',
    activity:'Une crête avance de 1,8 m en 0,6 s. Au point fixe, deux crêtes arrivent à 0,20 s d’intervalle. Calculez v, f et λ.',
    correction:'v = 1,8/0,6 = 3,0 m/s. f = 1/0,20 = 5 Hz. λ = v/f = 0,60 m.',
    quiz:['Quelle donnée se lit sur une photographie instantanée du motif ?',['La période entre deux passages.','La distance entre deux crêtes voisines.','La durée de déplacement de la crête.'],1,'Une image instantanée montre des positions au même instant et permet de mesurer une séparation spatiale.'],
    seminar:'Comparez le mouvement d’une crête et celui d’un flotteur entraîné localement par une petite vague.',
    review:'À J+2, refaites les calculs. À J+7, calculez la longueur d’onde si la fréquence double à vitesse fixe.',
    sources:[['OpenStax','University Physics Volume 1 · Waves, Chapter 16 Summary','2016','https://openstax.org/books/university-physics-volume-1/pages/16-summary','Définitions et relation entre période, longueur d’onde et vitesse.']]
  },
  {
    id:'relativite', title:'Relativité · Comparer les durées mesurées',
    goal:'Identifier un temps propre et calculer une dilatation du temps dans un cas simple.',
    prerequisite:'Savoir utiliser une racine carrée. Comprendre la notion de référentiel.',
    sections:[
      ['Définir les événements','Choisissons deux événements : les départs de deux signaux à bord du même véhicule. Dans le référentiel où le véhicule est immobile, ces événements ont lieu au même endroit. L’intervalle indiqué par l’horloge embarquée entre ces deux événements est le temps propre. [1]'],
      ['Raisonner avec une horloge lumineuse','Dans une horloge idéale à deux miroirs, un rayon lumineux fait des allers-retours. Depuis le véhicule, le trajet entre miroirs est vertical. Depuis un référentiel où il se déplace latéralement, ce trajet est oblique. Les deux descriptions respectent la même vitesse de la lumière dans le vide. Le trajet plus long correspond, dans le référentiel extérieur, à une durée plus grande. [1]'],
      ['Calculer un exemple','Pour un mouvement rectiligne uniforme à 0,60 c, le facteur γ = 1/√(1 − v²/c²) vaut 1,25. Si deux signaux sont émis à 8 s d’intervalle propre, l’intervalle dans le référentiel où le véhicule se déplace vaut 10 s. C’est un écart entre durées coordonnées des émissions, distinct du délai d’arrivée de la lumière chez un observateur. [1]'],
      ['Vérifier les limites','Lorsque v est très petit devant c, γ est proche de 1. Cela explique pourquoi les calculs de mécanique classique restent suffisants pour de nombreux exercices courants. Pour chaque exercice, nommez les deux événements et le référentiel qui mesure chaque durée.']
    ],
    diagram:['Suivre deux événements',['Référentiel','Mesure'],[['Embarqué','Deux émissions au même lieu : temps propre.'],['Extérieur inertiel','Émissions à des positions distinctes : durée γ fois le temps propre.']]],
    dossier:'Dans le schéma de l’horloge lumineuse de [1], repérez la distance entre miroirs et le trajet oblique. Expliquez pourquoi les durées diffèrent.',
    activity:'Deux impulsions sont émises à 12 s d’intervalle propre depuis un véhicule à 0,80 c. Calculez la durée extérieure et identifiez les événements.',
    correction:'Les deux événements sont les émissions. γ = 1/0,60 = 5/3, donc Δt = 20 s dans le référentiel extérieur. Ce calcul ne donne pas l’intervalle de réception des deux signaux.',
    quiz:['Qui mesure directement le temps propre dans cet exercice ?',['L’horloge qui accompagne la source.','Une horloge immobile située à mi-chemin.','Un chronomètre qui mesure seulement le délai de réception.'],0,'Le temps propre est mesuré par l’horloge présente aux deux émissions.'],
    seminar:'Pourquoi faut-il spécifier les deux événements avant d’interpréter un résultat sur des horloges ?',
    review:'À J+2, retrouvez le facteur γ pour 0,60 c. À J+7, distinguez émission, réception et temps propre.',
    sources:[['OpenStax','University Physics Volume 3 · Time Dilation','2016','https://openstax.org/books/university-physics-volume-3/pages/5-3-time-dilation','Temps propre, horloge lumineuse et dilatation des durées.']]
  }
);

economicsLessons.push({
  id:'monnaie', title:'Monnaie · Payer, compter et conserver',
  goal:'Distinguer les trois fonctions de la monnaie et calculer un changement de pouvoir d’achat.',
  prerequisite:'Savoir manipuler une proportion.',
  sections:[
    ['Trois fonctions','La monnaie sert d’intermédiaire des échanges, d’unité de compte et de réserve de valeur. Payer une prestation illustre la première. Afficher deux prix dans la même unité illustre la deuxième. Conserver un montant pour un achat futur illustre la troisième. Ces fonctions peuvent être remplies à des degrés différents. [1]'],
    ['Distinguer nominal et réel','Supposons qu’un panier coûte 50 € aujourd’hui et 55 € demain. Avec 110 €, on pouvait acheter 2,2 paniers et on en achète maintenant 2. La somme nominale n’a pas changé. Son pouvoir d’achat, mesuré dans ce panier, a diminué d’environ 9,1 %.'],
    ['Définir le panier','Une variation constatée sur un article ne suffit pas à mesurer tous les prix. Pour comparer plusieurs ménages, indiquez le contenu du panier, les quantités retenues et les comportements de substitution. Une estimation agrégée décrit un panier de référence et peut s’écarter de l’expérience individuelle.'],
    ['Comprendre la réserve de valeur','Conserver de la monnaie facilite un achat futur, mais la quantité de biens qu’elle permet d’obtenir dépend des prix. Lorsqu’on compare deux dates, exprimez explicitement le montant nominal et son équivalent dans le panier de référence.']
  ],
  diagram:['Les trois fonctions',['Situation','Fonction'],[['Payer un repas','Intermédiaire des échanges.'],['Afficher son prix en euros','Unité de compte.'],['Mettre de côté pour demain','Réserve de valeur.']]],
  dossier:'Dans [1], repérez les trois fonctions décrites, puis inventez un exemple où l’une est moins bien remplie que les autres.',
  activity:'Un panier passe de 80 € à 100 €. Calculez combien de paniers on achète avant et après avec 200 €, puis la variation relative.',
  correction:'On passe de 2,5 à 2 paniers. La variation de pouvoir d’achat mesurée en paniers vaut (2 − 2,5)/2,5 = −20 %. La hausse du prix est de 25 %, car les bases de comparaison diffèrent.',
  quiz:['Comparer deux prix affichés dans la même monnaie mobilise surtout…',['l’unité de compte.','la réserve de valeur.','la vitesse de circulation.'],0,'Une même unité permet de comparer les prix.'],
  seminar:'Comment choisir un panier qui rende la comparaison pertinente pour deux ménages aux habitudes différentes ?',
  review:'À J+2, retrouvez les trois fonctions. À J+7, expliquez la différence entre 25 % de hausse du prix et 20 % de baisse du pouvoir d’achat.',
  sources:[['M. McLeay, A. Radia et R. Thomas · Bank of England','Money in the modern economy: an introduction','2014','https://www.bankofengland.co.uk/-/media/boe/files/quarterly-bulletin/2014/money-in-the-modern-economy-an-introduction','Discussion des fonctions de la monnaie. Le cours reprend ce cadre pour un calcul fictif.']]
});

mandarinLessons.push({
  id:'han', title:'Civilisation chinoise · Des Qin aux Han',
  goal:'Comparer une continuité administrative et un changement politique en lisant deux notices de musée.',
  prerequisite:'Avoir suivi « Qin et l’échelle impériale ».',
  sections:[
    ['Situer la transition','Le Smithsonian situe la dynastie Qin entre 221 et 206 avant notre ère, puis les Han de 206 avant notre ère à 220 de notre ère. Ces bornes servent à classer les périodes. La transition politique comprend des conflits après la mort du premier empereur Qin, et la dynastie Han connaît elle-même une interruption. [1, 2]'],
    ['Examiner continuités et ruptures','L’unification sous Qin donne à voir une nouvelle échelle d’administration. Étudier la succession Han suppose de distinguer cette échelle, les pratiques retenues et les décisions propres au nouveau pouvoir. Une dynastie change de nom alors que certains agents, règles ou équipements peuvent être conservés. Toute continuité précise demande un exemple attesté. [1, 2]'],
    ['Lire un objet funéraire','Une pièce associée à une sépulture renseigne d’abord sur le contexte dans lequel elle a été déposée. Pour étudier la société Han, comparez ce contexte à des ensembles de provenance et de statuts différents. Une tombe richement dotée peut montrer des possibilités techniques et des pratiques funéraires, avec une portée plus limitée pour le quotidien ordinaire. [2]'],
    ['Retenir deux expressions','秦朝 Qíncháo désigne la dynastie Qin et 汉朝 Hàncháo la dynastie Han. 朝 cháo garde ici le sens de dynastie. Comparez les tons de Qín et Hàn et associez chaque graphie à son repère chronologique.']
  ],
  diagram:['Deux jalons à comparer',['Dynastie','Repère et question'],[['Qin','221–206 avant notre ère : comment administrer le territoire unifié ?'],['Han','206 avant notre ère–220 de notre ère : quels usages se transforment dans la durée ?']]],
  dossier:'Comparez [1] et [2]. Relevez une phrase sur l’administration et sélectionnez un objet de la page Han. Distinguez ce que montre l’objet, ce que précise la notice et ce que vous inférez.',
  activity:'Rédigez une notice de 200 mots. Situez l’objet, donnez une hypothèse sur sa fonction et formulez une limite à l’interprétation.',
  correction:'Reprenez la date et la provenance selon l’institution, puis décrivez deux traits observables. Si vous interprétez la fonction à partir du contexte funéraire, expliquez le lien. Une généralisation aux pratiques ordinaires exigerait des objets trouvés dans d’autres types de sites.',
  quiz:['Quelle conclusion une tombe bien documentée permet-elle de soutenir en priorité ?',['Une pratique attestée dans ce contexte.', 'Une règle identique pour tous les Han.','L’absence de différences sociales.'],0,'La source donne un exemple situé. La généralisation appelle une comparaison entre sites et statuts.'],
  seminar:'Comment démontrer une continuité à partir de deux objets distants dans le temps et l’espace ?',
  review:'À J+2, lisez 秦朝 et 汉朝. À J+7, restituez les deux chronologies et les limites d’un objet funéraire.',
  sources:[qin,['Smithsonian National Museum of Asian Art','Han Dynasty (206 BCE–220 CE)','s. d.','https://asia.si.edu/education/educator-resources/teaching-china-with-the-smithsonian/explore-by-dynasty/han-dynasty/','Chronologie, contexte politique et ressources sur les objets Han.']]
});
