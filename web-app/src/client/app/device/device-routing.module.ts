import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllDevicesComponent } from './all-devices.component';
import { DeviceDetailComponent } from './device-detail.component';
import { AuthGuardService } from './../services/security/authentication-guard.service';

let routes: Routes = [
  {
    path: 'mydevices',
    redirectTo: 'device/all',
    pathMatch: 'full',
    canActivate: [AuthGuardService],
    data: { title: 'My Devices' }
  },
  {
     path: 'devices/all',
     component: AllDevicesComponent,
     canActivate: [AuthGuardService],
     data: { title: 'All Devices' }
  },
  {
     path: 'device',
     component: DeviceDetailComponent,
     canActivate: [AuthGuardService],
     data: { title: 'Device Detail' }
  },
  {
     path: 'device/:id',
     component: DeviceDetailComponent,
     canActivate: [AuthGuardService],
     data: { title: 'Device Detail' }
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class DeviceRoutingModule { }
