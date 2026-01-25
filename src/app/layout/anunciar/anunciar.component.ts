import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CarService } from '../../services/car.service';
import { Car } from '../../models/car.model';
import { ToastService } from '../../services/toast.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-anunciar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './anunciar.component.html',
})
export class AnunciarComponent implements OnInit {

  car: Partial<Car> = {};
  isEdit = false;
  carId?: number;
  userId?: string;

  constructor(
    private carService: CarService,
    private router: Router,
    private route: ActivatedRoute,
    private toastService: ToastService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    // pegar usuário logado
    const user = this.authService.auth.currentUser;

    if (!user) {
      this.toastService.show('Você precisa estar logado');
      this.router.navigate(['/']);
      return;
    }

    this.userId = user.uid;

    // verificar se é edição
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.isEdit = true;
      this.carId = Number(id);

      const existingCar = this.carService.getById(this.carId);

      // segurança: só o dono pode editar
      if (!existingCar || existingCar.ownerId !== this.userId) {
        this.toastService.show('Você não pode editar este anúncio');
        this.router.navigate(['/layout']);
        return;
      }

      this.car = { ...existingCar };
    }
  }

  submit(): void {
    const user = this.authService.auth.currentUser;

    if (!user) {
      this.toastService.show('Você precisa estar logado');
      return;
    }

    if (
      !this.car.brand ||
      !this.car.model ||
      !this.car.year ||
      !this.car.price ||
      !this.car.km
    ) {
      this.toastService.show('Preencha todos os campos obrigatórios');
      return;
    }

    if (this.isEdit && this.carId) {

      this.carService.update(this.carId, this.car);
      this.toastService.show('Anúncio atualizado com sucesso!');

    }
    else {
      this.carService.create(
        {
          brand: this.car.brand,
          model: this.car.model,
          year: this.car.year,
          km: this.car.km,
          price: this.car.price,
          description: this.car.description ?? '',
          image: this.car.image ?? '',
          ownerName: user.displayName ?? 'Usuário',
          ownerPhoto: user.photoURL ?? '',
          ownerPhone: this.car.ownerPhone ?? ''
        },
        user.uid
      );

      this.toastService.show('Anúncio publicado com sucesso!');
    }

    this.router.navigate(['layout/meus-anuncios']);

  }

}
