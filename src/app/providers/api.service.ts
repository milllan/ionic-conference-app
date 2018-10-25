import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import Strapi from 'strapi-sdk-javascript';

const API_URL = environment.apiUrl; /* STRAPI ENDPOINT, eg. http://localhost:1337 */

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  strapi = new Strapi(API_URL);   /* STRAPI ENDPOINT, eg. http://localhost:1337 */

  constructor() { }

  async getApiInstance(): Promise<any> {
    return this.strapi;
  }

  async login(u, p) {
    return await this.strapi.login(u, p);
  }
  async updateEntry(p0, p1, p2) {
    return await this.strapi.updateEntry(p0, p1, p2);
  }
  async forgotPassword(e, u) {
    return await this.strapi.forgotPassword(e, u);
  }
}

// export class ApiService {
//   strapi = new Strapi(API_URL);   /* STRAPI ENDPOINT, eg. http://localhost:1337 */

//   constructor() { }

//   async getApiInstance(): Promise<any> {
//     return this.strapi;
//   }

//   async login(u, p) {
//     return await this.strapi.login(u, p);
//   }
//   async updateEntry(p0, p1, p2) {
//     return await this.strapi.updateEntry(p0, p1, p2);
//   }
//   async forgotPassword(e, u) {
//     return await this.strapi.forgotPassword(e, u);
//   }
// }
