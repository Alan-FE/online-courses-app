import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ReviewModel } from '../../models/review-model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CourseService } from '../../services/course.service';
import { CartService } from '../../services/cart.service';
import { ModalService } from 'src/app/shared/services/modal.service';
import { ToastrService } from 'ngx-toastr';
import { CourseDetailsModel } from '../../../shared/models/course-details.model';
import { ListOfStudentsModel } from '../../models/list-of-students-model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.scss']
})
export class CourseDetailsComponent implements OnInit, OnDestroy {
  courseById$: CourseDetailsModel[] = [];
  reviews$: ReviewModel[] = [];
  listOfStudents$: ListOfStudentsModel[] = [];
  reviewModel: ReviewModel = new ReviewModel();
  course: CourseDetailsModel;
  purchased: number;
  isEdit: boolean;
  longText: boolean;
  subscription: Subscription;

  constructor(private courseService: CourseService,
    private route: ActivatedRoute,
    private cartService: CartService,
    public authService: AuthService,
    private modalService: ModalService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    let id: number = +this.route.snapshot.paramMap.get('id');
    this.subscription = this.courseService.getCourseById(id).subscribe((course: any) => {
      this.courseById$ = course[0];
      this.reviews$ = course[1];
      this.purchased = this.courseById$[0].purchased;
      this.longText = this.courseById$[0].description.length > 500;
      console.log(course);
    })
  };

  addToCart(courseId: number) {
    if (this.authService.loggedUser) {
      let payload = {
        fkUser: this.authService.loggedUser.userId,
        fkCourse: courseId
      };
      this.cartService.addToCart(payload).subscribe((response: number) => {
        this.courseById$[0].inCart = 1;
        this.courseById$[0].cartId = response;
        this.toastr.success('Successfully added to cart!', 'Notification');
      }, (error) => {
        console.log(error);
      });
    } else {
      this.toastr.warning('You need to login first!', 'Warning');
    }
  };

  buyCourse(courseId: number) {
    if (this.authService.loggedUser) {
      let payload = [
        this.authService.loggedUser.userId,
        courseId
      ]
      this.cartService.buyCourse(payload, this.courseById$[0].cartId).subscribe((response) => {
        this.courseById$[0].purchased = 1;
        this.purchased = 1;
        console.log(response)
        this.toastr.success('You have successfully completed the purchase in the next 24 hours you will receive a link to download the course!', 'Notification')
      }, (error) => {
        console.log(error);
      });
    } else {
      this.toastr.warning('You need to login first!', 'Warning');
    }
  };

  onEdit(course: CourseDetailsModel, id: string) {
    this.modalService.open(id);
    this.course = course;
    this.isEdit = true;
    console.log(course);
  };

  updateCourse(course: CourseDetailsModel) {
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

  closeModal(id: string) {
    this.modalService.close(id);
  }

  showList(id: string, courseId: number) {
    this.courseService.getStudentList(courseId).subscribe((res: any) => {
      this.listOfStudents$ = res;
      console.log(res)
    }, (error) => {
      console.log(error);
    })
    this.modalService.open(id);
  };

  change(rating: any, course: CourseDetailsModel) {
    if (rating.lastRate) {
      course.courseRating = course.courseRating * course.noRating - rating.lastRate;
    };

    if (rating.lastRate == 0) {
      course.courseRating = course.courseRating * course.noRating
    }


    console.log(course.courseRating)

    let avgRate = (rating.rate + course.courseRating) / (course.noRating + rating.newReview);
    this.courseById$[0].courseRating = avgRate;
    this.courseById$[0].noRating += rating.newReview;
  };

  readMoreLess() {
    this.longText = !this.longText;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
