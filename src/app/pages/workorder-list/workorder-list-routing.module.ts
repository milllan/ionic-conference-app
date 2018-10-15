import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WorkorderListPage } from './workorder-list';

const routes: Routes = [
  {
    path: '',
    component: WorkorderListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkorderListPageRoutingModule { }
