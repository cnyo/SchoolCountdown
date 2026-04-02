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

  "Corse": "CORSE",

  "Guadeloupe": "GUADELOUPE",
  "Martinique": "MARTINIQUE",
  "Guyane": "GUYANE",
  "La Réunion": "REUNION",
  "Mayotte": "MAYOTTE",
  "Nouvelle-Calédonie": "NOUVELLE_CALEDONIE",
  "Polynésie Française": "POLYNESIE",
  "Wallis-et-Futuna": "WALLIS_ET_FUTUNA",
  "Saint-Pierre-et-Miquelon": "SAINT_PIERRE_ET_MIQUELON"
} as const;

export type AcademiesZoneJson = typeof VACATION_ACADEMIES_ZONES;
export type AcademiesJson = keyof AcademiesZoneJson;
export type VacationAcademiesZone = AcademiesZoneJson[keyof AcademiesZoneJson];
