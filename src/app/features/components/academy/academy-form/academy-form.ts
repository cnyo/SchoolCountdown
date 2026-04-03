import {ChangeDetectionStrategy, Component, effect, inject, input, model, output, signal} from '@angular/core';
import {FormsModule, NgForm} from '@angular/forms';
import {AcademyService} from '../../../services/academy.service';
import {VacationZoneGroup} from '../../../models/vacationZoneJson';
import {Zone} from '../../../models/zone';

@Component({
  selector: 'app-academy-form',
  imports: [
    FormsModule
  ],
  templateUrl: './academy-form.html',
  styleUrl: './academy-form.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AcademyForm {
  private academyResolverService: AcademyService = inject(AcademyService);

  readonly zone = input.required<Zone>();
  readonly zones: VacationZoneGroup[] = this.academyResolverService.getZoneGroups();
  readonly zoneChange = output<Zone>();

  /**
   * Signal to track the currently selected zone
   */
  readonly selectedZone = model<Zone>('Zone A');
  protected errorMsg = signal<string|null>(null);

  constructor() {
    /**
     * Effect to update the selected zone when the zone input changes
     */
    effect(() => {
      this.selectedZone.set(this.zone());
    });
  }

  onZoneSelected(zone: Zone): void {
    console.log(zone);

    this.selectedZone.set(zone);
    this.zoneChange.emit(zone);
  }


}
