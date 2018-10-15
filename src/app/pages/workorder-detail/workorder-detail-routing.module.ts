import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WorkorderDetailPage } from './workorder-detail';

const routes: Routes = [
  {
    path: '',
    component: WorkorderDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkorderDetailPageRoutingModule { }
