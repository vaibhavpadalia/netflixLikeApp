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
  sub: any;
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
            .subscribe(response => {
              this.service.getSocialUser(this.user.email).subscribe(res => {
                if (JSON.parse(res.text()).success === true) {
                  const token = JSON.parse(res.text()).token;
                  if (token !== null) {
                    this.setToken(token);
                    this.service.socialLogin = true;
                  }
                }
              });
            });
        }
      });
    });
  }

  signInWithFB() {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then(res => {
      this.sub = this.authService.authState.subscribe((user) => {
        this.user = user;
        console.log(this.user); // For Testing purpose only
        if (this.user !== null ) {
          this.service.onSignup(this.user.email, this.user.name, Math.random().toString(36).substring(3))
            .subscribe(response => {
              this.service.getSocialUser(this.user.email).subscribe(res => {
                if (JSON.parse(res.text()).success === true) {
                  const token = JSON.parse(res.text()).token;
                  if (token !== null) {
                    this.setToken(token);
                    this.service.socialLogin = true; }
                }
              });
            }); }
      });
    });
  }

  login(email: string, password: string) {
    this.service.onLogin(email, password)
      .subscribe(res => {
        this.user = JSON.parse(res.text());
        console.log(this.user); // For testing purpose only
        if (this.user.success) {
          console.log('inside true');
          if (this.user.token !== null) {
            this.setToken(this.user.token);
          }
        } else {
          alert('Error occurred');
        }
      });
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    this.service.email = JSON.parse(window.atob(base64)).email;
    this.service.role = parseInt(JSON.parse(window.atob(base64)).role, 10);
    this.router.navigate(['/dashboard']);
  }

  ngOnDestroy() {
    if (this.service.socialLogin) {
      this.sub.unsubscribe();
    }
  }
}
