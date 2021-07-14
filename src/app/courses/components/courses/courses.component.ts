import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ModalService } from 'src/app/shared/services/modal.service';

import { CourseModel } from '../../../shared/models/course.model';
import { CourseService } from '../../services/course.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit, OnDestroy {
  courses$: CourseModel[] = []; 
  page: number = 1;
  itemsPerPage: number = 8;
  totalCourses: number;
  value: string = '';
  subscription: Subscription;

  constructor(private courseService: CourseService, 
              public authService: AuthService,
              private modalService: ModalService ) { }

  ngOnInit(): void {
      this.subscription = this.courseService.getAllCourses().subscribe((courses: CourseModel[]) => {
          this.courses$ = courses;
          this.totalCourses = this.courses$.length;
          console.log(courses);
      });
  };

  onPageChange(value: number) {
    this.page = value;
  };

  openModal(id: string): void {
    this.modalService.open(id);
  };

  addNewCourse(course: CourseModel) {
    this.courses$.push(course);
    this.totalCourses = this.courses$.length;
    console.log(this.courses$)
  };

  closeModal(id: string) {
    this.modalService.close(id);
  };

  search(evt: any) {
    let obj = {
      value: evt.target.value
    }
    console.log(evt.target.value)
    this.courseService.selectFilter(obj).subscribe((response: CourseModel[]) => {
      this.courses$ = response;
      this.totalCourses = this.courses$.length;
      console.log(response);
    }, (error) =>{
      console.log(error);
    })
  };

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
