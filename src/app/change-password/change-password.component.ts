import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { FormGroup } from '@angular/forms/src/model';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  constructor(private service: UserService) { }

  ngOnInit() {
  }

  changePassword(oldPassword, newPassword, confirmPassword) {
    if (newPassword === confirmPassword) {
      this.service.changePassword(localStorage.getItem('email'), oldPassword, newPassword)
        .subscribe(res => {
          if (JSON.parse(res.text()) !== null) {
            alert('Password Changed');
            (< HTMLFormElement>document.getElementById('form')).reset();
          } else {
            alert('Old password entered was not correct');
          }
        });
    } else {
      alert('Your passwords dont Match');
    }
  }

}
