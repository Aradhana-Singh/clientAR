import { Component } from '@angular/core';

@Component({
  selector: 'app-home-layout',
  template: `
    <router-outlet name="aux"></router-outlet>
    <app-navbar></app-navbar>
    <router-outlet></router-outlet>
  `,
  styles: []
})
export class HomeLayoutComponent {}