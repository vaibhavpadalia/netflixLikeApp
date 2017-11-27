import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';

@Injectable()
export class UserService {
  email= '';
  role: number;

  constructor(private http: Http) {
     this.setToken();
   }

  path = 'http://localhost:8888/api/v1/';
  socialLogin = false;

  setToken() {
    const token = localStorage.getItem('token');
    if (token !== null) {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace('-', '+').replace('_', '/');
      this.email = JSON.parse(window.atob(base64)).email;
      this.role = parseInt(JSON.parse(window.atob(base64)).role, 10);
    }
  }

  setHeader() {
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
    const options = new RequestOptions({ headers: headers });
    return options;
  }

  onLogin(email: string, password: string) {
    return this.http.get(this.path + 'getUser/' + email + '/' + password);
  }

  getSocialUser(email: string) {
    return this.http.get(this.path + 'getSocialUser/' + email);
  }

  getUserData(email: string) {
    this.setToken();
    return this.http.get(this.path + 'getUserData/' + email, this.setHeader());
  }

  onSignup(email: string, name: string, password: string) {
    return this.http.post(this.path + 'createUser',
      ({ email: email, name: name, password: password }));
  }

  getAllMovies() {
    this.setToken();
    return this.http.get(this.path + 'getAllMovies', this.setHeader());
  }

  getAllSeries() {
    this.setToken();
    return this.http.get(this.path + 'getAllSeries', this.setHeader());
  }

  getAllSeasons(season) {
    this.setToken();
    return this.http.get(this.path + 'getAllSeasons/' + season, this.setHeader());
  }

  getAllEpisodes(season, number) {
    this.setToken();
    return this.http.get(this.path + 'getAllEpisodes/' + season + '/' + number, this.setHeader());
  }

  insertMovies(id, name, img, desc, genre, yor) {
    this.setToken();
    return this.http.post(this.path + 'insertMovie',
      { mid: id, name: name, imgSrc: img, description: desc, genre: genre, releaseDate: yor },
      this.setHeader());
  }

  insertSeries(id, name, genre, img, yor, desc) {
    this.setToken();
    return this.http.post(this.path + 'insertSeries',
      { sid: id, name: name, imgSrc: img, description: desc, genre: genre, releaseDate: yor },
      this.setHeader());
  }

  insertSeasons(name, sno, img, yor) {
    this.setToken();
    return this.http.post(this.path + 'insertSeason',
      { name: name, seasonNumber: sno, imgSrc: img, releaseDate: yor }, this.setHeader());
  }
  insertEpisodes(name, sno, img, ename) {
    this.setToken();
    return this.http.post(this.path + 'insertEpisode',
      { name: name, seasonNumber: sno, imgSrc: img, episodeName: ename }, this.setHeader());
  }

  deleteMovie(name) {
    this.setToken();
    return this.http.delete(this.path + 'deleteMovie/' + name, this.setHeader());
  }

  deleteSeries(name) {
    this.setToken();
    return this.http.delete(this.path + 'deleteSeries/' + name, this.setHeader());
  }

  getMovie(movName) {
    this.setToken();
    return this.http.get(this.path + 'getMovie/' + movName, this.setHeader());
  }

  getSeries(seriesName) {
    this.setToken();
    return this.http.get(this.path + 'getSeries/' + seriesName, this.setHeader());
  }

  updateMovie(id, movaname, movgenre, movsrc, movyor, movdes) {
    this.setToken();
    return this.http.put(this.path + 'updateMovie/' + id,
    { name: movaname, genre: movgenre, imgSrc: movsrc , releaseDate: movyor, description: movdes }
      , this.setHeader() );
  }

  updateSeries(id, movaname, movgenre, movsrc, movyor, movdes) {
    this.setToken();
    return this.http.put(this.path + 'updateSeries/' + id,
      { name: movaname, genre: movgenre, imgSrc: movsrc, releaseDate: movyor, description: movdes }
      , this.setHeader());
  }

  updateProfilePicture(formData: FormData, options) {
    this.setToken();
    return this.http.post(this.path + 'upload/' + this.email, formData, options);
  }

  changePassword(email, oldPassword, newPassword) {
    this.setToken();
    return this.http.put(this.path + 'changePassword/'
      + this.email + '/' + oldPassword, { newPassword: newPassword },
      this.setHeader());
  }

  isLoggedIn() {
    return localStorage.getItem('token') === null ? false : true;
  }
}
