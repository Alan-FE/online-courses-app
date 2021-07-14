import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()

export class HomeService {
  serverUrl: string = environment.serverUrl;

  constructor(private http: HttpClient) { }

  getAll() {
    let response1 = this.http.get(this.serverUrl + 'popular-courses');
    let response2 = this.http.get(this.serverUrl + 'popular-instructors');
    let response3 = this.http.get(this.serverUrl + 'statistics');
    return forkJoin([response1, response2, response3]);
  }
  
}
