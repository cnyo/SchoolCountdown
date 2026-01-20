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
* Approche mobile-first
* (Optionnel selon évolution)
  * Tailwind CSS
  * Angular Material

### APIs & Web APIs
* API Calendrier Scolaire – data.gouv.fr
* [Geolocation API (Navigator)](https://developer.mozilla.org/fr/docs/Web/API/Geolocation_API)

### Outils
* Node.js
* npm
* Angular CLI
Git / GitHub

## Architecture (prévisionnelle)
src/  
├── app/  
│   ├── core/  
│   │   ├── services/  
│   │   │   ├── geolocation.service.ts  
│   │   │   ├── academy.service.ts  
│   │   │   └── school-calendar.service.ts  
│   ├── features/  
│   │   └── countdown/  
│   │       ├── countdown.component.ts  
│   │       └── countdown.component.html  
│   └── app.component.ts  
├── assets/  
└── environments/  

## Lancer le projet en local
```bash
npm install
ng serve
```

Puis ouvrir :
```
http://localhost:4200
```

### La géolocalisation nécessite :
* un navigateur compatible
* l’autorisation de localisation
* idéalement un contexte HTTPS (ou localhost)

## Évolutions possibles
* Sélection manuelle de l’académie
* Mode hors-ligne
* Animations (compte à rebours, transitions)
* Widget PWA
* Support multi-années scolaires

## Pourquoi ce projet ?
Ce projet sert de terrain d’expérimentation Angular :
* consommation d’API REST
* services & state
* gestion du temps et des dates
* UX mobile-first
