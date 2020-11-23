import { HttpClient } from '@angular/common/http';
import {  Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public orgs: string [] = [];
  public gitaccs: string [] = [];
  public selectedOrg;
  public selectedAcc;
  public sfurl = 'http://localhost:8080/org/list-orgs';
  public accurl = 'http://localhost:8080/git/list-accounts';
  constructor(private http:HttpClient) { 
   
  }


  ngOnInit(): void {
    let Sfresponse = this.http.get<any>(this.sfurl,{withCredentials:true});
    Sfresponse.subscribe((data)=>{
      this.orgs = data;
    });
    let GitAccresponse = this.http.get<any>(this.accurl,{withCredentials: true});
    GitAccresponse.subscribe((data)=>{
      this.gitaccs = data;
    })
  }
}  



