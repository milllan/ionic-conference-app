import { Component, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { UserData } from '../../providers/user-data';

import { UserOptions } from '../../interfaces/user-options';



@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  styleUrls: ['./login.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginPage {
  login: UserOptions = { username: '', password: '' };
  submitted = false;

  loginApiError = false;

  constructor(
    public userData: UserData,
    public router: Router
  ) {
    console.log('this', userData);
  }

  onSignup() {
    this.router.navigateByUrl('/signup');
  }

  async onLogin(form: NgForm) {
    this.submitted = true;

    if (form.valid) {
      await this.userData.login(this.login.username, this.login.password);
      this.userData.isLoggedIn().then(isLoggedIn => {
        if (isLoggedIn) {
          this.router.navigateByUrl('/app/tabs/(schedule:schedule)');
        } else {
          this.loginApiError = true;
        }
      });
    }
  }
}
