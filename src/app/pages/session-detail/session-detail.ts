import { Component } from '@angular/core';
import { ConferenceData } from '../../providers/conference-data';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'page-session-detail',
  templateUrl: 'session-detail.html'
  // styleUrls: ['./workorder-detail.scss'],
  // encapsulation: ViewEncapsulation.None
})
export class SessionDetailPage {
  session: any;

  constructor(
    private dataProvider: ConferenceData,
    // private router: Router,
    private route: ActivatedRoute
  ) {}

  ionViewWillEnter() {
    this.dataProvider.load().subscribe((data: any) => {
      if (
        data &&
        data.schedule &&
        data.schedule[0] &&
        data.schedule[0].groups
      ) {
        const sessionId = this.route.snapshot.paramMap.get('sessionId');
        for (const group of data.schedule[0].groups) {
          // console.log('data.schedule[0].groups', data.schedule[0].groups);
          if (group && group.sessions) {
            // console.log('group.sessions', group.sessions);
            for (const session of group.sessions) {
              console.log('session.id', session.id, 'sessionId', sessionId);
              if (session && session.id === sessionId) {
                console.log('   match!');
                this.session = session;
                break;
              }
            }
          }
        }
      }
    });
  }
}
