import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";



interface Org{
  value: string;
  viewValue: string;

}

interface Repo{
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-commit',
  templateUrl: './commit.component.html',
  styleUrls: ['./commit.component.scss']
})
export class CommitComponent implements OnInit {
  public listrepourl ='http://localhost:8080/list-repos/';
  public sfurl = 'http://localhost:8080/list-orgs';
  public accurl = 'http://localhost:8080/list-git-accounts';
  public orgs: string [] = [];
  public repos: string [] = [];
  public gitaccs: string [] = [];
  public accId;
  public selectedRepo;
  public selectedAcc;
  public selectedOrg;
  public GitRepoUrl; 
  public commit_msg;
  
  onSubmit(){
    let payload = {
      "org_id":this.selectedOrg.org_id,
      "acc_id":this.selectedAcc.id,
      "repo_url": this.selectedRepo.repoUrl,
      "commit_msg": this.commit_msg
    };
    let commiturl = 'http://localhost:3000/register'; 
    this.http.post<any>(commiturl,payload).subscribe(
      data => console.log('Success',data),
      error => console.error('Error', error)
    );

  }

  onChangeGitacc(data){
    this.accId = data.id; 
    let url = this.listrepourl.concat(this.accId);
    let repos = this.http.get<any>(url,{withCredentials:true});
    repos.subscribe((data)=>{
      this.repos = data;
    });
  }
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
