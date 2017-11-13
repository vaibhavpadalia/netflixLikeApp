import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-episode',
  templateUrl: './episode.component.html',
  styleUrls: ['./episode.component.scss']
})
export class EpisodeComponent implements OnInit {
  seasonName: string;
  seasonNumber: number;
  seasonInfo: any;
  constructor(private service: UserService , private route: ActivatedRoute) { }

  ngOnInit() {
    this.seasonName = this.route.snapshot.params['name'];
    this.seasonNumber = this.route.snapshot.params['number'];
    console.log(this.seasonName);
    console.log(this.seasonNumber);
    this.service.getAllEpisodes(this.seasonName, this.seasonNumber).subscribe(res => {
      console.log(res);
      this.seasonInfo = JSON.parse(res.text());
      console.log(this.seasonInfo);  // For testing purpose only
    });
  }

}
