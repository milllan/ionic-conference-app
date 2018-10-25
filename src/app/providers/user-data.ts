import { Injectable } from '@angular/core';
import { Events } from '@ionic/angular';
import { Storage } from '@ionic/storage';

import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class UserData {
  _favorites: string[] = [];
  HAS_LOGGED_IN = 'hasLoggedIn';
  HAS_SEEN_TUTORIAL = 'hasSeenTutorial';

  constructor(
    public events: Events,
    public storage: Storage,
    private apiService: ApiService,
  ) {
    console.log('this (UserData)', UserData);
  }

  hasFavorite(sessionName: string): boolean {
    return (this._favorites.indexOf(sessionName) > -1);
  }

  addFavorite(sessionName: string): void {
    this._favorites.push(sessionName);
  }

  removeFavorite(sessionName: string): void {
    const index = this._favorites.indexOf(sessionName);
    if (index > -1) {
      this._favorites.splice(index, 1);
    }
  }

  // async login(username: string, password: string): Promise<any> {
  //   try {
  //     const auth = await this.strapi.login(username, password);      console.log({auth});
  //     //this.setUser(auth['user']);
  //     console.log(await this.strapi.getEntries('user'));
  //     this.strapi.updateEntry('user', '5b75c2a6b1960a0a3c286a6c', {Name: 'Mile'});
  //     await this.storage.set(this.HAS_LOGGED_IN, true);
  //     this.setUsername(username);
  //     return this.events.publish('user:login');
  //   } catch (err) {
  //     await this.storage.set(this.HAS_LOGGED_IN, false);      // console.log({err});
  //     return this.events.publish('user:logout');
  //   }
  // }

  async login(username: string, password: string): Promise<any> {
    return this.apiService.login(username, password).then(async auth => {
      return this.storage.set(this.HAS_LOGGED_IN, true).then(() => {
        this.setUserId(auth['user']['id']);
        this.setUsername(auth['user']['username']);
        this.setEmail(auth['user']['email']);
        return this.events.publish('user:login');
      });
    }).catch(err => {
      return this.storage.set(this.HAS_LOGGED_IN, false).then(() => {        // console.log({err});
        return this.events.publish('user:logout');
      });
    });
  }

  signup(username: string): Promise<any> {
    return this.storage.set(this.HAS_LOGGED_IN, true).then(() => {
      this.setUsername(username);
      this.setEmail(username);
      return this.events.publish('user:signup');
    });
  }

  logout(): Promise<any> {
    return this.storage.remove(this.HAS_LOGGED_IN).then(() => {
      this.storage.remove('userid');
      this.storage.remove('username');
      this.storage.remove('jwt');
      return this.storage.remove('email');
    }).then(() => {
      return this.events.publish('user:logout');
    });
  }

  forgotPassword(email: string, url: string): Promise<any> {
    return this.apiService.forgotPassword(email, url)
      .then(async auth => {
        console.log('Your user received an email');
        // return this.storage.set(this.HAS_LOGGED_IN, true).then(() => {
        //   this.setUserId(auth['user']['id']);
        //   this.setUsername(username);
        //   return this.events.publish('user:login');
        }).catch((err) => {
        console.log('An error occurred:', err);
        });
  }

  async updateUsername(username: string): Promise<any> {
    const userId = await this.getUserId();
    return await this.apiService.updateEntry('users', userId, {
      'username': username
    }).then((auth) => {
      this.setUsername(auth['username']);
      // this.cdRef.detectChanges(); // force change detection (zone lost)
      return auth['username'];
    });
  }

  async setUserId(userid: string) {
    return await this.storage.set('userid', userid);
  }

  async getUserId(): Promise<string> {
    return await this.storage.get('userid');
  }

  async setUsername(username: string): Promise<any> {
    return await this.storage.set('username', username);
  }

  getUsername(): Promise<string> {
    return this.storage.get('username').then((value) => {
      return value;
    });
  }

  async setEmail(email: string): Promise<any> {
    return await this.storage.set('email', email);
  }

  getEmail(): Promise<string> {
    return this.storage.get('email').then((value) => {
      return value;
    });
  }

  isLoggedIn(): Promise<boolean> {
    return this.storage.get(this.HAS_LOGGED_IN).then((value) => {
      return value === true;
    });
  }

  checkHasSeenTutorial(): Promise<string> {
    return this.storage.get(this.HAS_SEEN_TUTORIAL).then((value) => {
      return value;
    });
  }


  // setUser(user: {}): Promise<any> {
  //   this.user = user;
  //   return this.storage.set('user', JSON.stringify(user));
  // }

  // async getUser(): Promise<any> {
  //   const userStr = await this.storage.get('user');
  //   return await JSON.parse(userStr);
  // }
}
