import { CloseScrollStrategy } from '@angular/cdk/overlay';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../auth/auth.service';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  public firstName;
  public lastName;
  public email:String;
  public password:String;
  public loginBtn : boolean = false;

  constructor(private http:HttpClient, private cookieService: CookieService, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }
  
  login(){
    let payload = {
      "username": this.email,
      "password": this.password
    };
    let commiturl = 'http://localhost:8080/user/login'; 
    this.http.post<any>(commiturl,payload).subscribe(
      data => {
        this.cookieService.set("token",data.token);
        console.log(data.token);
        // if(data != "-1")
        // {
        //   this.authService.login(1);
        //   // alert("Login Successful");
        // }
        this.router.navigate(['/home']);
      },
      error => {
        console.error('Error', error);
    }
    );
  }

  signup(){
    let payload = {
      "first_name": this.firstName,
      "last_name": this.lastName,
      "email": this.email,
      "password": this.password
    };
    let commiturl = 'http://localhost:8080/user/sign-up';
    this.http.post<any>(commiturl,payload).subscribe(
      data => {
        // this.cookieService.set("user_id", data.id);
        console.log(data.id);
        alert("Registration Successful");
      }
    ); 
  }


  disabled(){
    return this.loginBtn;
  }

  validateUser(){
    console.log(this.password + " " + this.email);
    let commiturl = 'http://localhost:8080/user/check-existence?email=' + this.email; 
    this.http.get<any>(commiturl).subscribe(
      data => {
        console.log('Success',data);
        if(data == "-1"){
          alert("Invalid Email");
          this.loginBtn = false;
        }
        else{
          this.loginBtn = true;
        }
      },
      error => console.error('Error', error)
    );
    
  }
}
