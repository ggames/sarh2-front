import { TokenService } from '../services/token.service';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  Router,
} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  realRol: string | undefined;

  constructor(private tokenService: TokenService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const expectedRol = route.data['expectedRol'];
    this.realRol = this.tokenService.isAdmin() ? 'admin' : 'user';

    if (
      !this.tokenService.isLogged() ||
      expectedRol.indexOf(this.realRol) < 0
    ) {
      this.router.navigate(['/page']);
      return false;
    }

    return true;
  }
}
