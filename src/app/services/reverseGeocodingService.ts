import {Position} from '../models/position';
import {Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})
export class ReverseGeocodingService {
  private readonly uriApi = 'https://nominatim.openstreetmap.org/reverse?format=json';

  async fetchReverseGeocodingByPosition(position: Position) {
    console.log(`${this.uriApi}&lat=${position.latitude}&lon=${position.longitude}`);
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
