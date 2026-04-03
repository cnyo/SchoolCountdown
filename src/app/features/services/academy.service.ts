import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {from, map, Observable, of, shareReplay, switchMap, tap} from 'rxjs';
import {Localisation} from '../../core/models/localisation';
import {ReverseGeolocalisation} from '../models/reverseGeolocalisation';
import {VACATION_ZONE_JSON, VacationZoneGroup} from '../models/vacationZoneJson';
import {AcademyNameJson, DepartmentCodeJson, DEPARTMENTS_JSON} from '../models/departmentsJson';
import {AcademiesJson, VACATION_ACADEMIES_ZONES} from '../models/vacationAcademiesZoneJson';
import {Zone} from '../models/zone';

/**
 * Service to resolve the academy from the department code
 */
@Injectable({providedIn: 'root'})
export class AcademyService {
  private readonly REVERSE_GEOCODING_URL = 'https://nominatim.openstreetmap.org/reverse?format=json';
  private dptCode: string|null = null;

  constructor(private http: HttpClient) {
  }

  /**
   * Get the zone from the localisation
   * @param localisation
   */
  public getZoneFromLocalisation(localisation: Localisation): Observable<String> {

    return this.fetchReverseGeocodingFromLocalisation(localisation).pipe(
      // Extract department code
      map(data => data.address['ISO3166-2-lvl6'].substring(3)),

      // Get academy by department code
      map(dptCode => {
        if (!this.isDepartmentCode(dptCode)) {
          throw new Error(`Code département invalide : ${dptCode}`);
        }

        return this.getAcademyFromDptCode(dptCode);
      }),

      map(academy => {
        if (!this.isAcademy(academy)) {
          console.log('erreur !');
          throw new Error(`Académie invalide : ${academy}`);
        }

        return this.getZoneFromAcademy(academy);
      })
    );
  }

  public getZoneFromLocalisationBrowser(localisation: Localisation): Observable<Zone> {

    return this.fetchReverseGeocodingFromLocalisation(localisation).pipe(
      // Extract department code
      map(data => data.address['ISO3166-2-lvl6'].substring(3)),

      // Get academy by department code
      map(dptCode => {
        if (!this.isDepartmentCode(dptCode)) {
          throw new Error(`Code département invalide : ${dptCode}`);
        }

        return this.getAcademyFromDptCode(dptCode);
      }),

      map(academy => {
        if (!this.isAcademy(academy)) {
          console.log('erreur !');
          throw new Error(`Académie invalide : ${academy}`);
        }

        return this.getZoneFromAcademy(academy);
      })
    );
  }

  public getZoneGroups(): VacationZoneGroup[] {
    return [VACATION_ZONE_JSON.metropole, VACATION_ZONE_JSON.outre_mer];
  }

  /**
   * Get the academy from the department code
   */
  private getAcademyFromDptCode(dptCode: DepartmentCodeJson): AcademyNameJson {
    return DEPARTMENTS_JSON[dptCode];
  }

  getZoneFromAcademy(academy: AcademiesJson): Zone {
    return VACATION_ACADEMIES_ZONES[academy];
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

  private isDepartmentCode(value: string): value is DepartmentCodeJson {
    return value in DEPARTMENTS_JSON;
  }

  private isAcademy(value: string): value is AcademyNameJson {
    return value in VACATION_ACADEMIES_ZONES;
  }

  getZone() {

    if (!navigator.geolocation) {
      return of<Zone>('Zone A');
    }

    return from(
      new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      })
    ).pipe(

      map(position => ({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        })
      ),

      switchMap(localisation => {
        return this.fetchReverseGeocodingFromLocalisation(localisation)
          .pipe(
            // Extract department code
            map(data => data.address['ISO3166-2-lvl6'].substring(3)),

            // Get academy by department code
            map(dptCode => {
              if (!this.isDepartmentCode(dptCode)) {
                throw new Error(`Code département invalide : ${dptCode}`);
              }

              return this.getAcademyFromDptCode(dptCode);
            }),

            // Get zone from academy
            map(academy => {
              if (!this.isAcademy(academy)) {
                throw new Error(`Académie invalide : ${academy}`);
              }

              return this.getZoneFromAcademy(academy);
            }),
          );
      }),


      /** Get zone from localisation */
      // map(localisation =>
      //   this.getZoneFromLocalisationBrowser(localisation)
      // )

        /** Share replay 1 value to avoid multiple subscriptions */
        shareReplay(1)
    );
  }
}
