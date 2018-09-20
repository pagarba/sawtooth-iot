import { Injectable } from '@angular/core';
import { BaseConfigService } from '../../base/index';
import { DBkeys, Utilities, LocalStoreManager } from '../index';

type UserConfiguration = {
  language: string,
  homeUrl: string,
  theme: string,
  showDashboardStatistics: boolean,
  showDashboardNotifications: boolean,
  showDashboardTodo: boolean,
  showDashboardBanner: boolean
};

@Injectable()
export class ConfigurationService extends BaseConfigService {

  private _language: string = null;
  private _homeUrl: string = null;
  private _theme: string = null;
  private _showDashboardStatistics: boolean = null;
  private _showDashboardNotifications: boolean = null;
  private _showDashboardTodo: boolean = null;
  private _showDashboardBanner: boolean = null;
  //public baseUrl: string = Utilities.baseUrl().replace(/\/$/, '');

  constructor(private localStorage: LocalStoreManager) {
    super();
    this.loginPageUrl = '/login';
    this.homeUrl = '/';
    this.baseUrl = Utilities.baseUrl().replace(/\/$/, '');
    let jsonAppConfig: any = window.sessionStorage.getItem('appConfig');
    let appConfig: any = '';
    if (jsonAppConfig) {
      appConfig = JSON.parse(jsonAppConfig);
      this.setApiEndPoints(appConfig);
      this.helpText = appConfig.helpText;
      this.googleAnalitycsId = appConfig.googleAnalitycsId;
    }
  }

  public clearLocalChanges() {
    this._language = null;
    this._homeUrl = null;
    this._theme = null;
    this._showDashboardStatistics = null;
    this._showDashboardNotifications = null;
    this._showDashboardTodo = null;
    this._showDashboardBanner = null;

    this.localStorage.deleteData(DBkeys.LANGUAGE);
    this.localStorage.deleteData(DBkeys.HOME_URL);
    this.localStorage.deleteData(DBkeys.THEME);
    this.localStorage.deleteData(DBkeys.SHOW_DASHBOARD_STATISTICS);
    this.localStorage.deleteData(DBkeys.SHOW_DASHBOARD_NOTIFICATIONS);
    this.localStorage.deleteData(DBkeys.SHOW_DASHBOARD_TODO);
    this.localStorage.deleteData(DBkeys.SHOW_DASHBOARD_BANNER);

    //this.resetLanguage();
  }

  import(jsonValue: string) {

    this.clearLocalChanges();

    if (!jsonValue)
      return;

    let importValue: UserConfiguration = Utilities.JSonTryParse(jsonValue);

    //if (importValue.language !== null)
    //  this.language = importValue.language;

    if (importValue.homeUrl !== null)
      this.homeUrl = importValue.homeUrl;

    //if (importValue.theme !== null)
    //  this.theme = importValue.theme;

    //if (importValue.showDashboardStatistics !== null)
    //  this.showDashboardStatistics = importValue.showDashboardStatistics;

    //if (importValue.showDashboardNotifications !== null)
    //  this.showDashboardNotifications = importValue.showDashboardNotifications;

    //if (importValue.showDashboardTodo !== null)
    //  this.showDashboardTodo = importValue.showDashboardTodo;

    //if (importValue.showDashboardBanner !== null)
    //  this.showDashboardBanner = importValue.showDashboardBanner;
  }

  setApiEndPoints(appConfig: any) {
    this.apiUrl = appConfig.apiUrl;
    this.getDevicesUrl = this.apiUrl + appConfig.getDevicesUrl;
    this.getDeviceDetailUrl = this.apiUrl + appConfig.getDeviceDetailUrl;
    this.addDeviceUrl = this.apiUrl + appConfig.addDeviceUrl;
    //this.timecardUrl = this.apiUrl + appConfig.timeCardUrl;
  }

  //set language(value: string) {
  //  this._language = value;
  //  this.saveToLocalStore(value, DBkeys.LANGUAGE);
  //  this.translationService.changeLanguage(value);
  //}
  //get language() {
  //  if (this._language !== null)
  //    return this._language;

  //  return ConfigurationService.defaultLanguage;
  //}

  private saveToLocalStore(data: any, key: string) {
    setTimeout(() => this.localStorage.savePermanentData(data, key));
  }
}
