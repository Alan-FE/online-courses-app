import { Component, Input, OnInit } from '@angular/core';
import { CourseDetailsModel } from 'src/app/shared/models/course-details.model';

@Component({
  selector: 'app-selected-course',
  templateUrl: './selected-course.component.html',
  styleUrls: ['./selected-course.component.scss']
})
export class SelectedCourseComponent implements OnInit {
  @Input() course: CourseDetailsModel;

  constructor() { }

  ngOnInit(): void {};

}
