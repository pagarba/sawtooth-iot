import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  moduleId: module.id,
  selector: 'confirm-dialog',
  templateUrl: 'confirm-dialog.component.html',
  styleUrls: ['confirm-dialog.component.css']
})
export class ConfirmDialogComponent {
  public title: string;
  public message: string;
  public confirmButtonTxt: string;
  constructor(public dialogRef: MatDialogRef<ConfirmDialogComponent>) {
  }
}
