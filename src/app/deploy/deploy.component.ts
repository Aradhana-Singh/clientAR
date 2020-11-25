import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { ViewChild } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, tap, scan, mergeMap, throttleTime } from 'rxjs/operators';
import { CollectionViewer, DataSource } from '@angular/cdk/collections';


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
  public orgs: string [] = [];
  public repos: string [] = [];
  public gitaccs: string [] = [];
  public commithistory: string []= [];
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

    let Chresponse = this.http.get<any>(this.commithistoryurl,{withCredentials:true});
    Chresponse.subscribe((data)=>{
      this.commithistory = data;
      console.log(data);
    });
  } 


  onDeploy(deployItem){
    let payload = {
      "account_id" : deployItem.account_id,
      "org_id": deployItem.org_id,
      "repo_id": deployItem.repo_id,
      "commit_hash": deployItem.commit_hash,
      "repo_url" : deployItem.repo_url
    }
    this.http.post<any>(this.deployUrl, payload,{
      observe: 'response',
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      responseType: 'json',
      withCredentials: true
    }).subscribe(
      data => {
        console.log(data);
      },
      error => console.error('Error', error)
    );

  }
}



