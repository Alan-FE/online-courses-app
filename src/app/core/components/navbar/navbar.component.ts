import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../../shared/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(public authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  signOut(): void {
    this.authService.signOut().subscribe(res => {
      this.router.navigate(['/sign-in']);
      console.log(res);
    }, (error) => {
      console.log(error);
    });
  }

}
