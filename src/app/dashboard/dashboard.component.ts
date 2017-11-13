import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  role: number;
  constructor() { }

  ngOnInit() {
     this.role = parseInt(localStorage.getItem('role'), 10);
    console.log(typeof this.role);
  }

}
