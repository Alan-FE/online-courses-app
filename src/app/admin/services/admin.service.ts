import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { UserModel } from '../models/user.model';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { CourseDetailsModel } from 'src/app/shared/models/course-details.model';
import { CalculationModel } from '../models/calculation.model';

@Injectable()
export class AdminService {
  serverUrl: string = environment.serverUrl;

  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<UserModel[]> {
    return this.http.get<UserModel[]>(this.serverUrl + 'get-all-users');
  };

  getAllCourses(): Observable<CourseDetailsModel[]> {
    return this.http.get<CourseDetailsModel[]>(this.serverUrl + 'get-all-courses');
  }

  calculation(): Observable<CalculationModel[]> {
    return this.http.get<CalculationModel[]>(this.serverUrl + 'dashboard');
  }
  
}
