import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { UserModel } from '../../../models/user.model';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit, OnChanges {
  userForm: FormGroup;
  userModel: UserModel = new UserModel();
  @Input() user;
  @Output() newUser = new EventEmitter<any>();
  @Output() updateUser = new EventEmitter<any>();
  isEdit: boolean;
  id: number;

  constructor(private formBuilder: FormBuilder, private authService: AuthService) { }

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      'firstName': [null, Validators.required],
      'lastName': [null, Validators.required],
      'email': [null, Validators.required],
      'password': [null, Validators.required],
      'image': [null, Validators.required],
      'role': [null, Validators.required]
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if(this.user) {
      let user = changes.user.currentValue;
      console.log(user)
      this.initForm(user);
    }
  }

  createUser() {
    let date: any = new Date();
    let created = date.toISOString().slice(0, 19).replace('T', ' ');

    this.userModel = {
      userId: null,
      firstName: this.userForm.value.firstName,
      lastName: this.userForm.value.lastName,
      email: this.userForm.value.email,
      password: this.userForm.value.password,
      image: this.userForm.value.image ? this.userForm.value.image : 
      'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/450px-No_image_available.svg.png',
      role: this.userForm.value.role,
      created: created
    }
    this.authService.signUp(this.userModel).subscribe((response: number) => {
      this.userModel.userId = response;
      this.userModel.created = date;
     this.newUser.emit(this.userModel);
     //this.newUser.push(this.userModel);
     this.userForm.reset();
      console.log(response);
    }, (error)=> {
      console.log(error);
    })
  }

  initForm(user) {
    this.userForm.setValue({
      'firstName': user.firstName,
      'lastName': user.lastName,
      'email': user.email,
      'password': '',
      'image': user.image,
      'role': user.role
    })
  }

  update() {
    this.authService.updateAccount(this.user.userId, this.userForm.value).subscribe((res) => {
      console.log(res);
    }, (error) => {
      console.log(error)
    })
    console.log("You updating user");
    this.updateUser.emit({user: this.userForm.value, id: this.id});//check
    console.log(this.user);
  }

}
