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
  public repourl ='http://localhost:8080/list-repos/';
  public sfurl = 'http://localhost:8080/list-orgs';
  public accurl = 'http://localhost:8080/list-git-accounts';
  public org: string [] = [];
  public repo: string [] = [];
  public gitacc: string [] = [];
  public accUsername;
  public selectedRepo;
  public selectedAcc;
  public selectedOrg;
  public GitRepoUrl; 
  posturl = 'http://localhost:3000/register'; 

  registerRepo(repos: String[]){
    return this.http.post<any>(this.posturl,repos);
  }

  registerSf(orgs: String){
    return this.http.post<any>(this.posturl,{"org_id":orgs});
  }

  registerGitacc(accs: String){
    return this.http.post<any>(this.posturl,{"id":accs})
  }
 

  onChangeRepo(data){
    console.log(this.selectedRepo.repoName)
    this.registerRepo(data).subscribe(
      data => console.log('Success',data),
      error => console.error('Error', error)
    );
  }
  onChangeSfOrg(data){
    console.log(data.org_id);
    this.registerSf(data.org_id).subscribe(
      data => console.log('Success',data),
      error => console.error('Error', error)
    );
  }

  onChangeGitacc(data){
    this.accUsername = data.id; 
    this.GitRepoUrl = this.repourl.concat(this.accUsername);
    console.log(this.GitRepoUrl);
    this.registerGitacc(data.id).subscribe(
      data => console.log('Success',data),
      error => console.error('Error', error)
    )
    let Gitresponse = this.http.get<any>(this.GitRepoUrl,{withCredentials:true});
    Gitresponse.subscribe((data)=>{
      console.log(data)
      this.repo = data;
      console.log(this.repo);
    });
  }
  constructor(private http:HttpClient) { 
   
  }

  ngOnInit(): void {
    
  
    let Sfresponse = this.http.get<any>(this.sfurl,{withCredentials:true});
    Sfresponse.subscribe((data)=>{
      console.log(data)
      this.org = data;
      console.log(this.org);
    });
    let GitAccresponse = this.http.get<any>(this.accurl,{withCredentials: true});
    GitAccresponse.subscribe((data)=>{
      this.gitacc = data;
      console.log(this.gitacc);
    })
    } 
 

}
