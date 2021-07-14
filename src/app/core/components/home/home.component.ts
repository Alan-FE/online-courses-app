import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CourseModel } from 'src/app/shared/models/course.model';
import { PopularInstructorsModel } from '../../models/popular-instructors.model';
import { StatisticsModel } from '../../models/statistics.model';
import { HomeService } from '../../services/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  popularCourses$: CourseModel[] = [];
  popularInstructors$: PopularInstructorsModel[] = [];
  statistics$: StatisticsModel[] = [];
  subscription: Subscription;

  constructor(private homeService: HomeService) { }

  ngOnInit(): void {
   this.subscription = this.homeService.getAll().subscribe((res: any) =>{
      this.popularCourses$ = res[0]
      this.popularInstructors$ = res[1];
      this.statistics$ = res[2];
      console.log(res)
    }, (error) => {
      console.log(error);
    });
  };

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
