import {TimeDuration} from '../../features/models/timeDuration';

export function  getTimeRemaining(targetDate: Date): number {
  const nowInMs = new Date().getTime();
  const targetDateInMs = targetDate.getTime();

  let diffInMs = targetDateInMs - nowInMs;
  if (diffInMs < 0) {
    diffInMs = 0;
  }

  return diffInMs;
}

export function getTimeDuration(diffMs: number): TimeDuration {
  const days = Math.floor(diffMs / (1000*60*60*24));
  diffMs -= days * (1000*60*60*24);

  const hours = Math.floor(diffMs / (1000*60*60));
  diffMs -= hours * (1000*60*60);

  const minutes = Math.floor(diffMs / (1000*60));
  diffMs -= minutes * (1000*60);

  const seconds = Math.floor(diffMs / 1000);

  return { days, hours, minutes, seconds };
}

export function formatDateToString(date: Date):string {
  const year = date.getFullYear();
  const month = String(date.getMonth()+1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}
