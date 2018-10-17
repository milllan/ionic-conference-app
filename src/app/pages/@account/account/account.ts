import { AfterViewInit, Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

import { AlertController } from '@ionic/angular';

import { UserData } from '../../../providers/user-data';


@Component({
  selector: 'page-account',
  templateUrl: 'account.html',
  styleUrls: ['./account.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AccountPage implements AfterViewInit {
  username: string;
  auth: any;
  userid: string;
  password: string;

  constructor(
    public alertCtrl: AlertController,
    public router: Router,
    public userData: UserData
  ) { }

  ngAfterViewInit() {
    this.getUsername();
    this.getAuth();
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
          handler: (data: any) => {
            this.userData.updateUsername(data.username);
            this.getUsername();
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

  getUsername() {
    this.userData.getUsername().then((username) => {
      this.username = username;
    });
  }

  getUserId() {
    this.userData.getUserId().then((userid) => {
      this.userid = userid;
    });
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
            const userId = await this.getUserId();
            this.auth.updateEntry('users', userId, {
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
    console.log('account - logout');
    this.userData.logout();
    console.log('account - logout 2');
    this.router.navigateByUrl('/login');
  }

  support() {
    this.router.navigateByUrl('/support');
  }

  getAuth() {
    this.userData.getAuth().then((auth) => {
      this.auth = auth;
    });
  }
}
