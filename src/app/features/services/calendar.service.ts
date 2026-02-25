import {Injectable} from '@angular/core';
import {Observable, tap} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class CalendarService {
  // private URL = "https://data.education.gouv.fr/api/explore/v2.1/catalog/datasets/fr-en-calendrier-scolaire/records?refine=zones:Zone B&refine=annee_scolaire:2025-2026&sort=start_date;"
  // private URL = "https://data.education.gouv.fr/api/explore/v2.1/catalog/datasets/fr-en-calendrier-scolaire/records?where=location=%27Paris%27%20AND%20start_date%3E=%272026-02-18%27&order_by=start_date"
  private URL = "https://data.education.gouv.fr/api/explore/v2.1/catalog/datasets/fr-en-calendrier-scolaire/records?where="
  private URI = "https://data.education.gouv.fr/api/explore/v2.1/catalog/datasets/fr-en-calendrier-scolaire/records?where=location='Orléans-Tour'"
  // https://data.education.gouv.fr/api/explore/v2.1/catalog/datasets/fr-en-calendrier-scolaire/records?where=location=%27Orl%C3%A9ans-Tours%27%20AND%20start_date%3E=%272026-02-19%27%20AND%20population=%27-%27&order_by=start_date&limit=1
  // https://data.education.gouv.fr/api/explore/v2.1/catalog/datasets/fr-en-calendrier-scolaire/records?where=location=%27Orl%C3%A9ans-Tours%27%20AND%20start_date%3E=%272026-02-19%27%20AND%20population=%27-%27&order_by=start_date&limit=1
  constructor(private http: HttpClient) {
  }

  formatDate(date: Date):string {
    const year = date.getFullYear();
    const month = String(date.getMonth()+1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }

  // https://data.education.gouv.fr/api/explore/v2.1/catalog/datasets/fr-en-calendrier-scolaire/records?where=start_date>=‘2025-10-01’&order_by=start_date
  //
  //   https://data.education.gouv.fr/api/explore/v2.1/catalog/datasets/fr-en-calendrier-scolaire/records?where=location='Paris' AND start_date>=‘2025-10-01’&order_by=start_date
}
