import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { Auth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { of } from 'rxjs';

describe('AuthService', () => {
  let service: AuthService;

  const authMock = {
    currentUser: null
  };

  const routerMock = {
    navigate: jasmine.createSpy('navigate')
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthService,
        { provide: Auth, useValue: authMock },
        { provide: Router, useValue: routerMock }
      ]
    });

    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should expose user$ observable', () => {
    expect(service.user$).toBeDefined();
  });
});
