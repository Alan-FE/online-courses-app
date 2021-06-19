import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';


import { AuthService } from 'src/app/shared/services/auth.service';
import { CourseService } from '../../../services/course.service';

@Component({
  selector: 'app-my-courses',
  templateUrl: './my-courses.component.html',
  styleUrls: ['./my-courses.component.scss']
})
export class MyCoursesComponent implements OnInit, OnChanges {
  courseForm: FormGroup;
  @Input() updateForm: any;
  @Input() edit: boolean;
  @Output() update = new EventEmitter<any>();

  constructor(private formBuilder: FormBuilder, 
              private courseService: CourseService,
              private authService: AuthService) { }

  ngOnInit(): void {
    this.courseForm = this.formBuilder.group({
      'courseName': [null, Validators.required],
      'image': [null, Validators.required],
      'language': [null, Validators.required],
      'price': [null, Validators.required],
      'description': [null, Validators.required],
      'content': this.formBuilder.array([])
    });
  };

  ngOnChanges(): void {
    if(this.updateForm) {
      this.initForm();
    }
  }

  createCourse() {
    let obj = {
      courseName: this.courseForm.value.courseName,
      image: this.courseForm.value.image,
      language: this.courseForm.value.language,
      price: this.courseForm.value.price,
      description: this.courseForm.value.description,
      fkUser: this.authService.loggedUser.userId,
      content: this.courseForm.value.content

    }
    let obj1 = {
      courseId: null,
      courseName: this.courseForm.value.courseName,
      image: this.courseForm.value.image,
      price: this.courseForm.value.price,
      firstName: this.authService.loggedUser.firstName, 
      lastName:  this.authService.loggedUser.lastName,
      rating: 0,
      noRating: 0,
    }
    this.courseService.createCourse(obj).subscribe((res) => {
      obj1.courseId = res;
      this.courseService.coursesChanged.next(obj1);
      console.log(res);
      console.log(this.courseForm.value)
      this.courseForm.reset();
    }, (error) => {
      console.log(error);
    })
  }

  updateCourse() {
    console.log(this.updateForm)
    this.courseService.updateCourse(this.updateForm.courseId, this.courseForm.value).subscribe(
      (res) => {
        console.log(res);
      }
    ), (error) => {
      console.log(error);
    }
    this.update.emit(this.updateForm);
  };

  initForm() {
    this.courseForm.patchValue({
      'courseName': this.updateForm.courseName,
      'image': this.updateForm.image,
      'language': this.updateForm.language,
      'price': this.updateForm.price,
      'description': this.updateForm.description,
    });
    for(let lesson in this.updateForm.content) {
     this.content.push(this.formBuilder.control(this.updateForm.content[lesson]));
    }
  }

  addLesson() {
    let formData = this.formBuilder.control(null, Validators.required);
    this.content.push(formData);
  }

  deleteLesson(i: number) {
    this.content.removeAt(i);
  }

  get content() {
    return this.courseForm.get('content') as FormArray;
  }


}
