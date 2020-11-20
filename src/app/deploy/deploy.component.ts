import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-deploy',
  templateUrl: './deploy.component.html',
  styleUrls: ['./deploy.component.scss']
})
export class DeployComponent implements OnInit {
  public sfurl = 'http://localhost:8080/list-orgs';
  public deployUrl = 'http://localhost:8080/deploy/';
  public orgs: string [] = [];
  public repos: string [] = [];
  public gitaccs: string [] = [];
  public accId;
  public selectedRepo;
  public orgId;
  public selectedAcc;
  public selectedOrg;
  public GitRepoUrl; 
  public commit_msg;
  public buttonClick = false;
  public commitSuccess = false;
  public success = false;
  displayModal: boolean;
  
  onSubmit(data){​​​​​
    this.orgId = data.org_id; 
    console.log(data.org_id);
    let url = this.deployUrl.concat(this.orgId);
    let repos = this.http.get<any>(url,{​​​​​withCredentials:true}​​​​​);
    repos.subscribe((data)=>{​​​​​
      this.repos = data.id;
    }​​​​​);
  }​​​​​

  constructor(private http:HttpClient) { 
   
  }

  ngOnInit(): void {
     
    let Sfresponse = this.http.get<any>(this.sfurl,{withCredentials:true});
    Sfresponse.subscribe((data)=>{
      this.orgs = data;
    });
  } 

}



