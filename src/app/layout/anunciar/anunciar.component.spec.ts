import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AnunciarComponent } from './anunciar.component';
import { CarService } from '../../services/car.service';
import { AuthService } from '../../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastService } from '../../services/toast.service';
import { ReactiveFormsModule } from '@angular/forms';

describe('AnunciarComponent', () => {
  let component: AnunciarComponent;
  let fixture: ComponentFixture<AnunciarComponent>;
  let carService: jasmine.SpyObj<CarService>;

  beforeEach(async () => {
    carService = jasmine.createSpyObj('CarService', ['create', 'update', 'getById']);

    await TestBed.configureTestingModule({
      imports: [AnunciarComponent, ReactiveFormsModule],
      providers: [
        { provide: CarService, useValue: carService },
        { provide: AuthService, useValue: { auth: { currentUser: { uid: 'user-123' } } } },
        { provide: Router, useValue: { navigate: () => {} } },
        { provide: ToastService, useValue: { show: () => {} } },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: () => null
              }
            }
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AnunciarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });
});
