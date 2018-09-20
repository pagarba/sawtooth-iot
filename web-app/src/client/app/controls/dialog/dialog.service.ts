import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { MatDialogRef, MatDialog } from '@angular/material';
import { WalletDialogComponent } from './wallet-dialog/create-wallet-dialog.component';

@Injectable()
export class DialogsService {

  constructor(private dialog: MatDialog) { }

  public confirm(title: string, message: string, confirmButtonTxt: string = 'Yes'): Observable<boolean> {

    let dialogRef: MatDialogRef<ConfirmDialogComponent> = this.dialog.open(ConfirmDialogComponent, {
      autoFocus: false,
      width: '700px'
    });

    dialogRef.componentInstance.title = title;
    dialogRef.componentInstance.message = message;
    dialogRef.componentInstance.confirmButtonTxt = confirmButtonTxt;
    return dialogRef.afterClosed();
  }

  public createWallet(): Observable<boolean> {
    return this.dialog.open(WalletDialogComponent, {
      autoFocus: false,
      width: '700px'
    }).afterClosed();
  }
}
