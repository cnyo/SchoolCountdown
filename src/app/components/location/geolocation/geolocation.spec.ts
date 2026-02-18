import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Geolocation } from './geolocation';

describe('Geolocation', () => {
  let component: Geolocation;
  let fixture: ComponentFixture<Geolocation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Geolocation]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Geolocation);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
