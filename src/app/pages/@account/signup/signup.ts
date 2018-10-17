import { Component, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { UserData } from '../../../providers/user-data';

import { UserOptions } from '../../../interfaces/user-options';



@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
  styleUrls: ['./signup.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SignupPage {
  signup: UserOptions = { username: '', password: '', email: '' };
  submitted = false;

  constructor(
    public router: Router,
    public userData: UserData
  ) {
    console.log({'SignupPage' : this});
  }

  onSignup(form: NgForm) {
    console.log('onSignup USO - form.valid?', form.valid);
    this.submitted = true;

    if (form.valid) {
      console.log('form.valid');
      this.userData.signup(this.signup.username);
      this.router.navigateByUrl('/app/tabs/(schedule:schedule)');
    }
  }
}
