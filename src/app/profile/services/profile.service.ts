import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';
import { AboutMeModel } from '../models/about-me.model';
import { PasswordModel } from '../models/password-model';

@Injectable()
export class ProfileService {
  serverUrl: string = environment.serverUrl;

  constructor(private http: HttpClient) { }

  getUserData(userId: number) {
    const params = new HttpParams()
    .set('id', `${userId}`);
    return this.http.get(this.serverUrl + 'get-user-data', {params: params})
  };

  changePassword(userId: number, password: PasswordModel) {
    const params = new HttpParams()
    .set('id', `${userId}`);
    return this.http.put(this.serverUrl + 'change-password', password, { params: params });
  };

  aboutInstructor(userId: number) {
    const params = new HttpParams()
    .set('id', `${userId}`);
    return this.http.get(this.serverUrl + 'about-instructor', {params: params});
  };

  updateAboutMe(userId: number, aboutMe: AboutMeModel) {
    const params = new HttpParams()
    .set('id', `${userId}`);
    return this.http.put(this.serverUrl + 'update-biography', aboutMe, { params: params });
  }

  orderHistory(userId: number) {
    const params = new HttpParams()
    .set('id', `${userId}`);
    return this.http.get(this.serverUrl + 'order-history', { params: params });
  }
}
