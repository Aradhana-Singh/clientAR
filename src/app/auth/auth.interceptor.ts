import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { AuthService } from './auth.service';
// const {pipe} = require('rxjs/Rx');

@Injectable()
export class AuthInterceptor implements HttpInterceptor 
{
    constructor(private authService: AuthService) {
    }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log("Interceptor called");
    console.log(req.headers.getAll("Set-Cookie"));
    if (req.headers.get("skip"))
    {
      req = req.clone({headers: req.headers.append("Authorization", `Bearer ${this.authService.getToken()}`)})
      return next.handle(req);
    }
        
    req = req.clone({
      setHeaders: {
        'Content-Type' : 'application/json; charset=utf-8',
        'Accept'       : 'application/json',
        'Authorization': `Bearer ${this.authService.getToken()}`
      },
    });

    return next.handle(req);
    // return next.handle(req)
    // .pipe(
    //   map((res: HttpResponse<any>) => {
    //     if (res.status == 401)
    //     {
    //       this.authService.logout();
    //     }
    //     else if(res.status == 200)
    //       this.authService.loggedIn(true);
    //     else 
    //       console.log(res.status);
    //     return res;
    //   })
    // );
    
  }
}