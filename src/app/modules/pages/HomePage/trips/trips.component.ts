import { Component, OnInit } from '@angular/core';
import { PostService } from '../../../../services/posts.service';
import { GetService } from '../../../../services/get.service';
import { DateService } from '../../../../services/date.service';
import { DBTrip } from '../../../../models/DBTrips';
import * as _ from 'lodash';

@Component({
  selector: 'app-trips',
  templateUrl: './trips.component.html',
  styleUrls: ['./trips.component.css'],
})
export class TripsComponent implements OnInit {
  trips;
  prices;
 
  // hardcoded user until we have the ability to save users with code
  email: string = 'lisaberteausmith@gmail.com';

  constructor(
    private post: PostService,
    private get: GetService,
    private date: DateService,
  ) {}

  ngOnInit() {
    this.prices = [];
    this.get.getTripsByUser(this.email)
    .subscribe((trips) => {
      this.trips = trips;
      
      console.log(trips);
      this.trips.forEach((trip) => {
        this.get.getTripPrices(trip)
        .subscribe((prices) => {
          this.prices.push(prices);
        //  for (let i = 0; i < this.prices.length; i + 1) {
        //   pricesList.push({
        //     trip: this.prices[i].trips.id,
        //     category: this.prices[i].category.name,
        //     prices: this.prices[i],
        //   });

        //  var pricesList = this.prices.reduce((acc, price) => {
        //     acc[price.id] = Object.assign(acc[price.id] || {}, price);
        //     console.log(acc[price.id]);
        //     return acc;
        //   }, {});
        });
      });
      console.log(this.prices);
    });

  }

  deleteTrip(trip) {
    // deletes from UI
    this.trips = this.trips.filter(t => t.id !== trip.id);
    // deletes from database
    this.get.deleteTrips(trip)
    .subscribe();
    console.log('delete me');
  }

}
