import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-explorar',
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './explorar.component.html',
  styleUrl: './explorar.component.scss'
})
export class ExplorarComponent {
  searchTerm = '';
  isFilterOpen = false;

  cars = [
    {
      brand: 'Honda',
      model: 'Civic',
      year: 2020,
      km: 45000,
      price: 89000,
      image: 'assets/cars/civic.jpg'
    },
    {
      brand: 'Toyota',
      model: 'Corolla',
      year: 2021,
      km: 32000,
      price: 95000,
      image: 'assets/cars/corolla.jpg'
    }
  ];

  filteredCars = this.cars;

  onSearch() {
    const term = this.searchTerm.toLowerCase();

    this.filteredCars = this.cars.filter(car =>
      car.brand.toLowerCase().includes(term) ||
      car.model.toLowerCase().includes(term) ||
      car.year.toString().includes(term)
    );
  }

}
