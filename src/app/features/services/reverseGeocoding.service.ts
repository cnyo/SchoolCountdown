import {Localisation} from '../../core/models/localisation';
import {Injectable} from '@angular/core';

/**
 * Service to get the reverse geocoding of a position
 */
@Injectable({providedIn: 'root'})
export class ReverseGeocodingService {
  private readonly uriApi = 'https://nominatim.openstreetmap.org/reverse?format=json';

  /**
   * Get the reverse geocoding of a position
   * @param position
   */
  async fetchReverseGeocodingByPosition(position: Localisation) {
    const r = await fetch(`${this.uriApi}&lat=${position.latitude}&lon=${position.longitude}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json'
      }
    });

    if (r.ok) {
      return r.json();
    }

    throw new Error('Error while fetching data');
  }
}
