import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { MessageService } from 'primeng/api';


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
  public defaulturl ='http://localhost:8080/';
  public listrepourl = this.defaulturl.concat('git/list-repos/') ;
  public sfurl = this.defaulturl.concat('org/list-orgs') ;
  public accurl = this.defaulturl.concat('git/list-accounts');
  public commiturl = this.defaulturl.concat('git/commit');
  public orgs: string [] = [];
  public repos: string [] = [];
  public gitaccs: string [] = [];
  public accId;
  public selectedRepo;
  public selectedAcc;
  public selectedOrg;
  public GitRepoUrl; 
  public commit_msg;
  public displayRepo = false;
  public buttonClick = false;
  public commitSuccess = false;
  public success = false;
  public message = "Drag your files here or click in this area";
  displayModal: boolean;
  fileUploadModal: boolean;
  file = null;
  public storedTheme = localStorage.getItem('theme-color');
  constructor(private messageService: MessageService,private http:HttpClient) { 
  }
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
        this.messageService.add({severity: "success", summary:'Done', detail:'Commit Successful'});
      },
      error => {
        console.error('Error', error);
        this.buttonClick = false;
        this.messageService.add({severity: "error", summary:'Error', detail:'Something went wrong'});
      }
      
    );
    this.displayModal = false;
  }

  onChangeGitacc(data){
    this.buttonClick = true;
    this.accId = data.id; 
    let url = this.listrepourl.concat(this.accId);
    let repos = this.http.get<any>(url,{withCredentials:true});
    repos.subscribe((data)=>{
      this.buttonClick = false;
      this.repos = data;
      this.displayRepo = true;
    });
  }

  onChangeOrg() {
    this.showFileUpload();
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
    this.message = this.file.name;
  }

  sendFile() {
    if (this.file !== null) {
      const formdata: FormData = new FormData();
      formdata.append('file', this.file);
      formdata.append('org_id', this.selectedOrg.org_id);
      this.http.post("http://localhost:8080/git/addFile", formdata,{headers:{skip:"true"}}).subscribe(
        (data)=>{
          console.log(data);
          this.messageService.add({severity: "success", summary:'File Uploaded'});
          this.fileUploadModal = false;
        },
        (err) => {
          console.log(err); 
          this.messageService.add({severity: "error", summary:'Error', detail:'Select Valid Manifest File'});
        }
      );
    }
    else{
     this.messageService.add({severity: "error", summary:'Error', detail:'Select Valid Manifest File'});
    }
  }
}
