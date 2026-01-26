import { TestBed } from '@angular/core/testing';
import { Router, UrlTree } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { authGuard } from './auth.guard';
import { Auth } from '@angular/fire/auth';
import { Injector, runInInjectionContext } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';

class AuthMock {
  constructor(private userValue: any) {}

  onIdTokenChanged(callback: any) {
    callback(this.userValue);
    return () => {};
  }

  onAuthStateChanged(callback: any) {
    callback(this.userValue);
    return () => {};
  }
}

describe('authGuard', () => {
  let injector: Injector;
  let mockUser: any = null;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([])],
      providers: [
        {
          provide: Auth,
          useFactory: () => new AuthMock(mockUser)
        }
      ]
    });

    injector = TestBed.inject(Injector);
    router = TestBed.inject(Router);
  });

  it('should return UrlTree when user is not logged in', async () => {
    mockUser = null;

    const result = await runInInjectionContext(injector, async () => {
      const res$ = authGuard({} as any, {} as any) as Observable<boolean | UrlTree>;
      return await firstValueFrom(res$);
    });

    const expected = router.createUrlTree(['/']); 
    expect(result).toEqual(expected);
  });

  it('should allow route when user is logged in', async () => {
    mockUser = { uid: '123' };

    const result = await runInInjectionContext(injector, async () => {
      const res$ = authGuard({} as any, {} as any) as Observable<boolean | UrlTree>;
      return await firstValueFrom(res$);
    });

    expect(result).toBeTrue();
  });
});
