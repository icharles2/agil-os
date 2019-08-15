import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BudgetService } from '../../../../services/budget.service';
import { DateService } from '../../../../services/date.service';
import { Price } from '../../../../models/Prices';
import { Trip } from '../../../../models/Trips';

@Component({
  selector: 'app-trip',
  templateUrl: './trip.component.html',
  styleUrls: ['./trip.component.css'],
})
export class TripComponent implements OnInit {
  trips: Trip;
  prices: Price;
  tripLength: number;
  daysUntilTrip: number;

  constructor(
    private budget: BudgetService,
    private dates: DateService,
    ) {
    this.trips = {
      title: "Renee's Bachelorette",
      origin: 'New Orleans',
      destination: 'Las Vegas',
      transpo: 'car',
      lodging: 'hotel',
      departure: this.dates.parseDateAPI('08/17/2019'),
      return: this.dates.parseDateAPI('08/20/2019'),
      quality: 1,
      rental: true,
    };

    this.tripLength = this.dates.getTripLength(this.trips['departure'], this.trips['return']);

    this.prices = {};

    this.budget.getTripPicture(this.trips['destination'])
      .subscribe((data) => {
        this.trips['cityImg'] = data;
        console.log(data);
      });

    this.budget.getMealsPrice(this.trips['destination'], this.trips['quality'])
      .subscribe((data) => {
        console.log('meals', data);
        this.prices['meals'] = [data['average'], data['low'], data['high']];
        this.prices['mealsTotal'] = data['average'] * this.tripLength * 3;
        this.prices['mealsQ'] = this.trips['quality'];
      });

    if (this.trips['transpo'] === 'flight') {
      this.budget.getFlightPrice(
          this.trips['quality'],
          this.trips['origin'],
          this.trips['destination'],
          this.trips['departure'])
        .subscribe((data) => {
          console.log('flight1', data);
          this.prices['flight1'] =  [data['average'], data['low'], data['high']];
          this.prices['flight1Avg'] = data['average'];
          this.prices['flightQ'] = this.trips['quality'];
        });
      this.budget.getFlightPrice(
          this.trips['quality'],
          this.trips['destination'],
          this.trips['origin'],
          this.trips['return'])
        .subscribe((data) => {
          console.log('flight2', data);
          this.prices['flight2'] = [data['average'], data['low'], data['high']];
          this.prices['flight2Avg'] = data['average'];
        });
    }

    if (this.trips['transpo'] === 'car') {
      this.budget.getGasPrice(this.trips['origin'], this.trips['destination'],
        ).subscribe((data) => {
          console.log('gas', data);
          // should also make use of distance and time
          this.prices['gas'] = Number(data['gasPerGallon'].toFixed(2));
          this.prices['gasTotal'] = data['distancePrice'];
          this.trips['distance'] = data['distance'];
        });
    }

    if (this.trips['rental']) {
      this.budget.getRentalCarPrice(
          this.trips['origin'],
          this.trips['departure'],
          this.trips['return'])
          .subscribe((data) => {
            console.log('rental', data);
            this.prices['rental'] = [data['average'], data['low'], data['high']];
          });
    }

    if (this.trips['lodging'] === 'hotel') {
      this.budget.getHotelPrice(
          this.trips['quality'],
          this.trips['destination'],
          this.trips['departure'],
          this.trips['return'])
          .subscribe((data) => {
            console.log('hotel', data);
            this.prices['hotel'] = [data['average'], data['low'], data['high']];
            this.prices['hotelQ'] = this.trips['quality'];
          });
    }
  }

  ngOnInit() {

  }

}
