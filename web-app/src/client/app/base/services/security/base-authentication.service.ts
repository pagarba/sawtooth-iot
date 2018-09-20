import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { BaseAppService } from '../application/index';
import { BaseConfigService } from '../configuration/index';
import { User } from '../../../models/user.model';
//import { Response } from '@angular/http';

@Injectable()
export abstract class BaseAuthenticationService {

  public logoutRedirectUrl: string;
  public loginRedirectUrl: string;
  public loginPageUrl: string;
  public abstract reLoginDelegate: () => void;

  constructor(appService: BaseAppService, configService: BaseConfigService, router: Router) {
    //Base
  }
  //public abstract authenticate(username: string, password: string): Observable<any>;
  public abstract redirectLogoutUser(): void;
  public abstract logout(): void;
  public abstract login(userName: string, password: string, rememberMe?: boolean): Observable<User>;
  public abstract resetPassword(email: string): Observable<{} | Response>;
  public abstract updatePassword(token: string, newPassword: string): Observable<{} | Response>;
  public abstract get isLoggedIn(): boolean;
  public abstract get isUserFirstLogin(): boolean;
  public abstract get isSessionExpired(): boolean;
  public abstract get accessTokenExpiryDate(): Date;
  public abstract get currentUser(): User;
  public abstract get refreshToken(): string;
  public abstract get accessToken(): string;
  public abstract get rememberMe(): boolean;
  public abstract get idToken(): string;
  public abstract refreshLogin(): any;
  public abstract redirectLoginUser(): void;
  public abstract reLogin(): void;
  public abstract redirectForLogin(): void;
  public abstract getLoginStatusEvent(): Observable<boolean>;
}
