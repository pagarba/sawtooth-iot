import { Component, OnInit, OnDestroy, ViewEncapsulation, ViewChild } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseAuthenticationService, BaseAlertService, BaseConfigService } from '../base/index';
import { MessageSeverity } from '../services/alert/index';
import { UserLogin } from '../models/index';
import { Utilities } from '../services/application/index';

@Component({
  moduleId: module.id,
  selector: 'app-forgot-password',
  templateUrl: 'forgot-password.component.html',
  styleUrls: ['forgot-password.component.css'],
})

export class ForgotPasswordComponent implements OnInit, OnDestroy {
  userLogin = new UserLogin();
  isLoading = false;
  helpText: any;
  reason: string;
  passwordPattern: RegExp = new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/);

  @ViewChild('form')
  form: NgForm;

  constructor(
    private authService: BaseAuthenticationService,
    private alertService: BaseAlertService,
    private configService: BaseConfigService,
    private route: ActivatedRoute,
    protected router: Router) {
  }

  ngOnInit() {
    this.helpText = this.configService.helpText;
    this.route.params.subscribe(params => {
      this.reason = params['reason'];
    });
  }

  ngOnDestroy() {
    //
  }

  onSubmit() {

    if (this.form.invalid)
      return;

    this.sendNewPassword();

  }

  sendNewPassword() {
    this.isLoading = true;
    this.alertService.startLoadingMessage('', 'Sending the instruction ...');

    this.authService.resetPassword(this.userLogin.username)
      .subscribe(
        email => {
          setTimeout(() => {
            this.alertService.stopLoadingMessage();
            this.isLoading = false;
          }, 500);
        },
        error => {

          this.alertService.stopLoadingMessage();

          if (Utilities.checkNoNetwork(error)) {
            console.log(Utilities.noNetworkMessageCaption);
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
                this.alertService.showStickyMessage('Unable to Reset',
                  errorMessage,
                  MessageSeverity.error,
                  error);
              } else {
                this.alertService.showStickyMessage('Unable to reset', 'An error occured, please try again later.'
                  || error.status, MessageSeverity.error, error);
              }
            }
          }

          setTimeout(() => {
            this.isLoading = false;
          }, 500);
        });

    console.log('email', this.userLogin.username);
    //this.reset();
  }

  showErrorAlert(caption: string, message: string) {
    this.alertService.showMessage(caption, message, MessageSeverity.error);
  }

}


