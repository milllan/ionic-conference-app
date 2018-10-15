import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkorderDetailPage } from './workorder-detail';
import { WorkorderDetailPageRoutingModule } from './workorder-detail-routing.module';
import { IonicModule } from '@ionic/angular';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    WorkorderDetailPageRoutingModule
  ],
  declarations: [
    WorkorderDetailPage,
  ]
})
export class WorkorderDetailModule { }
