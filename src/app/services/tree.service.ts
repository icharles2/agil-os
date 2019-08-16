import { Injectable } from '@angular/core';
import { Trip } from '../models/Trips';

@Injectable({
  providedIn: 'root',
})

export class DateService {

  constructor() { }
  trip: Trip;

  ngOnInit() {
    console.log('trip model', this.trip);
  }

  setPriceRange() {

  }

}
