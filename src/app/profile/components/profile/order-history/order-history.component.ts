import { Component, OnInit } from '@angular/core';

import { OrderModel } from 'src/app/profile/models/order-model';
import { ProfileService } from 'src/app/profile/services/profile.service';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.scss']
})
export class OrderHistoryComponent implements OnInit {
  orderHistory$: OrderModel[] = [];
  page: number = 1;
  itemsPerPage: number = 4;
  totalOrders: number;

  constructor(private profileService: ProfileService, private authService: AuthService) { }

  ngOnInit(): void {
    this.profileService.orderHistory(this.authService.loggedUser.userId).subscribe(
    (orders: OrderModel[]) => {
      this.totalOrders = orders.length;
      this.orderHistory$ = orders;
      console.log(orders);
    }, (error) => {
      console.log(error);
    })
  };

  onPageChange(value: number) {
    this.page = value;
  };

}
