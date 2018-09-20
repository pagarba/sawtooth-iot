import { Component, OnInit, OnChanges, ViewChild, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { User } from '../models/index';
import { LocalStoreManager, DBkeys, ResponsiveService, DeviceService } from '../services/index';
import { BaseAlertService } from '../base/index';
import { MessageSeverity } from '../services/alert/index';
import { DataSource } from '@angular/cdk/table';
import { MatTableDataSource, MatSort } from '@angular/material';
import { DeviceModel, DeviceType } from '../models/index';

@Component({
  moduleId: module.id,
  selector: 'device-detail',
  templateUrl: 'device-detail.component.html',
  styleUrls: ['device-detail.component.css'],
})

export class DeviceDetailComponent implements OnInit {

    currentDevice = new DeviceModel();
    responseData: any;
    deviceTypes: DeviceType[] = [
        {deviceTypeId: 1, deviceTypeName: 'Gun'},
        {deviceTypeId: 2, deviceTypeName: 'Scope'},
        {deviceTypeId: 3, deviceTypeName: 'Drone'},
        {deviceTypeId: 4, deviceTypeName: 'Other'}
      ];

    constructor(private route: ActivatedRoute, private deviceService: DeviceService,
                private spinnerService: Ng4LoadingSpinnerService) {}

    ngOnInit() {
        let deviceId: string;

        this.route.params.subscribe(params => {
            deviceId = params['id'];

            console.log('id is', deviceId);
            // let devices: DeviceModel[] = [
            //     {deviceId: '14', deviceName: 'My new gun', deviceKey: '123124', type: { deviceTypeId: 1, deviceTypeName: 'Gun'} },
            //     {deviceId: '234', deviceName: 'Drone #12', deviceKey: '94773', type: { deviceTypeId: 3, deviceTypeName: 'Drone'}},
            //     {deviceId: '342', deviceName: 'My old gun', deviceKey: '49878234', type: { deviceTypeId: 1, deviceTypeName: 'Gun'}},
            //     {deviceId: '434', deviceName: 'My old gun #12', deviceKey: '49878234', type: { deviceTypeId: 1, deviceTypeName: 'Gun'}},
            //     {deviceId: '54', deviceName: 'new scope', deviceKey: '874647', type: {deviceTypeId: 2, deviceTypeName: 'Scope'}},
            //   ];

            //   this.currentDevice = devices.find(x => x.deviceId === deviceId.toString());
            this.getDeviceDetail(deviceId);

          });
    }

    getDeviceDetail(deviceId: string) {
        let devices = [
            { 'DeviceID': '27687kjawkjy8dd', 'DeviceKey': 'ASDLKJ299', 'DeviceName': 'new gun 1280',
            'DeviceTypeID': 1 },
            { 'DeviceID': 'jd228fgkjh377il', 'DeviceKey': 'K2736JDJD', 'DeviceName': 'Scope',
            'DeviceTypeID': 2 },
            { 'DeviceID': 'i83fljh838fljhs', 'DeviceKey': 'jja99h3fh', 'DeviceName': 'Drone G2',
            'DeviceTypeID': 3 },
            { 'DeviceID': '38108hfh83f899fi', 'DeviceKey': 'KDJSI28dj', 'DeviceName': 'Gun K12',
            'DeviceTypeID': 1 },
            { 'DeviceID': 'FLKH8oe8of2fjhhl', 'DeviceKey': '8jhdo8dlk', 'DeviceName': 'Phone',
            'DeviceTypeID': 4 },
            { 'DeviceID': 'aslkfjflkj299fpkj', 'DeviceKey': 'djef2888', 'DeviceName': 'Scope 8d',
            'DeviceTypeID': 2 },
            { 'DeviceID': 'aslkfjLFALJS9SFKL', 'DeviceKey': 'slfhl98uj', 'DeviceName': 'Drone 123lj',
            'DeviceTypeID': 3 }
        ];

        let response = devices.find(x => x.DeviceID === deviceId);

        if(response) {
            this.onDeviceDetailLoadSuccessful(response);
        }
    }

    private onDeviceDetailLoadSuccessful(response: any) {
        console.log('passed', response);
        this.responseData = response;

        if (this.responseData) {

            console.log('passed data is', this.responseData.DeviceID);

            this.currentDevice.deviceId = this.responseData.DeviceID;
            this.currentDevice.deviceKey = this.responseData.DeviceKey;
            this.currentDevice.deviceName = this.responseData.DeviceName;

            let type = this.deviceTypes.find(t => t.deviceTypeId === this.responseData.DeviceTypeID);
            if (type) {
                this.currentDevice.type = type;
            } else {
                this.currentDevice.type.deviceTypeName = 'Default';
                this.currentDevice.type.deviceTypeId = -1;
            }
        }
    }

    private onDeviceDetailLoadFailed(error: any) {
        console.log('failed', error);
        this.responseData = null;
        //console.log(error);
      }
}
