import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable()
export class AllCoursesService {
  serverUrl: string = environment.serverUrl;

  constructor( private http: HttpClient ) { }

  getAllCourses() {
    return this.http.get(this.serverUrl + 'all-courses');
  };
  
}
