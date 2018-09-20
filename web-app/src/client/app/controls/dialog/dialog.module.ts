import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { WalletDialogComponent } from './wallet-dialog/create-wallet-dialog.component';
import { DialogsService } from './dialog.service';
import { MatButtonModule, MatDialogModule } from '@angular/material';
@NgModule({
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule
  ],
  declarations: [
    ConfirmDialogComponent,
    WalletDialogComponent
  ],
  exports: [
    ConfirmDialogComponent,
  ],
  entryComponents: [
    ConfirmDialogComponent,
    WalletDialogComponent
  ],
  providers: [DialogsService]
})
export class DialogsModule { }
