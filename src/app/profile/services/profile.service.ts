import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';

import { environment } from 'src/environments/environment';
import { AboutMeModel } from '../models/about-me.model';
import { PasswordModel } from '../models/password-model';

@Injectable()
export class ProfileService {
  serverUrl: string = environment.serverUrl;

  constructor(private http: HttpClient, private authService: AuthService) { }

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

  addBiography(aboutMe: AboutMeModel) {
    let response1 = this.http.post(this.serverUrl + 'add-biography', aboutMe);
    let response2 = this.authService.userDataChanged();

    return forkJoin([response1, response2 ])
  }

  updateAboutMe(aboutMe: AboutMeModel) {
    return this.http.put(this.serverUrl + 'update-biography', aboutMe);
  }

  orderHistory(userId: number) {
    const params = new HttpParams()
    .set('id', `${userId}`);
    return this.http.get(this.serverUrl + 'order-history', { params: params });
  }
}
