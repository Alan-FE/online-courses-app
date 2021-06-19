import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable()

export class HomeService {
  serverUrl: string = environment.serverUrl;

  constructor(private http: HttpClient) { }

  popularCourses() {
    return this.http.get(this.serverUrl + 'popular-courses');
  };

  popularInstructors() {
    return this.http.get(this.serverUrl + 'popular-instructors');
  }

  statistics() {
    return this.http.get(this.serverUrl + 'statistics');
  };
}
