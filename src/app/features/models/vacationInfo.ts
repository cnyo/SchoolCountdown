import {VacationStatus} from '../enums/vacationStatus';

export type VacationInfo = {
  status: VacationStatus,
  targetDate: Date
};
