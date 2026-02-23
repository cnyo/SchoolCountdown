export type AcademyResult =
  | { type: 'success', academyName: string }
  | { type: 'error', message: string};
