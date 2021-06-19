import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from "src/app/shared/services/auth.service";
import { UserLoginModel } from '../../models/user-login.model';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  signInForm: FormGroup;
  userLogin: UserLoginModel = new UserLoginModel();
  errorMessage: string;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.signInForm = new FormGroup({
      'email': new FormControl(null, 
        [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
      'password': new FormControl(null, 
        [Validators.required, Validators.minLength(6), Validators.maxLength(50)])
    });
  }

  signIn() {
    this.signInForm.markAllAsTouched();
    if(this.signInForm.valid) {
      this.userLogin = {
        email: this.signInForm.value.email,
        password: this.signInForm.value.password
      }
      this.authService.signIn(this.userLogin).subscribe((response) =>{
        if(response['accessToken']) {
          localStorage.setItem('accessToken', response['accessToken']);
          localStorage.setItem('refreshToken', response['refreshToken']);
        }

        if (this.authService.loggedUser.role =='admin') {
          this.router.navigate(['dashboard']);
        } else {
          this.router.navigate(['/']);
        }
        console.log(response);
      }, (error) => {
        this.errorMessage = error.error.message;
        console.log(error.error.message);
      });
    }
  }

  get email() {
    return this.signInForm.controls['email']
  }

  get password() {
    return this.signInForm.controls['password'];
  }

}
