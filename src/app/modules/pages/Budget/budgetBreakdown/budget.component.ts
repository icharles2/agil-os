import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { catchError, retry, shareReplay } from 'rxjs/operators';
import { BudgetService } from '../../../../services/budget.service';
import { DateService } from '../../../../services/date.service';
import { PostService } from '../../../../services/posts.service';
import { Price } from '../../../../models/Prices';
import { Trip } from '../../../../models/Trips';
import { Detail } from '../../../../models/Details';
import * as jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import domToImage from 'dom-to-image';
import { Lifecycle } from 'src/app/models/Lifecycle';

@Component({
  selector: 'app-trip',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.css'],
})
export class BudgetComponent implements OnInit {
  @ViewChild('content', { static: true }) content: ElementRef;
  // private state$: Observable<object>;

  trips: Trip;
  prices: Price;
  details: Detail;
  lifecycle: Lifecycle;
  tempDeparture: string;
  tempReturn: string;

  constructor(
    private budget: BudgetService,
    private dates: DateService,
    private post: PostService,
    ) {}

  ngOnInit() {
    console.log('obj', history.state.data);
    this.prices = {
      tripTotal: [],
    };
    this.details = {
      flight1: '',
      flight2: '',
      hotel: '',
      rental: '',
    };
    // this.trips = {
    //   title: 'Cross Country Move',
    //   origin: 'New Orleans',
    //   destination: 'Chicago',
    //   transpo: 'flight',
    //   lodging: 'hotel',
    //   departure: '08/20/2019',
    //   returnDate: '08/30/2019',
    //   quality: 3,
    //   rental: false,
    //   imgUrl: '',
    //   total: 0,
    // };
    this.trips = history.state.data;
    // this.trips.user = 2;
    this.tempDeparture = this.trips['departure'];
    this.tempReturn = this.trips['returnDate'];
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
        this.getMealsTotal();
      },
      3000,
    );
    setTimeout(
      () => {
        this.getPricesTotal();
      },
      11000,
    );
  }

  transpoId() {
    // let { transpo } = this.trips;
    if (this.trips['transpo'] === 'car') {
      this.trips['transpo'] = 2;
      if (this.trips['rental'] === true) {
        this.trips['rental'] = 'true';
      }
    } else if (this.trips['transpo'] === 'flight') {
      this.trips['rental'] = 'false';
      this.trips['transpo'] = 3;
    }
  }

  lodgingId() {
    if (this.trips['lodging'] === 'hotel') {
      this.trips['lodging'] = 6;
    } else if (this.trips['lodging'] === 'with friends') {
      this.trips['lodging'] = 7;
    }
  }

  saveTrip() {
    this.transpoId();
    this.lodgingId();
    this.trips['user'] = 1;
    this.trips['total'] = Number(this.trips['total'].toFixed(2));
    // need to make a user get request for current user
    // for now it is hardcoded
    this.post.createTrip(this.trips)
    .subscribe(res => console.log('Trip', res));
  }

  editHotelPrice(price) {
    if (this.prices.hotelQ !== price) {
      this.lifecycle.isDoneLoading = false;
      this.getHotelPrices(price);
      setTimeout(
        () => {
          this.getPricesTotal();
        },
        4000,
      );
      console.log('I was edited', price);
    } else {
      console.log(`You have already selected ${price}`);
    }
  }
  editFlight1Price(price) {
    if (this.prices.flightQ !== price) {
      this.lifecycle.isDoneLoading = false;
      this.getFlightsPrices(price);
      setTimeout(
        () => {
          this.getPricesTotal();
        },
        4000,
      );
      console.log('I was edited', price);
    } else {
      console.log(`You have already selected ${price}`);
    }
  }
  editFlight2Price(price) {
    if (this.prices.flightQ !== price) {
      this.lifecycle.isDoneLoading = false;
      this.getFlightsPrices(price);
      setTimeout(
        () => {
          this.getPricesTotal();
        },
        4000,
    );
      console.log('I was edited', price);
    } else {
      console.log(`You have already selected ${price}`);
    }
  }
  editFoodPrice(price) {
    if (this.prices.mealsQ !== price) {
      this.lifecycle.isDoneLoading = false;
      this.getMealsPrices(price);
      setTimeout(
        () => {
          this.getMealsTotal();
        },
        3000,
      );
      setTimeout(
        () => {
          this.getPricesTotal();
        },
        2000,
      );
    } else {
      console.log(`You have already selected ${price}`);
    }
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
    this.trips.total = this.prices.tripTotal.reduce((a, b) => a + b);
    this.lifecycle['isDoneLoading'] = true;
    console.log(this.trips.total);
    return this.trips.total;
  }

  getMealsTotal() {
    const { food, tripLength } = this.lifecycle;
    const { meals, tripTotal } = this.prices;
    this.prices.mealsTotal = ((this.prices.meals[2]) * tripLength) * 3;
    tripTotal.push(this.prices.mealsTotal);

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
      .subscribe((res, err) => {
        if (res) {
          this.setPrices(res, 'flight1');
          this.addToTotal(res);
          this.details['flight1'] = res.detail;
          console.log(this.details['flight1']);
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
        this.details['flight2'] = data.detail;
        console.log(this.details['flight2']);
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
        this.details['hotel'] = res.detail;
        console.log(this.details['hotel']);
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
        this.details['rental'] = data.detail;
        console.log(this.details['rental']);
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
