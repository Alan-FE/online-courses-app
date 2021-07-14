import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { UserRegisterModel } from '../../models/user-register.model';
import { AuthService } from '../../../shared/services/auth.service';
import { samePassword } from 'src/app/shared/directives/same-password.directive';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  signupForm: FormGroup;
  userRegister: UserRegisterModel = new UserRegisterModel();

  constructor(private authService: AuthService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      'firstName': new FormControl(null,
        [ Validators.required, Validators.minLength(2), Validators.maxLength(40)]),
      'lastName': new FormControl(null, 
        [ Validators.required, Validators.minLength(2), Validators.maxLength(40)]),
      'email': new FormControl(null, 
        [ Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        Validators.maxLength(40)
        ]),
      'role': new FormControl({value: 'user', disabled: true}),
      'passwordGroup': new FormGroup({
        'password': new FormControl(null, 
          [ Validators.required, Validators.minLength(6), Validators.maxLength(50)]),
        'confirmPassword': new FormControl(null, Validators.required)
      }, {validators: samePassword()})
    })
  }

  signUp() {
    this.signupForm.markAllAsTouched();
    if(this.signupForm.valid) {
      this.userRegister = {
        firstName: this.signupForm.getRawValue().firstName,
        lastName: this.signupForm.getRawValue().lastName,
        email: this.signupForm.getRawValue().email,
        role: this.signupForm.getRawValue().role,
        password: this.signupForm.getRawValue().passwordGroup.password,
      }
      this.authService.signUp(this.userRegister).subscribe((response) => {
        console.log(response)
        this.signupForm.reset({
          'role': 'user'
        });
        this.toastr.success("You have successfully registered! Now you can login!", "Notification")
      }, (error) => {
        if(error.error.code == "ER_DUP_ENTRY") {
          this.toastr.warning("User with that email address already exists!", "Notification!")
        } else {
          this.toastr.warning(error.message, "Notification!")
        }
      });
    }
    console.log(this.signupForm.getRawValue())
  }

  get firstName() {
    return this.signupForm.controls['firstName'];
  }

  get lastName() {
    return this.signupForm.controls['lastName'];
  }

  get email() {
    return this.signupForm.controls['email'];
  }

  get password() {
    return this.signupForm.get('passwordGroup.password');
  }

  get passwordGroup() {
    return this.signupForm.controls['passwordGroup'];
  }
}
