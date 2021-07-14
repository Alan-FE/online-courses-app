import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { InstructorModel } from '../../models/instructor.model';
import { InstructorService } from '../../services/instructor.service';

@Component({
  selector: 'app-instructors',
  templateUrl: './instructors.component.html',
  styleUrls: ['./instructors.component.scss'],
  animations: [
    trigger('show', [
      transition('void => *', [
        style({
          width: '0%',
          opacity: 0
        }),
        animate(1500)
      ])
    ])
  ]

})

export class InstructorsComponent implements OnInit, OnDestroy {
  instructors$: InstructorModel[] = [];
  value: string = '';
  page: number = 1;
  itemsPerPage: number = 10;
  totalInstructors: number;
  subscription: Subscription;

  constructor(private instService: InstructorService) { }

  ngOnInit(): void {
    this.subscription = this.instService.getAllInstructors().subscribe((instructors: InstructorModel[]) => {
      this.totalInstructors = instructors.length;
      this.instructors$ = instructors;
      console.log(instructors)
    })
  };

  onPageChange(value: number) {
    this.page = value;
  };

  ngOnDestroy() {
    this.subscription.unsubscribe();
  };
}
