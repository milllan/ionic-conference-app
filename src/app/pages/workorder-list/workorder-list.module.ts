import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { WorkorderListPage } from './workorder-list';
import { WorkorderFilterPage } from '../workorder-filter/workorder-filter';
import { WorkorderListPageRoutingModule } from './workorder-list-routing.module';

import { InstallPwaButtonComponentModule } from '../../components/install-pwa-button/install-pwa-button.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WorkorderListPageRoutingModule,

    InstallPwaButtonComponentModule
  ],
  declarations: [
    WorkorderListPage,
    WorkorderFilterPage
  ],
  entryComponents: [
    WorkorderFilterPage
  ]
})
export class WorkorderListModule { }
