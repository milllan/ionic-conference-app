import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TabsPage } from './tabs-page';

import { AboutPage } from '../about/about';
import { MapPage } from '../map/map';
import { SchedulePage } from '../schedule/schedule';
import { SessionDetailPage } from '../session-detail/session-detail';
import { SpeakerDetailPage } from '../speaker-detail/speaker-detail';
import { SpeakerListPage } from '../speaker-list/speaker-list';

import { WorkOrderListPage } from '../workorder-list/workorder-list';



const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      // tab one
      {
        path: 'schedule',
        component: SchedulePage,
        outlet: 'schedule'
      },
      {
        path: 'session/:sessionId',
        component: SessionDetailPage,
        outlet: 'schedule'
      },
      // tab two
      {
        path: 'speakers',
        component: SpeakerListPage,
        outlet: 'speakers'
      },
      {
        path: 'session/:sessionId',
        component: SessionDetailPage,
        outlet: 'speakers'
      },
      {
        path: 'speaker-details/:speakerId',
        component: SpeakerDetailPage,
        outlet: 'speakers'
      },
      // tab three
      {
        path: 'map',
        component: MapPage,
        outlet: 'map'
      },
      // tab four
      {
        path: 'about',
        component: AboutPage,
        outlet: 'about'
      },
      // tab WO
      {
        path: 'workorders',
        component: WorkOrderListPage,
        outlet: 'workorders'
      },
      // {
      //   path: 'workorder/:workorderId',
      //   component: WorkorderDetailPage,
      //   outlet: 'workorder'
      // },
      // tab TECH
      // {
      //   path: 'technicians',
      //   component: TechnicianListPage,
      //   outlet: 'technicians'
      // },
      // {
      //   path: 'technician/:sessionId',
      //   component: TechnicianDetailPage,
      //   outlet: 'technicians'
      // },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule { }
