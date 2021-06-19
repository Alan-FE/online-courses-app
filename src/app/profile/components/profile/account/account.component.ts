import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { User } from 'src/app/shared/models/user.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ProfileService } from '../../../services/profile.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  profileForm: FormGroup;
  user: User;
  editMode: boolean = true;
  changedValue: boolean;

  constructor(private profileService: ProfileService, private authService: AuthService,
  private formBuilder: FormBuilder, private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.profileService.getUserData(this.authService.loggedUser.userId).subscribe((user: User) => {
      this.user = user[0];
      this.initForm();
    }, (error) => {
      console.log(error);
    });
  }

  initForm(): void {
    let added = this.datePipe.transform(this.user.created, 'short');
    this.profileForm = this.formBuilder.group({
      'firstName': this.formBuilder.control({value: this.user.firstName, disabled: true}),
      'lastName': this.formBuilder.control({value: this.user.lastName, disabled: true}),
      'email': this.formBuilder.control({value: this.user.email, disabled: true}),
      'image': this.formBuilder.control({value: this.user.image, disabled: true}),
      'role': this.formBuilder.control({value: this.user.role, disabled: true}),
      'created': this.formBuilder.control({value: added, disabled: true})
    });
      this.profileForm.valueChanges.subscribe((value) =>{
        if(value.firstName !== this.user.firstName || value.lastName !== this.user.lastName) {
          this.changedValue = true;
          console.log(value);
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
  }

}
