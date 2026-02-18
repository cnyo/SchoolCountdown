import {Component, inject, OnDestroy, OnInit, signal} from '@angular/core';
import {UserLocationService} from '../../services/userLocation.service';
import {Position} from '../../models/position';
import {ReverseGeocodingService} from '../../services/reverseGeocodingService';
import {AcademyResolverService} from '../../services/academyResolverService';
import {Subscription, tap} from 'rxjs';
import {AcademyForm} from '../../components/academy-form/academy-form';

@Component({
  selector: 'app-home-page',
  imports: [
    AcademyForm
  ],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
})
export class HomePage implements OnInit, OnDestroy {
  private userLocationService:UserLocationService = inject(UserLocationService);
  private reverseGeocodingService:ReverseGeocodingService = inject(ReverseGeocodingService);
  private academyResolverService:AcademyResolverService = inject(AcademyResolverService);

  protected geoLocalisation = signal<string>('');
  protected county = signal<string>('');
  protected isLoading = signal<boolean>(false);

  errorMessage:undefined|string = undefined;

  academy = this.academyResolverService.academy;
  // academies ;

  private subscription!: Subscription;

  ngOnInit(): void {
    this.isLoading.set(true);
    this.userLocationService.getGeolocation().subscribe({
      next: (position) => this.setCounty(position),
      error: (error) => this.errorMessage = this.userLocationService.mapErrorCodeToMessage(error)
    });

    this.isLoading.set(false);

    console.log(this.academy);
  }

  private setCounty(position: Position) {
    const json = this.reverseGeocodingService.fetchReverseGeocodingByPosition(position);
    json.then(data => {
      const dptCode: string = data.address['ISO3166-2-lvl6'].substring(3);
      console.log(dptCode);
      this.subscription = this.academyResolverService.getZoneByDptCode(dptCode).subscribe();
      // const completeDepartmentCode: string = data.address['ISO3166-2-lvl6']
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
