import {catchError, map, Observable, of, shareReplay, switchMap} from 'rxjs';
import {GeolocalisationService} from '../../../core/services/geolocalisation.service';
import {AcademyService} from './academy.service';
import {Injectable} from '@angular/core';
import {AcademyResult} from '../models/academyResult';

@Injectable({providedIn: 'root'})
export class AcademyFacade {

  constructor(
    private geolocalisationService: GeolocalisationService,
    private academyService: AcademyService
  ) {
  }

  /**
   * Get the academy name from the localisation
   * @returns
   */
  public getAcademyName(): Observable<AcademyResult>  {
    return this.geolocalisationService.getPosition().pipe(
      /** Get academy from localisation */
      switchMap(localisation =>
        this.academyService.getAcademyFromLocalisation(localisation)
      ),

      // TODO: use enum for type
      map(academy =>  ({
          type: 'success' as const,
          academyName: academy
        })
      ),

      /** Catch error and return empty observable */
      catchError(error => {
        // TODO: use enum for type
        return of ({
          type: 'error' as const,
          message: this.geolocalisationService.mapErrorCodeToMessage(error)
        });
      }),

      /** Share replay 1 value to avoid multiple subscriptions */
      shareReplay(1)
    );
  }
}
