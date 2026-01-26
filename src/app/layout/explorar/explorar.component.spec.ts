import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExplorarComponent } from './explorar.component';
import { CarService } from '../../services/car.service';
import { AuthService } from '../../services/auth.service';
import { Car } from '../../models/car.model';

describe('ExplorarComponent', () => {
  let component: ExplorarComponent;
  let fixture: ComponentFixture<ExplorarComponent>;
  let carService: jasmine.SpyObj<CarService>;

  const mockCars: Car[] = [
    {
      id: 1,
      brand: 'Fiat',
      model: 'Uno',
      year: 2018,
      price: 30000
    } as Car,
    {
      id: 2,
      brand: 'VW',
      model: 'Gol',
      year: 2020,
      price: 45000
    } as Car,
    {
      id: 3,
      brand: 'BMW',
      model: 'X1',
      year: 2022,
      price: 220000
    } as Car
  ];

  beforeEach(async () => {
    carService = jasmine.createSpyObj<CarService>('CarService', ['getAll']);
    carService.getAll.and.returnValue(mockCars);

    await TestBed.configureTestingModule({
      imports: [ExplorarComponent],
      providers: [
        { provide: CarService, useValue: carService },
        { provide: AuthService, useValue: {} }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ExplorarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // ngOnInit
  });

  it('should load cars on init', () => {
    expect(component.cars.length).toBe(3);
    expect(component.filteredCars.length).toBe(3);
    expect(carService.getAll).toHaveBeenCalled();
  });

  it('should generate unique brands and years', () => {
    expect(component.brands).toEqual(['BMW', 'Fiat', 'VW']);
    expect(component.years).toEqual([2022, 2020, 2018]);
  });

  it('should filter by search term', () => {
    component.searchTerm = 'bmw';
    component.applyFilters();

    expect(component.filteredCars.length).toBe(1);
    expect(component.filteredCars[0].brand).toBe('BMW');
  });

  it('should filter by year', () => {
    component.selectedYear = 2020;
    component.applyFilters();

    expect(component.filteredCars.length).toBe(1);
    expect(component.filteredCars[0].model).toBe('Gol');
  });

  it('should filter by brand', () => {
    component.selectedBrand = 'Fiat';
    component.applyFilters();

    expect(component.filteredCars.length).toBe(1);
    expect(component.filteredCars[0].model).toBe('Uno');
  });

  it('should filter by price range', () => {
    component.selectedPriceRange = '200000+';
    component.applyFilters();

    expect(component.filteredCars.length).toBe(1);
    expect(component.filteredCars[0].brand).toBe('BMW');
  });

  it('should combine multiple filters', () => {
    component.selectedBrand = 'VW';
    component.selectedYear = 2020;
    component.searchTerm = 'gol';
    component.applyFilters();

    expect(component.filteredCars.length).toBe(1);
    expect(component.filteredCars[0].brand).toBe('VW');
  });
});
