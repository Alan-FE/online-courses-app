import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { UserModel } from '../models/user.model';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable()
export class AdminService {
  serverUrl: string = environment.serverUrl;

  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<UserModel[]> {
    return this.http.get<UserModel[]>(this.serverUrl + 'get-all-users');
  };

  getAllCourses() {
    return this.http.get(this.serverUrl + 'get-all-courses');
  }

  calculation() {
    return this.http.get(this.serverUrl + 'dashboard');
  }
  
}
