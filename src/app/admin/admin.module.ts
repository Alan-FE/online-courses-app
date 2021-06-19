import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { AllUsersComponent } from './components/all-users/all-users.component';
import { AdminService } from './services/admin.service';
import { SharedModule } from '../shared/shared.module';
import { UserComponent } from './components/all-users/user/user.component';
import { AllCoursesComponent } from './components/all-courses/all-courses.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SelectedCourseComponent } from './components/all-courses/selected-course/selected-course.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'all-courses', component: AllCoursesComponent },
  { path: 'all-users', component: AllUsersComponent }
];

@NgModule({
  declarations: [
    AllUsersComponent,
    UserComponent,
    AllCoursesComponent,
    DashboardComponent,
    SelectedCourseComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    AdminService
  ]
})
export class AdminModule { }
