import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { VerAnuncioComponent } from './ver-anuncio.component';
import { CarService } from '../../services/car.service';
import { Car } from '../../models/car.model';

describe('VerAnuncioComponent', () => {
  let component: VerAnuncioComponent;
  let fixture: ComponentFixture<VerAnuncioComponent>;
  let carService: jasmine.SpyObj<CarService>;

  beforeEach(async () => {
    carService = jasmine.createSpyObj<CarService>('CarService', ['getById']);

    await TestBed.configureTestingModule({
      imports: [VerAnuncioComponent],
      providers: [
        { provide: CarService, useValue: carService },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: () => '1'
              }
            }
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(VerAnuncioComponent);
    component = fixture.componentInstance;
  });

  it('should load car by id on init', () => {
    const mockCar = {
      id: 1,
      brand: 'VW',
      model: 'Gol'
    } as Car;

    carService.getById.and.returnValue(mockCar);

    fixture.detectChanges(); // dispara ngOnInit

    expect(carService.getById).toHaveBeenCalledWith(1);
    expect(component.car).toEqual(mockCar);
  });

  it('should generate WhatsApp link correctly', () => {
    const car = {
      brand: 'Fiat',
      model: 'Uno',
      ownerName: 'João',
      ownerPhone: '55999999999'
    };

    const link = component.getWhatsAppLink(car);

    expect(link).toContain('https://wa.me/55999999999');
    expect(link).toContain(
      encodeURIComponent('Olá João, vi seu anúncio do Fiat Uno no Auto Commerce.')
    );
  });

  it('should return empty string when car has no phone', () => {
    const link = component.getWhatsAppLink({});

    expect(link).toBe('');
  });
});
