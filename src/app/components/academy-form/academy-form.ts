import {Component, inject, OnInit, signal} from '@angular/core';
import {FormsModule, NgForm} from '@angular/forms';
import {AcademyResolverService} from '../../services/academyResolverService';
import {toSignal} from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-academy-form',
  imports: [
    FormsModule
  ],
  templateUrl: './academy-form.html',
  styleUrl: './academy-form.scss',
})
export class AcademyForm implements OnInit{
  private academyResolverService: AcademyResolverService = inject(AcademyResolverService);

  protected academy: string = "";
  protected academies = toSignal(
    this.academyResolverService.getAcademies(),
    { initialValue: [] }
  );
  protected errorMsg = signal<string|null>(null);

  ngOnInit(): void {
    // this.academyResolverService.getAcademies();
    //   .subscribe(academies => {
    //   this.optionAcademy$ = academies;
    //   console.log(this.optionAcademy$);
    // });
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
