import { CloseScrollStrategy } from '@angular/cdk/overlay';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
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

  constructor(private http:HttpClient, private cookieService: CookieService) { }

  ngOnInit(): void {
  }
  
  login(){
    let payload = {
      "email": this.email,
      "password": this.password
    };
    let commiturl = 'http://localhost:8080/login'; 
    this.http.post<any>(commiturl,payload).subscribe(
      data => {
        this.cookieService.set("user_id", data);
        if(data != "-1")
        {
          alert("Login Successful");
        }
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
    let commiturl = 'http://localhost:8080/sign-up';
    this.http.post<any>(commiturl,payload).subscribe(
      data => {
        this.cookieService.set("user_id", data.id);
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
    let commiturl = 'http://localhost:8080/check-existence?email=' + this.email; 
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
