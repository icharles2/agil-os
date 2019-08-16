import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { catchError, retry, shareReplay } from 'rxjs/operators';
import { BudgetService } from '../../../../services/budget.service';
import { DateService } from '../../../../services/date.service';
import { Price } from '../../../../models/Prices';
import { Trip } from '../../../../models/Trips';
import * as jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import domToImage from 'dom-to-image';
import { Lifecycle } from 'src/app/models/Lifecycle';

@Component({
  selector: 'app-trip',
  templateUrl: './trip.component.html',
  styleUrls: ['./trip.component.css'],
})
export class TripComponent implements OnInit {
  @ViewChild('content', { static: true }) content: ElementRef;
  private state$: Observable<object>;

  trips: Trip;
  prices: Price;
  lifecycle: Lifecycle;
  tripLength: number;
  daysUntilTrip: number;
  count: number;
  lodging: boolean;
  meals: boolean;
  transpo: boolean;
  isDoneLoading: boolean;
  setTimeoutNow: any;
  total: number;

  constructor(
    private budget: BudgetService,
    private dates: DateService,
    ) {}

  ngOnInit() {
    this.prices = {
      tripTotal: [],
    };
    this.trips = {
      title: 'Cross Country Move',
      origin: 'New Orleans',
      destination: 'Chicago',
      transpo: 'flight',
      lodging: 'hotel',
      departure: '08/20/2019',
      returnDate: '08/30/2019',
      quality: 3,
      rental: false,
      imgUrl: '',
      total: 0,
    };
    this.lifecycle = {
      food: false,
      transpo: false,
      lodging: this.trips['lodging'] === 'hotel' ? false : true,
      isDoneLoading: false,
    };
    this.getTripPhoto();
    this.setDates();
    this.setTripLength(this.trips['departure'], this.trips['returnDate']);
    this.getMealsPrices(this.trips['quality']);
    if (this.trips['transpo'] === 'flight') {
      this.getFlightsPrices(this.trips['quality']);
    }
    if (this.trips['transpo'] === 'car') {
      this.getGasPrices();
    }
    if (this.trips['rental']) {
      this.getRentalCarPrices();
    }
    if (this.trips['lodging'] === 'hotel') {
      this.getHotelPrices(this.trips['quality']);
    }
    setTimeout(
      () => {
        this.getPricesTotal();
        this.lifecycle['isDoneLoading'] = true;
      },
      6000,
    );

  }

  
  // downloadPDF() {
  //   const doc = new jsPDF;
  //   const specialElementHandlers = {
  //     '#editor': (element, renderer) => {
  //       return true;
  //     },
  //   };
  // const content = this.content.nativeElement;
  setTripLength(departure: string, returnDate: string) {
    this.lifecycle['tripLength'] = this.dates.getTripLength(departure, returnDate);
    return this.lifecycle['tripLength'];
  }

  setDates() {
    this.trips['departure'] = this.dates.parseDateAPI(this.trips['departure']);
    this.trips['returnDate'] = this.dates.parseDateAPI(this.trips['returnDate']);
  }

  getPricesTotal() {
    const { food, lodging, transpo, tripLength } = this.lifecycle;
    const { tripTotal } = this.prices;
    if (food && tripLength) {
      this.prices.mealsTotal = ((this.prices.meals[2]) * tripLength) * 3;
      tripTotal.push(this.prices.mealsTotal);
      if (food && transpo && lodging) {
        this.trips.total += tripTotal.reduce((a, b) => a + b);
        return this.trips.total;
      }
    }

  }
  getTripPhoto() {
    this.budget.getTripPicture(this.trips['destination'])
      .subscribe((data: string) => {
        this.trips['imgUrl'] = data;
      });
  }
  getMealsPrices(quality: number) {
    this.budget.getMealsPrice(this.trips['destination'], quality)
    .subscribe((data) => {
      this.setPrices(data, 'meals');
      this.lifecycle['food'] = true;
      this.setQuality(quality, 'meals');
    });
  }

  setPrices(price, method: string) {
    this.prices[method] =  [price['low'], price['high'], price['average']];
  }

  setQuality(quality: number, method: string) {
    this.prices[`${method}Q`] = quality;
  }

  addToTotal(price: number) {
    this.prices['tripTotal'].push(price['average']);
  }

  getFlightsPrices(quality: number) {
    const { origin, destination, departure, returnDate } = this.trips;
    this.budget.getFlightPrice(quality, origin, destination, departure)
    .pipe(
      catchError(() => {
        return EMPTY;
      }),
    )
      .subscribe((res, err) => {
        if (res) {
          this.setPrices(res, 'flight1');
          this.addToTotal(res);
          this.setQuality(quality, 'flight');
        }
        if (err) {
          console.log('HTTP Flights Error', err);
        }
      });

    this.budget.getFlightPrice(quality, destination, origin, returnDate)
      .subscribe((data) => {
        this.setPrices(data, 'flight2');
        this.addToTotal(data);
        this.lifecycle['transpo'] = true;
      });
  }
  getHotelPrices(quality: number) {
    const { destination, departure, returnDate } = this.trips;
    this.budget.getHotelPrice(quality, destination, departure, returnDate)
    .pipe(
      retry(1),
      catchError(() => {
        return EMPTY;
      }),
      shareReplay(),
    )

    .subscribe((res, err) => {
      if (res) {
        this.setPrices(res, 'hotel');
        this.addToTotal(res);
        this.setQuality(quality, 'hotel');
      } else {
        console.log('HTTP Hotels Error', err);
      }
      this.lifecycle['lodging'] = true;
    });
  }

  getRentalCarPrices() {
    const { origin, departure, returnDate } = this.trips;
    this.budget.getRentalCarPrice(origin, departure, returnDate)
      .subscribe((data) => {
        this.setPrices(data, 'rental');
        this.addToTotal(data);
      });
  }

  getGasPrices() {
    const { origin, destination } = this.trips;
    this.budget.getGasPrice(origin, destination)
    .subscribe((data) => {
      // should also make use of distance and time
      this.prices['gas'] = data['gasPerGallon'].toFixed(2);
      this.prices['gasTotal'] = data['distancePrice'];
      this.trips['distance'] = data['distance'];
      this.prices['tripTotal'].push(data['distancePrice']);
      this.lifecycle['transpo'] = true;
    });
  }
  // downloadPDF() {
  //   const doc = new jsPDF;
  //   const specialElementHandlers = {
  //     '#editor': (element, renderer) => {
  //       return true;
  //     },
  //   };
  //   const content = this.content.nativeElement;
  //   doc.fromHTML(content.innerHTML, 15, 15, {
  //     width: 190,
  //     elementHandlers: specialElementHandlers,
  //   });
  //   doc.save('test.pdf');
  // }
}
