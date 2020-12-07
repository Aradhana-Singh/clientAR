import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-oauth',
  templateUrl: './oauth.component.html',
  styleUrls: ['./oauth.component.scss']
})
export class OauthComponent implements OnInit {

  constructor(private route: ActivatedRoute, private http:HttpClient ) { }

  readCode(){
    this.route.queryParams.subscribe(params =>{
      let code = params['code'];
      let newOrgUrl="https://ec2-13-234-37-228.ap-south-1.compute.amazonaws.com/org/new-org";
      let ps = new HttpParams().set("code",code); 
      this.http.get<any>(newOrgUrl,{withCredentials:true,params:ps});
    });
  }

  ngOnInit(): void {
    this.readCode();
  }

}
