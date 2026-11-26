const methodologySource = ['University of South Carolina Upstate · Bibliothèque', 'Lateral Reading: SIFT Method', 's. d.', 'https://uscupstate.libguides.com/LateralReading/sift', 'Guide universitaire de lecture latérale et de vérification des sources.'];

const studyMethods = {
  key: 'methode',
  title: 'Méthode · Lire, vérifier et argumenter',
  introduction: 'Trois travaux dirigés transversaux : examiner une affirmation, lire une étude et rédiger une synthèse documentée.',
  lessons: [
    {
      id: 'verification', title: 'Vérifier une affirmation',
      goal: 'Remonter d’une affirmation secondaire au document qui en permet l’examen.',
      prerequisite: 'Aucun.',
      sections: [
        ['Énoncer une proposition précise', 'Transformez une formule générale en proposition à vérifier. « Un habitat prouve la sédentarité » devient par exemple « ce site a été occupé pendant toutes les saisons au cours du même épisode ». Il faut alors préciser le site, l’épisode et ce que vous entendez par occupation.'],
        ['Lire latéralement', 'Avant de consacrer du temps à une page, identifiez l’auteur et son rôle. Cherchez une autre couverture ou une référence indépendante. Puis remontez à la date, au document et au contexte dont la formulation est tirée. Le guide de lecture latérale formalise cette démarche dans la méthode SIFT. [1]'],
        ['Noter les limites', 'Gardez ensemble la formulation exacte que vous évaluez, la référence consultée et la proposition que cette référence soutient effectivement. Comparez les sources par leur accès aux preuves : deux articles qui reprennent le même communiqué n’apportent pas deux confirmations indépendantes.']
      ],
      diagram: ['Tracer une affirmation', ['Étape','Trace à garder'], [['Distinguer les formulations','Proposition précise.'], ['Retrouver le document','Auteur, titre, lien et passage.'], ['Évaluer la portée','Conclusion soutenue et réserve.']]],
      dossier: 'Dans [1], expliquez avec vos propres mots pourquoi il faut retrouver le contexte original.',
      activity: 'Un article présente une maison durable comme une preuve d’occupation annuelle. Écrivez une formulation plus prudente et nommez une donnée qui permettrait de tester la durée.',
      correction: 'La maison indique un investissement dans le lieu. Une occupation annuelle réclamerait des indices saisonniers provenant d’épisodes que la stratigraphie permet de relier entre eux. Une réoccupation à la même saison reste possible.',
      quiz: ['Deux articles reprennent le même communiqué. Qu’apportent-ils ?', ['Deux confirmations indépendantes.','Deux reprises d’une même source.','Deux mesures réalisées sur le terrain.'],1,'L’indépendance dépend de la provenance des preuves.'],
      seminar: 'Qu’est-ce qui vous ferait réduire ou augmenter votre confiance dans une affirmation tirée d’une fouille ?',
      review: 'À J+2, reconstituez les étapes. À J+7, appliquez-les à un titre d’actualité.',
      sources: [methodologySource]
    },
    {
      id: 'lecture', title: 'Lire une publication par les preuves',
      goal: 'Construire une fiche de lecture qui distingue résultat, interprétation et portée.',
      prerequisite: 'Vérifier une affirmation.',
      sections: [
        ['Se donner une question', 'Lisez d’abord le titre et le résumé pour identifier une question à poser au texte. Le résumé aide à s’orienter. Les méthodes vous renseignent ensuite sur les observations réellement disponibles, les exclusions et les comparaisons effectuées.'],
        ['Examiner le chemin entre preuve et résultat', 'Dans une étude de mobilité, une donnée doit être reliée à une couche, une espèce et une méthode de datation avant de servir à une proposition sur le comportement. Dans une expérience de psychologie, la tâche, les participants et les conditions permettent d’identifier ce qui a été comparé.'],
        ['Rédiger une fiche exploitable', 'Consignez la question, deux preuves, une interprétation, une limite et un rapprochement avec un autre texte. Attribuez chaque proposition à son auteur lorsque vous résumez. Ajoutez une phrase signalant ce qui reste votre propre lecture.']
      ],
      diagram: ['Une fiche de lecture', ['Rubrique','Question'], [['Méthode','Qu’a-t-on mesuré ou décrit ?'], ['Résultat','Quel contraste apparaît ?'], ['Limite','Dans quel autre cas pourrait-il changer ?']]],
      dossier: 'À partir du résumé de [1], distinguez une proposition sur les différences régionales et une piste de recherche qui demanderait des données supplémentaires.',
      activity: 'Rédigez une fiche de 200 mots indiquant l’aire étudiée, le type de preuves et une raison de ne pas généraliser à une autre région.',
      correction: 'Situez le Levant et la diversité de ses contextes. Isolez les preuves liées au peuplement et aux pratiques étudiées par les auteurs. Expliquez qu’une autre région peut présenter des conditions, archives et temporalités différentes.',
      quiz: ['Quelle partie décrit en priorité les modalités de collecte ?', ['Les méthodes.','La seule conclusion.','La liste des remerciements.'],0,'Les méthodes rendent explicite la façon dont les observations sont produites ou sélectionnées.'],
      seminar: 'Quel degré de détail vous permettrait de refaire l’analyse ?',
      review: 'À J+2, refaites la fiche sans le texte. À J+7, vérifiez ce que vous aviez extrapolé.',
      sources: [['A. N. Goring-Morris et A. Belfer-Cohen','Neolithization Processes in the Levant','2011','https://doi.org/10.1086/658860','Exemple de synthèse archéologique mettant en relation des trajectoires régionales.']]
    },
    {
      id: 'synthese-documentee', title: 'Rédiger une synthèse documentée',
      goal: 'Défendre une conclusion proportionnée à deux sources et expliciter le rôle éventuel d’un outil d’IA.',
      prerequisite: 'Lire une publication par les preuves.',
      sections: [
        ['Faire une carte des preuves', 'Pour chaque proposition importante, inscrivez le passage ou la donnée qui la soutient. Si deux textes mobilisent la même archive, indiquez-le. Si leurs conclusions divergent, vérifiez si la date, le lieu, la population ou la définition de ce qui est mesuré ont changé.'],
        ['Donner sa place à l’objection', 'Formulez une thèse et une explication concurrente. Identifiez un élément sur lequel elles font des prédictions différentes. La conclusion peut rester provisoire si ces observations ne sont pas disponibles. Écrivez alors ce qui vous ferait réviser votre jugement.'],
        ['Documenter les outils', 'Un outil d’IA peut aider à reformuler une question ou à repérer des termes de recherche. Vérifiez chaque citation dans le document original et notez les tâches éventuellement confiées à l’outil. Pour une synthèse, attribuez les arguments aux textes et distinguez vos propres inférences.']
      ],
      diagram: ['Relier le texte aux documents', ['Dans la synthèse','À vérifier'], [['Thèse','Que défendez-vous précisément ?'], ['Preuve','Quel passage le lecteur peut-il retrouver ?'], ['Objection','Quelle autre lecture est compatible avec les faits ?']]],
      dossier: 'Relisez la méthode de traçage de [1] avant de citer une affirmation. Vérifiez si vous pouvez retrouver le contexte sans le résumé.',
      activity: 'Rédigez 350 à 500 mots sur une question du cours d’histoire. Utilisez deux sources et une objection. Barème sur 20 : question (4), vérification des références (6), argument et objection (8), clarté (2).',
      correction: 'Une réponse recevable définit la question, relie chaque pièce à une proposition limitée, effectue une comparaison et identifie une objection qui pourrait réellement affecter la thèse. Les références donnent au lecteur assez d’informations pour remonter aux passages.',
      quiz: ['Comment traiter une citation proposée par un outil d’IA ?', ['La citer telle quelle.','Vérifier le passage dans l’original avant de l’utiliser.','La retenir si le nom de l’auteur paraît plausible.'],1,'Une référence doit être vérifiable dans le document qu’elle désigne.'],
      seminar: 'Dans quels cas un désaccord entre deux sources disparaît-il quand on précise leur question ?',
      review: 'À J+2, relisez uniquement la carte des preuves. À J+7, réécrivez la conclusion en intégrant une limite.',
      sources: [methodologySource]
    }
  ]
};
