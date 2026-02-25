export type AcademyNameResult =
  | { type: 'success', academyName: string }
  | { type: 'error', message: string};
