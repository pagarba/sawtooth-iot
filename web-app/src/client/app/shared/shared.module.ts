import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AppMenuComponent } from './leftmenu/leftmenu.component';
import { AppHeaderComponent } from './header/header.component';
import { AlertModule } from 'ngx-bootstrap';
import {
  MatButtonModule,
  MatListModule,
  MatIconModule,
  MatSelectModule,
  MatFormFieldModule,
  MatMenuModule } from '@angular/material';

@NgModule({
  imports: [CommonModule, RouterModule, AlertModule,
    MatButtonModule,
    MatListModule,
    MatIconModule,
    MatSelectModule,
    MatFormFieldModule,
    MatMenuModule
  ],
  declarations: [AppMenuComponent, AppHeaderComponent],
  exports: [CommonModule, FormsModule, RouterModule, AppMenuComponent, AppHeaderComponent]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: []
    };
  }
}
