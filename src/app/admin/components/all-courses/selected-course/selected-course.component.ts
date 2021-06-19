import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-selected-course',
  templateUrl: './selected-course.component.html',
  styleUrls: ['./selected-course.component.scss']
})
export class SelectedCourseComponent implements OnInit {
  @Input() course: any;

  constructor() { }

  ngOnInit(): void {};

}
