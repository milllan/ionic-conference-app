import { Injectable } from '@angular/core';
import { Events } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import Strapi from 'strapi-sdk-javascript';
// import Strapi from 'strapi-sdk-javascript/build/main';
import * as Config from '../config';


@Injectable({
  providedIn: 'root'
})
export class UserData {
  _favorites: string[] = [];
  HAS_LOGGED_IN = 'hasLoggedIn';
  // HAS_LOGGED_IN = false;
  HAS_SEEN_TUTORIAL = 'hasSeenTutorial';
  // HAS_SEEN_TUTORIAL = false;

  auth = new Strapi(Config.STRAPI_ENDPOINT);   // 'http://localhost:1337';
  user = {};

  constructor(
    public events: Events,
    public storage: Storage
  ) {
    console.log('this', UserData);
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

  login(username: string, password: string): Promise<any> {
<<<<<<< HEAD
    return this.strapi.login(username, password).then(async auth => {      // console.log({auth});
      // this.setUser(auth['user']);      //  console.log(await this.strapi.getEntries('user'));
=======
    return this.auth.login(username, password).then(async auth => {      // console.log({auth});
      // this.setUser(auth['user']);      //  console.log(await this.auth.getEntries('user'));
>>>>>>> 0184a72aa022a6059726d621689ddd9fa3f6e3fc
      return this.storage.set(this.HAS_LOGGED_IN, true).then(() => {
        this.setUserId(auth['user']['id']);
        this.setUsername(username);
        return this.events.publish('user:login');
      });
    }).catch((err) => {
      return this.storage.set(this.HAS_LOGGED_IN, false).then(() => {        // console.log({err});
        return this.events.publish('user:logout');
      });
    });
  }

  signup(username: string): Promise<any> {
    return this.storage.set(this.HAS_LOGGED_IN, true).then(() => {
      this.setUsername(username);
      return this.events.publish('user:signup');
    });
  }

  logout(): Promise<any> {
    return this.storage.remove(this.HAS_LOGGED_IN).then(() => {
      this.storage.remove('userid');
      return this.storage.remove('username');
    }).then(() => {
      this.events.publish('user:logout');
    });
  }

  async setUserId(userid: string) {
    return await this.storage.set('userid', userid);
  }

  async getUserId(): Promise<string> {
    return await this.storage.get('userid');
  }

  // setUsername(username: string): Promise<any> {
  //   return this.auth.updateEntry('user', 'me', {'username': username}).then(() => {
  //     return this.storage.set('username', username);
  //   });
  // }

  async setUsername(username: string): Promise<any> {
    return await this.storage.set('username', username);
  }

  getUsername(): Promise<string> {
    return this.storage.get('username').then((value) => {
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


  setUser(user: {}): Promise<any> {
    this.user = user;
    return this.storage.set('user', JSON.stringify(user));
  }

  async getUser(): Promise<any> {
    const userStr = await this.storage.get('user');
    return await JSON.parse(userStr);
  }



  async getAuth(): Promise<any> {
    return this.auth;
  }

  async updateUsername(username: string): Promise<any> {
    const userId = await this.getUserId();
    await this.auth.updateEntry('users', userId, {
      'username': username
    }).then(() => {
      this.setUsername(username);
    });
  }
}
