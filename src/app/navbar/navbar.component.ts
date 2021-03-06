import { AfterViewInit, Component, DoCheck, OnChanges, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { MenuItem } from "primeng/api";
import { Router } from '@angular/router';
import jwt_decode from "jwt-decode";
import {HttpClient,HttpHeaders,HttpParams} from '@angular/common/http'
import { Menu, MenuModule } from 'primeng/menu';
import { MessageService } from 'primeng/api';
import { Observable, Subject } from 'rxjs';
import { select, Store } from '@ngrx/store';
 

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
 
export class NavbarComponent implements OnInit, DoCheck {
  items: MenuItem[];
  @ViewChild('menu') menu: Menu;
 
  getUser = "http://15.206.169.206:8764/auth-service/user/get-user";
  addWebHook = "http://15.206.169.206:8764/miniar/org/add-webhook";
 
  public full_name = "";
  public webhook_url = "";
  public displayModal = false;
  public progress = false;
  public storedTheme: string;
  loadingbar$: Observable<boolean>;
  getTheme(){
    this.storedTheme = localStorage.getItem('theme-color');
  }
 
  constructor(private authService: AuthService, private router: Router, private http:HttpClient, private messageService: MessageService, private store: Store<any>) { }
 
  getUserName() 
  {
    // let decoded_token = jwt_decode(this.authService.getToken());
    // let email = decoded_token["sub"];
 
    // let params = new HttpParams().set("email", email);
    // let full_name = "";
 
    let response = this.http.get<any>(this.getUser,{withCredentials:true});
 
    response.subscribe((user)=>{
      this.full_name = user["first_name"] + " " + user["last_name"];
      console.log(this.full_name);
 
      this.items = [
        {
          label: this.full_name
        },
        {
          separator: true
        },
        {
          label: "Add Webhook",
          icon: "pi pi-fw pi-paperclip",
          command: (event) => {
            this.displayModal = true;
            this.menu.toggle(event);
          }
        },
 
        {
          label: "Settings",
          icon: "pi pi-fw pi-cog",
          command: (event) => {
            this.router.navigate(['/settings']);
            this.menu.toggle(event);
          }
        },
 
        {
          label: "Logout",
          icon: "pi pi-fw pi-power-off",
          command: () => this.logout()
        }
      ]; 
    });
 
  }

  saveTabSelect(e) {
    console.log("From Navbar", e);

    localStorage.setItem("tagSelected", e);
    return true;
  }

  retrieveSelected(){
    console.log("Tring to fix!")
    var curTag = localStorage.getItem("tagSelected");
    var element = document.getElementById(curTag);
    element.classList.add("active"); 
  }

  ngOnInit(): void {
    this.loadingbar$ = this.store.pipe(select(state => state.spinner.isOn));
    this.getUserName();
    this.retrieveSelected();
  }

  ngDoCheck(): void{
    this.getTheme();
  }

  addWebhookUrl()
  {
    this.progress = true;
    let payload = {
      "webhook_url": this.webhook_url
    }
 
    this.http.post<any>(this.addWebHook, payload,{
      observe: 'response',
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      responseType: 'json',
      withCredentials: true
    }).subscribe(data=>{
      console.log(data.status);
      this.messageService.add({severity: "success", summary:'success', detail:'WebHook Added Succesfully'});
      this.progress = false;
      this.displayModal = false;
    }, 
    error => {
      console.error('Error', error);
      this.messageService.add({severity: "error", summary:'Error', detail:'Something went wrong'});
      this.progress = false;
      this.displayModal = false;
    });
  }
 
  logout() 
  {
    this.authService.logout();
  }
 
}