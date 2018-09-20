import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { InputNumberPadDirective } from './directives/input-number-pad.directive';
import { PadNumberPipe } from './pipes/pad-number.pipe';
import {
  MatGridListModule,
  MatCardModule,
  MatInputModule,
  MatSelectModule,
  MatDialogModule,
  MatButtonModule,
  MatMenuModule,
  MatIconModule,
  MatExpansionModule,
  MatAutocompleteModule,
} from '@angular/material';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TimepickerModule, BsDropdownModule } from 'ngx-bootstrap';
import { CdkTableModule } from '@angular/cdk/table';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MatGridListModule,
    MatDialogModule,
    MatCardModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatExpansionModule,
    MatAutocompleteModule,
    NgbModule,
    TimepickerModule,
    BsDropdownModule
  ],
  entryComponents: [
  ],
  declarations: [
    InputNumberPadDirective,
    PadNumberPipe
  ],
  exports: [
    CommonModule,
    FormsModule,
    RouterModule,
    PadNumberPipe,
    CdkTableModule
  ]
})
export class ControlsModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ControlsModule,
      providers: []
    };
  }
}
