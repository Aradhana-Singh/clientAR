import { Component } from '@angular/core';

@Component({
  selector: 'app-home-layout',
  template: `
    <app-navbar></app-navbar>
    <router-outlet></router-outlet>
  `,
  styles: []
})
export class HomeLayoutComponent {}