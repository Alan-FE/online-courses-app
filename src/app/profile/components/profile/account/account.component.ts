import { DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { User } from 'src/app/shared/models/user.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ProfileService } from '../../../services/profile.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit, OnDestroy {
  profileForm: FormGroup;
  user: User;
  editMode: boolean = true;
  changedValue: boolean;
  subscription1: Subscription;
  subscription2: Subscription;

  constructor(private profileService: ProfileService, private authService: AuthService,
  private formBuilder: FormBuilder, private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.subscription1 = this.profileService.getUserData(this.authService.loggedUser.userId).subscribe((user: User) => {
      this.user = user[0];
      this.initForm();
    }, (error) => {
      console.log(error);
    });
  }

  initForm(): void {
    let added = this.datePipe.transform(this.user.created, 'short');
    this.profileForm = this.formBuilder.group({
      'firstName': this.formBuilder.control({value: this.user.firstName, disabled: true},
        [Validators.minLength(2), Validators.maxLength(40), Validators.required]),
      'lastName': this.formBuilder.control({value: this.user.lastName, disabled: true},
        [Validators.minLength(2), Validators.maxLength(40), Validators.required]),
      'email': this.formBuilder.control({value: this.user.email, disabled: true},
        [ Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        Validators.maxLength(40)
        ]),
      'image': this.formBuilder.control({value: this.user.image, disabled: true}, Validators.required),
      'role': this.formBuilder.control({value: this.user.role, disabled: true}),
      'created': this.formBuilder.control({value: added, disabled: true})
    });
    this.subscription2 = this.profileForm.valueChanges.subscribe((value) =>{
        if(value.firstName !== this.user.firstName || value.lastName !== this.user.lastName) {
          this.changedValue = true;
        } else if (value.email !== this.user.email || value.image !== this.user.image) {
          this.changedValue = true;
        } else {
          this.changedValue = false;
        }
    })
  }

  onUpdate(): void {
    this.user = {
      firstName: this.profileForm.value.firstName,
      lastName: this.profileForm.value.lastName,
      email: this.profileForm.value.email,
      image: this.profileForm.value.image,
      role: this.profileForm.value.role,
      created: this.profileForm.value.created
    }
    this.authService.updateAccount(this.authService.loggedUser.userId, this.user).subscribe((response) => {
      this.profileForm.disable();
      this.editMode = true;
      this.user = this.profileForm.value;
      if(response[1]['accessToken']) {
        localStorage.setItem('accessToken', response[1]['accessToken']);
        localStorage.setItem('refreshToken', response[1]['refreshToken']);
      };
      console.log(response);
    }, (error) => {
      console.log(error);
    })
  }

  onEdit(): void {
    let control = this.profileForm.controls;
    for(let element in control) {
      if(control[element] !== control['role'] && control[element] !== control['created']) {
        control[element].enable();
      }
    };
    this.editMode = false;
  };

  onCancel(): void {
    this.profileForm.disable();
    this.initForm();
    this.editMode = true;
  };

  ngOnDestroy() {
    this.subscription1.unsubscribe();
    this.subscription2.unsubscribe();
  };

  get firstName() {
    return this.profileForm.controls['firstName'];
  };

  get lastName() {
    return this.profileForm.controls['lastName'];
  };

  get email() {
    return this.profileForm.controls['email'];
  };

  get image() {
    return this.profileForm.controls['image'];
  };

}
