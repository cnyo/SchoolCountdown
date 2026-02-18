import {Injectable, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, Observable, tap} from 'rxjs';
import {SelectOptionAcademy} from '../models/selectOptionAcademy';
import {DepartmentAcademyMap} from '../models/DepartmentAcademyMap';

@Injectable({providedIn: 'root'})
export class AcademyResolverService {
  private readonly URL = 'json/departement-to-academie.json';
  academy = signal<string>("");

  constructor(private http: HttpClient) {
  }

  getZoneByDptCode(dptCode: string): Observable<string|undefined> {
    return this.getDepartmentAcademies().pipe(
      map(data => data[dptCode]),
      tap(academy => {
        console.log(academy);
        if (academy) {
          this.academy.set(academy);
        }
      })
    );
  }

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

  private getDepartmentAcademies(): Observable<DepartmentAcademyMap> {
    return this.http.get<DepartmentAcademyMap>(this.URL);
  }
}
