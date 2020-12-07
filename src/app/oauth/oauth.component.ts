import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-oauth',
  templateUrl: './oauth.component.html',
  styleUrls: ['./oauth.component.scss']
})
export class OauthComponent implements OnInit {

  constructor(private route: ActivatedRoute, private http:HttpClient, private router:Router ) { }

  readCode(){
    this.route.queryParams.subscribe(params =>{
      let code = params['code'];
      let type = this.route.snapshot.params.type;
      let Url;
      if(type == "sf")
        Url="https://ec2-13-234-37-228.ap-south-1.compute.amazonaws.com/org/new-org";
      else if(type == "git")
        Url="https://ec2-13-234-37-228.ap-south-1.compute.amazonaws.com/git/new-repo";

      let ps = new HttpParams().set("code",code); 
      this.http.get<any>(Url,{withCredentials:true,params:ps}).subscribe(
        data=>{
          this.router.navigate(["settings"]);
        }
      );
      console.log(code);
    });
  }
  
  ngOnInit(): void {
    this.readCode();
    console.log("I am done");
  }

}
