import { Component, OnInit } from '@angular/core';
import { PostService } from '../../../../services/posts.service';
import { GetService } from '../../../../services/get.service';
import { DateService } from '../../../../services/date.service';
import { DBTrip } from '../../../../models/DBTrips';

@Component({
  selector: 'app-trips',
  templateUrl: './trips.component.html',
  styleUrls: ['./trips.component.css'],
})
export class TripsComponent implements OnInit {
  trips;

  constructor(
    private post: PostService,
    private get: GetService,
    private date: DateService,
  ) { }

  ngOnInit() {
    this.get.getTripsByUser('lisaberteausmith@gmail.com')
    .subscribe(trips => this.trips = trips);

  }

  deleteTrip(trip) {
    this.trips = this.trips.filter(t => t.id !== trip.id);
    this.get.deleteTrips(trip)
    .subscribe();
    console.log('delete me');
  }

}
