import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, NavigationExtras } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Http, Headers, RequestOptions, Response, ResponseOptions, URLSearchParams } from '@angular/http';
import { Subject } from 'rxjs/Subject';
import { BaseAppService, BaseConfigService, BaseAuthenticationService, BaseEndpointFactory } from '../../base/index';
import { LocalStoreManager, DBkeys } from '../application/index';
import { User } from '../../models/index';
import { Utilities } from '../application/utilities';
import { JwtHelper } from './jwt-helper';

@Injectable()
export class AuthenticationService extends BaseAuthenticationService {

  public reLoginDelegate: () => void;
  private previousIsLoggedInCheck = false;
  //private _loginStatus = new Subject<boolean>();
  private _loginStatus = new Subject<boolean>();

  constructor(public appService: BaseAppService, public configService: BaseConfigService, public router: Router,
                private localStorage: LocalStoreManager, private endpointFactory: BaseEndpointFactory) {
    super(appService, configService, router);
    this.logoutRedirectUrl = this.configService.logoutUrl;
    this.loginRedirectUrl = this.configService.homeUrl;
    this.loginPageUrl = this.configService.loginPageUrl;
    //this.isLoggedIn = true;
  }

  //authenticate(username: string, password: string) {this.router.navigate(['/']);}

  logout(): void {
  }

  get isLoggedIn(): boolean {
    return this.currentUser !== null;
  }

  get isUserFirstLogin(): boolean {
    return false;
  }

  get isSessionExpired(): boolean {

    return false;
  }

  get accessTokenExpiryDate(): Date {
    return null;
  }

  get rememberMe(): boolean {
    return true;
  }

  get currentUser(): User {
    let user = this.localStorage.getDataObject<User>(DBkeys.CURRENT_USER);
    this.reevaluateLoginStatus(user);

    return user;
  }

  get userPermissions(): string[] {
    return null;
  }

  get accessToken(): string {
    this.reevaluateLoginStatus();
    return this.localStorage.getData(DBkeys.ACCESS_TOKEN);
  }

  getLoginStatusEvent(): Observable<boolean> {
    //console.log('getLoginStatusEvent', this._loginStatus.asObservable());
    return this._loginStatus.asObservable();
  }

  redirectLogoutUser() {
    let redirect = this.logoutRedirectUrl ? this.logoutRedirectUrl : this.loginPageUrl;
    this.logoutRedirectUrl = null;
    this.router.navigate([redirect]);
  }

  login(userName: string, password: string, rememberMe?: boolean) {

    if (this.isLoggedIn) {
      this.logout();
    }

    return this.endpointFactory.getLoginEndpoint(userName, password)
      .map((response: Response) => this.processLoginResponse(response, rememberMe));
  }

  resetPassword(email: string) {

    if (this.isLoggedIn) {
      this.logout();
    }

    return this.endpointFactory.sendPassowrdResetEmail(email);
  }

  updatePassword(token: string, newPassword: string) {
    return this.endpointFactory.sendUpdatePassword(token, newPassword);
  }

  redirectForLogin() {
    this.loginRedirectUrl = this.router.url;
    this.router.navigate([this.loginPageUrl]);
  }

  redirectLoginUser(): void {
    let redirect = this.loginRedirectUrl && this.loginRedirectUrl !== '/'
                  && this.loginRedirectUrl !== this.configService.homeUrl ? this.loginRedirectUrl : this.configService.homeUrl;
    this.loginRedirectUrl = null;


    let urlParamsAndFragment = Utilities.splitInTwo(redirect, '#');
    let urlAndParams = Utilities.splitInTwo(urlParamsAndFragment.firstPart, '?');

    let navigationExtras: NavigationExtras = {
      fragment: urlParamsAndFragment.secondPart,
      queryParams: Utilities.getQueryParamsFromString(urlAndParams.secondPart),
      queryParamsHandling: 'merge'
    };

    this.router.navigate([urlAndParams.firstPart], navigationExtras);
  }

  reLogin() {
    this.localStorage.deleteData(DBkeys.TOKEN_EXPIRES_IN);

    if (this.reLoginDelegate) {
      this.reLoginDelegate();
    } else {
      this.redirectForLogin();
    }
  }

  refreshLogin() {
    return this.endpointFactory.getRefreshLoginEndpoint()
      .map((response: Response) => this.processLoginResponse(response, this.rememberMe));
  }

  private processLoginResponse(response: Response, rememberMe: boolean): any {
    return null;
  }

  private saveUserDetails(user: User, permissions: string[], accessToken: string, idToken: string,
                              refreshToken: string, expiresIn: Date, rememberMe: boolean) {
  }

  get refreshToken(): string {

    return null;
  }

  get idToken(): string {
    return null;
  }

  private reevaluateLoginStatus(currentUser?: User) {
  }
}
