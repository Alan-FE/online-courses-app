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
  @Input() user: UserModel;
  @Output() newUser = new EventEmitter<any>();
  @Output() updateUser = new EventEmitter<any>();
  isEdit: boolean;
  id: number;

  constructor(private formBuilder: FormBuilder, private authService: AuthService) { }

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      'firstName': [null, [Validators.required, Validators.minLength(2), Validators.maxLength(40)]],
      'lastName': [null, [Validators.required, Validators.minLength(2), Validators.maxLength(40)]],
      'email': [null, [ Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      Validators.maxLength(40)
      ]],
      'password': [null, [Validators.required, Validators.minLength(6), Validators.maxLength(50)]],
      'image': null,
      'role': [null, Validators.required],
      'created': null
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if(this.user) {
      let user = changes.user.currentValue;
      this.initForm(user);
    }
  }

  createUser() {
    let date = new Date().getTimezoneOffset() * 60000;
    let created = (new Date(Date.now() - date)).toISOString().slice(0, 19).replace('T', ' ')

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
      this.userModel.created = created;
     this.newUser.emit(this.userModel);
     this.userForm.reset();
    }, (error)=> {
      console.log(error);
    })
  }

  initForm(user) {
    this.userForm.setValue({
      'firstName': user.firstName,
      'lastName': user.lastName,
      'email': user.email,
      'password': user.password,
      'image': user.image,
      'role': user.role,
      'created': user.created
    })
  }

  update() {
    this.authService.updateAccount(this.user.userId, this.userForm.value).subscribe((res) => {
      this.updateUser.emit({user: this.userForm.value, id: this.id});
      this.userForm.reset();
      console.log(res);
    }, (error) => {
      console.log(error)
    });
  };

  get firstName() {
    return this.userForm.controls['firstName'];
  }

  get lastName() {
    return this.userForm.controls['lastName'];
  }

  get email() {
    return this.userForm.controls['email'];
  }

  get password() {
    return this.userForm.controls['password'];
  }

  get role() {
    return this.userForm.controls['role'];
  }

}
