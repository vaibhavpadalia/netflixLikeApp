import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { FacebookLoginProvider, GoogleLoginProvider, AuthService } from 'angular4-social-login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  private user: any;
  sub;
  constructor(private router: Router, private service: UserService, private authService: AuthService) { }
  ngOnInit() {
  }

  signInWithGoogle() {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(res => {
      this.sub = this.authService.authState.subscribe((user) => {
        this.user = user;
        console.log(this.user); // For Testing purpose only
        if (this.user !== null) {
          this.service.onSignup(this.user.email, this.user.name, Math.random().toString(36).substring(3))
            .subscribe(response => console.log(response)); // For Testing purpose only
          this.router.navigate(['/dashboard']);
          localStorage.setItem('email', this.user.email);
          this.service.socialLogin = true;
        }
      });
    });
  }

  signInWithFB() {
    console.log('inside');
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then(res => {
      this.sub = this.authService.authState.subscribe((user) => {
        this.user = user;
        console.log(this.user); // For Testing purpose only
        if (this.user !== null) {
          this.service.onSignup(this.user.email, this.user.name, Math.random().toString(36).substring(3))
            .subscribe(response => console.log(response)); // For Testing purpose only
          this.router.navigate(['/dashboard']);
          localStorage.setItem('email', this.user.email);
          this.service.socialLogin = true;
        }
      });
    });
  }

  login(email: string, password: string) {
    this.service.onLogin(email, password)
      .subscribe(res => {
        this.user = res;
        console.log(this.user); // For testing purpose only
        if (this.user !== null) {
          this.router.navigate(['/dashboard']);
          localStorage.setItem('email', email);
          localStorage.setItem('role', this.user.role);
        } else {
          alert('Error occurred');
        }
      });
  }

  ngOnDestroy() {
    if (this.service.socialLogin) {
      this.sub.unsubscribe();
    }
  }
}
