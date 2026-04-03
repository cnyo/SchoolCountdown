import zoneJson from '../../../../public/json/zones.json';

// todo: type academies value with metropole zones and outre_mer
export type VacationZoneOption = {
  value: string, // MetropoleZoneValue | OutreMerZoneValue
  label: string,
  academies?: string[]
}

export type VacationZoneGroup = {
  label: string,
  options: VacationZoneOption[]
}

export type VacationZoneJson = {
  metropole: VacationZoneGroup,
  outre_mer: VacationZoneGroup
}

export const VACATION_ZONE_JSON: VacationZoneJson = zoneJson;
