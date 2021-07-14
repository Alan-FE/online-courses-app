import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { switchMap } from 'rxjs/operators';

import { AuthService } from '../../shared/services/auth.service';

@Injectable({
    providedIn: 'root'
})

export class TokenInterceptor implements HttpInterceptor {
    jwtHelper = new JwtHelperService();

    constructor(private authService: AuthService) {}
    
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        if (req.url.indexOf('/token') > -1) {
            return next.handle(req);
        }
        
        const accessToken = localStorage.getItem('accessToken');
        if(accessToken) {
            if(!this.jwtHelper.isTokenExpired(accessToken)) {
                req = req.clone({
                    headers: req.headers.set(`Authorization`, `Bearer ${accessToken}`)
                })
                return next.handle(req);
            }
        

        const payload = {
            refreshToken: localStorage.getItem('refreshToken')
        };

        return this.authService.callRefreshToken(payload).pipe(
            switchMap((newTokens: any) => {
                console.log(newTokens)
              localStorage.setItem('accessToken', newTokens['accessToken']);
              req = req.clone({
                headers: req.headers.set(
                  'Authorization',
                  `Bearer ${newTokens['accessToken']}`
                ),
              });
              return next.handle(req);
            })
          );
        } else {
            return next.handle(req);
        }
    } 
    
}