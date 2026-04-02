import {Component, inject, OnInit, signal} from '@angular/core';
import {FormsModule, NgForm} from '@angular/forms';
import {AcademyService} from '../../../services/academy.service';
import {toSignal} from '@angular/core/rxjs-interop';
import {VacationZoneGroup} from '../../../models/vacationZoneJson';

@Component({
  selector: 'app-academy-form',
  imports: [
    FormsModule
  ],
  templateUrl: './academy-form.html',
  styleUrl: './academy-form.scss',
})
export class AcademyForm implements OnInit{
  private academyResolverService: AcademyService = inject(AcademyService);

  protected academy: string = "";

  zones: VacationZoneGroup[] = this.academyResolverService.getZoneGroups();
  protected errorMsg = signal<string|null>(null);

  ngOnInit(): void {
    // const test = this.academyResolverService.getZoneGroups();
  }

  protected onFormSubmit(form: NgForm) {
    if (this.academy == "") {
      this.errorMsg.set("Veuillez sélectionner une académie.");
    }
    console.log(this.academy);
    console.log(form.value);

    // Go chercher les dates de vacances
  }
}
