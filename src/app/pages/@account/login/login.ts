import { Component, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserData } from '../../../providers/user-data';
import { UserOptions } from '../../../interfaces/user-options';

// import { AccountLogoComponent } from '../../../components/account-logo/account-logo.component';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  styleUrls: ['./login.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginPage {
  login: UserOptions = { username: '', password: '', email: '' };
  submitted = false;
  loginApiError = false;

  constructor(
    public userData: UserData,
    public router: Router
  ) {
    console.log('this [login.ts]', userData);
  }

  onSignup() {
    this.router.navigateByUrl('/signup');
  }

  async onLogin(form: NgForm) {
    this.submitted = true;

    if (form.valid) {
      await this.userData.login(this.login.username, this.login.password); // login API
      const isLoggedIn = await this.userData.isLoggedIn();       // console.log('login.ts onLogin', isLoggedIn);
      if (isLoggedIn) {
        this.router.navigateByUrl('/app/tabs/(workorders:workorders)');
      } else {
        this.loginApiError = true; // bad credentials, show error in html
      }
    }
  }

  async onForgotPassword(form: NgForm) {
    this.router.navigateByUrl('/forgot-password');
  }
}
