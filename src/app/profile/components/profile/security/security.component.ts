import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProfileService } from 'src/app/profile/services/profile.service';
import { samePassword } from 'src/app/shared/directives/same-password.directive';
import { AuthService } from 'src/app/shared/services/auth.service';
import { PasswordModel } from '../../../models/password-model';

@Component({
  selector: 'app-security',
  templateUrl: './security.component.html',
  styleUrls: ['./security.component.scss']
})
export class SecurityComponent implements OnInit {
  securityForm: FormGroup;
  passwordModel: PasswordModel = new PasswordModel();

  constructor(private profileService: ProfileService, private authService: AuthService) { }

  ngOnInit(): void {
    this.securityForm = new FormGroup({
    'currentPassword': new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(50)]),
    'passwordGroup': new FormGroup({
      'password': new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(50)]),
      'confirmPassword': new FormControl(null, Validators.required)
    }, {validators: samePassword()})
    });
  }

  changePassword(): void {
    if(this.securityForm.valid) {
      this.passwordModel = {
        currentPassword: this.securityForm.getRawValue().currentPassword,
        newPassword: this.securityForm.getRawValue().passwordGroup.password
      }
      this.profileService.changePassword(this.authService.loggedUser.userId, this.passwordModel)
      .subscribe(res => {
        this.securityForm.reset();
        console.log(res);
      }, (error) => {
        console.log(error);
      })
    }
  };
  get currentPassword() {
    return this.securityForm.get('currentPassword');
  };

  get password() {
    return this.securityForm.get('passwordGroup.password');
  };

  get passwordGroup() {
    return this.securityForm.controls['passwordGroup'];
  }

}
