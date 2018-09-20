import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [CommonModule, HttpModule, RouterModule],
  declarations: [],
  exports: [CommonModule, HttpModule, RouterModule]
})
export class BaseModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: BaseModule,
      providers: []
    };
  }
}
