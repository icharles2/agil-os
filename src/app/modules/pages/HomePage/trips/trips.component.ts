import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
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
  @Input() user;
  @Input() notifications;
  @Input() counter;
  @Input() daysLeft;
  @Output() sendNum = new EventEmitter<number>();
  @Output() notify = new EventEmitter<number>();
  @Output() count = new EventEmitter<number>();
  trips;
  pastTrips = [];
  activeTripsArr = [];
  prices;
  screenWidth: number;
  countdown;
  nextTrip;

  constructor(
    private post: PostService,
    private get: GetService,
    private date: DateService,
  ) {

  }
  ngOnInit() {
    this.prices = [];
    this.get.getTripsByUser(this.user['email'])
    .subscribe((trips):any => {
      this.trips = trips;
      this.trips.sort((a, b) => b.id - a.id);
      this.activeTripsArr = this.trips.filter(trip => this.date.activeTrips(trip['departureDate']));
      this.countdown = this.activeTripsArr.map((trip) => {
        return this.date.getTripCountdown(trip['departureDate']);
      });
      this.daysLeft = this.countdown.reduce((lowest, current) => {
        if (lowest > 0) {
          return Math.min(lowest, current);
        }
        return current;
      });
      this.outputCountdown(this.daysLeft);
      this.trips.filter((trip) => {
        if (trip.status === 'pending') {
          this.notifications += 1;
          this.outputNotify(this.notifications);
        } else {
          this.counter += 1;
          this.countEm(this.counter);
        }
      });
      this.trips.forEach((trip) => {
        this.get.getTripPrices(trip)
        .subscribe((prices) => {
          this.prices.push(prices);
        });
      });
    });
  }

  countEm(num) {
    this.count.emit(num);
  }

  outputNotify(num) {
    this.notify.emit(num);
  }

  outputCountdown(num) {
    this.sendNum.emit(num);
  }

  approveTrip(trip) {
    trip['status'] = 'confirmed';
    this.post.updateTrip(trip)
    .subscribe();
    this.notifications -= 1;
    this.counter += 1;
    this.countEm(this.counter);
    this.outputNotify(this.notifications);
    console.log('was approved');
  }

  denyTrip(trip) {
    this.trips = this.trips.filter(t => t.id !== trip.id);
    this.get.deleteTrips(trip)
    .subscribe();
    this.notifications -= 1;
    this.outputNotify(this.notifications);
    console.log('was denied');
  }

  deleteTrip(trip) {
    // deletes from UI
    this.trips = this.trips.filter(t => t.id !== trip.id);
    // deletes from database
    this.counter -= 1;
    this.countEm(this.counter);
    this.get.deleteTrips(trip)
    .subscribe();
    console.log('delete me');
  }

}
