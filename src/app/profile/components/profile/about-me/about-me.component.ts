import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { AboutMeModel } from 'src/app/profile/models/about-me.model';
import { ProfileService } from 'src/app/profile/services/profile.service';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.scss']
})
export class AboutMeComponent implements OnInit, OnDestroy {
  aboutMeModel: AboutMeModel = new AboutMeModel();
  aboutMeForm: FormGroup;
  instructor$: any;
  edit: boolean;
  disableOrEnable: boolean = true;
  isChanged: boolean;
  subscription1: Subscription;
  subscription2: Subscription;

  constructor(private profileService: ProfileService, 
              private authService: AuthService,
              private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.subscription1 = this.profileService.aboutInstructor(this.authService.loggedUser.userId)
    .subscribe((instructorData: AboutMeModel) =>{
      this.instructor$ = instructorData[0];
      this.initForm();
    }, (error) => {
      console.log(error);
    })
  }

  initForm(): void {
    if(this.instructor$ === undefined) {
      this.instructor$ = {};
      this.instructor$.profession = '';
      this.instructor$.biography = '';
      this.disableOrEnable = false;
    }
    console.log(this.instructor$)
    this.aboutMeForm = this.formBuilder.group({
      'profession': this.formBuilder.control({value: this.instructor$.profession, disabled: this.disableOrEnable}, 
        [Validators.minLength(5), Validators.maxLength(70), Validators.required]),
      'biography': this.formBuilder.control({value: this.instructor$.biography, disabled: this.disableOrEnable}, 
        [Validators.minLength(100), Validators.maxLength(1500), Validators.required]),
    });

    this.subscription2 = this.aboutMeForm.valueChanges.subscribe((value) =>{
      if(value.profession !== this.instructor$.profession || value.biography !== this.instructor$.biography) {
        this.isChanged = true;
      } else {
        this.isChanged = false;
      };
    })
  }

  add(): void {
    console.log(this.aboutMeForm.value)
    this.aboutMeModel = {
      profession: this.aboutMeForm.value.profession,
      biography: this.aboutMeForm.value.biography,
      fkUser: this.authService.loggedUser.userId
    }
    this.profileService.addBiography(this.aboutMeModel).subscribe((response) =>{
      this.aboutMeForm.disable();
      this.edit = false;
      this.disableOrEnable = true;
      if(response[1]['accessToken']) {
        localStorage.setItem('accessToken', response[1]['accessToken']);
        localStorage.setItem('refreshToken', response[1]['refreshToken']);
      };
    }, (error) =>{
      console.log(error);
    })
  }

  onEdit(): void {
    this.aboutMeForm.enable();
    this.edit = true;
  }

  update(): void {
    this.aboutMeModel = {
      profession: this.aboutMeForm.value.profession,
      biography: this.aboutMeForm.value.biography,
      fkUser: this.authService.loggedUser.userId
    }
    this.profileService.updateAboutMe(this.aboutMeModel).subscribe(
      (response) => {
        console.log(response);
        this.aboutMeForm.disable();
        this.edit = false;
      }, (error) => {
        console.log(error);
      }
    )
  };

  cancel() {
    this.aboutMeForm.disable();
    this.initForm();
    this.edit = false;
  }

  get profession() {
    return this.aboutMeForm.controls['profession'];
  };

  get biography() {
    return this.aboutMeForm.controls['biography'];
  };

  ngOnDestroy() {
    this.subscription1.unsubscribe();
    this.subscription2.unsubscribe();
  }
}
