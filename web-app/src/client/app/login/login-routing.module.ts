import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login.component';
import { ResetPasswordComponent } from './reset-password.component';
import { ForgotPasswordComponent } from './forgot-password.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'login',
        component: LoginComponent,
        data: {
          preventNavbar: true
        }
      },
      {
        // Will remove this, only for debug
        path: 'resetpassword',
        component: ResetPasswordComponent,
        data: {
          preventNavbar: true
        }
      },
      {
        path: 'resetpassword/:resettoken',
        component: ResetPasswordComponent,
        data: {
          preventNavbar: true
        }
      },
      {
        path: 'forgotpassword',
        component: ForgotPasswordComponent,
        data: {
          preventNavbar: true
        }
      },
    ])
  ],
  exports: [RouterModule]
})
export class LogintRoutingModule { }
