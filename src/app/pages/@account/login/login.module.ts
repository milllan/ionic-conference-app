import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { LoginPage } from './login';
import { LoginPageRoutingModule } from './login-routing.module';

import { AccountLogoComponentModule } from '../../../components/account-logo/account-logo.module';
import { InstallPwaButtonComponentModule } from '../../../components/install-pwa-button/install-pwa-button.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginPageRoutingModule,

    AccountLogoComponentModule,
    InstallPwaButtonComponentModule,
  ],
  declarations: [
    LoginPage
  ]
})
export class LoginModule { }
