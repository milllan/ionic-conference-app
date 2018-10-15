import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, List, LoadingController, ModalController, ToastController, Refresher  } from '@ionic/angular';

import { WorkorderFilterPage } from '../workorder-filter/workorder-filter';
import { ConferenceData } from '../../providers/conference-data';
import { UserData } from '../../providers/user-data';

@Component({
  selector: 'page-workorder-list',
  templateUrl: 'workorder-list.html',
  styleUrls: ['./workorder-list.scss'],
  encapsulation: ViewEncapsulation.None
})
export class WorkorderListPage {
  @ViewChild('refresherRef') refresherRef: Refresher;
  // Gets a reference to the list element
  @ViewChild('workorderList') workorderList: List;

  dayIndex = 0;
  queryText = '';
  segment = 'all';
  excludeTracks: any = [];
  shownSessions: any = [];
  groups: any = [];
  confDate: string;

  constructor(
    public alertCtrl: AlertController,
    public confData: ConferenceData,
    public loadingCtrl: LoadingController,
    public modalCtrl: ModalController,
    public router: Router,
    public toastCtrl: ToastController,
    public user: UserData
  ) { }

  ionViewWillEnter() {
    // this.app.setTitle('Workorder');
    this.updateWorkorder();
  }

  updateWorkorder() {
    // Close any open sliding items when the workorder updates
    if (this.workorderList) {
      this.workorderList.closeSlidingItems();
    }

    this.confData.getTimeline(this.dayIndex, this.queryText, this.excludeTracks, this.segment).subscribe((data: any) => {
      this.shownSessions = data.shownSessions;
      this.groups = data.groups;
    });
  }

  async presentFilter() {
    const modal = await this.modalCtrl.create({
      component: WorkorderFilterPage,
      componentProps: { excludedTracks: this.excludeTracks }
    });
    await modal.present();

    const { data } = await modal.onWillDismiss();
    if (data) {
      this.excludeTracks = data;
      this.updateWorkorder();
    }
  }

  goToWorkorderDetail(sessionData: any) {
    // go to the session detail page
    // and pass in the session data
    this.router.navigateByUrl(`app/tabs/(workorders:workorder-details/${sessionData.id})`);
  }

  async addFavorite(slidingItem: HTMLIonItemSlidingElement, sessionData: any) {
    if (this.user.hasFavorite(sessionData.name)) {
      // woops, they already favorited it! What shall we do!?
      // prompt them to remove it
      this.removeFavorite(slidingItem, sessionData, 'Favorite already added');
    } else {
      // remember this session as a user favorite
      this.user.addFavorite(sessionData.name);

      // create an alert instance
      const alert = await this.alertCtrl.create({
        header: 'Favorite Added',
        buttons: [{
          text: 'OK',
          handler: () => {
            // close the sliding item
            slidingItem.close();
          }
        }]
      });
      // now present the alert on top of all other content
      await alert.present();
    }

  }

  async removeFavorite(slidingItem: HTMLIonItemSlidingElement, sessionData: any, title: string) {
    const alert = await this.alertCtrl.create({
      header: title,
      message: 'Would you like to remove this work order from your favorites?',
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            // they clicked the cancel button, do not remove the wo
            // close the sliding item and hide the option buttons
            slidingItem.close();
          }
        },
        {
          text: 'Remove',
          handler: () => {
            // they want to remove this wo from their favorites
            this.user.removeFavorite(sessionData.name);
            this.updateWorkorder();

            // close the sliding item and hide the option buttons
            slidingItem.close();
          }
        }
      ]
    });
    // now present the alert on top of all other content
    await alert.present();
  }

  // toggleList(fabButton: HTMLIonFabButtonElement, fabList: HTMLIonFabListElement) {
  //   fabButton.activated = !fabButton.activated;
  //   fabList.activated = !fabList.activated;
  // }
  addWorkOrder(fabButton: HTMLIonFabButtonElement) {
    fabButton.activated = !fabButton.activated;
  }

  // async openSocial(network: string, fab: HTMLIonFabElement) {
  //   const loading = await this.loadingCtrl.create({
  //     message: `Posting to ${network}`,
  //     duration: (Math.random() * 1000) + 500
  //   });
  //   await loading.present();
  //   await loading.onWillDismiss();
  //   fab.close();
  // }

  doRefresh(refresher: Refresher) {
    this.confData.getTimeline(this.dayIndex, this.queryText, this.excludeTracks, this.segment).subscribe((data: any) => {
      this.shownSessions = data.shownSessions;
      this.groups = data.groups;

      // simulate a network request that would take longer
      // than just pulling from out local json file
      setTimeout(async () => {
        // refresher.target.complete();
        this.refresherRef.complete();  // Works

        const toast = await this.toastCtrl.create({
          message: 'Work Orders have been updated.',
          duration: 3000
        });
        await toast.present();
      }, 1000);
    });
  }
}
