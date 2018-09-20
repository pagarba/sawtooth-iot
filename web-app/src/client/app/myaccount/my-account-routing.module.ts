import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MyAccountComponent } from './my-account.component';
import { AuthGuardService } from './../services/security/authentication-guard.service';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: MyAccountComponent,
        canActivate: [AuthGuardService]
      },
    ])
  ],
  exports: [RouterModule]
})
export class MyAccountRoutingModule { }
