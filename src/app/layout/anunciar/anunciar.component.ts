import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CarService } from '../../services/car.service';
import { Car } from '../../models/car.model';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-anunciar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './anunciar.component.html',
})
export class AnunciarComponent {

  car: Partial<Car> = {
    ownerId: 1 // mock user
  }

  constructor(
    private carService: CarService,
    private router: Router,
    private toastService: ToastService
  ) { }

  submit() {
    if (
      !this.car.brand ||
      !this.car.model ||
      !this.car.year ||
      !this.car.price ||
      !this.car.km
    ) {
      return; // aqui você pode mostrar um erro depois
    }

    const carToCreate: Omit<Car, 'id'> = {
      brand: this.car.brand,
      model: this.car.model,
      year: this.car.year,
      km: this.car.km,
      price: this.car.price,
      description: this.car.description ?? '',
      image: this.car.image ?? '',
      ownerId: this.car.ownerId!
    };

    this.carService.create(carToCreate);
    this.toastService.show('Anúncio publicado com sucesso!');
    this.router.navigate(['layout/meus-anuncios']);

  }
}
