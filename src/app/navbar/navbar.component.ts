import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { MenuItem } from "primeng/api";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  items: MenuItem[];

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.items = [
      {
        label: "Settings",
        icon: "pi pi-fw pi-cog"
      },
      {
        separator: true
      },
      {
        label: "Logout",
        icon: "pi pi-fw pi-power-off"
      }
    ];
  }

  logout() 
  {
    this.authService.logout();
  }

}
