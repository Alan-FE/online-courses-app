import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  serverUrl: string = environment.serverUrl;
  jwtHelper = new JwtHelperService();

  constructor(private http: HttpClient) { }

  signIn(user: User) {
    return this.http.post(this.serverUrl + 'sign-in', user);
  };

  signUp(user: User) {
    return this.http.post(this.serverUrl + 'create-user', user);
  };

  signOut() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    return this.http.delete(this.serverUrl + 'sign-out');
  }

  updateAccount(userId: number, payload: User) {
    const params = new HttpParams()
    .set('id', `${userId}`);
    return this.http.put(this.serverUrl + 'update-account', payload , {params: params});
  }

  deleteAccount(userId: number) {
    const params = new HttpParams()
    .set('id', `${userId}`);
    return this.http.delete(this.serverUrl + 'delete-account', { params: params });
  }

  callRefreshToken(payload) {
    return this.http.post(this.serverUrl + 'token', payload);
  };

  get loggedUser() {
    let accessToken = localStorage.getItem('accessToken');
    return this.jwtHelper.decodeToken(accessToken);
  }

}
