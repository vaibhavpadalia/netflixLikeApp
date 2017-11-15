import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class UserService {

  constructor(private http: Http) {
   }
  path = 'http://localhost:8888/api/v1/';
  socialLogin = false;

  onLogin(email: string, password: string) {
    return this.http.get(this.path + 'getUser/' + email + '/' + password);
  }

  onSignup(email: string, name: string, password: string) {
    return this.http.post(this.path + 'createUser',
      ({ email: email, name: name, password: password }));
  }

  getAllMovies() {
    return this.http.get(this.path + 'getAllMovies');
  }

  getAllSeries() {
    return this.http.get(this.path + 'getAllSeries');
  }

  getAllSeasons(season) {
    return this.http.get(this.path + 'getAllSeasons/' + season);
  }

  getAllEpisodes(season, number) {
    return this.http.get(this.path + 'getAllEpisodes/' + season + '/' + number);
  }

  insertMovies(id, name, img, desc, genre, yor) {
    return this.http.post(this.path + 'insertMovie',
    {mid: id, name: name, imgSrc: img, description: desc, genre: genre, releaseDate: yor});
  }

  insertSeries(id, name, genre, img, yor, desc) {
    return this.http.post(this.path + 'insertSeries',
      { sid: id, name: name, imgSrc: img, description: desc, genre: genre, releaseDate: yor });
  }

  insertSeasons(name, sno, img, yor) {
    return this.http.post(this.path + 'insertSeason',
      { name: name, seasonNumber: sno, imgSrc: img, releaseDate: yor });
  }

  insertEpisodes(name, sno, img, ename) {
    return this.http.post(this.path + 'insertEpisode',
      { name: name, seasonNumber: sno, imgSrc: img, episodeName: ename });
  }

  deleteMovie(name) {
    return this.http.delete(this.path + 'deleteMovie/' + name);
  }

  deleteSeries(name) {
    return this.http.delete(this.path + 'deleteSeries/' + name);
  }

  getMovie(movName) {
    return this.http.get(this.path + 'getMovie/' + movName);
  }

  getSeries(seriesName) {
    console.log(seriesName);
    return this.http.get(this.path + 'getSeries/' + seriesName);
  }

  updateMovie(id, movaname, movgenre, movsrc, movyor, movdes) {
    return this.http.put(this.path + 'updateMovie/' + id,
    { name: movaname, genre: movgenre, imgSrc: movsrc , releaseDate: movyor, description: movdes } );
  }

  updateSeries(id, movaname, movgenre, movsrc, movyor, movdes) {
    return this.http.put(this.path + 'updateSeries/' + id,
      { name: movaname, genre: movgenre, imgSrc: movsrc, releaseDate: movyor, description: movdes });
  }

  isLoggedIn() {
    return localStorage.getItem('email') === null ? false : true;
  }
}
