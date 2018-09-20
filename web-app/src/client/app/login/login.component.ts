import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BaseAuthenticationService, BaseAlertService, BaseConfigService } from '../base/index';
import { DialogsService } from '../controls/dialog/dialog.service';
import { MessageSeverity } from '../services/alert/index';
import { UserLogin } from '../models/index';
import { Utilities } from '../services/application/index';

@Component({
  moduleId: module.id,
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css'],
})

export class LoginComponent implements OnInit, OnDestroy {
  userLogin = new UserLogin();
  isLoading = false;
  isAdding = false;
  formResetToggle = true;
  loginStatusSubscription: any;
  helpText: any;
  enableForgotPasswordFeature = true;
  private modulesList: any[];

  constructor(private authService: BaseAuthenticationService, private alertService: BaseAlertService,
    private configService: BaseConfigService, private router: Router,
    private dialogsService: DialogsService) { }

  ngOnInit() {
    this.helpText = this.configService.helpText;

    if (this.getShouldRedirect()) {
      this.authService.redirectLoginUser();
    } else {
      this.loginStatusSubscription = this.authService.getLoginStatusEvent().subscribe(isLoggedIn => {
        if (this.getShouldRedirect()) {
          this.authService.redirectLoginUser();
        }
      });
    }
  }

  ngOnDestroy() {
    if (this.loginStatusSubscription)
      this.loginStatusSubscription.unsubscribe();
  }

  showErrorAlert(caption: string, message: string) {
    this.alertService.showMessage(caption, message, MessageSeverity.error);
  }

  getShouldRedirect() {
    return this.authService.isLoggedIn && !this.authService.isSessionExpired;
  }

  login() {
    this.isLoading = true;
    this.alertService.startLoadingMessage('', 'Attempting login...');

    setTimeout(() => {
      this.isLoading = false;
      this.alertService.stopLoadingMessage();
      this.reset();
      this.router.navigate(['devices/all']);
    }, 500);

    // this.authService.login(this.userLogin.username, this.userLogin.password, this.userLogin.rememberMe)
    //   .subscribe(
    //   user => {
    //     setTimeout(() => {
    //       this.alertService.stopLoadingMessage();
    //       this.isLoading = false;
    //       this.reset();
    //       //this.alertService.showMessage('Login', `Welcome ${user.fullName}!`, MessageSeverity.success);
    //     }, 500);
    //   },
    //   error => {

    //     this.alertService.stopLoadingMessage();

    //     if (Utilities.checkNoNetwork(error)) {
    //       //console.log(Utilities.noNetworkMessageCaption);
    //       this.alertService.showStickyMessage(Utilities.noNetworkMessageCaption, Utilities.noNetworkMessageDetail,
    //         MessageSeverity.error, error);
    //     } else {
    //       if (Utilities.checkNoNetwork(error)) {
    //         this.alertService.showStickyMessage(Utilities.noNetworkMessageCaption,
    //           Utilities.noNetworkMessageDetail,
    //           MessageSeverity.error,
    //           error);
    //       } else {
    //         let errorMessage = Utilities.findHttpResponseMessage('error_description', error);
    //         if (errorMessage) {
    //           this.alertService.showStickyMessage('Unable to login', errorMessage, MessageSeverity.error, error);
    //         } else
    //           this.alertService.showStickyMessage('Unable to login', 'An error occured, please try again later.\nError: '
    //             + error.statusText || error.status, MessageSeverity.error, error);
    //       }
    //     }

    //     setTimeout(() => {
    //       this.isLoading = false;
    //     }, 500);
    //   });
  }

  createNew() {
    console.log('add');

    this.dialogsService
      .createWallet()
      .subscribe((res: any) => {
        if (res) {
            console.log(res);
        }
      });

    this.isAdding = true;

    setTimeout(() => {
      this.isAdding = false;
      this.reset();
    }, 500);
  }

  reset() {
    this.formResetToggle = false;

    setTimeout(() => {
      this.formResetToggle = true;
    });
  }
}


