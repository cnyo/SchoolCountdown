import {Component, computed, inject, Signal} from '@angular/core';
import {AcademyFacade} from '../../../services/academy.facade';
import {toSignal} from '@angular/core/rxjs-interop';
import {ZoneResult} from '../../../models/zoneResult';
import {VacationRemainingInfo} from '../../../models/vacationRemainingInfo';
import {AcademyForm} from '../../academy/academy-form/academy-form';

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
  private _zoneResult$ = this.academyFacade.getZone();

  // Récupère l'académie via géolocalisation
  zoneResult = toSignal<ZoneResult>(
    this._zoneResult$,
    { initialValue: null }
  );

  // Nom de l'académie extrait du résultat
  zone: Signal<string | null> = computed(() => {
    const result = this.zoneResult();
    return result?.type === 'success' ? result.zone : null;
  });

  // Message d'erreur si échec de géolocalisation
  errorMessage = computed(() => {
    const result = this.zoneResult();
    return result?.type === 'error' ? result.message : null;
  });

  countdown = toSignal<VacationRemainingInfo>(
    this.academyFacade.getHolidaysWithLiveCountdown(this._zoneResult$),
    { initialValue: null }
  );
}
