import { Car } from '../models/car.model';

export const MOCK_CARS: Car[] = [
  {
    id: 1,
    brand: 'Toyota',
    model: 'Corolla',
    year: 2020,
    km: 45000,
    price: 75000,
    description: 'Sedan confortável e econômico.',
    image: '/assets/cars/corolla.jpg',
    ownerId: 1
  }
];
