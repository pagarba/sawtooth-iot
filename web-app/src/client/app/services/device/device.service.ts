import { Injectable, Injector } from '@angular/core';
import { Http, Headers, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { EndpointFactory, ConfigurationService } from '../index';
import { DeviceModel, NewDeviceModel } from '../../models/index';
import { DatePipe } from '@angular/common';

@Injectable()
export class DeviceService extends EndpointFactory {

  get devicesUrl() { return this.configService.getDevicesUrl; }
  get deviceDetailUrl() { return this.configService.getDeviceDetailUrl; }
  get addDeviceUrl() { return this.configService.addDeviceUrl; }

  constructor(http: Http, configService: ConfigurationService, injector: Injector, public datePipe: DatePipe) {
    super(http, configService, injector);
  }

  getAllDevices(publicKey: string): Observable<{} | Response> {
    return null;
  }

  getDeviceDetail(deviceId: string): Observable<{} | Response> {
    return null;
  }

  addDevice(device: NewDeviceModel): Observable<{} | Response> {

    return null;
  }

  protected getHeader(includeJsonContentType?: boolean): RequestOptions {
    let header = new Headers();

    if (includeJsonContentType)
    header.append('Content-Type', 'application/json');

    return new RequestOptions({ headers: header });
  }
}

