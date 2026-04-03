import academiesZonesJson from '../../../../public/json/academiesZones.json';
import {DEPARTMENTS_JSON} from './departmentsJson';

export const VACATION_ACADEMIES_ZONES = {
  "Besançon": "Zone A",
  "Bordeaux": "Zone A",
  "Clermont-Ferrand": "Zone A",
  "Dijon": "Zone A",
  "Grenoble": "Zone A",
  "Limoges": "Zone A",
  "Lyon": "Zone A",
  "Poitiers": "Zone A",

  "Aix-Marseille": "Zone B",
  "Amiens": "Zone B",
  "Lille": "Zone B",
  "Nancy-Metz": "Zone B",
  "Nantes": "Zone B",
  "Nice": "Zone B",
  "Normandie": "Zone B",
  "Orléans-Tours": "Zone B",
  "Reims": "Zone B",
  "Rennes": "Zone B",
  "Strasbourg": "Zone B",

  "Créteil": "Zone C",
  "Montpellier": "Zone C",
  "Paris": "Zone C",
  "Toulouse": "Zone C",
  "Versailles": "Zone C",

  "Corse": "Corse",

  "Guadeloupe": "Guadeloupe",
  "Martinique": "Martinique",
  "Guyane": "Guyane",
  "La Réunion": "La Réunion",
  "Mayotte": "Mayotte",
  "Nouvelle-Calédonie": "Nouvelle-Calédonie",
  "Polynésie Française": "Polynésie Française",
  "Wallis-et-Futuna": "Wallis-et-Futuna",
  "Saint-Pierre-et-Miquelon": "Saint-Pierre-et-Miquelon"
} as const;

export type AcademiesZoneJson = typeof VACATION_ACADEMIES_ZONES;
export type AcademiesJson = keyof AcademiesZoneJson;
export type VacationAcademiesZone = AcademiesZoneJson[keyof AcademiesZoneJson];
