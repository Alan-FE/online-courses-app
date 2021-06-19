import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AboutMeModel } from 'src/app/profile/models/about-me.model';
import { ProfileService } from 'src/app/profile/services/profile.service';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.scss']
})
export class AboutMeComponent implements OnInit {
  aboutMeModel: AboutMeModel = new AboutMeModel();
  aboutMeForm: FormGroup;
  instructor$: any;
  edit: boolean;

  constructor(private profileService: ProfileService, private authService: AuthService,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.profileService.aboutInstructor(this.authService.loggedUser.userId).subscribe((instructorData: AboutMeModel) =>{
      this.instructor$ = instructorData[0];
      this.initForm();
    }, (error) => {
      console.log(error);
    })

  }

  initForm(): void {
    this.aboutMeForm = this.formBuilder.group({
      'profession': this.formBuilder.control({value: this.instructor$.profession, disabled: true}),
      'aboutMe': this.formBuilder.control({value: this.instructor$.biography, disabled: true}),
    });
  }

  onEdit(): void {
    this.aboutMeForm.enable();
    this.edit = true;
  }

  update(): void {
    this.aboutMeModel = {
      profession: this.aboutMeForm.value.profession,
      aboutMe: this.aboutMeForm.value.aboutMe
    }
    this.profileService.updateAboutMe(this.authService.loggedUser.userId, this.aboutMeModel).subscribe(
      (response) => {
        console.log(response);
        this.aboutMeForm.disable();
        this.edit = false;
      }, (error) => {
        console.log(error);
      }
    )
  };

}
