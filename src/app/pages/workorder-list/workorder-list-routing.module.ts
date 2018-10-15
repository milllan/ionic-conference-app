import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WorkOrderListPage } from './workorder-list';

const routes: Routes = [
  {
    path: '',
    component: WorkOrderListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkOrderListPageRoutingModule { }
