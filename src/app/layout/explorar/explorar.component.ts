import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CarService } from '../../services/car.service';
import { Car } from '../../models/car.model';

@Component({
  selector: 'app-explorar',
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './explorar.component.html',
  styleUrl: './explorar.component.scss'
})
export class ExplorarComponent implements OnInit {

  searchTerm = '';
  isFilterOpen = false;

  cars: Car[] = [];
  filteredCars: Car[] = [];

  constructor(private carService: CarService) { }

  ngOnInit() {
    this.cars = this.carService.getAll();
    this.filteredCars = this.cars;
  }

  onSearch() {
    const term = this.searchTerm.toLowerCase();

    this.filteredCars = this.cars.filter(car =>
      car.brand.toLowerCase().includes(term) ||
      car.model.toLowerCase().includes(term) ||
      car.year.toString().includes(term)
    );
  }

}
