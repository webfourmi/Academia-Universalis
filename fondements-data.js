const coreEconomy = ['OpenStax', 'Principles of Economics 2e · Choices under scarcity', '2017', 'https://openstax.org/books/principles-economics-2e/pages/2-key-concepts-and-summary', 'Contrainte budgétaire, arbitrages et raisonnement marginal.'];
const markets = ['OpenStax', 'Principles of Economics 3e · Demand, Supply, and Equilibrium', '2022', 'https://openstax.org/books/principles-economics-3e/pages/3-1-demand-supply-and-equilibrium-in-markets-for-goods-and-services', 'Équilibre et lecture des courbes.'];
const argumentation = ['OpenStax', 'Introduction to Philosophy · Arguments', '2022', 'https://openstax.org/books/introduction-philosophy/pages/5-3-arguments', 'Prémisses, validité et arguments inductifs.'];
const mandarin = ['Julian K. Wheatley · MIT OpenCourseWare', 'Learning Chinese · Sounds and Symbols: An Overview of Pinyin', '2011', 'https://ocw.mit.edu/courses/res-21g-003-learning-chinese-a-foundation-course-in-mandarin-spring-2011/01af9a25b804b7d58a26fa580691df4f_MITRES_21G_003S11_pinyin.pdf', 'Notation des sons et des tons du mandarin standard.'];
const qin = ['Smithsonian National Museum of Asian Art', 'Qin Dynasty (221–206 BCE)', 's. d.', 'https://asia.si.edu/education/educator-resources/teaching-china-with-the-smithsonian/explore-by-dynasty/qin-dynasty/', 'Conquête et administration impériale.'];

const economicsLessons = [
  {
    id: 'arbitrages', title: 'Choisir sous contrainte',
    goal: 'Calculer un coût d’opportunité et justifier une décision à la marge.',
    prerequisite: 'Opérations arithmétiques simples.',
    sections: [
      ['Identifier les options', 'Un coût d’opportunité est la valeur de la meilleure option à laquelle on renonce. Si trois activités sont possibles au même moment, on compare l’activité choisie à la meilleure alternative réalisable. Additionner les deux alternatives reviendrait à supposer qu’on pouvait les exercer ensemble.'],
      ['Raisonner à la marge', 'Une décision sur une heure de travail supplémentaire se juge à partir de son bénéfice et de son coût supplémentaires. Même si les trois premières heures de travail étaient très productives, la quatrième peut rapporter moins que ce qu’apporterait une heure de repos.'],
      ['Poser un modèle', 'Le résultat dépend des options, de la contrainte et du critère retenu. Des gains en euros, du temps libre et de la fatigue ne s’additionnent pas sans convention. Précisez l’unité de comparaison et les éléments laissés hors du calcul.']
    ],
    diagram: ['Une heure disponible', ['Option', 'Valeur fictive'], [['Tutorat', '22 €'], ['Traduction', '18 €'], ['Saisie', '12 €']]],
    dossier: 'Dans [1], repérez une situation où le budget réduit l’ensemble des choix possibles. Identifiez l’option sacrifiée à la marge.',
    activity: 'Dans le tableau, calculez le coût d’opportunité du tutorat. Si le tutorat entraîne 6 € de trajet et les autres options aucun frais, que choisissez-vous sur le seul critère monétaire ?',
    correction: 'Sans coût de trajet, la meilleure alternative au tutorat rapporte 18 €. Après prise en compte du trajet, le tutorat rapporte 16 € et la traduction devient le meilleur choix monétaire.',
    quiz: ['Quel montant désigne la meilleure alternative au tutorat avant frais ?', ['12 €', '18 €', '30 €'], 1, 'La traduction domine la saisie si les activités sont mutuellement exclusives.'],
    seminar: 'Qu’ajouteriez-vous au modèle pour tenir compte d’un objectif de formation ?',
    review: 'À J+2, refaites le calcul avec un trajet à 3 €. À J+7, trouvez un exemple sans argent.',
    sources: [coreEconomy]
  },
  {
    id: 'equilibre', title: 'Offre, demande et équilibre',
    goal: 'Calculer un prix d’équilibre et distinguer un mouvement sur une courbe de son déplacement.',
    prerequisite: 'Résoudre une équation du premier degré.',
    sections: [
      ['Lire les courbes', 'Une courbe de demande associe à chaque prix une quantité demandée en maintenant constants les autres facteurs du modèle. Une variation du seul prix change la quantité demandée le long de cette courbe. Un changement des préférences peut modifier la quantité demandée à chaque prix.'],
      ['Trouver le point commun', 'Avec Qd = 20 − 2P et Qs = 2P, l’équilibre vérifie 20 − 2P = 2P, donc P = 5 et Q = 10. À P = 4, la demande vaut 12 et l’offre 8. Le modèle indique un excès de demande de 4 unités.'],
      ['Interpréter avec prudence', 'Le modèle décrit un marché stylisé. Stocks, contrats, rationnement, délais et pouvoir de marché peuvent influer sur l’ajustement observé. L’équilibre n’indique pas qui bénéficie du marché ni si le résultat est souhaitable.']
    ],
    diagram: ['Quantités fictives', ['Prix', 'Demandée', 'Offerte'], [['4', '12', '8'], ['5', '10', '10'], ['6', '8', '12']]],
    dossier: 'Dans [1], vérifiez comment les auteurs définissent un excès d’offre et un excès de demande.',
    activity: 'Supposez que la demande devienne Qd = 24 − 2P. Recalculez le prix et la quantité et décrivez le changement de la courbe.',
    correction: '24 − 2P = 2P donne P = 6 et Q = 12. À chaque prix la quantité demandée est supérieure de quatre unités. La demande s’est déplacée et le nouvel équilibre se situe plus haut sur la courbe d’offre.',
    quiz: ['À P = 6 dans le tableau initial, l’excès d’offre est de…', ['2 unités', '4 unités', '6 unités'], 1, '12 unités offertes moins 8 demandées donnent 4.'],
    seminar: 'Que faudrait-il mesurer pour distinguer un choc de coûts d’un changement de préférences ?',
    review: 'À J+2, refaites le calcul de mémoire. À J+7, dessinez les courbes.',
    sources: [markets]
  },
  {
    id: 'institutions', title: 'Règles de marché et accès aux biens',
    goal: 'Séparer un résultat positif (ce qui se produit) d’un jugement normatif (ce qui devrait être).',
    prerequisite: 'Offre, demande et équilibre.',
    sections: [
      ['Modifier une règle', 'Considérons l’équilibre fictif P = 5, Q = 10 du cours précédent. Une règle qui fixe un prix maximum à 4 rend la contrainte active dans ce modèle. Elle crée un excès de demande de 4 unités si les courbes sont maintenues et si les échanges respectent le plafond.'],
      ['Décrire l’allocation', 'Quand les demandes dépassent l’offre, le prix officiel ne suffit plus à dire qui reçoit le bien. File d’attente, critères administratifs ou accès privilégié peuvent déterminer les bénéficiaires. Il faut mesurer à la fois le prix, la quantité réellement obtenue et les coûts d’accès.'],
      ['Évaluer une proposition', 'Un prix affiché plus bas et un accès plus équitable sont deux résultats distincts. Juger l’équité exige un critère explicite, par exemple la priorité aux personnes les plus dépendantes du bien, et des données sur sa mise en œuvre.']
    ],
    diagram: ['Évaluer une règle', ['Dimension', 'Indicateur'], [['Prix', 'Prix payé.'], ['Accès', 'Quantité et temps d’attente.'], ['Répartition', 'Bénéficiaires par groupe.']]],
    dossier: 'Utilisez le modèle de [1] pour comparer prix d’équilibre et excès de demande. Explicitez les hypothèses que vous maintenez.',
    activity: 'Écrivez deux critères pour comparer une file d’attente et l’attribution sur dossier, puis proposez une mesure pour chacun.',
    correction: 'On peut comparer le temps d’accès et la part de bénéficiaires appartenant à un groupe prioritaire. La première mesure demande des temps observés, la seconde des critères et des effectifs. Les conclusions peuvent diverger selon le critère.',
    quiz: ['Quel indicateur renseigne directement sur le rationnement ?', ['Le nombre de demandes non satisfaites.', 'Le nom de la règle.', 'L’unité monétaire.'], 0, 'Le rationnement se manifeste dans l’accès effectif au bien.'],
    seminar: 'Peut-on juger une règle en comparant seulement les prix affichés ?',
    review: 'À J+2, séparez une prédiction d’un jugement. À J+7, critiquez une affirmation sur le prix et l’accès.',
    sources: [markets]
  }
];

const logicLessons = [
  {
    id: 'premisses', title: 'Reconstruire un argument',
    goal: 'Identifier une conclusion, une prémisse explicite et une prémisse implicite.',
    prerequisite: 'Aucun.',
    sections: [
      ['Repérer le rôle de chaque phrase', 'Une conclusion est la proposition que l’auteur cherche à soutenir. Une prémisse est mobilisée comme raison de l’accepter. L’ordre des phrases et les mots comme « donc » sont des indices. La question décisive est ce que l’auteur veut faire admettre.'],
      ['Restaurer une étape implicite', '« Cette source a été rétractée, donc je ne l’utiliserai pas seule pour soutenir la conclusion. » Une règle plausible est qu’une source rétractée ne suffit pas à établir une conclusion sans corroboration. Cette reconstruction garde visible la possibilité d’autres sources.'],
      ['Reformuler puis évaluer', 'La première étape consiste à restituer le raisonnement de façon fidèle. La deuxième examine les raisons de croire les prémisses et leur lien avec la conclusion. Une bonne objection précise quelle étape elle conteste.']
    ],
    diagram: ['Annoter un argument', ['Rôle', 'Question'], [['Conclusion', 'Que veut-on établir ?'], ['Raison', 'Sur quel fait ou principe s’appuie-t-on ?'], ['Lien implicite', 'Quelle règle relie les deux ?']]],
    dossier: 'Comparez les exemples d’arguments et d’énoncés simples dans [1].',
    activity: 'Analysez « La dépense dépasse la recette prévue, donc le projet nécessite une autre source de financement. » Ajoutez une prémisse implicite.',
    correction: 'La conclusion porte sur le financement. L’écart entre dépenses et recettes est la raison donnée. Il faut ajouter que les dépenses doivent être maintenues et que la recette annoncée constitue la seule source déjà prévue.',
    quiz: ['Quel énoncé marque la conclusion dans cet exemple ?', ['La dépense dépasse la recette.', 'Le projet nécessite une autre source de financement.', 'Une source était prévue.'], 1, 'C’est la proposition déduite du diagnostic financier et des conditions implicites.'],
    seminar: 'Une reformulation charitable peut-elle devenir trop généreuse avec l’auteur ?',
    review: 'À J+2, annotez un paragraphe. À J+7, exposez deux prémisses implicites possibles.',
    sources: [argumentation]
  },
  {
    id: 'validite', title: 'Validité, vérité et contre-exemple',
    goal: 'Trouver un contre-exemple à une inférence déductive invalide.',
    prerequisite: 'Reconstruire un argument.',
    sections: [
      ['Tester une forme', 'Un argument déductif est valide s’il est impossible que ses prémisses soient vraies et sa conclusion fausse dans une même interprétation. La vérité effective des prémisses se juge séparément. Un argument valide dont les prémisses sont vraies est solide.'],
      ['Reconnaître une forme valide', 'Si P, alors Q. P. Donc Q. Supposons que toute fiche validée porte une date et que cette fiche est validée. Dans le modèle, elle porte nécessairement une date.'],
      ['Construire un échec', 'Si P, alors Q. Q. Donc P est invalide. Une fiche peut porter une date parce qu’elle est un brouillon daté. Dans ce cas, les deux prémisses peuvent être vraies alors que la conclusion est fausse.']
    ],
    diagram: ['Deux formes proches', ['Données', 'Conclusion'], [['Si P alors Q, et P', 'Q suit.'], ['Si P alors Q, et Q', 'P peut être faux.']]],
    dossier: 'Dans [1], identifiez un exemple valide et réécrivez-le avec des lettres.',
    activity: 'Donnez un contre-exemple à « Si le projet est adopté, un rapport est publié. Un rapport est publié. Donc le projet est adopté. »',
    correction: 'Le règlement impose un rapport après tout vote, y compris en cas de rejet. Un projet rejeté peut donc donner lieu à un rapport alors que la conclusion est fausse.',
    quiz: ['Pour invalider une forme, il suffit d’un cas où…', ['les prémisses et la conclusion sont vraies.', 'les prémisses sont vraies et la conclusion est fausse.', 'les prémisses sont fausses.'], 1, 'Ce cas montre que la conclusion ne découle pas nécessairement des prémisses.'],
    seminar: 'En quoi une bonne déduction peut-elle être un mauvais argument dans la pratique ?',
    review: 'À J+2, construisez un autre exemple. À J+7, expliquez validité et vérité en deux phrases.',
    sources: [argumentation]
  },
  {
    id: 'induction', title: 'Induction et qualité des preuves',
    goal: 'Évaluer la portée d’une généralisation et proposer une donnée qui pourrait la fragiliser.',
    prerequisite: 'Validité, vérité et contre-exemple.',
    sections: [
      ['Mesurer la portée', 'Une conclusion inductive peut être bien soutenue et rester révisable. Un échantillon observé en bibliothèque peut renseigner sur les personnes présentes dans ce lieu à ce moment, avec une portée incertaine pour les étudiants absents ou d’une autre filière.'],
      ['Tester la sélection', 'Un très grand nombre de réponses peut améliorer la précision dans un échantillon tout en laissant subsister un biais de recrutement. Pour juger une enquête, identifiez la population visée, la façon de recruter et les motifs plausibles de non-réponse.'],
      ['Comparer les explications', 'Une préférence rapportée peut dépendre du sujet interrogé, de la formulation et de l’ordre des questions. Vérifiez si une explication concurrente peut produire le même résultat. Une meilleure preuve permet de prévoir une différence entre ces explications.']
    ],
    diagram: ['Évaluer une généralisation', ['Question', 'Vérification'], [['Qui est visé ?', 'Population de référence.'], ['Qui a répondu ?', 'Recrutement et non-réponse.'], ['Que mesure-t-on ?', 'Formulation et conditions.']]],
    dossier: 'Comparez déduction et induction dans [1]. Puis relisez « Méthodes » en psychologie pour distinguer représentativité et affectation aléatoire.',
    activity: 'Un sondage dans un club de lecture trouve que 85 % des répondants lisent chaque semaine. Proposez une conclusion prudente et un recrutement pour étudier toute l’université.',
    correction: 'Parmi les membres du club interrogés, 85 % déclarent lire chaque semaine. Tirer des invitations dans différentes filières et années, puis documenter la non-réponse, améliorerait la portée de l’enquête sur l’ensemble de l’université.',
    quiz: ['Quel changement traite en priorité le biais de sélection ?', ['Interroger plus de membres du même club.', 'Recruter dans la population visée.', 'Arrondir le pourcentage.'], 1, 'Le recrutement doit permettre d’atteindre d’autres groupes que les lecteurs du club.'],
    seminar: 'Un public volontaire peut-il être exactement le public pertinent pour une question ?',
    review: 'À J+2, redéfinissez population et échantillon. À J+7, auditez une statistique publique.',
    sources: [argumentation]
  }
];

const mandarinLessons = [
  {
    id: 'tons', title: 'Mandarin · Lire les tons en pinyin',
    goal: 'Identifier les quatre tons à partir de leur marque et décrire leur contour de citation.',
    prerequisite: 'Aucun.',
    sections: [
      ['Lire le système', 'Le pinyin note la prononciation du mandarin standard en lettres latines. Une syllabe peut porter une marque tonale. Les graphies latines ne se prononcent pas toutes comme en français, et le ton fait partie de la syllabe.'],
      ['Lire quatre contours', 'Sur ma, mā représente un ton haut et relativement plat, má un ton montant, mǎ un ton bas au contour descendant-remontant en citation, et mà un ton descendant. Le troisième ton est souvent réalisé bas dans la parole enchaînée. Le ton neutre se note généralement sans accent dans les exercices de pinyin.'],
      ['S’entraîner à écouter', 'Pour une première écoute, concentrez-vous sur le mouvement de hauteur et reproduisez-le sur une voyelle. Comparez ensuite deux syllabes dans la même voix. En parlant, le rythme et le contexte modifient les contours. La courbe de citation constitue un repère de travail.']
    ],
    diagram: ['Marques tonales de citation', ['Pinyin', 'Contour'], [['mā', 'Haut et plat.'], ['má', 'Montant.'], ['mǎ', 'Bas, avec remontée possible en finale.'], ['mà', 'Descendant.']]],
    dossier: 'Lisez la section sur les tons de [1] et comparez la notation du ton isolé aux exemples en contexte.',
    activity: 'Classez nǐ, hǎo, shì et rén par ton. Dites le numéro correspondant avant de vérifier.',
    correction: 'nǐ et hǎo sont au troisième ton en notation. shì est au quatrième ton et rén au deuxième. Le ton de la première syllabe de nǐ hǎo se réalise normalement montant en raison du changement de ton.',
    quiz: ['Quelle syllabe porte le quatrième ton ?', ['má', 'mǎ', 'mà'], 2, 'L’accent grave marque le ton descendant.'],
    seminar: 'Pourquoi le numéro de ton écrit peut-il différer du contour entendu dans une expression ?',
    review: 'À J+2, écrivez les quatre marques. À J+7, retrouvez le contour d’une syllabe sans tableau.',
    sources: [mandarin]
  },
  {
    id: 'saluer', title: 'Mandarin · Saluer et se présenter',
    goal: 'Lire un échange bref et créer une présentation personnelle en deux répliques.',
    prerequisite: 'Reconnaître les marques de ton en pinyin.',
    sections: [
      ['Écouter une salutation', '你好。Nǐ hǎo. Bonjour. Les deux syllabes sont écrites au troisième ton. Dans l’enchaînement, la première prend normalement un contour montant. Écrivez les tons lexicaux dans vos notes et indiquez séparément la réalisation entendue.'],
      ['Présenter son nom', '我叫安娜。Wǒ jiào Ānnà. Je m’appelle Anna. 我 wǒ correspond ici à « je » et 叫 jiào introduit le nom. Remplacez 安娜 par votre prénom en gardant la même structure.'],
      ['Poser la question', '你叫什么名字？Nǐ jiào shénme míngzi? Comment t’appelles-tu ? 什么 shénme signifie ici « quel » et 名字 míngzi « nom ». Après la question, donnez votre prénom dans une phrase courte et revenez à la salutation.']
    ],
    diagram: ['Un échange simple', ['Réplique', 'Fonction'], [['你好。 Nǐ hǎo.', 'Saluer.'], ['你叫什么名字？ Nǐ jiào shénme míngzi?', 'Demander le nom.'], ['我叫安娜。 Wǒ jiào Ānnà.', 'Répondre.']]],
    dossier: 'Utilisez les conventions de [1] pour annoter les marques tonales de l’échange. Entourez les syllabes sans marque dans shénme et míngzi.',
    activity: 'Écrivez un mini-dialogue entre Anna et un autre personnage. Les deux se saluent, l’un demande le prénom et l’autre répond.',
    correction: 'Anna : 你好！你叫什么名字？ Nǐ hǎo! Nǐ jiào shénme míngzi? Réponse : 你好！我叫李明。 Nǐ hǎo! Wǒ jiào Lǐ Míng.',
    quiz: ['Quel segment introduit « je m’appelle » ?', ['我叫 wǒ jiào', '你好 nǐ hǎo', '名字 míngzi'], 0, '我 fournit le sujet et 叫 introduit le nom dans cette construction.'],
    seminar: 'Comparez l’ordre des mots de la question mandarine et de sa traduction française.',
    review: 'À J+2, reconstituez les trois répliques. À J+7, écrivez les marques sans regarder.',
    sources: [mandarin]
  },
  {
    id: 'qin', title: 'Civilisation chinoise · Qin et l’échelle impériale',
    goal: 'Expliquer pourquoi une administration qui s’étend a intérêt à standardiser certaines pratiques.',
    prerequisite: 'Savoir séparer un objet, son contexte et son interprétation.',
    sections: [
      ['Situer la rupture', 'En 221 avant notre ère, l’État de Qin achève la conquête des autres royaumes majeurs et fonde la dynastie Qin. La dynastie s’achève en 206. Quinze ans de dynastie ne disent pas la durée des politiques antérieures du royaume ni celle de leur héritage. [1]'],
      ['Administrer les écarts', 'Un pouvoir territorial peut utiliser des normes communes pour rendre comparables des documents et des mesures produits dans des lieux différents. Une norme peut avoir des applications inégales selon les lieux et les acteurs. Pour en étudier l’effet, comparez sa formulation et ses traces matérielles.'],
      ['Distinguer mots et institutions', '秦朝 Qíncháo désigne la dynastie Qin, 朝 cháo désignant ici une dynastie. Dans une notice, séparez le nom de la dynastie, la date de l’objet et l’institution à laquelle le catalogue attribue son usage. Comparez ces éléments à la chronologie du cours.']
    ],
    diagram: ['Décrire une norme', ['Aspect', 'Question'], [['Proclamation', 'Que demande le pouvoir ?'], ['Diffusion', 'Où retrouve-t-on la pratique ?'], ['Application', 'Où observe-t-on des variantes ?']]],
    dossier: 'Consultez [1]. Repérez une transformation administrative et notez quels éléments relèvent de la synthèse du musée.',
    activity: 'Expliquez en 200 mots comment une norme de mesure pourrait faciliter les prélèvements et quel vestige permettrait d’en tester l’usage.',
    correction: 'Des unités communes permettent de comparer les quantités entre localités et de consolider leurs relevés. Des poids ou récipients datés, trouvés dans plusieurs contextes administratifs, permettraient de comparer la norme et certaines mises en pratique. Un objet isolé ne suffit pas à établir une application générale.',
    quiz: ['Que peut établir le plus solidement un objet normalisé isolé ?', ['L’application uniforme à tout l’empire.', 'Un exemple local de la norme selon son contexte.', 'La disparition des usages locaux.'], 1, 'La généralisation demande une série provenant de lieux et de situations différents.'],
    seminar: 'Une norme commune implique-t-elle un contrôle politique quotidien des pratiques locales ?',
    review: 'À J+2, replacez 221 et 206. À J+7, définissez 秦朝 et comparez les trois types de preuves.',
    sources: [qin, mandarin]
  }
];

Object.assign(firstYearCourses, {
  5: {title:'Économie · Choisir, échanger, répartir', introduction:'Construire et discuter des modèles élémentaires d’allocation.', key:'economie', lessons:economicsLessons},
  6: {title:'Logique · Évaluer les raisons', introduction:'Reconstruire un raisonnement, tester sa forme et évaluer la preuve.', key:'logique', lessons:logicLessons},
  7: {title:'Chinois · Langue et civilisation', introduction:'Lire les tons, se présenter et contextualiser un objet de l’époque Qin.', key:'chinois', lessons:mandarinLessons}
});
