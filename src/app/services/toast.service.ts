import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class ToastService {
  message: string | null = null;

  show(message: string, duration = 3000) {
    this.message = message;
    setTimeout(() => this.message = null, duration);
  }
}
