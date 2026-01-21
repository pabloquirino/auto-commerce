import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from "@angular/router";
import { RouterLink } from '@angular/router';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {
  isMenuOpen = false
  currentYear = new Date().getFullYear();
  toastService: ToastService;

  constructor(toastService: ToastService) {
    this.toastService = toastService;
  }
}
