import { Component, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserData } from '../../../providers/user-data';
import { UserOptions } from '../../../interfaces/user-options';

@Component({
  selector: 'page-forgot-password',
  templateUrl: './forgot-password.html',
  styleUrls: ['./forgot-password.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ForgotPasswordPage {
  login: UserOptions = { username: '', password: '', email: '' };
  submitted = false;
  loginApiError = false;
  fogotPassword = false;

  constructor(
    public userData: UserData,
    public router: Router
  ) {
    console.log('this [fogot-password.ts]', userData);
  }

  async onForgotPassword(form: NgForm) {
    this.submitted = true;
    this.fogotPassword = true;
    console.log('onForgotPassword form', form);
    if (form.valid) {
      await this.userData.forgotPassword(this.login.username, window.location.origin + '/login');
    }
  }

}
