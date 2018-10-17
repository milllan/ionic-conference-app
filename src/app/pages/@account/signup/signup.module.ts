import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { SignupPage } from './signup';
import { SignupPageRoutingModule } from './signup-routing.module';

import { AccountLogoComponentModule } from '../../../components/account-logo/account-logo.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SignupPageRoutingModule,

    AccountLogoComponentModule
  ],
  declarations: [
    SignupPage
  ]
})
export class SignUpModule { }
