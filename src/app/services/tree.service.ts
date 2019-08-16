import { Injectable } from '@angular/core';
import { Trip } from '../models/Trips';
import { FormControl } from '@angular/forms';
import { DateService } from './date.service';

@Injectable({
  providedIn: 'root',
})

export class TreeService {

  destination = new FormControl();
  tripName = new FormControl();
  departureDate = new FormControl();
  returnDate = new FormControl();

  constructor(private dates: DateService) { }
  trip: Trip;
  ngOnInit() {
    console.log('trip model', this.trip);
  }
// Functions in order

  setDestination(obj) {
    console.log('destination', this.destination.value);
    obj.origin = 'New Orleans';
    obj.destination = this.destination.value;
  }

  setTripName(obj) {
    console.log('tripName', this.tripName.value);
    obj.title = this.tripName.value;
  }

  setDeparture(obj) {
    const departureDate = this.dates.parseDateAPI(this.departureDate.value);
    console.log('departureDate', departureDate);
    obj.departure = departureDate;
  }

  setReturn(obj) {
    const returnDate = this.dates.parseDateAPI(this.returnDate.value);
    console.log('return date', returnDate);
    obj.return = returnDate;
  }
  setPriceRange(obj, val: number) {
    console.log('priceRange', val);
    obj.quality = val;
  }

  setTransportation(obj, val: string) {
    console.log('transpoMethod', val);
    obj.transpo = val;
  }

  setLodging(obj, val: string) {
    console.log('lodgingMethod', val);
    obj.lodging = val;
  }
}
