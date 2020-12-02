import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  storedTheme: string = localStorage.getItem('theme-color');

  constructor(private http:HttpClient) { }

  ngOnInit(): void {
    
  }
  bodyTag: HTMLBodyElement = document.getElementsByTagName('body')[0];

  setTheme(){
    if(this.storedTheme === 'theme-dark'){
      localStorage.setItem('theme-color','theme-light');
      this.storedTheme = localStorage.getItem('theme-color');
      this.bodyTag.classList.remove('theme-dark');
      this.bodyTag.classList.add('theme-light');
      // document.documentElement.setAttribute('color-theme','theme-dark');
    }
    else{
      localStorage.setItem('theme-color','theme-dark');
      this.storedTheme = localStorage.getItem('theme-color');
      this.bodyTag.classList.remove('theme-light');
      this.bodyTag.classList.add('theme-dark');
      
      // this.bodyTag.setAttribute('color-theme',this.storedTheme);
    }
  }
}
