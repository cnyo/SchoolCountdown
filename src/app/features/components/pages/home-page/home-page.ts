import {Component, computed, inject, OnDestroy, OnInit, signal} from '@angular/core';
import {Subscription} from 'rxjs';
import {AcademyForm} from '../../academy/components/academy-form/academy-form';
import {AcademyFacade} from '../../services/academy.facade';
import {toSignal} from '@angular/core/rxjs-interop';
import {AcademyResult} from '../../models/academyResult';

@Component({
  selector: 'app-home-page',
  imports: [
    AcademyForm
  ],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
})
export class HomePage implements OnInit, OnDestroy {
  private academyFacade:AcademyFacade = inject(AcademyFacade);
  // private holidaysService:HolidaysService = inject(HolidaysService);
  private subscription!: Subscription;

  protected isLoading = signal<boolean>(false);

  _academyResult = toSignal<AcademyResult>(
    this.academyFacade.getAcademyName(),
    { initialValue: null }
  )

  academy = computed(() => {
    const result = this._academyResult();
    return result?.type === 'success' ? result.academyName : null
  });

  errorMessage = computed(() => {
    const result = this._academyResult();
    return result?.type === 'error' ? result.message : null
  })

  // nextHolidays = computed(this.holidaysService.getHolidays(this.academy()));

  ngOnInit(): void {
    // this.isLoading.set(true);

    // this.isLoading.set(false);

    // this.holidaysService.getHolidays(this.academy()).subscribe();
    // console.log(this.academy);
    // console.log(this.nextHolidays);
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
