import {Component, input, signal} from '@angular/core';
import {toObservable, toSignal} from '@angular/core/rxjs-interop';
import {AcademyForm} from '../../academy/academy-form/academy-form';
import {catchError, interval, map, of, startWith, switchMap, tap} from 'rxjs';
import {Zone} from '../../../models/zone';
import {AcademyService} from '../../../services/academy.service';
import {VacationService} from '../../../services/vacation.service';
import {VacationStatus} from '../../../enums/vacationStatus';
import {getTimeDuration, getTimeRemaining} from '../../../../shared/helpers/date-utils';

@Component({
  selector: 'app-home-page',
  imports: [
    AcademyForm
  ],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
})
export class HomePage {
  readonly userZone = input<string>("");
  readonly zone = signal<Zone>('Zone A');
  readonly vacation = toSignal(
    toObservable(this.zone).pipe(
      switchMap(zone => this.fetchNextVacation(zone))
    ),
    { initialValue: undefined }
  )

  constructor(
    private academyService: AcademyService,
    private vacationService: VacationService
  ) {

    // Initialise avec la géolocalisation
    this.initZoneFromGeolocalisation();
  }

  onZoneChange(zone: Zone) {
    this.zone.set(zone);
  }

  private fetchNextVacation(zone: Zone) {

    return this.vacationService.getNextDateVacation(zone).pipe(
      tap(data => console.log(data)),

      switchMap(vacationInfo => {
        if (!vacationInfo) {
          return of({
            status: VacationStatus.NONE,
            timeRemaining: {days: 0, hours: 0, minutes: 0, seconds: 0},
            targetDate: new Date()
          });
        }

        return interval(1000).pipe(
          startWith(0),
          map(() => ({
            status: vacationInfo.status,
            targetDate: vacationInfo.targetDate,
            timeRemaining: getTimeDuration(
              getTimeRemaining(vacationInfo.targetDate)
            )
          }))
        );
      }),
    );
  };

  private initZoneFromGeolocalisation() {
    this.academyService.getZone()
      .pipe(catchError(() => of<Zone>('Zone A')))
      .subscribe(zone => this.zone.set(zone));
  }
}
