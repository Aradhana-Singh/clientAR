import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
// import { User } from './user';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class AuthService {
  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  constructor(
    private router: Router, private cookieService: CookieService
  ) {}

  login() {
    if (parseInt(this.cookieService.get("user_id")) != -1) {
        console.log("I am logged in with user_id: ", this.cookieService.get("user_id"))
      this.loggedIn.next(true);
      this.router.navigate(['/home']);
    }
  }

  logout() {
    this.loggedIn.next(false);
    this.router.navigate(['/authenticate']);
  }
}