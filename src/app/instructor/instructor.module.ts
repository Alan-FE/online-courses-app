import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { InstructorsComponent } from './components/instructors/instructors.component';
import { InstructorDetailsComponent } from './components/instructor-details/instructor-details.component';
import { InstructorService } from './services/instructor.service';
import { InstructorPermissionService } from '../shared/services/instructor-permission.service';

const routes: Routes = [
  { path: 'instructors', component: InstructorsComponent, canActivate: [InstructorPermissionService] },
  { path: 'instructors/instructor-details/:id', component: InstructorDetailsComponent }
];

@NgModule({
  declarations: [
    InstructorsComponent,
    InstructorDetailsComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    InstructorService
  ]
})
export class InstructorModule { }
