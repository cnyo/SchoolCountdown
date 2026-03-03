# SchoolCountdown

Application Angular mobile-first qui affiche un décompte dynamique jusqu’aux prochaines vacances scolaires françaises — ou jusqu’à la rentrée si l’on est déjà en vacances 😎📚

Le but du projet est à la fois ludique et technique : travailler la géolocalisation, les API publiques et une UI agréable sur mobile.

## Objectifs du projet
* Proposer une app simple et fun pour savoir combien de temps il reste avant les vacances.  
* Exploiter des APIs publiques françaises
* Mettre en pratique :
  * Angular
  * La géolocalisation navigateur 
  * La gestion de dates 
  * Une approche mobile-first 
  * La géolocalisation navigateur

## Fonctionnalités

### Géolocalisation
* Utilisation de l’API Geolocation du navigateur
* Détection automatique de la position de l’utilisateur
* Détermination de l’académie scolaire correspondante

### Calendrier scolaire
* Consommation de l’API officielle Calendrier Scolaire de data.gouv.fr
* Récupération des périodes de vacances selon :
  * l’académie
  * l’année scolaire en cours

### Décompte dynamique
* Calcul automatique :
  * “Prochaines vacances dans X jours”
  * ou “Retour à l’école dans X jours” si l’utilisateur est en vacances
* Mise à jour dynamique basée sur la date courante

### Interface utilisateur
* Design mobile-first
* UI colorée et joyeuse (thème vacances / école)
* Affichage clair et lisible sur smartphone

## Stack technique
### Frontend
* Angular (standalone components / Angular CLI)
* TypeScript
* HTML5 / CSS3
* (Optionnel selon évolution)
  * Tailwind CSS
  * Angular Material

### APIs & Web APIs
* [API Calendrier Scolaire – data.gouv.fr](https://www.data.gouv.fr/dataservices/api-calendrier-scolaire)
* [Geolocation API (Navigator)](https://developer.mozilla.org/fr/docs/Web/API/Geolocation_API)

### Outils
* Node.js
* npm
* Angular CLI
* Git / GitHub

## Architecture
src/  
├── app/  
│   ├── core/  
│   │   ├── enums/
│   │   ├── models/
│   │   ├── services/
│   ├── features/  
│   │   └── components/  
│   │       ├── academy/
│   │       └── pages/
│   │   └── enums/  
│   │   └── models/  
│   │   └── countdown/
│   │   ├── services/
│   ├── shared/  
│   │   └── helpers/
│   └── app.component.ts  
├── assets/  
└── environments/  

## Déploiement du projet
```bash
# En environnement de développement
BUILD_ENV=development NODE_ENV=development docker compose up -d

# En production
docker compose up -d
```

Puis ouvrir :
```
http://localhost:9002
```

### La géolocalisation nécessite :
* un navigateur compatible
* l’autorisation de localisation
* idéalement un contexte HTTPS (ou localhost)

## Évolutions possibles
* Sélection manuelle de l’académie
* Animations (compte à rebours, transitions)
* Support multi-années scolaires

## Pourquoi ce projet ?
Ce projet sert de terrain d’expérimentation Angular :
* consommation d’API REST
* gestion du temps et des dates
