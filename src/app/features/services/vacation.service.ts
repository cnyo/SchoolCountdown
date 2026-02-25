import {Injectable} from '@angular/core';
import {AcademyNameResult} from '../models/academyNameResult';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable, of, switchMap, throwError} from 'rxjs';
import {VacationResult} from '../models/vacationResult';
import {VacationInfo} from '../models/vacationInfo';
import {VacationStatus} from '../enums/vacationStatus';
import {formatDateToString} from '../../shared/helpers/date-utils';
import {environment} from '../../../environments/environment';

@Injectable({providedIn: 'root'})
export class VacationService {
  private URL = environment.vacationApiUrl;
  readonly LIMIT: number = 1;

  constructor(private http: HttpClient) {
  }

  getNextVacation(academyResult: AcademyNameResult): Observable<VacationInfo> {
    if (!academyResult || academyResult.type === 'error') {
      return throwError(() => new Error(academyResult.message ?? 'Unexpected error'))
    }

    const academyName = academyResult.academyName;
    const currentDate = new Date();
    const params = new HttpParams()
      .set('where', this.buildWhereClause(academyName, currentDate))
      .set('order_by', 'start_date')
      .set('limit', this.LIMIT.toString());

    return this.http.get<VacationResult>(this.URL, { params }).pipe(
      switchMap(data => {
        return this.getVacationDateInfo(data, currentDate);
      })
    );
  }

  private getVacationDateInfo(data: VacationResult, currentDate: Date): Observable<VacationInfo> {
    if (data.results.length === 0) {
      throw new Error('Unexpected number of results');
    }

    const startDate = new Date(data.results[0].start_date);
    const endDate = new Date(data.results[0].end_date);
    let status = VacationStatus.Next;
    let targetDate = startDate;

    // If we are on vacation
    if (currentDate >= startDate && currentDate <= endDate) {
      status = VacationStatus.End;
      targetDate = endDate;
    }

    return of({
      status,
      targetDate: targetDate
    })
  }

  private buildWhereClause(academyName: string, currentDate: Date): string {
    const currentDateStr = formatDateToString(currentDate);

    return [
      `location='${academyName}'`,
      `(start_date>='${currentDateStr}' OR (start_date<='${currentDateStr}' AND end_date>='${currentDateStr}'))`,
      `population='-'`
    ].join(' AND ');
  }
}

