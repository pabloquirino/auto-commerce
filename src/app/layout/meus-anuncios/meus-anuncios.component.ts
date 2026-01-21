import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'

@Component({
  selector: 'app-meus-anuncios',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './meus-anuncios.component.html',
  styleUrl: './meus-anuncios.component.scss'
})
export class MeusAnunciosComponent {
  myAds = [
    {
      brand: 'Toyota',
      model: 'Corolla',
      year: 2020,
      km: 45000,
      price: 75000,
      image: '/assets/cars/corolla.jpg'
    }
  ];

}
