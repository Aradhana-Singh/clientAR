import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
// import { User } from './user';
import { CookieService } from 'ngx-cookie-service';
import jwt_decode from "jwt-decode";
import { Observable } from 'rxjs';


@Injectable()
export class AuthService {
  // private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  // get isLoggedIn() {

  //   // if(parseInt(this.cookieService.get("user_id")) != -1 )
  //   //     this.loggedIn.next(true);
  //   return this.loggedIn.asObservable();
  // }
  private user_id: string = null;

  constructor(
    private router: Router, private cookieService: CookieService
  ) {}

  // login(flag: number) {
  //   if (parseInt(this.cookieService.get("user_id")) != -1 && this.cookieService.get("user_id") != "") {
  //     console.log("I am logged in with user_id: ", this.cookieService.get("user_id"))
  //     this.loggedIn.next(true);
  //     if(flag == 1)
  //       this.router.navigate(['/home']);
  //   }
  // }

  getToken() 
  {
    return this.cookieService.get("token");
  }

  logout() {
    this.cookieService.delete("jwt", "/");
    this.cookieService.delete("jwt.sig", "/");
    this.router.navigate(['/authenticate']);
  }

  
  async isUserLoggedIn() {
    // if (parseInt(this.cookieService.get("user_id")) != -1 && this.cookieService.get("user_id") != "") {
  
    let promise = new Promise((resolve, reject) => {resolve(jwt_decode(this.cookieService.get("jwt") + "." + this.cookieService.get("jwt.sig"), {header: true}))});  
    
    let res = promise.then((data) => {
      this.user_id = data['passport'].user;
      console.log(this.user_id);
      if(this.user_id != null) { 
        console.log("I am logged in with user_id: ", this.user_id);
        return true;
      }
    })
    .catch((err) => {
      this.user_id = null;
      return false;
    });;
    
    return res;
  }
}