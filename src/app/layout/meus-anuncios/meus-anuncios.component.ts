import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'
import { CarService } from '../../services/car.service';
import { Car } from '../../models/car.model';
import { AuthService } from '../../services/auth.service';

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
  userId = 'mock-user-uid';
  successMessage: string | null = null;

  constructor(
    private carService: CarService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.authService.user$.subscribe(user => {
      if (!user) return;

      this.myAds = this.carService.getByUser(user.uid);
    });

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

    const user = this.authService.auth.currentUser;
    if (!user) return;

    this.myAds = this.carService.getByUser(user.uid);
  }

}
