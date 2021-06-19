import { CommonModule, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { StarRatingComponent } from './components/star-rating/star-rating.component';
import { AuthService } from './services/auth.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TokenInterceptor } from '../core/interceptor/token.interceptor';
import { PaginationComponent } from './components/pagination/pagination.component';
import { PaginationPipe } from './pipes/pagination.pipe';
import { ModalComponent } from './components/modal/modal.component';
import { ModalService } from './services/modal.service';
import { CourseCardComponent } from './components/course-card/course-card.component';
import { RouterModule } from '@angular/router';
import { FilterPipe } from './pipes/filter.pipe';

@NgModule({
  declarations: [
    StarRatingComponent,
    PaginationComponent,
    ModalComponent,
    PaginationPipe,
    FilterPipe,
    CourseCardComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    StarRatingComponent,
    PaginationComponent,
    ModalComponent,
    CourseCardComponent,
    PaginationPipe,
    FilterPipe
  ],
  providers: [
    DatePipe,
    AuthService,
    ModalService,
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true}]
})
export class SharedModule { }
