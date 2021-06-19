import { Component, OnInit } from '@angular/core';

import { CartModel } from '../../models/cart.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cart$: CartModel[] = [];
  total: number;

  constructor( private cartService: CartService, private authService: AuthService ) { }

  ngOnInit(): void {
    if(this.authService.loggedUser !== null) {
      this.cartService.getDataFromCart(this.authService.loggedUser.userId).subscribe((cart: CartModel[]) => {
        this.cart$ = cart;
        this.total = this.totalPrice;
        console.log(cart)
      });
     }
  };

  buyCourse() {
    let payload: any[] = [];
    for(let i = 0; i < this.cart$.length; i++) {
      let arr = [
        this.authService.loggedUser?.userId,
        this.cart$[i].courseId
      ];
      payload.push(arr);
    }
    console.log(payload)
    console.log(this.cart$)
    this.cartService.buyCourse(payload).subscribe(res => {
      this.cart$.splice(0, this.cart$.length);
      console.log(res);
    }, (error) => {
      console.log(error);
    })
  }

  removeFromCart(cartId: number, index: number) {
    this.cartService.deleteFromCart(cartId).subscribe((response) => {
      this.cart$.splice(index, 1);
      this.total = this.totalPrice;
      console.log(response);
    }, (error) => {
      console.log(error);
    })
  };

  get totalPrice() {
    let sum: number = 0;
    for(let cartId in this.cart$) {
      sum+= this.cart$[cartId].price;
    }
    return sum;
  };
}
