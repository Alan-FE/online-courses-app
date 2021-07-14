import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Injectable()

export class InstructorPermissionService implements CanActivate {

  constructor(private router: Router, private authService: AuthService) { }

  canActivate(route: ActivatedRouteSnapshot, 
              state: RouterStateSnapshot): boolean {
                if (this.authService.loggedUser?.role == 'instructor' && this.authService.loggedUser?.aboutMe) {
                  this.router.navigate(['/profile/about-me']);
                  return false;
                } 
                return true;
              }   
}
