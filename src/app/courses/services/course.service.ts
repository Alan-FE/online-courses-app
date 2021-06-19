import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Subject } from 'rxjs';

import { AuthService } from 'src/app/shared/services/auth.service';
import { environment } from 'src/environments/environment';

@Injectable()

export class CourseService {
  serverUrl: string = environment.serverUrl;
  coursesChanged = new Subject();

  constructor( private http: HttpClient, private authService: AuthService ) { }

  getAllCourses() {
    return this.http.get(this.serverUrl + 'all-courses');
  };

  getCourseById(courseId: number) {
    const params = new HttpParams()
    .set('userId', `${this.authService.loggedUser?.userId}`)
    .set('courseId', `${courseId}`);
    let response1 = this.http.get(this.serverUrl + 'course', {params: params});
    let response2 = this.http.get(this.serverUrl + 'reviews', {params: params});
    return forkJoin([response1, response2]);
  };

  createCourse(course) {
    return this.http.post(this.serverUrl + 'create-course', course);
  };

  updateCourse(courseId: number, payload) {
    const params = new HttpParams()
    .set('courseId', `${courseId}`);
    return this.http.put(this.serverUrl + 'update-course', payload, {params: params})
  }

  getCoursesByInstructor() {
    const params = new HttpParams()
    .set('id', `${this.authService.loggedUser.userId}`);
    return this.http.get(this.serverUrl + 'get-instructor-courses', {params: params} )
  }

  deleteCourse(courseId: number) {
    const params = new HttpParams()
    .set('id', `${courseId}`);
    return this.http.delete(this.serverUrl + 'delete-course', {params: params});
  }

  selectFilter(payload) {
    const params = new HttpParams()
    .set('id', `${this.authService.loggedUser.userId}`);
    return this.http.post(this.serverUrl + 'select-filter', payload, {params: params});
  }

  getStudentList(courseId: number) {
    const params = new HttpParams()
    .set('id', `${courseId}`)
    return this.http.get(this.serverUrl + 'student-list', {params: params})
  }
  
}
