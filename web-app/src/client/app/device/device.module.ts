import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  MatInputModule,
  MatGridListModule,
  MatButtonModule,
  MatDialogModule,
  MatIconModule,
  MatCardModule,
  MatListModule,
  MatFormFieldModule,
  MatExpansionModule,
  MatSelectModule,
  MatOptionModule,
  MatTableModule,
  MatSortModule
} from '@angular/material';
import { AllDevicesComponent } from './all-devices.component';
import { DeviceDetailComponent } from './device-detail.component';
import { DeviceRoutingModule } from './device-routing.module';

@NgModule({
  imports: [
    CommonModule,
    MatInputModule,
    FormsModule,
    DeviceRoutingModule,
    MatGridListModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatCardModule,
    MatListModule,
    MatFormFieldModule,
    MatExpansionModule,
    MatSelectModule,
    MatOptionModule,
    MatTableModule,
    MatSortModule,
    MatGridListModule
  ],
  declarations: [AllDevicesComponent, DeviceDetailComponent],
  exports: [AllDevicesComponent, DeviceDetailComponent]
})
export class DeviceModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: DeviceModule,
      providers: []
    };
  }
}
