import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CarService } from '../../services/car.service';
import { Car } from '../../models/car.model';

@Component({
  selector: 'app-ver-anuncio',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './ver-anuncio.component.html'
})
export class VerAnuncioComponent implements OnInit {

  car?: Car;

  constructor(
    private route: ActivatedRoute,
    private carService: CarService
  ) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.car = this.carService.getById(id);
  }

  getWhatsAppLink(car: any): string {
    if (!car?.ownerPhone) return '';

    const message = `Olá ${car.ownerName}, vi seu anúncio do ${car.brand} ${car.model} no Auto Commerce.`;

    return `https://wa.me/${car.ownerPhone}?text=${encodeURIComponent(message)}`;
  }

}
