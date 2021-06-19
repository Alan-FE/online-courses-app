import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ReviewModel } from '../../models/review-model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CourseService } from '../../services/course.service';
import { CartService } from '../../services/cart.service';
import { ModalService } from 'src/app/shared/services/modal.service';
@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.scss']
})
export class CourseDetailsComponent implements OnInit {
 courseById$: any;
 reviews$: any;
 listOfStudents$: any[] = [];
 reviewModel: ReviewModel = new ReviewModel();
 data: any;
 purchased: number;
 isEdit: boolean;

  constructor(private courseService: CourseService, 
              private route: ActivatedRoute,
              private cartService: CartService, 
              public authService: AuthService,
              private modalService: ModalService,
              private router: Router
              ) {}

  ngOnInit(): void {
    let id: number = +this.route.snapshot.paramMap.get('id');
    this.courseService.getCourseById(id).subscribe((course) => {
        this.courseById$ = course[0];
        this.reviews$ = course[1];
        this.purchased = this.courseById$[0].purchased;
        console.log(course);
    })
  };

  addToCart(courseId: number) {
    if(this.authService.loggedUser) {
      let payload = {
        fkUser: this.authService.loggedUser.userId,
        fkCourse: courseId
      };
      this.cartService.addToCart(payload).subscribe((response) => {
        this.courseById$[0].inCart = 1;
        console.log(response);
      }, (error) => {
        console.log(error);
      });
    } else {
      console.log("You need to loggin first than to add to cart!")
    }
  };

  buyCourse(courseId: number) {
    if(this.authService.loggedUser) {
      let payload = {
        fkUser: this.authService.loggedUser.userId,
        fkCourse: courseId
      }
      this.cartService.buyCourse(payload, this.courseById$[0].cartId).subscribe((response) => {
        this.courseById$[0].purchased = 1;
        this.purchased = 1;
        console.log(response);
      }, (error) => {
        console.log(error);
      });
    } else {
      console.log("You need to loggin first than to buy course!")
    }
  };

  onEdit(course, id) {
    this.modalService.open(id);
    this.data = course;
    this.isEdit = true;
    console.log(course);
  };

  updateCourse(course) {
    console.log(course);
    this.courseById$[0] = course;
  }

  onDelete(courseId: number) {
    this.courseService.deleteCourse(courseId).subscribe((response) => {
      console.log(response);
      this.router.navigate(['courses']);
    }, (error) => {
      console.log(error);
    });
  };

  closeModal(id) {
    this.modalService.close(id);
  }

  showList(id: string, courseId: number) {
    this.courseService.getStudentList(courseId).subscribe((res: any) =>{
      this.listOfStudents$ = res;
      console.log(res)
    }, (error) =>{
      console.log(error);
    })
    this.modalService.open(id);
  };

  change(rating, course) {
    if(rating.lastRate) {
     course.courseRating = course.courseRating * course.noRating - rating.lastRate;  
    };

    if(rating.lastRate == 0) {
      course.courseRating = course.courseRating * course.noRating
    }


    console.log(course.courseRating)  

    let avgRate = (rating.rate + course.courseRating) / (course.noRating + rating.newReview);
    this.courseById$[0].courseRating = avgRate;
    this.courseById$[0].noRating += rating.newReview; 
  }

}
