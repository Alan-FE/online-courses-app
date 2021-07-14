import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ModalService } from 'src/app/shared/services/modal.service';

import { UserModel } from '../../models/user.model';
import { AdminService } from '../../services/admin.service';
import { UserComponent } from '../all-users/user/user.component';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.scss']
})
export class AllUsersComponent implements OnInit, OnDestroy {
  users$: UserModel[] = [];
  userData: UserModel;
  @ViewChild(UserComponent, {static: true}) child: UserComponent;
  subscription: Subscription;

  constructor( private adminService: AdminService, private modalService: ModalService,
               private authService: AuthService ) { }

  ngOnInit(): void {
    this.subscription = this.adminService.getAllUsers().subscribe((users: UserModel[]) => {
      this.users$ = users;
      console.log(users);
    })
  };

  add(user: UserModel) {
    this.users$.push(user);
  };

  update(user: any) {
    this.users$[user.id] = user.user;
    console.log(user);
  }

  onEdit(user: UserModel, i: number) {
    this.modalService.open('custom-modal');
    this.child.isEdit = true;
    this.child.id = i;
    this.userData = user;
    console.log(this.users$);
  };

  onDelete(userId: number, i: number) {
    this.authService.deleteAccount(userId).subscribe(response =>{
      this.users$.splice(i, 1);
      console.log(response);
    }, (error) => {
      console.log(error)
    })
  };

  openModal(id: string) {
    this.child.userForm.reset();
    this.child.isEdit = false;
    this.modalService.open(id);
  };
  
  closeModal(id: string) {
    this.modalService.close(id);
  };

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
