import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';


@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.scss']
})
export class StarRatingComponent implements OnInit {
  @Input() rating: number;
  @Input() forShow: boolean = false;
  starCount: number = 5;
  ratingArray: boolean[] = [];
  @Output() rateChanged: EventEmitter<number> = new EventEmitter();

  constructor() {
    this.ratingArray = Array(this.starCount).fill(false);
  }

  ngOnInit(): void {
  }

  showStars(i: number): string {
    if (this.rating >= i + 1) {
      return 'fas fa-star custom-star';
    } else if (this.rating > i && this.rating < i + 1) {
      return 'fas fa-star-half-alt custom-star';
    } else {
      return 'far fa-star custom-star';
    }
  }

  addRating(i: number): void {
    this.rating = i + 1;
    this.rateChanged.emit(this.rating);
  }

}
