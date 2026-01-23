import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CarService } from '../../services/car.service';
import { Car } from '../../models/car.model';
import { AuthService } from '../../services/auth.service';

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

  cars: Car[] = [];
  filteredCars: Car[] = [];
  brands: string[] = [];
  years: number[] = [];
  selectedBrand: string = '';
  searchTerm = '';
  selectedYear: number | '' = '';
  selectedPriceRange = '';

  isFilterOpen = false;

  constructor(
    private carService: CarService,
    public authService: AuthService
  ) { }

  ngOnInit() {
    this.cars = this.carService.getAll();
    this.filteredCars = this.cars;

    // anos
    this.years = [...new Set(this.cars.map(car => car.year))]
      .sort((a, b) => b - a);

    // marcas
    this.brands = [...new Set(this.cars.map(car => car.brand))]
      .sort();
  }

  applyFilters() {
    const term = this.searchTerm.toLowerCase();

    this.filteredCars = this.cars.filter(car => {
      const matchesSearch =
        car.brand.toLowerCase().includes(term) ||
        car.model.toLowerCase().includes(term) ||
        car.year.toString().includes(term);

      const matchesYear =
        !this.selectedYear || car.year === this.selectedYear;

      const matchesBrand =
        !this.selectedBrand || car.brand === this.selectedBrand;

      const matchesPrice = (() => {
        if (!this.selectedPriceRange) return true;

        if (this.selectedPriceRange === '200000+') {
          return car.price >= 200000;
        }

        const [min, max] = this.selectedPriceRange.split('-').map(Number);
        return car.price >= min && car.price <= max;
      })();

      return matchesSearch && matchesYear && matchesBrand && matchesPrice;
    });
  }

}
