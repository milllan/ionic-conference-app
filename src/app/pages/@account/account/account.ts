import { AfterViewInit, Component, ViewEncapsulation, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';

import { AlertController } from '@ionic/angular';

import { UserData } from '../../../providers/user-data';
import { ApiService } from '../../../providers/api.service';


@Component({
  selector: 'page-account',
  templateUrl: 'account.html',
  styleUrls: ['./account.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AccountPage implements AfterViewInit {
  username: string;
  // auth: any;
  // userid: string;
  password: string;

  constructor(
    public alertCtrl: AlertController,
    private cdRef: ChangeDetectorRef,
    public router: Router,
    public apiService: ApiService,
    public userData: UserData
  ) {
    this.username = '';
  }

  async ngAfterViewInit() {
    this.username = await this.userData.getUsername();
  }

  updatePicture() {
    console.log('Clicked to update picture');
  }

  // Present an alert with the current username populated
  // clicking OK will update the username and display it
  // clicking Cancel will close the alert and do nothing
  async changeUsername() {
    const alert = await this.alertCtrl.create({
      header: 'Change Username',
      buttons: [
        'Cancel',
        {
          text: 'Ok',
          handler: async (data: any) => {
            this.userData.updateUsername(data.username).then(username => {
              this.username = username;
              // https://stackoverflow.com/questions/43871690/ionic-2-popup-handler-function-not-updating-variable
              this.cdRef.detectChanges(); // force change detection (zone lost)
            });
          }
        }
      ],
      inputs: [
        {
          type: 'text',
          name: 'username',
          value: this.username,
          placeholder: 'username'
        }
      ]
    });
    await alert.present();
  }

  async changePassword() {
    console.log('Clicked to change password');
    const alert = await this.alertCtrl.create({
      header: 'Change Password',
      buttons: [
        'Cancel',
        {
          text: 'Ok',
          handler: async (data: any) => {
            const userId = await this.userData.getUserId();
            this.apiService.updateEntry('users', userId, {
              'password': data.password
            });
          }
        }
      ],
      inputs: [
        {
          type: 'text',
          name: 'password',
          value: this.password,
          placeholder: 'password'
        }
      ]
    });
    console.log('Clicked to change password x');
    await alert.present();
  }

  logout() {
    this.userData.logout();
    this.router.navigateByUrl('/login');
  }

  support() {
    this.router.navigateByUrl('/support');
  }
}
