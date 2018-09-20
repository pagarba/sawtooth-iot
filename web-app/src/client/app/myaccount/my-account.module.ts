import { NgModule, ModuleWithProviders } from '@angular/core';
import { MyAccountComponent } from './my-account.component';
import { MyAccountRoutingModule } from './my-account-routing.module';
import { MatCardModule } from '@angular/material';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [MyAccountRoutingModule, MatCardModule, CommonModule],
  declarations: [MyAccountComponent],
  exports: [MyAccountComponent]
})
export class MyAccountModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: MyAccountModule,
      providers: []
    };
  }
}
