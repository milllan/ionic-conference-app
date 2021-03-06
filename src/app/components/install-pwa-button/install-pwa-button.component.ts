import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'install-pwa-button',
  templateUrl: './install-pwa-button.component.html',
  styleUrls: ['./install-pwa-button.component.scss']
})
export class InstallPwaButtonComponent implements OnInit {

  // showBtn: boolean;
  showBtn: any;
  deferredPrompt;   // PWA prompt

  constructor(public alertCtrl: AlertController) {
    // console.log('Hello PwaPromptComponent Component');
    this.showBtn = false;
  }

  ngOnInit() {
    window.addEventListener('beforeinstallprompt', (e) => {
      // Prevent Chrome 67 and earlier from automatically showing the prompt
      e.preventDefault();
      // Stash the event so it can be triggered later on the button event.
      this.deferredPrompt = e;

    // Update UI by showing a button to notify the user they can add to home screen
      this.showBtn = true;       // BTN
      // this.install_pwa_prompt(); // PROMPT
    });

    // button click event to show the promt
    window.addEventListener('appinstalled', (event) => {
      console.log('pwa app already installed');
    });
    if (window.matchMedia('(display-mode: standalone)').matches) {
      console.log('display-mode is standalone - pwa app launched from the home screen ANDROID');
    }
    // if (window.navigator.standalone === true) {
    //   console.log('display-mode is standalone - pwa app launched from the home screen SAFARI');
    // }
  }

  add_to_home(e) {
    // debugger
    // hide our user interface that shows our button
    this.showBtn = false;
    // Show the prompt
    this.deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    this.deferredPrompt.userChoice
      .then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the prompt');
          // hide our user interface that shows our button
          this.showBtn = false;
        } else {
          console.log('User dismissed the prompt');
        }
        this.deferredPrompt = null;
      });
  }

  async install_pwa_prompt() {
    // const alert = await this.alertCtrl.create({
    //   header: 'Install App',
    //   buttons: [
    //     'Cancel',
    //     {
    //       text: 'Ok',
    //       handler: async (data: any) => {
    //         this.add_to_home(null);
    //       }
    //     }
    //   ]
    // });
    // await alert.present();
    this.add_to_home(null);
  }
}
