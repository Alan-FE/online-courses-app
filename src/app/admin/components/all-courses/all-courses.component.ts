import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/shared/services/modal.service';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-all-courses',
  templateUrl: './all-courses.component.html',
  styleUrls: ['./all-courses.component.scss']
})
export class AllCoursesComponent implements OnInit {
  allCourses$: any;
  selectedCourse: any;

  constructor(private modalService: ModalService,
              private adminService: AdminService) { }

  ngOnInit(): void {
    this.adminService.getAllCourses().subscribe(res =>{
      this.allCourses$ = res;
      console.log(res);
    }, (error) => {
      console.log(error);
    })
  }

  read(elementId: string, course) {
    this.selectedCourse = course;
    this.modalService.open(elementId);
    console.log("Hey works")
  };

  closeModal(elementId: string) {
    this.modalService.close(elementId);
  }

  deleteCourse(courseId: number, index: number) {
    
  }

}
