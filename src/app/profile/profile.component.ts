import { Component, OnInit, ElementRef } from '@angular/core';
import { UserService } from '../user.service';
import { Http, RequestOptions, Headers } from '@angular/http';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: any = [];
  constructor(private service: UserService, private http: Http, private el: ElementRef) {
     this.service.getUserData(this.service.email).subscribe(res => {
       this.user = JSON.parse(res.text());
      });
   }

  ngOnInit() {
  }

 uploadImage() {
    let path = '';
    const headers = new Headers({
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });

    const options = new RequestOptions({ headers: headers });
    const inputEl: HTMLInputElement = this.el.nativeElement.querySelector('#imageField');
    const fileCount: number = inputEl.files.length;
    const formData = new FormData();
    if (fileCount > 0) {
      formData.append('imageField', inputEl.files.item(0));
      this.service.updateProfilePicture(formData, options).subscribe(res => {
        const result = JSON.parse(res.text());
        path = JSON.parse(res.text()).path;
        window.location.reload();
        alert('Upload completed successfully !');
      },
        (error) => alert(error));
      }
    }
  }
