import { CarService } from './car.service';
import { Car } from '../models/car.model';

describe('CarService', () => {
  let service: CarService;

  beforeEach(() => {
    service = new CarService();
    localStorage.clear();
  });

  it('should start with empty list', () => {
    const cars = service.getAll();
    expect(cars.length).toBe(0);
  });

  it('should create a car with ownerId and contact info', () => {
    service.create(
      {
        brand: 'Toyota',
        model: 'Corolla',
        year: 2020,
        km: 30000,
        price: 90000,
        description: 'Bem conservado',
        image: '',
        ownerName: 'Pablo',
        ownerPhoto: '',
        ownerPhone: '5511999999999'
      },
      'user-123'
    );

    const cars = service.getAll();
    expect(cars.length).toBe(1);
    expect(cars[0].ownerId).toBe('user-123');
    expect(cars[0].ownerPhone).toBe('5511999999999');
  });

  it('should get car by id', () => {
    service.create(
      {
        brand: 'Honda',
        model: 'Civic',
        year: 2019,
        km: 40000,
        price: 85000,
        description: '',
        image: '',
        ownerName: 'User',
        ownerPhoto: '',
        ownerPhone: ''
      },
      'user-1'
    );

    const car = service.getAll()[0];
    const found = service.getById(car.id);

    expect(found).toBeTruthy();
    expect(found?.model).toBe('Civic');
  });

  it('should update a car', () => {
    service.create(
      {
        brand: 'Ford',
        model: 'Ka',
        year: 2018,
        km: 50000,
        price: 40000,
        description: '',
        image: '',
        ownerName: '',
        ownerPhoto: '',
        ownerPhone: ''
      },
      'user-1'
    );

    const car = service.getAll()[0];

    service.update(car.id, { price: 38000 });

    const updated = service.getById(car.id);
    expect(updated?.price).toBe(38000);
  });

  it('should delete a car', () => {
    service.create(
      {
        brand: 'VW',
        model: 'Gol',
        year: 2017,
        km: 60000,
        price: 35000,
        description: '',
        image: '',
        ownerName: '',
        ownerPhoto: '',
        ownerPhone: ''
      },
      'user-1'
    );

    const car = service.getAll()[0];
    service.delete(car.id);

    expect(service.getAll().length).toBe(0);
  });

  it('should return only cars from a user', () => {
    service.create(
      {
        brand: 'Fiat',
        model: 'Uno',
        year: 2016,
        km: 70000,
        price: 30000,
        description: '',
        image: '',
        ownerName: '',
        ownerPhoto: '',
        ownerPhone: ''
      },
      'user-1'
    );

    service.create(
      {
        brand: 'BMW',
        model: '320i',
        year: 2021,
        km: 15000,
        price: 200000,
        description: '',
        image: '',
        ownerName: '',
        ownerPhoto: '',
        ownerPhone: ''
      },
      'user-2'
    );

    const userCars = service.getByUser('user-1');
    expect(userCars.length).toBe(1);
    expect(userCars[0].brand).toBe('Fiat');
  });
});
