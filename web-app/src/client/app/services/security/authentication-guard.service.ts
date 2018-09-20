import { Router, CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class AuthGuardService implements CanActivate {

    constructor(
        protected router: Router,
        private authService: AuthenticationService
    ) {}

    canActivate(): boolean {
        return true;
    //   if (!this.authService.isLoggedIn) {
    //       this.router.navigate(['/login']);
    //       return false;
    //   } else if (this.authService.isLoggedIn && this.authService.isUserFirstLogin) {
    //     this.router.navigate(['/help']);
    //     //console.log('user is', this.authService.isUserFirstLogin);
    //     return false;
    //   }
    //   return true;
     }
}
