import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { LoginPage } from './login';
import { LoginPageRoutingModule } from './login-routing.module';

import { AccountLogoComponentModule } from '../../../components/account-logo/account-logo.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginPageRoutingModule,

    AccountLogoComponentModule
  ],
  declarations: [
    LoginPage
  ]
})
export class LoginModule { }
