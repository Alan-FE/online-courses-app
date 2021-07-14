import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CalculationModel } from '../../models/calculation.model';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  calculations$: CalculationModel[] = [];
  subscription: Subscription;

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.subscription = this.adminService.calculation().subscribe((calculations: CalculationModel[]) =>{
      this.calculations$ = calculations;
    }, (error) =>{
      console.log(error);
    });
  };

  ngOnDestroy() {
    this.subscription.unsubscribe();
  };

}
