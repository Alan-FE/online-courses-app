import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { AuthService } from '../../../shared/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
  subscription: Subscription;

  constructor(public authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  signOut(): void {
    this.subscription = this.authService.signOut().subscribe(res => {
      this.router.navigate(['/sign-in']);
      console.log(res);
    }, (error) => {
      console.log(error);
    });
  };

  ngOnDestroy() {
    this.subscription.unsubscribe();
  };  
}
