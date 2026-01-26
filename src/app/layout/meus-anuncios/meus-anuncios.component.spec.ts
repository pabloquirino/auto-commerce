import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MeusAnunciosComponent } from './meus-anuncios.component';
import { CarService } from '../../services/car.service';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('MeusAnunciosComponent', () => {
  let component: MeusAnunciosComponent;
  let fixture: ComponentFixture<MeusAnunciosComponent>;
  let carService: jasmine.SpyObj<CarService>;

  beforeEach(async () => {
    carService = jasmine.createSpyObj('CarService', ['getByUser', 'delete']);

    await TestBed.configureTestingModule({
      imports: [MeusAnunciosComponent],
      providers: [
        { provide: CarService, useValue: carService },
        {
          provide: AuthService,
          useValue: {
            user$: of({ uid: 'user-123' }),
            auth: { currentUser: { uid: 'user-123' } }
          }
        },

        {
          provide: ActivatedRoute,
          useValue: {
            params: of({}),
            snapshot: { params: {} }
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(MeusAnunciosComponent);
    component = fixture.componentInstance;
  });

  it('should load user ads on init', () => {
    carService.getByUser.and.returnValue([]);

    fixture.detectChanges(); 

    expect(carService.getByUser).toHaveBeenCalledWith('user-123');
    expect(component.myAds).toEqual([]);
  });

  it('should remove ad and reload user ads', () => {
    carService.getByUser.and.returnValue([]);

    carService.delete.and.callFake(() => {});

    component.remove(1);

    expect(carService.delete).toHaveBeenCalledWith(1);
    expect(carService.getByUser).toHaveBeenCalledWith('user-123');
    expect(component.myAds).toEqual([]);
  });
});
