import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class UserService {

  constructor(private http: Http) { }

  socialLogin = false;

  onLogin(email: string, password: string) {
    return this.http.get('http://localhost:8888/api/v1/getUser/' + email + '/' + password);
  }

  onSignup(email: string, name: string, password: string) {
    return this.http.post('http://localhost:8888/api/v1/createUser',
      ({ email: email, name: name, password: password }));
  }

  getAllMovies() {
    return this.http.get('http://localhost:8888/api/v1/getAllMovies');
  }

  getAllSeries() {
    return this.http.get('http://localhost:8888/api/v1/getAllSeries');
  }

  getAllSeasons(season) {
    return this.http.get('http://localhost:8888/api/v1/getAllSeasons/' + season);
  }

  getAllEpisodes(season, number) {
    return this.http.get('http://localhost:8888/api/v1/getAllEpisodes/' + season + '/' + number);
  }

  insertMovies(id, name, img, desc, genre, yor) {
    return this.http.post('http://localhost:8888/api/v1/insertMovie',
    {mid: id, name: name, imgSrc: img, description: desc, genre: genre, releaseDate: yor});
  }

  insertSeries(id, name, genre, img, yor, desc) {
    return this.http.post('http://localhost:8888/api/v1/insertSeries',
      { sid: id, name: name, imgSrc: img, description: desc, genre: genre, releaseDate: yor });
  }

  insertSeasons(name, sno, img, yor) {
    return this.http.post('http://localhost:8888/api/v1/insertSeason',
      { name: name, seasonNumber: sno, imgSrc: img, releaseDate: yor });
  }

  insertEpisodes(name, sno, img, ename) {
    return this.http.post('http://localhost:8888/api/v1/insertEpisode',
      { name: name, seasonNumber: sno, imgSrc: img, episodeName: ename });
  }

  deleteMovie(name) {
    return this.http.delete('http://localhost:8888/api/v1/deleteMovie/' + name);
  }

  deleteSeries(name) {
    return this.http.delete('http://localhost:8888/api/v1/deleteSeries/' + name);
  }

  deleteSeason(name) {
    return this.http.delete('http://localhost:8888/api/v1/deleteSeason/' + name);
  }

  deleteEpisode(name) {
    return this.http.delete('http://localhost:8888/api/v1/deleteEpisode/' + name);
  }

  getMovie(movName) {
    return this.http.get('http://localhost:8888/api/v1/getMovie/' + movName);
  }

  getSeries(seriesName) {
    console.log(seriesName);
    return this.http.get('http://localhost:8888/api/v1/getSeries/' + seriesName);
  }

  updateMovie(id, movaname, movgenre, movsrc, movyor, movdes) {
    return this.http.put('http://localhost:8888/api/v1/updateMovie/' + id,
    { name: movaname, genre: movgenre, imgSrc: movsrc , releaseDate: movyor, description: movdes } );
  }

  updateSeries(id, movaname, movgenre, movsrc, movyor, movdes) {
    return this.http.put('http://localhost:8888/api/v1/updateSeries/' + id,
      { name: movaname, genre: movgenre, imgSrc: movsrc, releaseDate: movyor, description: movdes });
  }

  isLoggedIn() {
    return localStorage.getItem('email') === null ? false : true;
  }
}
