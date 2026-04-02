export type ZoneResult =
  | { type: 'success', zone: string }
  | { type: 'error', message: string};
