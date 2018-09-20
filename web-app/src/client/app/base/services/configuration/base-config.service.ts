import { Injectable } from '@angular/core';

@Injectable()
export abstract class BaseConfigService {
  public static readonly appVersion: string = '1.0.0';
  public loginPageUrl: string;
  public homeUrl: string;
  public logoutUrl: string;
  public baseUrl: string;
  public apiUrl: string;
  public helpText: string;
  public addDeviceUrl: string;
  public getDevicesUrl: string;
  public getDeviceDetailUrl: string;
  public googleAnalitycsId: string;
  public abstract clearLocalChanges(): void;
  public abstract import(jsonValue: string): void;
}
