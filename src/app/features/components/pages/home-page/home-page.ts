import {Component, computed, inject, Signal} from '@angular/core';
import {interval, map, of, startWith, switchMap, tap} from 'rxjs';
import {AcademyForm} from '../../academy/components/academy-form/academy-form';
import {AcademyFacade} from '../../../services/academy.facade';
import {toSignal} from '@angular/core/rxjs-interop';
import {AcademyNameResult} from '../../../models/academyNameResult';
import {VacationInfo} from '../../../models/vacationInfo';
import {AcademyName} from '../../../models/academyName';
import {getTimeDuration, getTimeRemaining} from '../../../../shared/helpers/date-utils';
import {VacationStatus} from '../../../enums/vacationStatus';

@Component({
  selector: 'app-home-page',
  imports: [
    AcademyForm
  ],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
})
export class HomePage {
  private academyFacade = inject(AcademyFacade);
  private _academyResult$ = this.academyFacade.getAcademyName();

  // Récupère l'académie via géolocalisation
  academyResult = toSignal<AcademyNameResult>(
    this._academyResult$,
    { initialValue: null }
  );

  // Nom de l'académie extrait du résultat
  academyName: Signal<AcademyName | null> = computed(() => {
    const result = this.academyResult();
    return result?.type === 'success' ? result.academyName : null;
  });

  // Message d'erreur si échec de géolocalisation
  errorMessage = computed(() => {
    const result = this.academyResult();
    return result?.type === 'error' ? result.message : null;
  });

  countdown = toSignal<VacationInfo>(
    this.academyFacade.getHolidaysWithLiveCountdown(this._academyResult$),
    { initialValue: null }
  );
}
