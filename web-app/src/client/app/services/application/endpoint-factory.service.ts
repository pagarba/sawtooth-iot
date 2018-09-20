import { Injectable, Injector } from '@angular/core';
import { Http, Headers, RequestOptions, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/observable/of';
import { BaseAuthenticationService, BaseConfigService, BaseEndpointFactory } from '../../base/index';

@Injectable()
export class EndpointFactory extends BaseEndpointFactory {

  static readonly apiVersion: string = '1';

  private readonly _loginUrl: string = '';
  private readonly _resetPasswordUrl: string = '';
  private readonly _updatePassswordUrl: string = '';

  //private get loginUrl() { return this.configService.baseUrl + this._loginUrl; }
  private get loginUrl() { return this.configService.apiUrl + this._loginUrl; }
  private get passwordResetRequestUrl() { return this.configService.apiUrl + this._resetPasswordUrl; }
  private get updatePasswordUrl() { return this.configService.apiUrl + this._updatePassswordUrl; }


  private taskPauser: Subject<any>;
  private isRefreshingLogin: boolean;

  private _authService: BaseAuthenticationService;

  private get authService() {
    if (!this._authService)
      this._authService = this.injector.get(BaseAuthenticationService);

    return this._authService;
  }

  constructor(protected http: Http, protected configService: BaseConfigService, private injector: Injector) {
    super(http, configService, injector);
  }

  getLoginEndpoint(userName: string, password: string): Observable<Response> {
    return null;
  }

  sendPassowrdResetEmail(email: string): Observable<Response> {
    return null;
  }

  sendUpdatePassword(token: string, newPassword: string): Observable<Response> {
    return null;
  }

  getRefreshLoginEndpoint(): Observable<{} | Response> {
    return null;
  }

  protected getAuthHeader(includeJsonContentType?: boolean): RequestOptions {
    return null;
  }

  protected handleError(error: any, continuation: () => Observable<any>) {  }

  private pauseTask(continuation: () => Observable<any>) {
    if (!this.taskPauser)
      this.taskPauser = new Subject();

    return this.taskPauser.switchMap(continueOp => {
      return continueOp ? continuation() : Observable.throw('session expired');
    });
  }


  private resumeTasks(continueOp: boolean) {
    setTimeout(() => {
      if (this.taskPauser) {
        this.taskPauser.next(continueOp);
        this.taskPauser.complete();
        this.taskPauser = null;
      }
    }, 1);
  }
}
