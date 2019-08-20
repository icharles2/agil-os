import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { DBTrip } from '../../../../models/DBTrips';

@Component({
  selector: 'app-trip-item',
  templateUrl: './trip-item.component.html',
  styleUrls: ['./trip-item.component.css'],
})
export class TripItemComponent implements OnInit {
  @Input() trip: DBTrip;
  @Output() deleteTrip: EventEmitter<DBTrip> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onDelete(trip) {
    this.deleteTrip.emit(trip);
  }

}
