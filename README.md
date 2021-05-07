# Projet OpenClassroom #6 - Créez un site accessible pour une plateforme de photographes

## Notes

- Une page d'accueil
- Une page pour chaque photographe échantillon
- Responsive
- Accessible

## Features

- Page d'accueil :

  - Liste des photographes incluant nom, slogan, localisation, prix/heure, tags et thumbnail
  - Le clic sur un tag depuis la navigation effectue un filtre pour ce tag spécifique
  - Le clic sur le thumbnail d'un photographe amène à sa page spécifique

- Page photographe :
  - Affichage de galerie des travaux propres
  - Possibilité de photo ou vidéo
    - Si vidéo, montrer un thumbnail dans la galerie
  - Chaque média contient titre, date, prix et nombre de clichés
    - Le clic sur l'icone "like" incrémente le total de likes affichés
    - Le nombre total de clichés doit être compté et ajouté au total du profil du photographe
  - Possibilité de tri des média par popularité (nombre de likes), date (croissant, décroissant ?), titre
  - Lors du clic sur un media, ouverture d'une modale lightbox :
    - croix de fermeture de la modale
    - boutons de navigation pour passer d'un élément média à l'autre depuis la modale
    - Les touches fléchées du clavier permettent la navigation entre les médias
  - Afficher un bouton pour contacter le photographe (modale)
    - formulaire dans la modale
    - champs dans le formulaire :
      - nom
      - email
      - message
    - envoyer le contenu du form dans un console.log

## Contraintes

- Utilisation d'ESLint avec les paramètres par défaut
- Javascript ES6 ou supérieur uniquement
- Utilisation du Factory Design Pattern

## Ressources

- [JSON](https://s3-eu-west-1.amazonaws.com/course.oc-static.com/projects/Front-End+V2/P5+Javascript+%26+Accessibility/FishEyeData.json)
