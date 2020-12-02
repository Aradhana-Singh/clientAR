import { CloseScrollStrategy } from '@angular/cdk/overlay';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import {MenuItem, MessageService} from 'primeng/api';
import { AuthService } from '../auth/auth.service';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  providers: [MessageService]
})
export class UserComponent implements OnInit {
  public firstName;
  public lastName;
  public email:String;
  public password:String;
  public loginBtn : boolean = false;
  public signUpBtn : boolean = true;
  public buttonClick = false;
  public index: number = 1;
  items: MenuItem[];
  public defaulturl ='https://ec2-13-234-37-228.ap-south-1.compute.amazonaws.com/';
  constructor(private messageService: MessageService,private http:HttpClient, private cookieService: CookieService, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.items = [
      {label: 'Angular.io', icon: 'pi pi-info', url: 'http://angular.io'},
      {separator:true},
      {label: 'Setup', icon: 'pi pi-cog', routerLink: ['/setup']}
  ];
  }
  
  login(){
    let payload = {
      "username": this.email,
      "password": this.password
    };
    let commiturl = this.defaulturl.concat('user/login'); 
    this.http.post<any>(commiturl,payload).subscribe(
      data => {
        this.cookieService.set("token",data.token);
        console.log(data.token);
        this.messageService.add({severity: "success", summary:'Success', detail:'Successfully Logged in'});
        this.buttonClick = true;
        setTimeout(() => {
          this.buttonClick = false;
          this.router.navigate(['/home']);
        }, 1000);
      },
      error => {
        console.error('Error', error);
        this.messageService.add({severity: "error", summary:'Error', detail:'Invalid Credentials'});
    }
    );
  }

  disabled(){
    return this.loginBtn;
  }

  validateUser(){
    console.log(this.password + " " + this.email);
    let commiturl = this.defaulturl.concat('user/check-existence?email=') + this.email; 
    this.http.get<any>(commiturl).subscribe(
      data => {
        console.log('Success',data);
        if(data == "-1"){
          // alert("Invalid Email");
          this.loginBtn = true;
          this.signUpBtn = true;
        }
        else{
          this.loginBtn = false;
          this.signUpBtn = false;
        }
      },
      error => console.error('Error', error)
    );
    
  }

  save() {
    
    let payload = {
      "first_name": this.firstName,
      "last_name": this.lastName,
      "email": this.email,
      "password": this.password
    };
    let commiturl = this.defaulturl.concat('user/sign-up');
    this.buttonClick = true;
    this.http.post<any>(commiturl,payload).subscribe(
      data => {
        // this.cookieService.set("user_id", data.id);
        console.log(data.id);
        this.buttonClick = false;
        this.messageService.add({severity: "success", summary:'Success', detail:'Successfully Signed Up'});
        this.index = 1;
      },
      error => {
        console.log(error);
        this.messageService.add({severity: "error", summary:'Failed', detail:'Registration Failed'});
      }
    ); 
  }
}
