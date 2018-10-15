import { Component, ViewEncapsulation } from '@angular/core';
import { ConferenceData } from '../../providers/conference-data';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'page-workorder-detail',
  templateUrl: 'workorder-detail.html',
  // styleUrls: ['./workorder-detail.scss'],
  // encapsulation: ViewEncapsulation.None
})
export class WorkorderDetailPage {
  workorder: any;

  constructor(
    private dataProvider: ConferenceData,
    // private router: Router,
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
          // console.log('data.workorder[0].groups', data.workorder[0].groups);
          if (group && group.workordersgroup) {
            console.log('group.workordersgroup', group.workordersgroup);
            for (const workorder of group.workordersgroup) {
              console.log('workorder.id', workorder.id, 'workorderId', workorderId);
              if (workorder && workorder.id === workorderId) {
                console.log('   match!');
                this.workorder = workorder;
                break;
              }
            }
          }
        }
      }
    });
  }

  // goToWorkorderDetail(session: any) {
  //   this.router.navigateByUrl(`app/tabs/(workorders:workorder-details/${session.id})`);
  // }
}
