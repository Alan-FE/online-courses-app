import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CourseDetailsModel } from 'src/app/shared/models/course-details.model';
import { ModalService } from 'src/app/shared/services/modal.service';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-all-courses',
  templateUrl: './all-courses.component.html',
  styleUrls: ['./all-courses.component.scss']
})
export class AllCoursesComponent implements OnInit, OnDestroy {
  allCourses$: CourseDetailsModel[] = [];
  selectedCourse: CourseDetailsModel;
  subscription: Subscription;

  constructor(private modalService: ModalService,
              private adminService: AdminService) { }

  ngOnInit(): void {
   this.subscription = this.adminService.getAllCourses().subscribe((course: CourseDetailsModel[]) =>{
      this.allCourses$ = course;
    }, (error) => {
      console.log(error);
    })
  }

  read(elementId: string, course: CourseDetailsModel) {
    this.selectedCourse = course;
    this.modalService.open(elementId);
  };

  closeModal(elementId: string) {
    this.modalService.close(elementId);
  };

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
