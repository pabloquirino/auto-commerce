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
    const cars = localStorage.getItem(this.storageKey);

    if (!cars || JSON.parse(cars).length === 0) {
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

  getByUser(userId: string): Car[] {
    return this.getCars().filter(car => car.ownerId === userId);
  }

  getById(id: number): Car | undefined {
    return this.getCars().find(car => car.id === id);
  }

  create(car: Omit<Car, 'id' | 'ownerId'>, userId: string) {
    const cars = this.getCars();

    const newCar: Car = {
      ...car,
      id: Date.now(),
      ownerId: userId
    };

    cars.push(newCar);
    this.saveCars(cars);
  }

  update(id: number, updatedData: Partial<Car>) {
    const cars = this.getCars();

    const index = cars.findIndex(car => car.id === id);
    if (index === -1) return;

    cars[index] = {
      ...cars[index],
      ...updatedData
    };

    this.saveCars(cars);
  }

  delete(id: number) {
    const cars = this.getCars().filter(car => car.id !== id);
    this.saveCars(cars);
  }

}
