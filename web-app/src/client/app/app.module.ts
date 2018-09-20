import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule, DatePipe, APP_BASE_HREF } from '@angular/common';
import { HttpModule } from '@angular/http';
import { TimepickerModule, BsDropdownModule  } from 'ngx-bootstrap';
import { ToastyModule } from 'ng2-toasty';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { PdfmakeModule } from 'ng-pdf-make';
// import { Angulartics2Module } from 'angulartics2';
// import { Angulartics2GoogleTagManager } from 'angulartics2/gtm';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ServiceModule } from './services/service.module';
import {
  BaseAppService, BaseMenuService, BaseAuthenticationService,
  BaseConfigService, BaseEndpointFactory, BaseAlertService
} from './base/index';
import {
  AppService,
  MenuService,
  AuthenticationService,
  AuthGuardService,
  ConfigurationService,
  EndpointFactory,
  AlertService,
  ResponsiveService,
  DeviceService
} from './services/index';
import { SharedModule } from './shared/shared.module';
import { ControlsModule } from './controls/controls.module';
import {
  MatCardModule, MatButtonModule, MatInputModule, MatFormFieldModule, MatCheckboxModule,
  MatRadioModule, MatSelectModule, MatGridListModule, MatDialogModule, MatSidenavModule,
  MatIconModule, MatToolbarModule
} from '@angular/material';
import { LoginComponent } from './login/login.component';
import { ResetPasswordComponent } from './login/reset-password.component';
import { ForgotPasswordComponent } from './login/forgot-password.component';
import { LogintRoutingModule } from './login/login-routing.module';
import { MyAccountModule } from './myaccount/my-account.module';
import { DeviceModule } from './device/device.module';
import { DialogsModule } from './controls/dialog/dialog.module';
import * as smoothscroll from 'smoothscroll-polyfill';
import * as keyboardeventKey from 'keyboardevent-key-polyfill';

let menuProvider = { provide: BaseMenuService, useClass: MenuService };
let appProvider = { provide: BaseAppService, useClass: AppService };
let authService = { provide: BaseAuthenticationService, useClass: AuthenticationService };
let configProvider = { provide: BaseConfigService, useClass: ConfigurationService };
let endpointFactoryProvider = { provide: BaseEndpointFactory, useClass: EndpointFactory };
let alertServiceProvider = { provide: BaseAlertService, useClass: AlertService };
let responsiveService = { provide: ResponsiveService, useClass: ResponsiveService };
let deviceService = { provide: DeviceService, useClass: DeviceService };

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    DialogsModule,
    ToastyModule.forRoot(),
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatDialogModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatRadioModule,
    MatGridListModule,
    MatSelectModule,
    MatSidenavModule,
    ServiceModule.forRoot(),
    MatIconModule,
    MatToolbarModule,
    TimepickerModule.forRoot(),
    BsDropdownModule.forRoot(),
    Ng4LoadingSpinnerModule.forRoot(),
    SharedModule.forRoot(),
    ControlsModule.forRoot(),
    LogintRoutingModule,
    MyAccountModule,
    DeviceModule,
    PdfmakeModule,
    // Angulartics2Module.forRoot([ Angulartics2GoogleTagManager ])
  ],
  //, MyAccountModule,
  declarations: [
    AppComponent,
    LoginComponent,
    ResetPasswordComponent,
    ForgotPasswordComponent,
  ],
  providers: [{ provide: APP_BASE_HREF, useValue: '<%= APP_BASE %>' }, appProvider, menuProvider, DatePipe,
    authService, configProvider, endpointFactoryProvider, alertServiceProvider, deviceService,
    AuthGuardService, responsiveService],
  bootstrap: [AppComponent]

})
export class AppModule {
  constructor() {
    smoothscroll.polyfill();
    keyboardeventKey.polyfill();
  }
}

