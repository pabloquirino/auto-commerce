import { Injectable } from '@angular/core';
import { Auth, signInWithPopup, setPersistence, browserSessionPersistence, GoogleAuthProvider, signOut, user } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {

  user$;

  constructor(
    public auth: Auth,
    private router: Router
  ) {
    this.user$ = user(this.auth);
  }

  async loginWithGoogle() {
    await setPersistence(this.auth, browserSessionPersistence);

    const provider = new GoogleAuthProvider();
    return signInWithPopup(this.auth, provider);
  }

  async logout(): Promise<void> {
    await signOut(this.auth);
    await this.router.navigate(['/']);
  }
}