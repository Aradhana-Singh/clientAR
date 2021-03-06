import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, NavigationEnd } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {
    
  }

  async canActivate() {
  // canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    // return this.authService.isLoggedIn.pipe(
    //   take(1),
    //   map((isLoggedIn: boolean) => {
    //     console.log(isLoggedIn);
    //     if (!isLoggedIn) {
    //       this.router.navigate(['/authenticate']);
    //       return false;
    //     }
    //     return true;
    //   })
    // );
    
    let tmp = await this.authService.isUserLoggedIn();
    console.log(tmp);
    if(tmp) {
      return true;
    }
    this.router.navigate(['/authenticate']);
    return false;
  }
}