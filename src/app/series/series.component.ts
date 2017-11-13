import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-series',
  templateUrl: './series.component.html',
  styleUrls: ['./series.component.scss']
})
export class SeriesComponent implements OnInit {
  series: any;
  genre: any;
  constructor(private router: Router, private service: UserService) { }

  ngOnInit() {
    this.service.getAllSeries()
      .subscribe(res => {
        this.series = JSON.parse(res.text());
        console.log(this.series);  // For testing purpose only
        this.genre = Array.from(new Set(this.series.map(e => e.genre)));
        console.log(this.genre);  // For testing purpose only
      });
  }

  sendName(value) {
    console.log(value); // For testing purpose only
    this.router.navigate(['/season', value]);
  }

}
