import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SupportPage } from './support';
import { SupportPageRoutingModule } from './support-routing.module';

import { AccountLogoComponentModule } from '../../components/account-logo/account-logo.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SupportPageRoutingModule,

    AccountLogoComponentModule
  ],
  declarations: [
    SupportPage,
  ]
})
export class SupportModule { }
