import { CloseScrollStrategy } from '@angular/cdk/overlay';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Tween } from 'jquery';
import { CookieService } from 'ngx-cookie-service';
import {MenuItem, MessageService} from 'primeng/api';
import { AuthService } from '../auth/auth.service';

declare var Snap: any;
declare var mina: any;

// import {TweenMax} from 'gsap'
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  providers: [MessageService]
})
export class UserComponent implements OnInit {
  
  public firstName;
  public lastName;
  public email:string;
  public password:string;
  public loginBtn : boolean = false;
  public signUpBtn : boolean = true;
  public buttonClick = false;
  public index: number = 1;
  items: MenuItem[];
  public defaulturl ='http://15.206.169.206:8764/auth-service/';
  constructor(private messageService: MessageService,private http:HttpClient, private cookieService: CookieService, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.items = [
      {label: 'Angular.io', icon: 'pi pi-info', url: 'http://angular.io'},
      {separator:true},
      {label: 'Setup', icon: 'pi pi-cog', routerLink: ['/setup']}
  ];

  
  }

  animate(){
    console.log("hey")
    var svg = document.getElementById("cups");
    var s = Snap(svg);
    var svg1 = document.getElementById("cups1");
    var s1 = Snap(svg1);
    var simpleCup = Snap.select('#simple-cup');
    var fancyCup = Snap.select('#fancy-cup');
    var simpleCupPoints = simpleCup.node.getAttribute('d');
    var fancyCupPoints = fancyCup.node.getAttribute('d');
    var toFancy = function(){
    simpleCup.animate({ d: fancyCupPoints }, 1000, mina.backout);  
}
  var toSimple = function(){
    fancyCup.animate({ d: simpleCupPoints }, 1000, mina.backout, toFancy); 
  }
  toSimple();
  }
  
  login(){
    let payload = {
      "username": this.email,
      "password": this.password
    };
    let commiturl = this.defaulturl.concat('auth/local'); 
    this.http.post<any>(commiturl,payload, {observe: 'response'}).subscribe(
      resp => {
        
        let data = resp.body;
        // console.log(this.cookieService.get("jwt"));
        this.cookieService.set("token",data.token);
        
        // console.log(data.token);
        this.messageService.add({severity: "success", summary:'Success', detail:'Successfully Logged in'});
        this.buttonClick = true;
        this.buttonClick = false;
        this.router.navigate(['/home']);   
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

  changeTheme(){
    
    // TweenMax.to(shape1, 1,{morphSVG: shape2});
  }

  validateUser(){
    console.log(this.password + " " + this.email);
    let commiturl = this.defaulturl.concat('user/check-existence?email=') + this.email; 
    this.http.get<any>(commiturl).subscribe(
      data => {
        console.log('Success',data);
        if(data.user_id == "-1"){
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
      "username": this.email,
      "password": this.password
    };
    // const formData = new FormData();
    // formData.append("first_name", this.firstName);
    // formData.append("last_name", this.lastName);
    // formData.append("username", this.email);
    // formData.append("password", this.password);

    // console.log(payload);
    let commiturl = this.defaulturl.concat('user/sign-up');
    this.buttonClick = true;

    // let options = {
    //   headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    // };

    this.http.post<any>(commiturl, payload).subscribe(
      data => {
        // this.cookieService.set("user_id", data.id);
        console.log(data);
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
