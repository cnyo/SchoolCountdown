import {catchError, EMPTY, Observable, shareReplay, switchMap} from 'rxjs';
import {GeolocalisationService} from '../../../core/services/geolocalisation.service';
import {AcademyService} from './academy.service';
import {Injectable, signal} from '@angular/core';
import {AcademyName} from '../models/academyName';

@Injectable({providedIn: 'root'})
export class AcademyFacade {
  errorMessage = signal<null|string>(null);

  constructor(
    private geolocalisationService: GeolocalisationService,
    private academyService: AcademyService
  ) {
  }

  /**
   * Get the academy name from the localisation
   * @returns
   */
  public getAcademyName(): Observable<AcademyName>  {
    return this.geolocalisationService.getPosition().pipe(
      /** Get academy from localisation */
      switchMap(localisation =>
        this.academyService.getAcademyFromLocalisation(localisation)
      ),

      /** Catch error and return empty observable */
      catchError(error => {
        this.errorMessage.set(this.geolocalisationService.mapErrorCodeToMessage(error));
        return EMPTY;
      }),

      /** Share replay 1 value to avoid multiple subscriptions */
      shareReplay(1)
    );
  }
}
