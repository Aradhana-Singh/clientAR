import { CloseScrollStrategy } from '@angular/cdk/overlay';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  public email:String;
  public password:String;
  public loginBtn : boolean = false;

  constructor(private http:HttpClient) { }

  ngOnInit(): void {
  }
  login(){
    
  }

  disabled(){
    return this.loginBtn;
  }

  validateUser(){
    console.log(this.password + " " + this.email);
    let commiturl = 'http://localhost:8080/check-existence?email=' + this.email; 
    this.http.get<any>(commiturl).subscribe(

      data => console.log('Success',data),
      error => console.error('Error', error)
    );
  }
}
