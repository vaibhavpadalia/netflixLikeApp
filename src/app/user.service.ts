import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class UserService {

  constructor(private http: Http) { }

  onLogin(email: string, password: string) {
    return this.http.get('http://localhost:8888/api/v1/getUser/' + email + '/' + password);
  }

  onSignup(email: string, name: string, password: string) {
    return this.http.post('http://localhost:8888/api/v1/createUser',
      ({ email: email, name: name, password: password }));
  }

  isLoggedIn() {
    return localStorage.getItem('email') === null ? false : true;
  }
}
