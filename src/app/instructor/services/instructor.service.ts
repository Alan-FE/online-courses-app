import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin } from 'rxjs';

import { environment } from 'src/environments/environment';

@Injectable()
export class InstructorService {
  serverUrl: string = environment.serverUrl;

  constructor(private http: HttpClient) { }

  getAllInstructors() {
    return this.http.get(this.serverUrl + 'all-instructors');
  };

  getInstructorData(instructorId: number) {
    const params = new HttpParams()
    .set('id', `${instructorId}`);
    let response1= this.http.get(this.serverUrl + 'get-instructor-by-id', {params: params});
    let response2 = this.http.get(this.serverUrl + 'get-instructor-courses', {params: params});
      return forkJoin([response1, response2]);
  };
}
