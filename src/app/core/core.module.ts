import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { HomeService } from './services/home.service';
import { InstructorPermissionService } from '../shared/services/instructor-permission.service';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [InstructorPermissionService] },
  { path: 'sign-in', component: SignInComponent },
  { path: 'sign-up', component: SignUpComponent }
];

@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    SignInComponent,
    SignUpComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    NavbarComponent,
    FooterComponent,
    HomeComponent
  ],
  providers: [
    HomeService
  ]
})
export class CoreModule { }
