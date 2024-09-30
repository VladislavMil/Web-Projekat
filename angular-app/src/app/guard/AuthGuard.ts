import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    const expectedRoles = next.data['expectedRoles'] as string[];
    const hasToken=this.authService.isLoggedIn();
    if (!hasToken) {
      this.router.navigate(['/']);
    }
    return hasToken!=null;
  }
}