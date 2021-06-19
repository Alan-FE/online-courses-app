import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InstructorModel } from '../../models/instructor.model';
import { InstructorService } from '../../services/instructor.service';

@Component({
  selector: 'app-instructor-details',
  templateUrl: './instructor-details.component.html',
  styleUrls: ['./instructor-details.component.scss']
})
export class InstructorDetailsComponent implements OnInit {
  id: number;
  instructorDetails: InstructorModel[] = [];
  instructorCourses: any= [];
  page: number = 1;
  itemsPerPage: number = 8;
  totalCourses: number;

  constructor( private route: ActivatedRoute, private instService: InstructorService ) { }

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id');
    this.instService.getInstructorData(this.id).subscribe((responseList: any) => {
      this.instructorDetails = responseList[0];
      this.instructorCourses = responseList[1];
      this.totalCourses = responseList[1].length;
      console.log(responseList)
    });
  }

  onPageChange(value) {
    this.page = value;
  }
}
