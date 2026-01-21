import { Injectable } from '@angular/core';
import { Car } from '../models/car.model';
import { MOCK_CARS } from '../data/cars.mock';

@Injectable({ providedIn: 'root' })
export class CarService {
  private storageKey = 'cars';

  constructor() {
    this.initStorage();
  }

  private initStorage() {
    if (!localStorage.getItem(this.storageKey)) {
      localStorage.setItem(this.storageKey, JSON.stringify(MOCK_CARS));
    }
  }

  private getCars(): Car[] {
    return JSON.parse(localStorage.getItem(this.storageKey)!) as Car[];
  }

  private saveCars(cars: Car[]) {
    localStorage.setItem(this.storageKey, JSON.stringify(cars));
  }

  getAll(): Car[] {
    return this.getCars();
  }

  getByUser(userId: number): Car[] {
    return this.getCars().filter(car => car.ownerId === userId);
  }

  create(car: Omit<Car, 'id'>) {
    const cars = this.getCars();
    const newCar: Car = {
      ...car,
      id: Date.now()
    };
    cars.push(newCar);
    this.saveCars(cars);
  }

  delete(id: number) {
    const cars = this.getCars().filter(car => car.id !== id);
    this.saveCars(cars);
  }
}
