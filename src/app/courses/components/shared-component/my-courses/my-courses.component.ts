import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CourseDetailsModel } from 'src/app/shared/models/course-details.model';


import { AuthService } from 'src/app/shared/services/auth.service';
import { CourseService } from '../../../services/course.service';

@Component({
  selector: 'app-my-courses',
  templateUrl: './my-courses.component.html',
  styleUrls: ['./my-courses.component.scss']
})
export class MyCoursesComponent implements OnInit, OnChanges {
  courseForm: FormGroup;
  @Input() updateForm: CourseDetailsModel;
  @Input() edit: boolean;
  @Output() courseChanged = new EventEmitter<any>();

  constructor(private formBuilder: FormBuilder, 
              private courseService: CourseService,
              private authService: AuthService) { }

  ngOnInit(): void {
    this.courseForm = this.formBuilder.group({
      'instrFullName': null,
      'courseId': null,
      'courseName': [null, [Validators.minLength(5), Validators.maxLength(70), Validators.required]],
      'description': [null, [Validators.minLength(100), Validators.maxLength(1500), Validators.required]],
      'language': [null, [Validators.minLength(3), Validators.maxLength(30), Validators.required]],
      'image': null,
      'price': [null, Validators.required],
      'added': null,
      'courseRating': null,
      'noRating': null,
      'content': this.formBuilder.array([])
    });
  };

  ngOnChanges(): void {
    if(this.updateForm) {
      this.initForm();
    }
  };

  initForm() {
    if(this.courseForm) {
      this.courseForm.patchValue({
        'instrFullName': this.updateForm.instrFullName,
        'courseId': this.updateForm.courseId,
        'courseName': this.updateForm.courseName,
        'description': this.updateForm.description,
        'image': this.updateForm.image,
        'language': this.updateForm.language,
        'price': this.updateForm.price,
        'added': this.updateForm.added,
        'courseRating': this.updateForm.courseRating,
        'noRating': this.updateForm.noRating
      });
      for(let lesson in this.updateForm.content) {
      this.content.push(this.formBuilder.control(this.updateForm.content[lesson]));
      }
    };
  };

  createCourse() {
    let obj = {
      courseName: this.courseForm.value.courseName,
      image: this.courseForm.value.image,
      language: this.courseForm.value.language,
      price: this.courseForm.value.price,
      description: this.courseForm.value.description,
      fkUser: this.authService.loggedUser.userId,
      content: this.courseForm.value.content

    };
    let obj1 = {
      courseId: null,
      courseName: this.courseForm.value.courseName,
      image: this.courseForm.value.image,
      price: this.courseForm.value.price,
      instrFullName: this.authService.loggedUser.firstName + ' ' + this.authService.loggedUser.lastName,
      rating: 0,
      noRating: 0,
    };
    this.courseService.createCourse(obj).subscribe((courseId: number) => {
      obj1.courseId = courseId;
      this.courseChanged.emit(obj1);
      console.log(courseId);
      console.log(this.courseForm.value)
      this.courseForm.reset();
    }, (error) => {
      console.log(error);
    })
  };

  updateCourse() {
    let updateProperty = {
      'courseName': this.courseForm.value.courseName,
      'image': this.courseForm.value.image,
      'language': this.courseForm.value.language,
      'price': this.courseForm.value.price,
      'description': this.courseForm.value.description,
      'content': this.courseForm.value.content
    };

    this.courseService.updateCourse(this.courseForm.value.courseId, updateProperty).subscribe(
      (res) => {
        console.log(res);
      }
    ), (error) => {
      console.log(error);
    };

    this.courseChanged.emit(this.courseForm.value);
    console.log(this.courseForm.value)
  };

  addLesson() {
    let formData = this.formBuilder.control(null, [Validators.minLength(3), Validators.maxLength(50) ,Validators.required]);
    this.content.push(formData);
  };

  deleteLesson(i: number) {
    this.content.removeAt(i);
  };

  get courseName() {
    return this.courseForm.controls['courseName'];
  };

  get description() {
    return this.courseForm.controls['description'];
  };

  get language() {
    return this.courseForm.controls['language'];
  };

  get price() {
    return this.courseForm.controls['price'];
  };

  get content() {
    return this.courseForm.get('content') as FormArray;
  };


}
