import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private user: any;
  constructor(private router: Router, private service: UserService) { }
  ngOnInit() {
  }

  login(email: string, password: string) {
    this.service.onLogin(email, password)
      .subscribe(res => {
        this.user = JSON.parse(res.text());
        console.log(this.user); // For testing purpose only
        if (this.user !== null) {
          this.router.navigate(['/dashboard']);
          localStorage.setItem('email', email);
        } else {
          alert('Error occurred');
        }
      });
  }
}
