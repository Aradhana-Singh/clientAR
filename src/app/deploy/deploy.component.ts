import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { ViewChild } from '@angular/core';
import { Observable, BehaviorSubject, Notification } from 'rxjs';
import { map, tap, scan, mergeMap, throttleTime } from 'rxjs/operators';
import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';


interface Org {
  org_id: string,
  org_label: string,
  nick_name: string,
  username: string
}

interface ToastNotification {
  severity: string,
  summary: string, 
  detail: string
}

const batchSize = 5;
@Component({
  selector: 'app-deploy',
  templateUrl: './deploy.component.html',
  styleUrls: ['./deploy.component.scss']
})


export class DeployComponent implements OnInit {

  @ViewChild(CdkVirtualScrollViewport)
  viewport: CdkVirtualScrollViewport;
  
  theEnd = false;
 
  offset = new BehaviorSubject(null);
  infinite: Observable<any[]>;
  public disableAll = false;

  go() {
    this.viewport.scrollToIndex(23)
  }

  nextBatch(e, offset){
    if(this.theEnd)
    {
      return;
    }

    const end = this.viewport.getRenderedRange().end;
    const total = this.viewport.getDataLength();

    if( end == total){
      this.offset.next(offset);
    } 
  }

  trackByIdx(i){
    return i; 
  }

  getBatch(lastSeen: string){
    return this.http.get<any>(this.commithistoryurl,{withCredentials:true});
  }

  
  public sfurl = 'http://localhost:8080/org/list-orgs';
  public commithistoryurl = 'http://localhost:8080/git/commit-history';
  public deployUrl = 'http://localhost:8080/git/test-deploy';
  // public orgs: string [] = [];
  public orgs: Org[];
  public selectedOrgs: Org[];
  public repos: string [] = [];
  public gitaccs: string [] = [];
  public commithistory: string []= [];
  public payload;
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
  public progress = false;
  displayPosition: boolean;
  displayModal: boolean;
  position: string;
  public right = "right";
 
  
  
  onSubmit(data){​​​​​
    this.orgId = data.org_id; 
    console.log(data.org_id);
    let url = this.deployUrl.concat(this.orgId);
    let repos = this.http.get<any>(url,{​​​​​withCredentials:true}​​​​​);
    repos.subscribe((data)=>{​​​​​
      this.repos = data.id;
    }​​​​​);
  }​​​​​

  constructor(private messageService: MessageService,private http:HttpClient) { }

  ngOnInit(): void {
    let Chresponse = this.http.get<any>(this.commithistoryurl,{withCredentials:true});
    Chresponse.subscribe((data)=>{
      this.commithistory = data;
      // for(let ch of this.commithistory)
      // {
      //   ch.timestamp = new Date();
      // }
      console.log(data);
    });
  }

  showPositionDialog(deployItem) {

    let Sfresponse = this.http.get<any>(this.sfurl,{withCredentials:true});
    Sfresponse.subscribe((data)=>{
      // console.log(data);
      this.orgs = data;
      // console.log(this.orgs);
    });
    
    this.payload = {
      "account_id" : deployItem.account_id,
      "org_id": deployItem.org_id,
      "repo_id": deployItem.repo_id,
      "commit_hash": deployItem.commit_hash,
      "repo_url" : deployItem.repo_url
    }

    this.displayModal = true;
    // this.position = this.right;
    // this.displayPosition = true;
  }

  async onDeploy(){
    this.disableAll = true;
    
    let deployPromises = [];
    let notifications: ToastNotification[] = [];
    console.log(this.selectedOrgs);

    for(let _selectedOrg of this.selectedOrgs)
    {
      // console.log(_selectedOrg);
      let selectOrgId = _selectedOrg.org_id;
      // console.log(selectOrgId);
      let selectedOrgNickName = _selectedOrg.nick_name;

      this.payload["target_org_id"] = selectOrgId;
      this.payload["target_org_nick_name"] = selectedOrgNickName;
      
      console.log("I am payload: ", this.payload);

      // deployPromises.push(this.http.post<any>(this.deployUrl, this.payload,{
      //   observe: 'response',
      //   headers: new HttpHeaders().set('Content-Type', 'application/json'),
      //   responseType: 'json',
      //   withCredentials: true
      // }).toPromise()); 

      this.progress =true;
      let result;
      try
      {
        result = await this.http.post<any>(this.deployUrl ,this.payload, {
          observe: 'response',
          headers: new HttpHeaders().set('Content-Type', 'application/json'),
          responseType: 'json',
          withCredentials: true
        }).toPromise();
      }
      catch(error)
      {
        result = error;
        console.log(result);
      }
        
      this.progress = false;

      console.log(result);

      let obj: ToastNotification = {
        "severity": "",
        "summary": "",
        "detail": ""
      };

      if (result.status == 200)
      {
        obj["severity"] = "success";
        obj["summary"] = "Deployed Succesfully";
        obj["detail"] = "Commit Hash: " + result.body.commit_hash + "\nTarget Org: " + result.body.target_org_nick_name;
      }
      else if(result.status == 400)
      {
        obj["severity"] = "error";
        obj["summary"] = "Deployement Failed";
        obj["detail"] = "Commit Hash: " + result.error.commit_hash + "\nTarget Org: " + result.error.target_org_nick_name;
      }

      this.messageService.add(obj);

      // notifications.push(obj);  
      // console.log(notifications);
    }
    // this.messageService.addAll(notifications);
    this.disableAll = false;
  }
    // Promise.all(deployPromises).then((results:any[]) => {
    //   console.log(results);

    //   let notifications: ToastNotification[] = [];

    //   for(let result of results)
    //   {
    //     let obj: ToastNotification = {
    //       "severity": "",
    //       "summary": "",
    //       "detail": ""
    //     };

    //     console.log(obj);

    //     if (result.status == 200)
    //     {
    //       obj["severity"] = "success";
    //       obj["summary"] = "Deployed Succesfully";
    //       obj["detail"] = "Commit Hash: " + result.body.commit_hash + "\nTarget Org: " + result.body.target_org_nick_name;
    //     }

    //     notifications.push(obj);  
    //     console.log(notifications);
    //   }
      
      // this.messageService.add({severity: "success", summary:'Done', detail:'Commit Successful'});
      // this.messageService.addAll(notifications);
    // });

    // this.http.post<any>(this.deployUrl, this.payload,{
    //   observe: 'response',
    //   headers: new HttpHeaders().set('Content-Type', 'application/json'),
    //   responseType: 'json',
    //   withCredentials: true
    // }).subscribe(
    //   data => {
    //     console.log(data);
    //     this.progress = false;
    //     this.displayModal = false;
    //     this.messageService.add({severity: "success", summary:'Done', detail:'Deploy Successful'});
    //   },
    //   error => {
    //     console.error('Error', error);
    //     this.progress = false;
    //     this.displayModal= false;
    //     this.messageService.add({severity: "error", summary:'Error', detail:'Something went wrong, Please try again'});
    //   }
    // );

  // }

  // logme() 
  // {
  //   console.log(this.selectedOrgs);
  // }
}



