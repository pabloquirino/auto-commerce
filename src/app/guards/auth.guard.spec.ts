import { TestBed } from '@angular/core/testing';
import {
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import { authGuard } from './auth.guard';
import { Auth } from '@angular/fire/auth';
import * as authFirebase from '@angular/fire/auth';
import { of, Observable } from 'rxjs';

describe('authGuard', () => {
  let router: Router;
  let userSpy!: jasmine.Spy;
  let route: ActivatedRouteSnapshot;
  let state: RouterStateSnapshot;

  beforeEach(() => {
    userSpy = spyOn(authFirebase, 'user');

    TestBed.configureTestingModule({
      providers: [
        { provide: Auth, useValue: {} },
        Router
      ]
    });

    router = TestBed.inject(Router);
    route = {} as ActivatedRouteSnapshot;
    state = {} as RouterStateSnapshot;
  });

  it('should return UrlTree when user is not logged in', (done) => {
    userSpy.and.returnValue(of(null));

    const result$ = authGuard(route, state);

    (result$ as Observable<boolean | UrlTree>).subscribe(result => {
      expect(result instanceof UrlTree).toBeTrue();
      done();
    });
  });

  it('should allow route when user is logged in', (done) => {
    userSpy.and.returnValue(of({ uid: '123' } as any));

    const result$ = authGuard(route, state);

    (result$ as Observable<boolean | UrlTree>).subscribe(result => {
      expect(result).toBeTrue();
      done();
    });
  });
});
