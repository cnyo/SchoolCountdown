import {Component, inject, OnDestroy, OnInit, signal} from '@angular/core';
import {Subscription} from 'rxjs';
import {AcademyForm} from '../../academy/components/academy-form/academy-form';
import {AcademyFacade} from '../../services/academy.facade';
import {toSignal} from '@angular/core/rxjs-interop';

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
  private subscription!: Subscription;

  protected isLoading = signal<boolean>(false);

  errorMessage = this.academyFacade.errorMessage;
  academy = toSignal(
    this.academyFacade.getAcademyName(),
    { initialValue: '' }
  );
  // nextHolidays = computed(this.holidaysService.getHolidays(this._academy()));

  ngOnInit(): void {
    // this.isLoading.set(true);

    // this.isLoading.set(false);

    // this.holidaysService.getHolidays(this._academy()).subscribe();
    // console.log(this._academy);
    // console.log(this.nextHolidays);
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
