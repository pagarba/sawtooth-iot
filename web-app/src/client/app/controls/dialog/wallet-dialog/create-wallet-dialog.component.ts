import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  moduleId: module.id,
  selector: 'wallet-dialog',
  templateUrl: 'create-wallet-dialog.component.html',
  styleUrls: ['create-wallet-dialog.component.css']
})
export class WalletDialogComponent {
  constructor(public dialogRef: MatDialogRef<WalletDialogComponent>) {
  }
}
