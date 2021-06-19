import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileComponent } from './components/profile/profile.component';
import { RouterModule, Routes } from '@angular/router';
import { ProfileService } from './services/profile.service';
import { SharedModule } from '../shared/shared.module';
import { AccountComponent } from './components/profile/account/account.component';
import { SecurityComponent } from './components/profile/security/security.component';
import { AboutMeComponent } from './components/profile/about-me/about-me.component';
import { OrderHistoryComponent } from './components/profile/order-history/order-history.component';
import { CloseAccountComponent } from './components/profile/close-account/close-account.component';

const routes: Routes = [
  { path: 'profile', component: ProfileComponent, 
  children: [
    {path:'',redirectTo:'account', pathMatch: 'full' },
    { path: 'account', component: AccountComponent },
    { path: 'security', component: SecurityComponent },
    { path: 'about-me', component: AboutMeComponent },
    { path: 'order-history', component: OrderHistoryComponent },
    { path: 'close-account', component: CloseAccountComponent }
  ]
  }
];

@NgModule({
  declarations: [
    ProfileComponent,
    AccountComponent,
    SecurityComponent,
    AboutMeComponent,
    OrderHistoryComponent,
    CloseAccountComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    ProfileService
  ]
})
export class ProfileModule { }
