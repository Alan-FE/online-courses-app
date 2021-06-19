import { Component, OnInit } from '@angular/core';
import { HomeService } from '../../services/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  popularCourses$;
  popularInstructors$;
  statistics$;

  constructor(private homeService: HomeService) { }

  ngOnInit(): void {
    this.homeService.popularCourses().subscribe((res) =>{
      this.popularCourses$ = res;
      console.log(res);
    }, (error)=> {
      console.log(error)
    });
    this.homeService.statistics().subscribe((res) =>{
      this.statistics$ = res[0];
      console.log(this.statistics$);
    }, (error)=> {
      console.log(error)
    });
    this.homeService.popularInstructors().subscribe((res) =>{
      this.popularInstructors$ = res;
      console.log(this.popularInstructors$);
    }, (error) => {
      console.log(error);
    })

  }

}
