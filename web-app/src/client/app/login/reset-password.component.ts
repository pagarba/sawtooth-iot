import { Component, OnInit, OnDestroy, ViewEncapsulation, ViewChild } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { BaseAuthenticationService, BaseAlertService, BaseConfigService } from '../base/index';
import { MessageSeverity } from '../services/alert/index';
import { UserLogin } from '../models/index';
import { Utilities } from '../services/application/index';
import * as moment from 'moment';
import { Subscription } from 'rxjs/Subscription';

@Component({
  moduleId: module.id,
  selector: 'app-reset-password',
  templateUrl: 'reset-password.component.html',
  styleUrls: ['reset-password.component.css'],
})

export class ResetPasswordComponent implements OnInit {
  userLogin = new UserLogin();
  isLoading = false;
  helpText: any;
  tokenExpires: string;
  token: string;
  passwordPattern: RegExp = new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/);
  subscription: Subscription;

  @ViewChild('form')
  form: NgForm;

  constructor(
    private authService: BaseAuthenticationService,
    private alertService: BaseAlertService,
    private configService: BaseConfigService,
    private route: ActivatedRoute,
    protected router: Router) {

    this.route.queryParams.subscribe(params => {
      //Web server redirects upper case url to lower case on onInit, we need to capture the first value
      if (!this.token) {
        this.token = params['resettoken'];
      }
      if (!this.tokenExpires) {
        this.tokenExpires = params['resettokenexpires'];

        if (this.isTokenExpired(this.tokenExpires)) {
          this.router.navigate(['/forgotpassword', { reason: 'expired' }]);
        }
      }
    });
  }

  ngOnInit() {
    this.helpText = this.configService.helpText;
    if (this.authService.isLoggedIn) {
      this.authService.logout();
    }
  }

  isTokenExpired(expires: string): boolean {
    return moment(expires, 'MM/DD/YYYY HH:mm:ss').isBefore(moment());
  }

  onSubmit() {

    if (this.form.controls.password.errors) {

      switch (true) {
        case this.form.controls.password.hasError('required'):
          this.showErrorAlert('Password is required', 'Please enter a new password');
          break;
        case this.form.controls.password.hasError('pattern'):
          this.showErrorAlert('Password is not correct', 'Please check requirements to password');
          break;
        default:
          this.showErrorAlert('Password is not valid', 'Please enter valid password');
      }
      return;
    }

    if (this.form.controls.confirmPassword.errors) {
      switch (true) {
        case this.form.controls.confirmPassword.hasError('required'):
        this.showErrorAlert('Confirm password is required', 'Please enter confirm password');
        break;
      }

      return;
    }

    if (this.form.controls.confirmPassword.value !== this.form.controls.password.value) {
      this.showErrorAlert('Confirm doesn\'t match', 'Password does not match the confirm password.');
      return;
    }

    this.sendProcessPassword();
  }

  sendProcessPassword() {
    this.isLoading = true;
    this.alertService.startLoadingMessage('', 'Updating your password ...');

    this.authService.updatePassword(this.token, this.userLogin.password)
      .subscribe(() => {
        this.alertService.stopLoadingMessage();
        this.isLoading = false;
        this.router.navigate(['']);
      }, error => {

        // TODO error validation and notification to separate service
        this.alertService.stopLoadingMessage();

        if (Utilities.checkNoNetwork(error)) {
          //console.log(Utilities.noNetworkMessageCaption);
          this.alertService.showStickyMessage(Utilities.noNetworkMessageCaption, Utilities.noNetworkMessageDetail,
            MessageSeverity.error, error);
        } else {
          if (Utilities.checkNoNetwork(error)) {
            this.alertService.showStickyMessage(Utilities.noNetworkMessageCaption,
              Utilities.noNetworkMessageDetail,
              MessageSeverity.error,
              error);
          } else {
            let errorMessage = Utilities.findHttpResponseMessage('error_description', error);
            if (errorMessage) {
              this.alertService.showStickyMessage('Unable to update',
                errorMessage,
                MessageSeverity.error,
                error);
            } else {
              this.alertService.showStickyMessage('Unable to update', 'An error occured, please try again later.'
                || error.status, MessageSeverity.error, error);
            }
          }
        }

        setTimeout(() => {
          this.isLoading = false;
        }, 500);

      });
  }

  showErrorAlert(caption: string, message: string) {
    this.alertService.showMessage(caption, message, MessageSeverity.error);
  }

}


