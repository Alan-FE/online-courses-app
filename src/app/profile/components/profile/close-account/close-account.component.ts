import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileService } from 'src/app/profile/services/profile.service';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-close-account',
  templateUrl: './close-account.component.html',
  styleUrls: ['./close-account.component.scss']
})
export class CloseAccountComponent {

  constructor(private authService: AuthService, private router: Router) { }

  deleteAccount(): void {
    this.authService.deleteAccount(this.authService.loggedUser.userId).subscribe(
      (res) => {
        console.log(res);
        this.router.navigate(['/sign-in']);
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
      }, (error) => {
        console.log(error);
      }
    )
  }

}
