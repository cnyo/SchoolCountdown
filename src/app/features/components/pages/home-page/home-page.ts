import {Component, computed, inject, Signal} from '@angular/core';
import {AcademyFacade} from '../../../services/academy.facade';
import {toSignal} from '@angular/core/rxjs-interop';
import {AcademyNameResult} from '../../../models/academyNameResult';
import {AcademyName} from '../../../models/academyName';
import {VacationRemainingInfo} from '../../../models/vacationRemainingInfo';

@Component({
  selector: 'app-home-page',
  imports: [],
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

  countdown = toSignal<VacationRemainingInfo>(
    this.academyFacade.getHolidaysWithLiveCountdown(this._academyResult$),
    { initialValue: null }
  );
}
