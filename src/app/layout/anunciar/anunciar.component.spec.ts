import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AnunciarComponent } from './anunciar.component';
import { CarService } from '../../services/car.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ToastService } from '../../services/toast.service';

describe('AnunciarComponent', () => {
  let component: AnunciarComponent;
  let fixture: ComponentFixture<AnunciarComponent>;
  let carService: jasmine.SpyObj<CarService>;
  let authService: any;

  beforeEach(async () => {
    carService = jasmine.createSpyObj('CarService', ['create', 'update', 'getById']);

    authService = {
      auth: {
        currentUser: {
          uid: 'user-123',
          displayName: 'Pablo',
          photoURL: '',
          email: 'test@email.com'
        }
      }
    };

    await TestBed.configureTestingModule({
      imports: [AnunciarComponent],
      providers: [
        { provide: CarService, useValue: carService },
        { provide: AuthService, useValue: authService },
        { provide: Router, useValue: { navigate: () => {} } },
        { provide: ToastService, useValue: { show: () => {} } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AnunciarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should call create when submitting new ad', () => {
    component.car = {
      brand: 'Toyota',
      model: 'Corolla',
      year: 2020,
      km: 30000,
      price: 90000
    };

    component.submit();

    expect(carService.create).toHaveBeenCalled();
  });

  it('should call update when editing', () => {
    component.isEdit = true;
    component.carId = 1;
    component.car = {
      brand: 'Honda',
      model: 'Civic',
      year: 2019,
      km: 40000,
      price: 85000
    };

    component.submit();

    expect(carService.update).toHaveBeenCalled();
  });
});
