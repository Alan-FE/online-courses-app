import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { environment } from 'src/environments/environment';
import { CourseService } from './course.service';

@Injectable()

export class ReviewService {
  serverUrl: string = environment.serverUrl;

  constructor(private http: HttpClient) { }

  addReview(payload) {
    return this.http.post(this.serverUrl + 'add-review', payload);
  };

  updateReview(reviewId: number, payload) {
    const params = new HttpParams()
    .set('reviewId', `${reviewId}`);
    return this.http.put(this.serverUrl + 'update-review', payload, {params: params})
  };

  deleteReview(reviewId: number) {
    const params = new HttpParams()
    .set('reviewId', `${reviewId}`);
    return this.http.delete(this.serverUrl + 'delete-review', {params: params})
  }
}
