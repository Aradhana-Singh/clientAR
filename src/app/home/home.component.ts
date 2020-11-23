import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

  constructor(private http:HttpClient) { }

  ngOnInit(): void {
    // let response = this.http.get<any>("http://localhost:8080/");
    // console.log(response);
    // response.subscribe((data)=>console.log(data));
  }
}
