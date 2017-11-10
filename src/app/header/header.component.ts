import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router, private service: UserService) { }

  ngOnInit() {
  }
  logout() {
    localStorage.removeItem('email');
    this.router.navigate(['/welcome']);
  }
}
