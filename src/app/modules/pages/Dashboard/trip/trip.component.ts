import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-trip',
  templateUrl: './trip.component.html',
  styleUrls: ['./trip.component.css']
})
export class TripComponent implements OnInit {
    trip: any;

  constructor() { 
    this.trip = {
      title: "Renee's Bachelorette",
      destination: "Las Vegas",
      origin: "New Orleans",
      total: "2678",
      transpo: "car",
      rental: true,
      lodging: "Hotel",
    };
  }

  ngOnInit() {
  }

}
