import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { DBTrip } from '../../../../models/DBTrips';
import { MatSnackBar } from '@angular/material';

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
  
  constructor(private _snackBar: MatSnackBar) { }

  ngOnInit() {
  }


  doAll(trip) {
    this.openSnackBar('Trip Deleted', 'Undo');
    this.onDelete(trip);
  }
  openSnackBar(message: string, action: string) {
    let snackBarRef = this._snackBar.open(message, action, {
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

}
