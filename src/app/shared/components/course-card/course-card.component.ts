import { Component, Input, OnInit } from '@angular/core';
import { CourseModel } from '../../models/course.model';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.scss']
})
export class CourseCardComponent implements OnInit {
  @Input() courses$: CourseModel[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
