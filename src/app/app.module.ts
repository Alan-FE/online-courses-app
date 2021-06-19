import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
//import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
//import { ReactiveFormsModule } from '@angular/forms';
//import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AdminModule } from './admin/admin.module';
import { CoreModule } from './core/core.module';
import { CourseModule } from './courses/course.module';
import { InstructorModule } from './instructor/instructor.module';
import { ProfileModule } from './profile/profile.module';
import { SharedModule } from './shared/shared.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AdminModule,
    CoreModule,
    CourseModule,
    InstructorModule,
    ProfileModule,
    SharedModule,
    RouterModule.forRoot([])
 //   ReactiveFormsModule,
  //  HttpClientModule,
   // BrowserAnimationsModule
  ],
  providers: [
   // DatePipe,
    //{provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
