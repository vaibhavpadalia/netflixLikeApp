import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { AuthService } from 'angular4-social-login';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router, private service: UserService, private authService: AuthService) { }

  ngOnInit() {
  }
  logout() {
    localStorage.removeItem('email');
    localStorage.removeItem('role');
    this.router.navigate(['/welcome']);
    if (this.service.socialLogin) {
      console.log('Inside social login');
      this.service.socialLogin = false;
      this.authService.signOut().then(res => console.log(res));
    }
  }
}
