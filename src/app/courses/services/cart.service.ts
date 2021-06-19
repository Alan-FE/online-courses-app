import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { forkJoin, Observable } from 'rxjs';
import { CartModel } from '../models/cart.model';

@Injectable()
export class CartService {
  serverUrl: string = environment.serverUrl;

  constructor(private http: HttpClient) { }

  getDataFromCart(userId: number): Observable<CartModel[]> {
    const params = new HttpParams()
    .set('id', `${userId}`);
    return this.http.get<CartModel[]>(this.serverUrl + 'cart', {params: params});
  };

  addToCart(payload) {
    return this.http.post(this.serverUrl + 'add-to-cart', payload);
  };

  deleteFromCart(cartId: number) {
    const params = new HttpParams()
    .set('id', `${cartId}`);
    if(cartId) {
      return this.http.delete(this.serverUrl + 'delete-from-cart', {params: params});
    } else {
      return this.http.delete(this.serverUrl + 'clear-cart');
    }
  };

  buyCourse(payload, cartId?: number) {
    let response1= this.http.post(this.serverUrl + 'buy-course', payload);
    let response2 = this.deleteFromCart(cartId);
    return forkJoin([response1, response2]);
  };
}
