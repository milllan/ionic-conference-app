import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { WorkOrderListPage } from './workorder-list';
import { WorkorderFilterPage } from '../workorder-filter/workorder-filter';
import { WorkOrderListPageRoutingModule } from './workorder-list-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WorkOrderListPageRoutingModule
  ],
  declarations: [
    WorkOrderListPage,
    WorkorderFilterPage
  ],
  entryComponents: [
    WorkorderFilterPage
  ]
})
export class WorkorderListModule { }
