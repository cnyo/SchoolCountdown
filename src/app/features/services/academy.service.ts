import {Injectable, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, Observable, switchMap, tap} from 'rxjs';
import {SelectOptionAcademy} from '../models/selectOptionAcademy';
import {DepartmentAcademyMap} from '../models/DepartmentAcademyMap';
import {Localisation} from '../../core/models/localisation';
import {ReverseGeolocalisation} from '../models/reverseGeolocalisation';
import {Academy} from '../models/academy';
import {AcademyName} from '../models/academyName';

/**
 * Service to resolve the academy from the department code
 */
@Injectable({providedIn: 'root'})
export class AcademyService {
  private readonly ACADEMIES_JSON_URL = 'json/departement-to-academie.json';
  private readonly REVERSE_GEOCODING_URL = 'https://nominatim.openstreetmap.org/reverse?format=json';
  private dptCode: string|null = null;

  academy = signal<string|null>(null);

  constructor(private http: HttpClient) {
  }

  /**
   * Get the academy from the localisation
   * @param localisation
   */
  public getAcademyFromLocalisation(localisation: Localisation): Observable<AcademyName> {

    return this.fetchReverseGeocodingFromLocalisation(localisation).pipe(
      // Extract deparetment code
      map(data => data.address['ISO3166-2-lvl6'].substring(3)),

      // Get academy by department code
      switchMap(dptCode => this.getAcademyFromDptCode(dptCode)
      ),

      map(result => result.academy ?? ''),
    );
  }

  /**
  * Get the list of academies
  */
  getAcademies(): Observable<SelectOptionAcademy[]> {
    return this.getDepartmentAcademies().pipe(
      map(data => {
        // Récupère uniquement les valeurs (ici les académies)
        const academies = Object.values(data);
        // Supprime les doublons
        const uniqueAcademies = [...new Set(academies)];
        const sortedAcademies = uniqueAcademies.sort();

        return sortedAcademies.map(academy => ({
          label: academy,
          value: academy
        }))
      })
    );
  }

  /**
   * Get the academy from the department code
   */
  private getAcademyFromDptCode(dptCode: string): Observable<Academy> {
    return this.http.get<DepartmentAcademyMap>(this.ACADEMIES_JSON_URL).pipe(
      map(academies => ({ academy: academies[dptCode], dptCode: dptCode}))
    );
  }

  /**
  * Get the department academies
  */
  private getDepartmentAcademies(): Observable<DepartmentAcademyMap> {
    return this.http.get<DepartmentAcademyMap>(this.ACADEMIES_JSON_URL);
  }

  /**
  * Get the reverse geocoding from the localisation
  */
  private fetchReverseGeocodingFromLocalisation(localisation: Localisation): Observable<ReverseGeolocalisation>{
    const url = `${this.REVERSE_GEOCODING_URL}&lat=${localisation.latitude}&lon=${localisation.longitude}`;

    return this.http.get<ReverseGeolocalisation>(url).pipe(
      tap(data => this.dptCode = data.address['ISO3166-2-lvl6'].substring(3)),
    );
  }
}
