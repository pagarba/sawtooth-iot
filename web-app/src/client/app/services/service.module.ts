import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { AppService, MenuService, AuthenticationService, ConfigurationService,
          LocalStoreManager, EndpointFactory, AlertService, DeviceService } from './index';

@NgModule({
  imports: [CommonModule, HttpModule, RouterModule],
  declarations: [],
  exports: [CommonModule, HttpModule, RouterModule]
})
export class ServiceModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ServiceModule ,
      providers: [
        AppService,
        MenuService,
        AuthenticationService,
        ConfigurationService,
        LocalStoreManager,
        EndpointFactory,
        AlertService
      ]
    };
  }
}
