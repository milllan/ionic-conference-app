import { Component } from '@angular/core';

import { ConferenceData } from '../../providers/conference-data';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'page-workorder-detail',
  templateUrl: 'workorder-detail.html'
})
export class WorkorderDetailPage {
  workorder: any;

  constructor(
    private dataProvider: ConferenceData,
    private route: ActivatedRoute
  ) {}

  ionViewWillEnter() {
    this.dataProvider.load().subscribe((data: any) => {
      if (
        data &&
        data.workorder &&
        data.workorder[0] &&
        data.workorder[0].groups
      ) {
        const workorderId = this.route.snapshot.paramMap.get('workorderId');
        for (const group of data.workorder[0].groups) {
          if (group && group.workorders) {
            for (const workorder of group.workorders) {
              if (workorder && workorder.id === workorderId) {
                this.workorder = workorder;
                break;
              }
            }
          }
        }
      }
    });
  }
}
