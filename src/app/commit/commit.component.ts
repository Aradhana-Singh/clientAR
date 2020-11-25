import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';


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
  public listrepourl ='http://localhost:8080/git/list-repos/';
  public sfurl = 'http://localhost:8080/org/list-orgs';
  public accurl = 'http://localhost:8080/git/list-accounts';
  public commiturl = 'http://localhost:8080/git/commit';
  public orgs: string [] = [];
  public repos: string [] = [];
  public gitaccs: string [] = [];
  public accId;
  public selectedRepo;
  public selectedAcc;
  public selectedOrg;
  public GitRepoUrl; 
  public commit_msg;
  public buttonClick = false;
  public commitSuccess = false;
  public success = false;
  displayModal: boolean;
  fileUploadModal: boolean;
  file = null;
  
  onSubmit(){
    this.buttonClick = true;
    let payload = {
      "org_id":this.selectedOrg.org_id,
      "acc_id":this.selectedAcc.id,
      "repo_id": this.selectedRepo.repoId,
      "repo_url": this.selectedRepo.repoUrl,
      "commit_msg": this.commit_msg,
      "git_username": this.selectedAcc.username,
      "repo_name": this.selectedRepo.repoName
    };
    // let commiturl = 'http://localhost:3000/register'; 
    this.http.post<any>(this.commiturl, payload,{
      observe: 'response',
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      responseType: 'json',
      withCredentials: true
    }).subscribe(
      data => {
        this.buttonClick = false;
        this.success = true;
      },
      error => console.error('Error', error)
    );
    this.displayModal = false;
  }

  onChangeGitacc(data){
    this.accId = data.id; 
    let url = this.listrepourl.concat(this.accId);
    let repos = this.http.get<any>(url,{withCredentials:true});
    repos.subscribe((data)=>{
      this.repos = data;
    });
  }

  onChangeOrg() {
    this.showFileUpload();
  }

  constructor(private http:HttpClient) { 
   
  }

  ngOnInit(): void {
     
    let Sfresponse = this.http.get<any>(this.sfurl,{withCredentials:true});
    Sfresponse.subscribe((data)=>{
      console.log(data);
      this.orgs = data;
    });

    let GitAccresponse = this.http.get<any>(this.accurl,{withCredentials: true});
    GitAccresponse.subscribe((data)=>{
      console.log(data);
      this.gitaccs = data;
    })
  } 

  showModalDialog() {
    this.displayModal = true;
  }

  showFileUpload() {
    this.fileUploadModal = true;
  }

  fileChoice(theEventFromHtml) {
    this.file = theEventFromHtml.target.files[0];
  }

  sendFile() {
    if (this.file !== null) {
      const formdata: FormData = new FormData();
      formdata.append('file', this.file);
      formdata.append('org_id', this.selectedOrg.org_id);
      this.http.post("http://localhost:8080/git/addFile", formdata,{headers:{skip:"true"}}).subscribe(
        (data)=>{
          console.log(data);
        },
        (err) => {
          console.log(err); 
        }
      );
    }
  }



}
