import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css'],
})
export class MovieComponent implements OnInit {
  movies: any;
  genre: any;
  constructor(private service: UserService) { }

  ngOnInit() {
    this.service.getAllMovies()
    .subscribe(res => {
      this.movies = JSON.parse(res.text());
      console.log(this.movies);  // For testing purpose only
      this.genre = Array.from(new Set(this.movies.map(e => e.genre)));
      console.log(this.genre);  // For testing purpose only
    });
  }


}
