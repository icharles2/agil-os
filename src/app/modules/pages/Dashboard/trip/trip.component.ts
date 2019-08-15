import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BudgetService } from '../../../../services/budget.service';
import { DateService } from '../../../../services/date.service';
import { Price } from '../../../../models/Prices';
import { Trip } from '../../../../models/Trips';
import * as jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import domToImage from 'dom-to-image';

@Component({
  selector: 'app-trip',
  templateUrl: './trip.component.html',
  styleUrls: ['./trip.component.css'],
})
export class TripComponent implements OnInit {
  @ViewChild('content', { static: true }) content: ElementRef;

  trips: Trip;
  prices: Price;
  tripLength: number;
  daysUntilTrip: number;
  count: number;
  lodging: boolean;
  meals: boolean;
  transpo: boolean;
  isDoneLoading: boolean;
  setTimeoutNow: any;
  total: number;

  getPricesTotal() {
    if (this.meals && this.transpo && this.lodging) {
      this.total = Number(this.prices['tripTotal'].reduce((a, b) => a + b).toFixed(2));
    }
  }

  constructor(
    private budget: BudgetService,
    private dates: DateService,
    ) {

    this.trips = {
      title: 'Cross Country Move',
      origin: 'New Orleans',
      destination: 'Chicago',
      transpo: 'car',
      lodging: 'hotel',
      departure: this.dates.parseDateAPI('08/20/2019'),
      return: this.dates.parseDateAPI('08/30/2019'),
      quality: 1,
      rental: true,
      withFriends: false,
    };
    this.meals = false;
    this.transpo = false;
    this.lodging = this.trips.withFriends ? true : false;
    this.tripLength = this.dates.getTripLength(this.trips['departure'], this.trips['return']);

    this.prices = {};
    this.prices['tripTotal'] = [];

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
        this.prices['tripTotal'].push(this.prices['mealsTotal']);
        this.meals = true;
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
          this.prices['tripTotal'].push(data['average']);
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
          this.transpo = true;
          this.prices['flight2Avg'] = data['average'];
          this.prices['tripTotal'].push(data['average']);
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
          this.prices['tripTotal'].push(data['distancePrice']);
          this.transpo = true;
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
            this.prices['tripTotal'].push(data['average']);
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
            this.prices['tripTotal'].push(data['average']);
            this.lodging = true;
            this.prices['hotelQ'] = this.trips['quality'];
          });
    }

  }

  ngOnInit() {
    this.isDoneLoading = false;
    setTimeout(() => {
      this.isDoneLoading = true;
      this.getPricesTotal();
    }, 6000);

  }

  downloadPDF() {
    const doc = new jsPDF;
    const specialElementHandlers = {
      '#editor': (element, renderer) => {
        return true;
      },
    };
    const content = this.content.nativeElement;

    doc.fromHTML(content.innerHTML, 15, 15, {
      width: 190,
      elementHandlers: specialElementHandlers,
    });
    doc.save('test.pdf');
  }

}
