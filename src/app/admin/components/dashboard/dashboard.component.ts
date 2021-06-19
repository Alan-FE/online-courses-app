import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  calculations$: any;

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.adminService.calculation().subscribe(res =>{
      this.calculations$ = res;
      console.log(res);
    }, (error) =>{
      console.log(error);
    })
  }

}
