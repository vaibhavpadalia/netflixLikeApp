import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-season',
  templateUrl: './season.component.html',
  styleUrls: ['./season.component.scss']
})
export class SeasonComponent implements OnInit {
  seasonInfo: any;
  seasonName: string;
  constructor(private router: Router, private route: ActivatedRoute, private service: UserService) { }

  ngOnInit() {
    this.seasonName = this.route.snapshot.params['value'];
    this.service.getAllSeasons(this.seasonName).subscribe(res => {
      this.seasonInfo = JSON.parse(res.text());
      console.log(this.seasonInfo);  // For testing purpose only
    });
  }

  sendData(name, number) {
    this.router.navigate(['/episode', name, number]);
  }
}
