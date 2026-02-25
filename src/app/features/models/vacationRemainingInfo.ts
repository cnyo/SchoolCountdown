import {TimeDuration} from './timeDuration';
import {VacationInfo} from './vacationInfo';

export type VacationRemainingInfo = VacationInfo & {
  timeRemaining: TimeDuration,
};
