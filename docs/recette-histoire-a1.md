# Recette Histoire A1

Validation locale du 28 novembre 2026 sur la refonte Histoire et Antiquité. Le code applicatif testé correspond au commit `b2341a6a1b3c57960097e3ad4e3dbfbd063a708b`. Les commits de recette ajoutent les contrôles et ce compte rendu.

| Contrôle | Résultat |
|---|---|
| `node tests/smoke.cjs` | Réussi, y compris cache, structure des sauvegardes, bureau, lecture et activités du campus. |
| Chromium sans interface, format mobile 390 × 844 | Réussi. |
| Chromium sans interface, format ordinateur 1366 × 768 | Réussi. |
| Suite générale et parcours de mathématiques aux deux formats | Navigation, carnet, annotations et surlignage, export et restauration de sauvegarde, progression et hors connexion validés dans les parcours automatisés. |
| Parcours Histoire aux deux formats | Plans des 16 leçons, synthèses et retour au plan, ouverture d’un dossier, renvoi après erreur de quiz, progression et réponse écrite après réouverture hors connexion. |
| Mise à jour PWA locale aux deux formats | Passage simulé de V0.32.3 à V0.32.99. Le bouton d’installation apparaît, le rechargement affiche la nouvelle version, l’ancien cache est retiré, la progression et la réponse écrite sont conservées. |

La version V0.32.99 était un témoin local. La version et le déploiement de production relèvent de la phase 10. Les deux formats ont été testés avec Chromium 158.0.8127.0. L’ouverture des PDF externes reste soumise à la disponibilité de leurs hébergeurs.
