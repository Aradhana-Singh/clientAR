import { animate, state, style, transition, trigger } from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { reduce } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  // animations: [
  //   trigger('themeState', [
  //     state('normal', style({
  //       transform: 'rotate(0deg)'
  //     })),
  //     state('dark', style({
  //       transform: 'rotate(360deg)'
  //     })),
  //     transition('normal <=> dark', animate('1.5s ease-out'))
  //   ])
  // ]
})

export class HomeComponent implements OnInit {
 
  // state = '';
  storedTheme: string = localStorage.getItem('theme-color');
 

  constructor(private http:HttpClient) { }

  ngOnInit(): void {
    // if(this.storedTheme == 'theme-dark'){
    //   this.state = 'dark'
    // }
    // else{
    //   this.state = 'normal'
    // }
  }
  bodyTag: HTMLBodyElement = document.getElementsByTagName('body')[0];

  setTheme(){
    if(this.storedTheme === 'theme-dark'){
      //  this.state = 'normal';
        localStorage.setItem('theme-color','theme-light');
      this.storedTheme = localStorage.getItem('theme-color');
      this.bodyTag.classList.remove('theme-dark');
      this.bodyTag.classList.add('theme-light');
      

      
      setTimeout( function (){
        window.location.reload();
      }, 2600);
      // document.documentElement.setAttribute('color-theme','theme-dark');
    }
    else{
      //  this.state = 'dark';
        localStorage.setItem('theme-color','theme-dark');
      this.storedTheme = localStorage.getItem('theme-color');
      this.bodyTag.classList.remove('theme-light');
      this.bodyTag.classList.add('theme-dark');
      setTimeout( function (){
        window.location.reload();
      }, 2600);

      // this.bodyTag.setAttribute('color-theme',this.storedTheme);
    }
  }
}
