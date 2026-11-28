function consolidationLesson(id, title, goal, sections, activity, correction, quiz, source) {
  return {
    id, title, goal, sections, activity, correction, quiz, sources:[source],
    prerequisite:'Avoir commencé le parcours et savoir distinguer une observation d’une interprétation.',
    dossier:'Lis le passage indiqué en [1]. Identifie la proposition principale, puis compare-la avec l’exemple construit dans la leçon.',
    seminar:'Défends ta réponse, puis formule une objection précise et réexamine la conclusion.',
    review:'À J+2, refais le raisonnement sans le corrigé. À J+7, transpose-le à un autre exemple.'
  };
}

philosophie.push(
  consolidationLesson('aristote','Aristote · Apprendre à bien agir','Expliquer comment un exercice répété peut former une disposition, puis examiner une limite de cette idée.',[
    ['Former des dispositions','Aristote distingue des vertus intellectuelles et des vertus de caractère. Une disposition de caractère se forme par les actions répétées. Apprendre à agir en situation implique d’éprouver des choix et des réactions, à la manière dont une capacité pratique se construit par l’exercice. [1]'],
    ['Choisir en situation','La mesure appropriée dépend de la situation et du type d’action. Le courage se comprend entre fuite excessive et témérité, sans qu’une moyenne arithmétique donne le comportement à adopter. Le jugement doit prendre en compte le danger, le but et les personnes concernées. [1]'],
    ['Distinguer répétition et apprentissage','Un geste répété sous la contrainte peut rester automatique. Pour discuter sa valeur morale, demandez si la personne comprend les raisons et peut agir d’une manière adaptée lorsque les circonstances changent.']
  ],'Proposez deux formes d’apprentissage du courage. Indiquez la différence entre répétition et jugement.',
  'Un entraînement prépare des réactions rapides. Des scénarios contrastés apprennent à distinguer courage et témérité, par exemple selon le rapport entre le risque assumé et ce qui peut réellement être protégé.',
  ['Pourquoi une moyenne numérique ne suffit-elle pas à déterminer l’acte courageux ?',['Tout risque est identique.','La réponse dépend du danger et du but de l’action.','Le courage est une formule de calcul.'],1,'Le jugement porte sur ce qu’il convient de faire dans une situation concrète.'],
  ['Stanford Encyclopedia of Philosophy','Aristotle’s Ethics','s. d.','https://plato.stanford.edu/entries/aristotle-ethics/','Vertus de caractère, formation habituelle et doctrine du milieu.']),
  consolidationLesson('descartes','Descartes · Douter pour examiner ses raisons','Distinguer doute méthodique, suspension du jugement et affirmation de la pensée.',[
    ['Un doute orienté','Dans les Méditations, le doute sert à examiner les fondations d’une connaissance. La possibilité de se tromper sur un type de jugement donne une raison de suspendre son assentiment. Elle ne suffit pas à conclure que toutes les propositions de ce type sont fausses. [1]'],
    ['Éprouver une certitude','Le doute lui-même est une forme de pensée. Même lorsqu’il met en cause ce qu’il croit percevoir, le sujet qui doute ne peut, au moment où il pense, douter de la même façon du fait qu’il pense. Le statut exact de cette certitude fait l’objet de lectures philosophiques. [1]'],
    ['Limiter la conclusion','Cette étape ne garantit pas directement la vérité du monde perçu ni celle de chaque souvenir. Comparez la certitude qu’un acte a lieu et la fiabilité de son contenu.']
  ],'Expliquez en 150 mots la différence entre « je peux me tromper sur la pièce où je me trouve » et « je pense que je suis dans cette pièce ».',
  'La première proposition porte sur l’accord de la perception avec le monde. La seconde permet de reconnaître un acte présent de pensée, même si son contenu concernant la pièce est erroné.',
  ['Que met en évidence le doute actuel ?',['La vérité de chaque perception.','L’acte présent de penser.','La disparition du corps.'],1,'L’acte est reconnu au moment où l’erreur sur son contenu reste envisageable.'],
  ['Stanford Encyclopedia of Philosophy','Descartes’ Epistemology','s. d.','https://plato.stanford.edu/entries/descartes-epistemology/','Doute méthodique et statut du cogito.']),
  consolidationLesson('kant','Kant · Tester la maxime de son action','Formuler une maxime et discuter l’idée de sa généralisation.',[
    ['Du geste à la maxime','Décrire un geste ne suffit pas à formuler sa règle. Une maxime associe une circonstance, une action et une fin. Dans un exemple de promesse, je peux emprunter en promettant de rembourser alors que je prévois de ne pas tenir cet engagement, pour obtenir ce dont j’ai besoin. [1]'],
    ['Tester la règle','L’examen par universalisation demande ce qui adviendrait si chacun pouvait agir selon cette maxime dans les mêmes circonstances. Dans l’exemple de la fausse promesse, l’efficacité du geste repose sur une confiance que la règle généralisée contribuerait à défaire. [1]'],
    ['Discuter la formulation','Une maxime trop particulière peut masquer la raison que l’on invoque réellement. Comparez une formulation centrée sur votre nom ou la date avec une formulation qui exprime votre objectif et les circonstances pertinentes.']
  ],'Inventez une maxime portant sur une promesse. Comparez promesse sincère et promesse instrumentale, puis justifiez votre jugement.',
  'La promesse sincère impose une obligation dont l’auteur accepte les conséquences. La promesse instrumentale exploite la confiance tout en prévoyant de la trahir. Une formulation solide précise à quelles conditions l’usage de cette confiance reste possible.',
  ['Quelle question correspond au test étudié ?',['Combien coûte l’action ?','Puis-je vouloir que cette maxime fasse règle pour tous dans ces circonstances ?','Qui est le plus fort ?'],1,'Le test porte sur la possibilité de vouloir la règle comme loi universelle.'],
  ['OpenStax','Introduction to Philosophy · Deontology','2022','https://openstax.org/books/introduction-philosophy/pages/9-3-deontology','Impératif catégorique et universalisation des maximes.']),
  consolidationLesson('nietzsche','Nietzsche · Interroger la généalogie des valeurs','Distinguer une enquête sur l’origine d’une valeur de l’évaluation de sa validité.',[
    ['Changer la question','La généalogie demande comment des manières de juger sont apparues, se sont transformées et sont devenues convaincantes. Elle invite à regarder les usages et fonctions d’une règle en plus des raisons déclarées en sa faveur. [1]'],
    ['Comparer explication et justification','Expliquer pourquoi une valeur s’est imposée n’en établit pas la validité. Une origine située peut éclairer sa portée et ses fonctions. Pour critiquer la valeur actuelle, il faut montrer le lien entre cette histoire et un critère d’évaluation.'],
    ['Lire une hypothèse historique','Demandez quels documents permettraient de comparer l’histoire proposée et une histoire concurrente. Les effets psychologiques et les fonctions sociales attribués à une règle réclament des preuves différentes. [1]']
  ],'Analysez la règle fictive « il faut toujours montrer son endurance ». Proposez une origine plausible et une raison de la modifier aujourd’hui.',
  'Une activité collective dangereuse pourrait expliquer une valorisation de l’endurance. La modifier aujourd’hui peut se justifier si elle incite à cacher une blessure. L’explication historique et l’argument contemporain doivent être défendus séparément.',
  ['Une enquête généalogique demande notamment…',['comment une valeur devient persuasive dans un contexte.', 'comment calculer sa moyenne.', 'comment prouver qu’elle a toujours existé.'],0,'L’enquête porte sur la formation et les fonctions des jugements.'],
  ['Stanford Encyclopedia of Philosophy','Friedrich Nietzsche','s. d.','https://plato.stanford.edu/entries/nietzsche/','Généalogie des valeurs et critique de la morale.'])
);

litterature.push(
  consolidationLesson('tragedie','Tragédie · Antigone face à Créon','Montrer comment le dialogue organise la confrontation de deux autorités.',[
    ['Situer l’interrogatoire','Créon interroge Antigone après l’ensevelissement de Polynice. Le dialogue distingue le geste, la connaissance de l’interdiction et la justification de la transgression. Relisez les changements de tour en identifiant ce que chaque personnage tente d’établir. [1]'],
    ['Comparer les raisons','Créon invoque son décret et son autorité. Antigone soutient que d’autres obligations méritent priorité. La confrontation dramatique apparaît dans la succession des questions et des réponses autant que dans le contenu des positions. [1]'],
    ['Distinguer lecture et verdict','Terminer l’analyse en déclarant quel personnage a raison laisse ouverte la question de la forme. Expliquez comment la scène fait entendre la fermeté des positions et quelles conséquences l’interrogatoire prépare.']
  ],'Comparez une question de Créon et une réponse d’Antigone. Montrez où le débat passe d’un fait à un conflit de normes.',
  'La reconnaissance du geste établit un fait dans la scène. La discussion se déplace lorsque l’on examine ce qui autorise ou oblige à agir malgré le décret. Relevez l’expression par laquelle Antigone distingue les autorités.',
  ['Qu’est-ce qui marque le passage au conflit de normes ?',['La seule reconnaissance du geste.','La discussion sur l’autorité du décret face à une autre obligation.','Le titre de la pièce.'],1,'La scène ne porte plus seulement sur ce qui s’est produit, mais sur ce qui rend l’acte défendable.'],
  ['Sophocle, trad. Richard Jebb','Antigone · vers 441 et suivants','s. d. pour cette édition','https://beta.perseus.tufts.edu/urn%3Acts%3AgreekLit%3Atlg0011.tlg002.perseus-eng2/card%3A441/','Interrogatoire d’Antigone par Créon dans la collection Perseus.']),
  consolidationLesson('heian','Textes asiatiques · Lire une voix de la cour de Heian','Relier une observation littéraire à son contexte sans généraliser à toute une société.',[
    ['Situer les textes','Le dossier de Columbia situe les lettres et les œuvres de cour dans le Japon de l’époque de Heian. Il présente entre autres les Notes de chevet et le Dit du Genji. Les genres et les positions des auteurs ou narrateurs orientent ce qu’ils choisissent de rendre visible. [1]'],
    ['Lire une sélection','Choisissez un passage proposé par le dossier. Relevez deux éléments que la voix choisit de décrire et une relation qu’elle suppose connue de son public. Décrire un geste ou un détail vestimentaire peut signaler une convention sociale, mais l’interprétation dépend de la situation du texte.'],
    ['Limiter la généralisation','Une œuvre écrite pour un milieu de cour renseigne sur des choix d’écriture et un contexte particulier. Pour étudier d’autres groupes, mobilisez des archives et auteurs dont la situation est différente.']
  ],'Sélectionnez un détail dans une lecture du dossier. Expliquez ce qu’il peut documenter et formulez une limite.',
  'Précisez d’abord le texte et le passage. Reliez ensuite le détail à la voix, au genre et au contexte. Une préférence ou un rite de cour ne peut être étendu sans preuves à toutes les populations du Japon.',
  ['Quel contrôle est le plus pertinent avant de généraliser ?', ['Identifier le milieu et le genre du texte.','Compter uniquement les mots du titre.','Ne garder que sa traduction française.'],0,'Le milieu et le genre déterminent une partie du point de vue documenté.'],
  ['Columbia University · Asia for Educators','Literature of the Heian Period','s. d.','https://www-1.gsb.columbia.edu/special/japan_600ce_heian.htm','Contexte de lecture et ressources sur la littérature de Heian.'])
);

psychologie.push(
  consolidationLesson('emotions','Émotions · Séparer indices et expérience','Distinguer un signal corporel, une interprétation et un rapport subjectif.',[
    ['Une description à plusieurs niveaux','Une émotion peut être étudiée à partir de réactions corporelles, de l’expérience rapportée et de l’évaluation de la situation. Les théories comparées dans la lecture diffèrent notamment sur la place et l’ordre de ces processus. [1]'],
    ['Éviter l’inférence immédiate','Une accélération cardiaque peut être compatible avec la peur, l’effort ou l’enthousiasme. Pour interpréter la mesure, ajoutez les circonstances, la réponse déclarée et d’autres observations qui pourraient aider à départager les hypothèses.'],
    ['Trouver une mesure distincte','Dans une étude fictive, réunir un indicateur physiologique et une autoévaluation permet de comparer deux niveaux de description. Se donner une question précise est nécessaire pour interpréter leurs divergences.']
  ],'Imaginez un indice corporel commun à deux situations émotionnelles différentes. Proposez une autre observation qui permettrait de les distinguer.',
  'Une accélération du rythme cardiaque avant une prise de parole peut être associée à de l’inquiétude ou à de l’enthousiasme. Une autoévaluation et les éléments de contexte aident à différencier les interprétations.',
  ['Une mesure de fréquence cardiaque suffit-elle à identifier une émotion ?',['Oui, toujours.','Non, il faut des indices complémentaires.','Seulement si elle est écrite en majuscules.'],1,'La même mesure est compatible avec plusieurs interprétations.'],
  ['OpenStax','Psychology 2e · Emotion','2020','https://openstax.org/books/psychology-2e/pages/10-4-emotion','Composantes et théories de l’émotion.']),
  consolidationLesson('sociale','Psychologie sociale · Comprendre le conformisme','Comparer explication informationnelle et pression normative dans une situation fictive.',[
    ['Deux raisons de suivre un groupe','Quand une tâche est ambiguë, une personne peut penser que les autres disposent d’une meilleure information. Elle peut aussi connaître la réponse, mais suivre le groupe pour éviter le désaccord. Les deux mécanismes prédisent un comportement public similaire. [1]'],
    ['Choisir un contraste','Comparer une réponse donnée en public à une réponse anonyme aide à tester une pression liée au regard des autres. Rendez les deux situations aussi proches que possible : difficulté, temps, ordre des questions et présentation des réponses du groupe.'],
    ['Analyser les limites','Une différence entre public et privé peut renforcer une hypothèse normative, sans identifier automatiquement un seul mécanisme. Demandez aussi à chaque personne quel degré de confiance elle accordait au groupe.']
  ],'Concevez un test comparant réponse publique et anonyme. Donnez une prédiction et un facteur qui pourrait la brouiller.',
  'Si la pression normative joue, l’anonymat peut réduire l’alignement sur un avis majoritaire erroné. Il faut contrôler notamment la difficulté et la confiance dans les réponses du groupe.',
  ['Quel résultat rend plausible une pression normative ?', ['Plus d’alignement lorsque la réponse est publique.','Un nombre identique de questions.','La présence d’une horloge.'],0,'L’écart est compatible avec une préoccupation accrue pour le jugement d’autrui.'],
  ['OpenStax / CUNY Pressbooks','Social Psychology · Conformity, Compliance, and Obedience','s. d.','https://pressbooks.cuny.edu/openstaxpsychologynycctversion2ndedition/chapter/social-psychology/','Conformisme et influence sociale normative ou informationnelle.'])
);

economicsLessons.push(
  consolidationLesson('crises','Crises · Décrire une panique bancaire','Reconstruire le mécanisme d’une panique et distinguer liquidité et solvabilité dans un modèle.',[
    ['De la ressource au besoin immédiat','Une banque peut détenir des actifs dont le remboursement est prévu plus tard et devoir honorer des demandes immédiates. Si un grand nombre de déposants désirent retirer leurs fonds simultanément, l’accès rapide à la liquidité devient déterminant.'],
    ['Comparer deux états','Une institution peut manquer de liquidité alors que la valeur de ses actifs suffit à couvrir ses engagements. Dans un autre cas, ses actifs valent moins que ses engagements. Pour distinguer les deux, comparez l’échéancier de paiement et la valeur estimée des actifs.'],
    ['Replacer le mécanisme dans une crise','Les paniques bancaires américaines du début des années 1930 donnent des épisodes à étudier. Une baisse de confiance, des retraits et des conséquences macroéconomiques y interagissent. Décrire un mécanisme ne suffit pas à expliquer en bloc toute la Grande Dépression. [1]']
  ],'Une banque fictive possède 10 en caisse et 100 de prêts évalués à échéance, pour 90 d’engagements. Elle reçoit 25 de demandes immédiates. Quel diagnostic est le plus directement soutenu ?',
  'La banque manque de 15 en caisse pour répondre immédiatement. Sur les valeurs indiquées, ses actifs de 110 dépassent les engagements de 90. L’information soutient un problème de liquidité. Une autre estimation des prêts pourrait changer le diagnostic de solvabilité.',
  ['Quelle information teste directement la liquidité immédiate ?', ['Caisse et paiements à régler maintenant.','Nombre de lettres du nom de la banque.','Population du siècle précédent.'],0,'Le besoin de paiement à court terme se compare aux fonds mobilisables sur le même horizon.'],
  ['Federal Reserve History','The Great Depression · Banking Panics of 1930–31','s. d.','https://www.federalreservehistory.org/time-period/great-depression','Repères historiques sur les paniques bancaires américaines.'])
);

mandarinLessons.push(
  consolidationLesson('caracteres','Mandarin · Reconnaître des composants de caractères','Identifier des formes dans un caractère et vérifier lecture et sens dans un lexique.',[
    ['Observer la forme','Comparez 好 hǎo et 妈 mā. Les deux montrent le composant 女 à gauche, tandis que la partie droite diffère. Cette comparaison visuelle aide à reconnaître la structure sans deviner automatiquement ni la lecture ni le sens. [1]'],
    ['Relier graphie et usages','好 hǎo peut servir dans 你好 nǐ hǎo, « bonjour ». 妈 mā apparaît dans 妈妈 māma, « maman ». Associez à chaque forme un mot qui montre son emploi. Recopiez la syllabe, le ton et le caractère ensemble. [1]'],
    ['Relire un dialogue','Imaginez une personne qui vous salue et donne son nom. Identifiez le pronom et le verbe avant de traiter le nom propre. Pour réutiliser la phrase, remplacez uniquement le nom et gardez la structure.']
  ],'Préparez deux fiches pour 好 et 妈 : graphie, lecture, composant commun et un mot d’exemple. Puis écrivez une salutation en pinyin.',
  '好 : hǎo, composant commun 女, exemple 你好. 妈 : mā, composant commun 女, exemple 妈妈. Salutation : Nǐ hǎo!',
  ['Quel élément partagent 好 et 妈 ?', ['Le caractère complet.','Le composant 女.','Le ton de leur lecture.'],1,'Les deux caractères contiennent 女, mais sont lus avec des tons différents.'],
  ['Julian K. Wheatley · MIT OpenCourseWare','Learning Chinese · Part I and Character Lessons 1–3','2011','https://ocw.mit.edu/courses/res-21g-003-learning-chinese-a-foundation-course-in-mandarin-spring-2011/pages/online-textbook/part-i-introduction-units-1-4-character-lessons-1-3/','Leçons de caractères, pinyin, audio et exercices.'])
);

const psychologyGuides = {
  methodes: {
    question: 'Si les personnes qui étudient dans un lieu réussissent mieux, comment savoir si le lieu y contribue ?',
    quiz: 2,
    lesson: 'Une variable de confusion est un facteur qui peut contribuer à la fois à l’exposition et au résultat. Le fait de tirer au sort le lieu d’étude limite les différences systématiques entre groupes en moyenne. Il faut encore définir le résultat à mesurer, vérifier le protocole et éviter de confondre l’effet du lieu sur une tâche avec son effet sur toutes les notes. [1]',
    caseText: 'Dans un relevé fictif, les personnes qui étudient souvent à la bibliothèque réussissent 8 items sur 10 en moyenne, contre 6 sur 10 pour les autres. Le lieu était choisi librement. Les groupes peuvent aussi différer par leur motivation et leur temps de travail.',
    task: 'Proposez un protocole sur le lieu d’étude. Définissez l’exposition, la mesure, le rôle du tirage au sort et une limite. Utilisez une tâche volontaire sans impact sur les notes.',
    answer: 'On peut répartir par tirage au sort des volontaires entre deux lieux, garder la même durée et le même matériel, puis administrer le même test. Le tirage au sort réduit la possibilité que la motivation initiale explique à elle seule une différence. Un écart resterait propre aux lieux, aux volontaires et à la tâche étudiés.',
    synthesis: 'Une association motive une hypothèse. Une expérience compare des conditions manipulées et limite les explications concurrentes. Chaque conclusion garde le périmètre de sa mesure.',
    terms: [['Affectation aléatoire','Attribution des conditions par tirage au sort.'],['Variable de confusion','Facteur lié à l’exposition et susceptible d’influencer le résultat.'],['Indicateur observable','Mesure concrète retenue pour étudier un phénomène.']]
  },
  perception: {
    question: 'Comment tester l’effet du contexte lorsqu’un signal peut recevoir deux interprétations ?',
    quiz: 1,
    lesson: 'Dans un traitement ascendant, les traits du stimulus contribuent à l’interprétation. Dans un traitement descendant, les attentes et le contexte orientent la lecture de ces traits. Une réponse choisie peut toutefois refléter une stratégie de réponse. Pour distinguer ces possibilités, il faut préciser les consignes, les mesures et les limites de la comparaison. [1]',
    caseText: 'Résultats fictifs. Un même symbole est catégorisé comme lettre par 16 personnes sur 20 entre A et C et par 5 sur 20 entre 12 et 14. Une moitié voit d’abord les lettres, l’autre d’abord les nombres. Les résultats par ordre restent nécessaires pour vérifier le rôle de la première présentation.',
    task: 'Proposez une comparaison qui distingue l’effet du contexte visuel et celui d’une consigne. Indiquez un résultat attendu et ce que la réponse finale laisse indéterminé.',
    answer: 'Croiser contexte lettres ou nombres et consigne neutre ou suggestive, en conservant le symbole identique et en variant l’ordre. Un écart entre contextes sous consigne neutre soutient leur effet. Si seules les consignes changent les réponses, elles peuvent orienter la décision sans que la perception elle-même ait changé.',
    synthesis: 'Maintenir le signal constant permet de tester le contexte. Contrebalancer l’ordre et surveiller la consigne aide à isoler les causes possibles des réponses.',
    terms: [['Sensation','Détection d’une stimulation par les récepteurs.'],['Perception','Organisation et interprétation d’informations sensorielles.'],['Contrebalancement','Variation de l’ordre des conditions entre participants.']]
  },
  memoire: {
    question: 'Quelle comparaison permet de savoir ce qui reste en mémoire après un délai ?',
    quiz: 0,
    lesson: 'Une impression de facilité pendant la révision et une performance à un test différé répondent à des questions différentes. Pour isoler l’effet du rappel actif, choisissez un délai commun, des supports comparables et un test final identique. Répartir les listes et l’ordre entre participants limite leur confusion avec la stratégie étudiée. [1]',
    caseText: 'Étude authentique [1]. Karpicke et Roediger ont comparé des conditions d’étude et de rappel répété sur des paires de mots en swahili et en anglais. Au test final une semaine plus tard, les conditions conservant le rappel répété ont mieux réussi que celles où les items correctement rappelés étaient retirés des tests suivants. La tâche et le délai délimitent la portée de ce résultat. L’exercice du cours utilise séparément des données fictives.',
    task: 'Construisez une expérience qui compare relecture et rappel actif. Proposez un test différé et expliquez comment limiter l’effet de l’ordre et de la difficulté des supports.',
    answer: 'Prévoir deux listes comparables et alterner leur attribution aux stratégies et leur ordre. Garder la durée, le délai et la forme du test final identiques. Comparer les proportions d’items rappelés. Présenter la différence comme liée au protocole testé, puis proposer une réplication avec un autre contenu.',
    synthesis: 'Un essai sur la mémoire distingue entraînement et mesure finale. Le test différé et les contrôles rendent la comparaison interprétable.',
    terms: [['Rappel actif','Restitution d’une information sans consulter sa réponse.'],['Rétention différée','Performance mesurée après un délai défini.'],['Point de pourcentage','Différence arithmétique entre deux pourcentages.']]
  },
  emotions: {
    question: 'Que peut-on conclure d’un même changement corporel dans deux situations différentes ?',
    quiz: 1,
    lesson: 'Un signal physiologique, l’évaluation de la situation et le vécu déclaré sont des mesures distinctes. Une mesure corporelle identique n’implique pas une expérience identique. Les théories de l’émotion diffèrent par la place qu’elles donnent à ces composantes. Une simple comparaison d’observations ne tranche pas leur ordre causal. [1]',
    caseText: 'Exemple fictif. Deux élèves présentent la même augmentation du rythme cardiaque avant de parler en public. L’une décrit une appréhension et l’autre de l’enthousiasme. Le rythme cardiaque, la tâche et le ressenti ne sont pas trois mesures du même type.',
    task: 'Proposez un tableau de trois observations qui permettrait de comparer ces expériences. Pour chaque observation, expliquez ce qu’elle peut apporter et ce qui resterait incertain.',
    answer: 'Relever un changement de rythme décrit un indice corporel. Une autoévaluation de l’expérience apporte le point de vue de la personne. Demander comment elle anticipe l’événement renseigne sur son interprétation. L’ensemble aide à décrire les différences mais ne démontre pas que l’une des composantes cause les autres.',
    synthesis: 'L’étude d’une émotion gagne à croiser situation, mesure et expérience déclarée. Une explication causale demande des observations ou des comparaisons supplémentaires.',
    terms: [['Indice physiologique','Mesure d’un aspect du fonctionnement corporel.'],['Autoévaluation','Appréciation qu’une personne donne de sa propre expérience.'],['Évaluation de la situation','Interprétation de la situation pour la personne concernée.']]
  },
  sociale: {
    question: 'Suivre un groupe implique-t-il de croire qu’il a raison ?',
    quiz: 1,
    lesson: 'L’influence informationnelle tient au crédit accordé aux réponses d’autrui. L’influence normative tient aux attentes sociales et à l’anticipation de leur jugement. Les deux influences peuvent coexister. Comparer une réponse publique et une réponse anonyme est informatif si les indices disponibles et la difficulté sont comparables. [1]',
    caseText: 'Données fictives. Face au même avis majoritaire erroné, 12 personnes sur 20 s’alignent en public et 5 sur 20 en réponse anonyme. Les deux groupes reçoivent les mêmes questions. La confiance initiale dans le groupe n’a pas été mesurée.',
    task: 'Comparez les réponses et proposez un contrôle pour départager les explications normative et informationnelle. Formulez une conclusion prudente.',
    answer: 'L’alignement est plus fréquent en public (60 % contre 25 %, soit 35 points). Le contraste est compatible avec une pression normative. On peut aussi mesurer la confiance initiale et varier la fiabilité annoncée de la majorité tout en gardant la difficulté constante. Le résultat fictif ne démontre pas que l’influence informationnelle était absente.',
    synthesis: 'Un comportement similaire peut avoir plusieurs explications. Modifier un facteur à la fois et recueillir des indices supplémentaires aide à les départager.',
    terms: [['Conformisme','Alignement d’un comportement ou d’un jugement sur celui du groupe.'],['Influence normative','Alignement lié aux attentes ou au jugement social.'],['Influence informationnelle','Alignement lié au crédit donné aux informations du groupe.']]
  }
};

for (const lesson of psychologie) {
  const guide = psychologyGuides[lesson.id];
  const sourceTask = lesson.dossier;
  lesson.diagram ||= ['Repères pour analyser le cas', ['Notion','Définition'], guide.terms];
  lesson.overview = guide.question;
  lesson.plan = [[0,'Comprendre les notions'],[2,'Construire et interpréter une comparaison'],[4,'Synthèse et glossaire']];
  lesson.sections.push(
    ['Application et limites',guide.lesson],
    ['Synthèse et glossaire',guide.synthesis+' '+guide.terms.map(([term,definition])=>term+' — '+definition).join(' ')]
  );
  lesson.dossier = guide.caseText;
  lesson.research = sourceTask+' Proposez une variante qui permet de départager deux explications. Précisez les résultats attendus et les limites.';
  lesson.seminar = guide.task;
  lesson.assessmentGuide = {
    quiz: guide.quiz,
    exercise: [0,1,2,3],
    seminar: [1,2,3],
    rubric: ['5 points · Distinguer les notions et préciser la question.','6 points · Justifier la comparaison et les mesures retenues.','5 points · Interpréter les résultats ou préciser une prédiction.','4 points · Discuter une explication concurrente ou une limite.'],
    answer: guide.answer
  };
  lesson.flashcards ||= [];
  lesson.flashcards.push(
    ...guide.terms.map(([term,definition])=>['Que signifie « '+term.toLowerCase()+' » ?',definition]),
    [guide.question,guide.synthesis]
  );
  lesson.revision = (lesson.revision ?? 1) + 1;
}

const retrievalStudy = psychologie.find(lesson=>lesson.id==='memoire').sources[0];
retrievalStudy[3] = 'https://learninglab.psych.purdue.edu/downloads/2008/2008_Karpicke_Roediger_Science.pdf';
retrievalStudy[4] = 'Article original publié dans Science, copie consultable à Purdue University. DOI 10.1126/science.1152408, anglais, consulté le 28/11/2026.';
