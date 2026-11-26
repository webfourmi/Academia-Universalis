const physique = [
  {
    id: 'mesures', title: 'Mesurer · Du résultat à l’incertitude',
    goal: 'Exprimer une mesure avec son unité et distinguer l’effet de la dispersion de celui d’un biais.',
    prerequisite: 'Savoir calculer une moyenne et convertir des centimètres en mètres.',
    sections: [
      ['Définir ce que l’on mesure', 'Avant de lire une règle, précisez les deux extrémités de la longueur et l’unité. Une mesure associe un nombre à une procédure. Si deux personnes choisissent des bords différents, leurs résultats peuvent diverger même avec des instruments identiques. [1]'],
      ['Répéter et comparer', 'Pour trois lectures fictives de 20,1, 20,2 et 20,3 cm, la moyenne vaut 20,2 cm. La demi-étendue vaut 0,1 cm et décrit ici une dispersion observée. Trois mesures ne suffisent pas à garantir que la valeur réelle est comprise entre les extrêmes. Un décalage du zéro peut déplacer toutes les lectures dans le même sens. [1]'],
      ['Garder la trace des unités', 'La moyenne correspond à 0,202 m. Une différence de 0,1 cm correspond à 0,001 m. Convertir les deux quantités garde leur rapport constant. Le nombre de décimales affiché par un appareil ne suffit pas à établir son exactitude.']
    ],
    diagram: ['Trois contrôles avant d’interpréter une mesure', ['Indice', 'Contrôle'], [['Lectures dispersées', 'Répéter dans les mêmes conditions.'], ['Décalage du zéro', 'Comparer à un étalon.'], ['Résultats en unités différentes', 'Convertir valeur et incertitude.']]],
    dossier: 'Dans [1], comparez la discussion sur la précision et l’exemple de la longueur du papier. Décrivez la procédure que vous pourriez reproduire chez vous.',
    activity: 'Mesurez trois fois la même largeur en repositionnant la règle. Calculez moyenne et demi-étendue, puis indiquez un biais plausible.',
    correction: 'Pour 15,0, 15,1 et 15,2 cm, la moyenne est 15,1 cm et la demi-étendue 0,1 cm. Un zéro décalé de 0,2 cm déplacerait les trois mesures sans changer cette dispersion. Documentez séparément ces deux effets.',
    quiz: ['Quel contrôle cible un décalage du zéro ?', ['Répéter avec le même décalage.', 'Changer d’unité.', 'Comparer à une référence connue.'], 2, 'La comparaison à une référence aide à détecter une erreur systématique.'],
    seminar: 'Quelles informations faut-il transmettre pour qu’une autre personne reproduise votre mesure ?',
    review: 'À J+2, refaites la conversion. À J+7, inventez deux séries de même dispersion avec des moyennes différentes.',
    sources: [['OpenStax', 'Physics, §1.3 · The Language of Physics', '2020', 'https://openstax.org/books/physics/pages/1-3-the-language-of-physics-physical-quantities-and-units', 'Grandeurs, unités et incertitude.']]
  },
  {
    id: 'forces', title: 'Forces · Prévoir une accélération',
    goal: 'Tracer un bilan de forces et en déduire une accélération signée en une dimension.',
    prerequisite: 'Connaître les unités et savoir additionner des nombres signés.',
    sections: [
      ['Isoler le système', 'Une caisse est poussée sur un sol horizontal. Prenez la caisse comme système. Le poids et la réaction normale agissent verticalement, tandis que la poussée et le frottement ont ici une composante horizontale. Une action exercée par la caisse sur le sol appartient au bilan du sol. [1]'],
      ['Projeter les forces', 'Choisissons la droite positive. Une poussée de 12 N et un frottement de 4 N vers la gauche donnent une résultante horizontale de +8 N. Pour une masse constante de 2 kg, la deuxième loi de Newton donne a = +4 m/s² dans le référentiel inertiel choisi. [1]'],
      ['Séparer vitesse et accélération', 'Une accélération positive peut ralentir momentanément un objet qui se déplace vers la gauche. Si la somme des forces est nulle, la vitesse reste constante dans ce modèle. Le repos est un cas particulier. [1]']
    ],
    diagram: ['Bilan horizontal de la caisse', ['Force sur la caisse', 'Projection'], [['Poussée', '+12 N'], ['Frottement', '−4 N'], ['Résultante', '+8 N']]],
    dossier: 'Dans [1], identifiez le système étudié dans un exemple résolu et dessinez les seules forces qui agissent sur lui.',
    activity: 'Un chariot de 3 kg avance à droite. Sur une portion, il reçoit 5 N à droite et 11 N à gauche. Calculez l’accélération et décrivez l’effet immédiat sur sa vitesse.',
    correction: 'La résultante vaut 5 − 11 = −6 N, d’où −2 m/s². Comme la vitesse initiale est positive, sa norme diminue d’abord.',
    quiz: ['Une résultante nulle implique…', ['Une vitesse constante.', 'Une position nécessairement constante.', 'Une vitesse qui diminue.'], 0, 'La résultante nulle implique une accélération nulle dans un référentiel inertiel.'],
    seminar: 'Pourquoi une collision peut-elle donner des accélérations différentes à deux objets soumis à des forces de même norme ?',
    review: 'À J+2, refaites le bilan. À J+7, inversez le sens de la vitesse initiale et interprétez le résultat.',
    sources: [['OpenStax', 'University Physics Volume 1, §5.3 · Newton’s Second Law', '2016', 'https://openstax.org/books/university-physics-volume-1/pages/5-3-newtons-second-law', 'Résultante, masse et accélération.']]
  },
  {
    id: 'energie', title: 'Énergie · Relier travail et variation de vitesse',
    goal: 'Calculer une variation d’énergie cinétique et expliquer le rôle d’un travail négatif.',
    prerequisite: 'Leçon Forces et calcul d’un carré.',
    sections: [
      ['Comparer deux états', 'Pour un objet de masse constante, l’énergie cinétique de translation est K = ½mv². Doubler la norme de la vitesse multiplie K par quatre. Cette quantité décrit l’état du mouvement dans le référentiel choisi. [1]'],
      ['Relier le chemin aux forces', 'Pour une force constante parallèle au déplacement, le travail vaut force × distance, positif si les directions coïncident et négatif si elles sont opposées. Le travail total de toutes les forces sur une particule égale K finale moins K initiale. [1]'],
      ['Choisir une méthode', 'Le bilan des forces permet de calculer l’accélération à un instant. Le bilan des travaux relie la vitesse de départ à celle d’arrivée, y compris dans des cas où les forces changent le long du trajet. Les deux répondent à des questions différentes.']
    ],
    diagram: ['Du trajet à la vitesse finale', ['Action', 'Quantité à suivre'], [['Fixer départ et arrivée', 'Énergie cinétique initiale.'], ['Additionner les travaux', 'Variation d’énergie cinétique.'], ['Revenir à la vitesse', 'Racine carrée de 2K/m.']]],
    dossier: 'Dans l’exemple sur le ralentissement de [1], suivez le signe du travail et le choix des états initial et final.',
    activity: 'Une caisse de 2 kg avance à 4 m/s. Une force opposée constante de 2 N agit sur 3 m. Les autres forces ont un travail nul. Calculez K finale et la vitesse finale.',
    correction: 'K initiale vaut 16 J. Le travail total vaut −6 J, donc K finale vaut 10 J. La vitesse finale vaut √10 ≈ 3,16 m/s. Le mouvement n’a pas cessé sur cette portion.',
    quiz: ['À masse constante, si la vitesse double, K est multipliée par…', ['2.', '4.', '8.'], 1, 'L’énergie cinétique est proportionnelle au carré de la vitesse.'],
    seminar: 'Évaluation de synthèse. À partir du cas de la caisse, comparez les prédictions par bilan des forces et bilan d’énergie. Barème sur 20 : système et axes (4), forces (5), calcul des travaux (5), unités (3), interprétation (3).',
    review: 'À J+2, refaites le calcul sans noter les formules. À J+7, calculez la distance nécessaire pour annuler K avec la même force.',
    sources: [['OpenStax', 'University Physics Volume 1, §7.3 · Work-Energy Theorem', '2016', 'https://openstax.org/books/university-physics-volume-1/pages/7-3-work-energy-theorem', 'Travail total et variation d’énergie cinétique.']]
  }
];

const psychologie = [
  {
    id: 'methodes', title: 'Méthodes · D’une association à un test causal',
    goal: 'Proposer une explication concurrente à une corrélation et concevoir une expérience simple.',
    prerequisite: 'Aucun.',
    sections: [
      ['Définir les variables', 'Pour étudier le lien entre bruit et attention, fixez une mesure observable, par exemple le nombre de cibles repérées en deux minutes. Un résultat concerne la tâche choisie. Sa généralisation à toutes les formes d’attention exige d’autres observations. [1]'],
      ['Lire une association', 'Si, dans un relevé spontané, les personnes exposées au bruit repèrent moins de cibles, la fatigue peut expliquer une partie du lien si les personnes les plus fatiguées travaillent aussi aux heures les plus bruyantes. Une association permet de formuler ces hypothèses. [1]'],
      ['Construire le test', 'Répartir aléatoirement les participants entre silence et bruit aide à équilibrer en moyenne les différences initiales. Même durée, mêmes consignes et même difficulté isolent mieux la manipulation. Il faut ensuite examiner l’ampleur de l’écart, l’incertitude et les limites de la mesure. [1]']
    ],
    diagram: ['Construire une comparaison', ['Étape', 'Choix'], [['Manipulation', 'Bruit ou silence.'], ['Mesure', 'Cibles correctement repérées.'], ['Contrôles', 'Durée et formules de consigne identiques.']]],
    dossier: 'Dans [1], repérez l’exemple d’une troisième variable et identifiez le rôle de l’affectation aléatoire dans la partie consacrée à l’expérience.',
    activity: 'Des étudiants qui fréquentent davantage la bibliothèque obtiennent de meilleures notes. Proposez une explication concurrente et un test à faible enjeu.',
    correction: 'Un intérêt initial pour le cours peut augmenter la fréquentation et les notes. On peut répartir aléatoirement des volontaires entre deux lieux de travail pour une tâche d’étude de même durée, puis mesurer la rétention du même contenu.',
    quiz: ['Que permet l’affectation aléatoire ?', ['Aider à équilibrer les différences initiales.', 'Garantir des résultats identiques.', 'Rendre la mesure inutile.'], 0, 'Elle limite certaines explications concurrentes sans garantir l’égalité sur chaque caractéristique.'],
    seminar: 'Comment tester une hypothèse sur les habitudes d’étude sans faire dépendre les notes de l’expérience ?',
    review: 'À J+2, trouvez une troisième variable. À J+7, transformez une association en protocole testable.',
    sources: [['OpenStax', 'Psychology 2e, §2.3 · Analyzing Findings', '2020', 'https://openstax.org/books/psychology-2e/pages/2-3-analyzing-findings', 'Corrélation, causalité et expérience.']]
  },
  {
    id: 'perception', title: 'Perception · Interpréter un signal en contexte',
    goal: 'Distinguer les indices sensoriels et l’effet du contexte, puis décrire un test qui sépare leurs contributions.',
    prerequisite: 'Leçon Méthodes.',
    sections: [
      ['Deux niveaux d’analyse', 'La sensation commence par la détection d’un stimulus par les récepteurs. La perception concerne l’organisation et l’interprétation de ces informations. Reconnaître une forme floue mobilise à la fois ses traits et les catégories déjà connues. [1]'],
      ['Garder le signal constant', 'Imaginez une même forme ambiguë placée entre A et C, puis entre 12 et 14. Le voisinage favorise une lecture comme lettre ou comme nombre. La forme centrale reste fixe. Un changement de lecture renseigne sur l’effet du contexte dans ces conditions.'],
      ['Contrôler l’ordre', 'Voir d’abord une interprétation peut influencer la seconde. Contrebalancer l’ordre entre deux groupes aide à estimer cet effet. Il faut aussi éviter une consigne qui suggère l’interprétation attendue et distinguer une erreur de lecture d’un biais dans la manière de répondre. [1]']
    ],
    diagram: ['Éléments du test', ['Élément', 'Choix'], [['Signal central', 'La même forme ambiguë.'], ['Contexte', 'Lettres ou nombres voisins.'], ['Réponse', 'Identifier la forme centrale.']]],
    dossier: 'Étudiez le schéma de traitement ascendant et descendant dans [1]. Traduisez chaque notion en une question sur l’exemple de la forme ambiguë.',
    activity: 'Écrivez deux versions du protocole avec un ordre opposé et indiquez quel résultat rendrait l’hypothèse de contexte plausible.',
    correction: 'Le groupe 1 voit le contexte lettres puis nombres, le groupe 2 fait l’inverse. Si le même symbole est plus souvent classé comme lettre parmi les lettres dans les deux groupes, l’hypothèse d’un effet du contexte est renforcée.',
    quiz: ['Quel élément doit rester identique pour isoler le contexte ?', ['Les voisins.', 'La forme centrale.', 'Les réponses.'], 1, 'Si le signal change lui aussi, l’effet du contexte ne peut plus être isolé par cette seule comparaison.'],
    seminar: 'Comment distinguer l’effet du contexte de celui d’une consigne qui suggère la réponse ?',
    review: 'À J+2, redessinez le protocole. À J+7, proposez un équivalent sonore.',
    sources: [['OpenStax', 'Psychology 2e, §5.1 · Sensation versus Perception', '2020', 'https://openstax.org/books/psychology-2e/pages/5-1-sensation-versus-perception', 'Traitements ascendant et descendant.']]
  },
  {
    id: 'memoire', title: 'Mémoire · Apprendre en se testant',
    goal: 'Comparer rappel actif et relecture à l’aide d’un indicateur de rétention différée.',
    prerequisite: 'Leçon Méthodes.',
    sections: [
      ['Distinguer les tâches', 'Reconnaître une réponse dans une liste donne des indices. La restituer sans le document demande une autre opération. Pour comparer deux méthodes de révision, gardez la même tâche finale et le même délai pour les deux conditions. [1]'],
      ['Lire un résultat expérimental', 'Karpicke et Roediger ont étudié l’apprentissage de mots et observé un avantage du rappel répété à un test différé dans les conditions de leur expérience. Leur résultat motive une pratique de révision, avec prudence sur sa généralisation à des tâches complexes comme une démonstration ou une interprétation littéraire. [1]'],
      ['Essayer avec contrôle', 'Formez deux listes de difficulté comparable. Après une étude commune, relisez l’une et essayez de restituer l’autre avant de vérifier vos réponses. Égalisez le temps de pratique. Le lendemain, exigez le même type de rappel pour les deux listes. Un essai individuel sert de démonstration, avec des limites liées au choix des listes et à la répétition.']
    ],
    diagram: ['Comparer à délai constant', ['Moment', 'Relecture', 'Rappel actif'], [['Départ', 'Étude commune', 'Étude commune'], ['Entraînement', 'Relire', 'Restituer puis vérifier'], ['Le lendemain', 'Même test final', 'Même test final']]],
    dossier: 'Lisez le résumé public de [1]. Relevez la nature du matériel et l’ordre des tâches avant d’expliquer la conclusion.',
    activity: 'Résultat fictif : 7 mots sur 12 après rappel actif et 5 sur 12 après relecture. Calculez l’écart en points de pourcentage, puis nommez deux limites.',
    correction: 'L’écart est de 2 mots sur 12, soit environ 16,7 points de pourcentage. La difficulté des listes et l’ordre de révision peuvent l’expliquer en partie. Un individu et deux listes ne suffisent pas pour estimer un effet général.',
    quiz: ['Quel résultat compare directement la rétention ?', ['Une impression de facilité pendant la relecture.', 'Le même test effectué après le même délai.', 'Le nombre de pages parcourues.'], 1, 'Un test différé comparable renseigne directement sur le résultat visé.'],
    seminar: 'Évaluation de synthèse. Concevez une expérience de révision et discutez une explication concurrente. Sur 20 : hypothèse (4), protocole (6), mesure (4), limites (4), clarté (2).',
    review: 'À J+2, rappelez la structure du protocole sans regarder. À J+7, évaluez votre rappel et rectifiez les oublis.',
    sources: [['J. D. Karpicke et H. L. Roediger III', 'The Critical Importance of Retrieval for Learning', '2008', 'https://pubmed.ncbi.nlm.nih.gov/18276894/', 'Résumé public de l’étude expérimentale publiée dans Science.']]
  }
];

Object.assign(firstYearCourses, {
  3: {title: 'Physique · Mesurer et expliquer le mouvement', introduction: 'Passer des mesures aux bilans de forces et d’énergie.', key: 'physique', lessons: physique},
  4: {title: 'Psychologie · Observer et tester', introduction: 'Concevoir des comparaisons sur la perception et la mémoire.', key: 'psychologie', lessons: psychologie}
});
