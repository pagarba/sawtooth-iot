import { Component, OnInit, OnChanges, ViewChild, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { User } from '../models/index';
import { LocalStoreManager, DBkeys, ResponsiveService, DeviceService } from '../services/index';
import { BaseAlertService } from '../base/index';
import { MessageSeverity } from '../services/alert/index';
import { DataSource } from '@angular/cdk/table';
import { MatTableDataSource, MatSort } from '@angular/material';
import { DeviceModel, DeviceType, NewDeviceModel } from '../models/index';

@Component({
  moduleId: module.id,
  selector: 'all-devices',
  templateUrl: 'all-devices.component.html',
  styleUrls: ['all-devices.component.css'],
})
export class AllDevicesComponent implements OnInit, AfterViewInit {
  newDevice = new NewDeviceModel();
  allDevices: DeviceModel[] = [];
  responseData: any;
  isMobile: boolean;
  panelOpenState = false;
  allDevicesOpenState = true;
  isLoading = false;
  selectedValue: string;
  device: DeviceModel;
  selectedDeviceType: number;
  deviceTypes: DeviceType[] = [
    {deviceTypeId: 1, deviceTypeName: 'Gun'},
    {deviceTypeId: 2, deviceTypeName: 'Scope'},
    {deviceTypeId: 3, deviceTypeName: 'Drone'},
    {deviceTypeId: 4, deviceTypeName: 'Other'}
  ];

  displayedColumns = ['id', 'name', 'key', 'type'];
  dataSource: any;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private localStorage: LocalStoreManager, private alertService: BaseAlertService,
              private spinnerService: Ng4LoadingSpinnerService, private responsive: ResponsiveService,
              private router: Router, private deviceService: DeviceService) {
  }

  ngOnInit() {
    let currentUser = this.localStorage.getDataObject<User>(DBkeys.CURRENT_USER);
    this.allDevicesOpenState = true;
    this.isMobile = this.responsive.isMobile();
    this.responsive.$resizeEvent
      .subscribe(() => {
        this.isMobile = this.responsive.isMobile();
      });
    this.getAllDevices('mpJ2WnKuGAppB5QeAMNNd6huZcw15epFSD');
  }

  getAllDevices(publicKey: string) {
    let response = [
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

    this.onDevicesLoadSuccessful(response);
  }

  ngAfterViewInit() {}    

  add() {
    this.isLoading = true;

    let selectedType = this.deviceTypes.find(x => x.deviceTypeId === this.selectedDeviceType);

    this.newDevice.DeviceType = selectedType.deviceTypeName.toLocaleLowerCase();

    console.log('key is ', this.newDevice.DeviceKey);
    console.log('name is ', this.newDevice.DeviceName);
    console.log('type asdasd name is ', this.selectedDeviceType);

    this.newDevice.Address = 'mpJ2WnKuGAppB5QeAMNNd6huZcw15epFSD';

    this.spinnerService.show();

    this.alertService.showStickyMessage('Device added!', 'Successfully added your new device.', MessageSeverity.info);

    setTimeout(() => {
      this.isLoading = false;
      this.allDevicesOpenState = true;
      this.alertService.stopLoadingMessage();
      this.newDevice.DeviceKey = null;
      this.newDevice.DeviceName = null;
      this.newDevice.DeviceType = null;
      this.spinnerService.hide();
    }, 1000);
  }

  rowClicked(row: any): void {
    console.log(row);
    this.router.navigate(['device/' + row.deviceId]);
  }

  private onDevicesLoadSuccessful(response: any) {
    console.log('passed', response);

    this.responseData = response;

    if (this.responseData) {

      for (let d of this.responseData) {
        let type = this.deviceTypes.find(t => t.deviceTypeId === d.DeviceTypeID);
        console.log('type is', type);
        console.log('device is', d);
        let device = new DeviceModel();
        if (type) {
          device.type = type;
        } else {

          device.type.deviceTypeName = 'Default';
          device.type.deviceTypeId = -1;
        }

        console.log('device is', d);
        device.deviceId = d.DeviceID;
        device.deviceName = d.DeviceName;
        device.deviceKey = d.DeviceKey;

        this.allDevices.push(device);
      }

      console.log('devices are', this.allDevices);

      this.dataSource = new MatTableDataSource(this.allDevices);
      this.dataSource.sort = this.sort;
    }
  }

  private onDevicesLoadFailed(error: any) {
    console.log('failed', error);
    this.responseData = null;
  }

  private onDevicesAddedSuccessful(response: any) {
    console.log('passed', response);
  }

  private onDevicesAddFailed(error: any) {
    console.log('failed', error);
  }
}
