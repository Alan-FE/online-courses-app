import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ModalService } from 'src/app/shared/services/modal.service';

import { CourseModel } from '../../../shared/models/course.model';
import { CourseService } from '../../services/course.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {
  courses$: any[]=[]; 
  page: number = 1;
  itemsPerPage: number = 10;
  totalCourses: number;
  value: string = '';

  constructor(private courseService: CourseService, 
              public authService: AuthService,
              private modalService: ModalService ) { }

  ngOnInit(): void {
        this.courseService.getAllCourses().subscribe((courses: any[]) => {
          this.courses$ = courses;
          this.totalCourses = this.courses$.length;
          console.log(courses);
      });
      this.courseService.coursesChanged.subscribe((courses: any[]) => {
        this.courses$ = courses;
      });

  };

  onPageChange(value: number) {
    this.page = value;
  };

  openModal(id: string): void {
    this.modalService.open(id);
  };

  closeModal(id: string) {
    this.modalService.close(id);
  };

  search(evt) {
    let obj = {
      value: evt.target.value
    }
    console.log(evt.target.value)
    this.courseService.selectFilter(obj).subscribe((res: CourseModel[]) => {
      this.courses$ = res;
      this.totalCourses = this.courses$.length;
      console.log(res);
    }, (error) =>{
      console.log(error);
    })
  }
}
