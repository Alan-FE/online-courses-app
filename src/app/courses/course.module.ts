import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { CoursesComponent } from './components/courses/courses.component';
import { CourseDetailsComponent } from './components/course-details/course-details.component';
import { CartComponent } from './components/cart/cart.component';
import { RouterModule, Routes } from '@angular/router';
import { MyCoursesComponent } from './components/courses/my-courses/my-courses.component';
import { CourseService } from './services/course.service';
import { CartService } from './services/cart.service';
import { ReviewService } from './services/review.service';
import { ReviewsListComponent } from './components/course-details/reviews-list/reviews-list.component';

const routes: Routes = [
  { path: 'courses', component: CoursesComponent},
  { path: 'courses/course-details/:id', component: CourseDetailsComponent },
  { path: 'cart', component: CartComponent }
];


@NgModule({
  declarations: [
    CoursesComponent,
    CourseDetailsComponent,
    MyCoursesComponent,
    CartComponent,
    ReviewsListComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    CourseService,
    CartService,
    ReviewService
  ]
})
export class CourseModule { }
