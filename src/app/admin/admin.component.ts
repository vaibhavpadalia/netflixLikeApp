import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss', './admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private service: UserService) { }

  movie: any;
  season: any;
  ngOnInit() {
  }

  insertMovie(id, name, image, desc, genre, yor) {
    this.service.insertMovies(id, name, image, desc, genre, yor).subscribe(res => {
      if (JSON.parse(res.text()).success !== false) {
        alert('Movie Inserted Successfully');
      } else {
      alert('Insertion failed.');
      }
    });
  }

  insertSeries(id, name, genre, image, yor, desc) {
    this.service.insertSeries(id, name, genre, image, yor, desc).subscribe(res => {
      console.log(res);
      if (JSON.parse(res.text()).success !== false) {
        alert('Series Inserted Successfully');
      } else {
        alert('Insertion failed.');
      }
    });
  }

  insertSeasons(name, sno, img, yor) {
    this.service.insertSeasons(name, sno, img, yor).subscribe(res => {
      console.log(res);
      if (JSON.parse(res.text()).success !== false) {
        alert('Season Inserted Successfully');
      } else {
        alert('Insertion failed.');
      }
      });
  }

  insertEpisodes(name, sno, img, ename) {
    this.service.insertEpisodes(name, sno, img, ename).subscribe(res => {
      console.log(res);
      if (JSON.parse(res.text()).success !== false) {
        alert('Episode Inserted Successfully');
      } else {
        alert('Insertion failed.');
      }
    });
  }

  deleteMovie(name) {
    this.service.deleteMovie(name).subscribe(res => {
      console.log(res);
      if (JSON.parse(res.text()).success !== false) {
        alert('Deleted Successfully');
      } else {
        alert('Deletion failed.');
      }
    });
  }

  deleteSeries(name) {
    console.log(name);
    this.service.deleteSeries(name).subscribe(res => {
      console.log(res);
      if (JSON.parse(res.text()).success !== false) {
        alert('Series Deleted Successfully');
      } else {
        alert('Deletion failed.');
      }
    });
   }

  async getMovie(movName) {
    await this.service.getMovie(movName)
    .subscribe(res => {
      console.log(res);
      if (JSON.parse(res.text())) {
      this.movie = JSON.parse(res.text());
      (<HTMLInputElement>document.getElementById('movname')).value = this.movie.name;
      (<HTMLInputElement>document.getElementById('movgenre')).value = this.movie.genre;
      (<HTMLInputElement>document.getElementById('movsrc')).value = this.movie.imgSrc;
      (<HTMLInputElement>document.getElementById('movyor')).value = this.movie.releaseDate;
      (<HTMLInputElement>document.getElementById('movdes')).value = this.movie.description;
      } else {
    alert('Movie Not Found');
  }
});
  }

  updateMovie(movaname, movgenre, movsrc, movyor, movdes) {
    console.log(this.movie.mid, movaname, movgenre, movsrc, movyor, movdes);
    this.service.updateMovie(this.movie.mid, movaname, movgenre, movsrc, movyor, movdes)
    .subscribe(res => console.log(res));
  }

  async getSeries(seriesName) {
    console.log(seriesName);
    await this.service.getSeries(seriesName)
      .subscribe(res => {
        console.log(res);
        if (JSON.parse(res.text())) {
          this.season = JSON.parse(res.text());
          (<HTMLInputElement>document.getElementById('seriesName')).value = this.season.name;
          (<HTMLInputElement>document.getElementById('seriesGenre')).value = this.season.genre;
          (<HTMLInputElement>document.getElementById('seriesSrc')).value = this.season.imgSrc;
          (<HTMLInputElement>document.getElementById('seriesyor')).value = this.season.releaseDate;
          (<HTMLInputElement>document.getElementById('seriesdes')).value = this.season.description;
        } else {
          alert('Series Not Found');
        }
      });
  }

  updateSeries(seriesName, seriesGenre, seriesSrc, seriesyor, seriesdes) {
    console.log(this.season.sid, seriesName, seriesGenre, seriesSrc, seriesyor, seriesdes);
    this.service.updateSeries(this.season.sid, seriesName, seriesGenre, seriesSrc, seriesyor, seriesdes)
      .subscribe(res => console.log(res));
  }
}
