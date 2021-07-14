import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ReviewModel } from 'src/app/courses/models/review-model';
import { ReviewService } from 'src/app/courses/services/review.service';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-reviews-list',
  templateUrl: './reviews-list.component.html',
  styleUrls: ['./reviews-list.component.scss']
})
export class ReviewsListComponent implements OnInit {
  reviewObj: ReviewModel = new ReviewModel();
  @Input() reviews$: ReviewModel[]= [];
  @Input() isPurchased: number;
  @Output() changeTotalRating = new EventEmitter();
  editMode: boolean;
  myReview: ReviewModel;
  index: number;
  isWrittenReview: boolean;
  rating: number = 0;
  review: string;

  constructor(private reviewService: ReviewService,
              public authService: AuthService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    for(let i = 0; i < this.reviews$.length; i++) {
      if(this.reviews$[i].userId==this.authService.loggedUser?.userId) {
        this.myReview = this.reviews$[i];
        this.isWrittenReview = true;
        this.index = i;
        console.log(this.myReview)
      }
    }
  }

  postReview() {
    let fkCourse = +this.route.snapshot.paramMap.get('id');
    let obj = {
      fkUser: this.authService.loggedUser.userId,
      fkCourse: fkCourse,
      rating: this.rating,
      review: this.review,
    };
    console.log(obj);
    this.reviewService.addReview(obj).subscribe((insertedId: number) => {;
      console.log(this.rating);
      this.isWrittenReview = true;
      this.reviews$.push(this.init(insertedId));
      this.myReview = this.init(insertedId);
      console.log(this.myReview);
      this.changeTotalRating.emit({rate: this.rating, newReview: 1, lastRate: 0});
      console.log(insertedId);
    }, (error) => {
      console.log(error);
    })
  };

  init(id: number) {
    let date: any = new Date();
    let model =this.reviewObj = {
        fullName: this.authService.loggedUser.firstName + ' ' + this.authService.loggedUser.lastName,
        image: this.authService.loggedUser.image,
        rating: this.rating,
        review: this.review,
        reviewId: id,
        userId: this.authService.loggedUser.userId,
        dateTime: date
      }
    return model;
  }

  onRateChanged(rating: number) {
    this.rating = rating;
    console.log(rating)
  };

  updateReview() {
    let date = new Date().getTimezoneOffset() * 60000;
    let updateDate = (new Date(Date.now() - date)).toISOString().slice(0, 19).replace('T', ' ');
    let obj = {
      rating: this.rating,
      review: this.review,
      dateTime: updateDate
    }
    this.reviewService.updateReview(this.myReview.reviewId, obj).subscribe((res) =>{
      this.editMode = false;
      const temp = this.myReview.rating;
      this.reviews$[this.index] = this.init(this.myReview.reviewId);
      this.myReview = this.init(this.myReview.reviewId);
      this.changeTotalRating.emit({rate: this.rating, newReview: 0, lastRate: temp});
      console.log(res);
    }, (error) => {
      console.log(error);
    })
  };

  onCancel() {
    this.editMode = false;
  };

  editReview() {
    this.rating = this.myReview.rating;
    this.review = this.myReview.review; 
    this.editMode = true;
  };


  deleteReview() {
    this.reviewService.deleteReview(this.myReview.reviewId).subscribe((res) =>{
      this.reviews$.splice(this.index, 1);
      console.log(this.rating);
      const temp = this.myReview.rating;
      this.rating = 0;
      this.review = '';
      this.isWrittenReview = false;
      this.changeTotalRating.emit({rate: 0, newReview: -1, lastRate: temp});
      console.log(res);
    }, (error) => {
      console.log(error);
  })
  };

}
