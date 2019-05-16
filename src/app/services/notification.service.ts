import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class NotificationService {
  public constructor(public snackBar: MatSnackBar) { }
  public showNotification(message: string): void {
    this.snackBar.open(message, 'x', {
      duration: 2000,
    });
  }
}
