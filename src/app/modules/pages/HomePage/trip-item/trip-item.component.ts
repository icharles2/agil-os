import { Component, OnInit, Input, EventEmitter, Output, Inject } from '@angular/core';
import { DBTrip } from '../../../../models/DBTrips';
import { MatSnackBar, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

export interface DeleteData {
  answer: boolean;
}

@Component({
  selector: 'app-trip-item',
  templateUrl: './trip-item.component.html',
  styleUrls: ['./trip-item.component.css'],
})
export class TripItemComponent implements OnInit {
  @Input() trip: DBTrip;
  @Output() deleteTrip: EventEmitter<DBTrip> = new EventEmitter();
  @Output() approveTrip: EventEmitter<DBTrip> = new EventEmitter();
  @Output() denyTrip: EventEmitter<DBTrip> = new EventEmitter();

  answer: boolean;

  constructor(
    private _snackBar: MatSnackBar,
    public dialog: MatDialog,
    ) { }

  ngOnInit() {

  }

  doAll(trip) {
    this.openSnackBar('Trip Deleted', 'Undo');
    this.onDelete(trip);
  }
  openSnackBar(message: string, action: string) {
    const snackBarRef = this._snackBar.open(message, action, {
      duration: 3000,
    });
    snackBarRef.afterDismissed().subscribe(() => {
      console.log('The snackbar');
    });

    snackBarRef.onAction().subscribe(() => {

      console.log('The snackbar action was triggered');
    });

  }

  onApprove(trip) {
    this.approveTrip.emit(trip);
  }

  onDeny(trip) {
    this.denyTrip.emit(trip);
  }

  onDelete(trip) {
    this.deleteTrip.emit(trip);
  }

  openDialog(trip): void {
    const dialogRef = this.dialog.open(DialogDeleteDialog, {
      width: '350px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      if (result) {
        this.doAll(trip);
      }
    });
  }

}

@Component({
  selector: 'delete-dialog',
  templateUrl: '../dialogs/delete.html',
})
export class DialogDeleteDialog {

  constructor(
    public dialogRef: MatDialogRef<DialogDeleteDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DeleteData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
