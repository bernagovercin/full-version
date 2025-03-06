import { Injectable, inject } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../service/auth.service';  // AuthService'i import edin

@Injectable({ providedIn: 'root' })
export class AuthGuardChild implements CanActivateChild {
  private router = inject(Router);
  private authService = inject(AuthService);  // AuthService'i kullanın
  private toastrService = inject(ToastrService);

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = this.authService.currentUserValue;  // currentUserValue'yu kontrol edin

    if (currentUser) {
      return true;  // Kullanıcı giriş yapmışsa erişime izin ver
    }

    // Kullanıcı giriş yapmamışsa login sayfasına yönlendir
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    this.toastrService.info('Sisteme giriş yapmalısınız');
    return false;
  }
}