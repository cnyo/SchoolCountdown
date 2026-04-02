import {catchError, interval, map, Observable, of, shareReplay, startWith, switchMap, tap} from 'rxjs';
import {GeolocalisationService} from '../../core/services/geolocalisation.service';
import {AcademyService} from './academy.service';
import {Injectable} from '@angular/core';
import {ZoneResult} from '../models/zoneResult';
import {VacationInfo} from '../models/vacationInfo';
import {VacationService} from './vacation.service';
import {VacationStatus} from '../enums/vacationStatus';
import {getTimeDuration, getTimeRemaining} from '../../shared/helpers/date-utils';
import {VacationRemainingInfo} from '../models/vacationRemainingInfo';

@Injectable({providedIn: 'root'})
export class AcademyFacade {

  constructor(
    private geolocalisationService: GeolocalisationService,
    private academyService: AcademyService,
    private holidaysService: VacationService
  ) {
  }

  /**
   * Get the zone name from the localisation
   * @returns
   */
  getZone() {
    return this.geolocalisationService.getPosition().pipe(

      /** Get zone from localisation */
      switchMap(localisation =>
        this.academyService.getZoneFromLocalisation(localisation)
      ),

      tap(data => console.log(data)),

      map(zone =>  ({
          type: 'success' as const,
          zone: zone
        })
      ),

      /** Catch error and return empty observable */
      catchError(error => {
        return of ({
          type: 'error' as const,
          message: this.geolocalisationService.mapErrorCodeToMessage(error)
        });
      }),

      /** Share replay 1 value to avoid multiple subscriptions */
      shareReplay(1)
    );
  }

  getCountdown(_academyResult$: Observable<ZoneResult>): Observable<VacationInfo|null> {
    return _academyResult$.pipe(
      switchMap(academyResult => {
        // Attendre que l'académie soit récupérée avec succès
        if (!academyResult || academyResult.type === 'error') {
          return of(null);
        }

        return this.holidaysService.getNextVacation(academyResult).pipe(

        );
      }),
      catchError(() => of(null))
    )
  }

  getHolidaysWithLiveCountdown(academyResult$: Observable<ZoneResult>): Observable<VacationRemainingInfo> {
    return this.getCountdown(academyResult$).pipe(
      switchMap(initialCountdown => {
        if (!initialCountdown) {
          return of({
            status: VacationStatus.NONE,
            timeRemaining: {days: 0, hours: 0, minutes: 0, seconds: 0},
            targetDate: new Date()
          });
        }

        return interval(1000).pipe(
          startWith(0),
          map(() => ({
            status: initialCountdown.status,
            targetDate: initialCountdown.targetDate,
            timeRemaining: getTimeDuration(
              getTimeRemaining(initialCountdown.targetDate)
            )
          }))
        );
      })
    )}
}
