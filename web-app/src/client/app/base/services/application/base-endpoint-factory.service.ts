import { Injectable, Injector } from '@angular/core';
import { Http, RequestOptions, Response } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { BaseConfigService } from '../configuration/index';

@Injectable()
export abstract class BaseEndpointFactory {
  constructor(http: Http, configService: BaseConfigService, injector: Injector) {
    //Base
  }

  public abstract getLoginEndpoint(userName: string, password: string): Observable<Response>;
  public abstract sendPassowrdResetEmail(email: string): Observable<Response>;
  public abstract sendUpdatePassword(token: string, password: string): Observable<Response>;
  public abstract getRefreshLoginEndpoint(): Observable<{} | Response>;
  protected  abstract getAuthHeader(includeJsonContentType?: boolean): RequestOptions;
}
