import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'
import { CarService } from '../../services/car.service';
import { Car } from '../../models/car.model';

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
export class MeusAnunciosComponent implements OnInit {

  myAds: Car[] = [];
  userId = 1;
  successMessage: string | null = null;

  constructor(private carService: CarService) { }

  ngOnInit() {
    this.myAds = this.carService.getByUser(this.userId);

    const navigation = history.state;
    if (navigation?.successMessage) {
      this.successMessage = navigation.successMessage;

      setTimeout(() => {
        this.successMessage = null;
      }, 3000);
    }
  }

  remove(id: number) {
    this.carService.delete(id);
    this.myAds = this.carService.getByUser(this.userId);
  }

}
