import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'; 

@Component({
  selector: 'app-page404',
  templateUrl: './page404.component.html',
  styleUrls: ['./page404.component.scss']
})
export class Page404Component implements OnInit {

  constructor(private _router: Router) { }

  ngOnInit(): void {
    setTimeout(() => 
    {
        this._router.navigate(['/home']);
    },
    3000);
  }

}



