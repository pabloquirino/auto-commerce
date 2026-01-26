import { Injectable } from '@angular/core';
import { Car } from '../models/car.model';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  private storageKey = 'cars';
  private cars: Car[] = [];

  constructor() {
    const stored = localStorage.getItem(this.storageKey);
    this.cars = stored ? JSON.parse(stored) : [];
  }

  private saveToStorage() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.cars));
  }

  getAll(): Car[] {
    return [...this.cars];
  }

  getById(id: number): Car | undefined {
    return this.cars.find(car => car.id === id);
  }

  getByUser(userId: string): Car[] {
    return this.cars.filter(car => car.ownerId === userId);
  }

  create(car: Partial<Car>, ownerId: string): void {
    const newCar: Car = {
      id: this.generateId(),
      ...car,
      ownerId,
      ownerName: car.ownerName || '',
      ownerPhoto: car.ownerPhoto || '',
      ownerPhone: car.ownerPhone || ''
    } as Car;

    this.cars.push(newCar);
    this.saveToStorage();
  }

  update(id: number, updatedFields: Partial<Car>): void {
    const index = this.cars.findIndex(car => car.id === id);
    if (index !== -1) {
      this.cars[index] = { ...this.cars[index], ...updatedFields };
      this.saveToStorage();
    }
  }

  delete(id: number): void {
    this.cars = this.cars.filter(car => car.id !== id);
    this.saveToStorage();
  }

  private generateId(): number {
    return this.cars.length ? Math.max(...this.cars.map(c => c.id)) + 1 : 1;
  }
}
