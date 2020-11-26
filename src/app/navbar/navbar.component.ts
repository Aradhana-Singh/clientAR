import { Component, DoCheck, OnChanges, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { MenuItem } from "primeng/api";
import { Router } from '@angular/router';
import jwt_decode from "jwt-decode";
import { HttpClient, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  items: MenuItem[];
  getUser = "http://localhost:8080/user/get-user";
  public full_name = "";
  constructor(private authService: AuthService, private router: Router, private http:HttpClient) { }

  getUserName() 
  {
    let decoded_token = jwt_decode(this.authService.getToken());
    let email = decoded_token["sub"];

    let params = new HttpParams().set("email", email);
    // let full_name = "";

    let response = this.http.get<any>(this.getUser,{withCredentials:true, params: params});
    
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
          label: "Settings",
          icon: "pi pi-fw pi-cog",
          command: () => this.router.navigate(['/settings'])
        },
        
        {
          label: "Logout",
          icon: "pi pi-fw pi-power-off",
          command: () => this.logout()
        }
      ]; 
    });

  }

  ngOnInit(): void {
      this.getUserName();
  }

  logout() 
  {
    this.authService.logout();
  }

}
