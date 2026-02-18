import {Injectable} from '@angular/core';
import {Position} from '../models/position';
import {Observable} from 'rxjs';
import {GeolocalisationError} from '../models/geolocalisationError';
import {GeolocationErrorCode} from '../enums/geolocationErrorCode';

@Injectable({providedIn: 'root'})
export class UserLocationService {
  private readonly errorMessages = {
    'NOT_SUPPORTED': 'Geolocation is not supported by this browser.',
    'PERMISSION_DENIED': 'User denied the request for Geolocation.',
    'POSITION_UNAVAILABLE': 'Location information is unavailable.',
    'TIMEOUT': 'The request to get user location timed out.',
    'UNKNOWN_ERROR': 'An unknown error occurred.'
  };

  /**
   * Get the user geolocation
   */
  getGeolocation(): Observable<Position> {
    return new Observable<Position>(observer => {
      if (!("geolocation" in navigator)) {
        observer.error({
          code: 0,
          message: this.errorMessages.NOT_SUPPORTED
        });
        return;
      }

      console.log("Geolocation is supported!");

      navigator.geolocation.getCurrentPosition(position => {
        observer.next({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });
        observer.complete();
      },
        error => {
          observer.error({
            code: error.code,
            message: error.message
          });
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0
        });
    });
  }

  /**
   * Map the error code to a readable message
   * @param error
   */
  mapErrorCodeToMessage(error: GeolocalisationError) {
    switch (error.code) {
      case GeolocationErrorCode.PERMISSION_DENIED:
        return this.errorMessages.PERMISSION_DENIED;
      case GeolocationErrorCode.POSITION_UNAVAILABLE:
        return this.errorMessages.POSITION_UNAVAILABLE;
      case GeolocationErrorCode.TIMEOUT:
        return this.errorMessages.TIMEOUT;
      default:
        return this.errorMessages.TIMEOUT;
    }
  }
}
