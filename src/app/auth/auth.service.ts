import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
// import { User } from './user';
import { CookieService } from 'ngx-cookie-service';


@Injectable()
export class AuthService {
  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  get isLoggedIn() {

    // if(parseInt(this.cookieService.get("user_id")) != -1 )
    //     this.loggedIn.next(true);
    return this.loggedIn.asObservable();
  }

  constructor(
    private router: Router, private cookieService: CookieService
  ) {}

  login(flag: number) {
    if (parseInt(this.cookieService.get("user_id")) != -1 && this.cookieService.get("user_id") != "") {
      console.log("I am logged in with user_id: ", this.cookieService.get("user_id"))
      this.loggedIn.next(true);
      if(flag == 1)
        this.router.navigate(['/home']);
    }
  }

  getToken() 
  {
    return this.cookieService.get("token");
  }

  logout() {
    this.cookieService.delete("token", "/");
    this.router.navigate(['/authenticate']);
  }

  isUserLoggedIn() {
    // if (parseInt(this.cookieService.get("user_id")) != -1 && this.cookieService.get("user_id") != "") {
    console.log(this.cookieService.get("token"));

    if(this.cookieService.get("token")) { 
      console.log("I am logged in with user_id: ", this.cookieService.get("token"));
      return true;
    }
    return false;
  }
}