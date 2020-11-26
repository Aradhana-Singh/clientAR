import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { MenuItem } from "primeng/api";
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  items: MenuItem[];

  constructor(private authService: AuthService, private router: Router) { }

  getUserName() 
  {
    return "xyz";
  }

  ngOnInit(): void {
    this.items = [
      {
        label: this.getUserName()
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
        command: () => this.router.navigate(['/logout'])
      }
    ];
  }

  logout() 
  {
    this.authService.logout();
  }

}
