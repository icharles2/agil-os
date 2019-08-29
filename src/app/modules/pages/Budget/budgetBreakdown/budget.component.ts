import { Component, OnInit, ViewChild, ElementRef, Inject, Input } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { catchError, retry, shareReplay } from 'rxjs/operators';
import { BudgetService } from '../../../../services/budget.service';
import { DateService } from '../../../../services/date.service';
import { PostService } from '../../../../services/posts.service';
import { GetService } from '../../../../services/get.service';
import { Price } from '../../../../models/Prices';
import { Trip } from '../../../../models/Trips';
import { Detail } from '../../../../models/Details';
import { Subtotal } from '../../../../models/Subtotals';
import * as jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { MatSnackBar, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
// import domToImage from 'dom-to-image';
import { Lifecycle } from 'src/app/models/Lifecycle';

export interface DialogData {
  email: string;
  name: string;
}

@Component({
  selector: 'app-trip',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.css'],
})
export class BudgetComponent implements OnInit {
  @ViewChild('content', { static: true }) content: ElementRef;
  // private state$: Observable<object>;
  @Input() user;
  trips: Trip;
  prices: Price;
  details: Detail;
  lifecycle: Lifecycle;
  totals: Subtotal;
  tempDeparture: string;
  tempReturn: string;
  email: string;
  name: string;

  constructor(
    private budget: BudgetService,
    private dates: DateService,
    private post: PostService,
    private get: GetService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
    ) {}

  ngOnInit() {
    console.log('obj', history.state.data);
    console.log('user', this.user);
    this.prices = {
      tripTotal: [],
    };
    this.details = {
      flight1: '',
      flight2: '',
      hotel: '',
      rental: '',
    };
    this.totals = {
      mealTotal: '',
      lodgingTotal: '',
      transportationTotal: '',
    };
    this.trips = history.state.data;
    this.tempDeparture = this.trips['departure'];
    this.tempReturn = this.trips['returnDate'];
    this.lifecycle = {
      food: false,
      transpo: false,
      lodging: this.trips['lodging'] === 'hotel' ? false : true,
      isDoneLoading: false,
      wasSaved: false,
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

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '250px',
      data: { email: this.email },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      this.email = result;
      if (this.email) {
        this.openSnackBar('Trip was Shared!', '');
      }
      this.shareTrip(this.email);
    });
  }

  saveCalls() {
    this.openSnackBar('Trip was Saved', 'Undo');
    this.saveTrip();
  }

  openSnackBar(message, action) {
    const snackBarRef = this.snackBar.open(message, action, {
      duration: 3000,
    });
    snackBarRef.afterDismissed().subscribe(() => {
      console.log('The snackbar');
    });

    snackBarRef.onAction().subscribe(() => {

      console.log('The snackbar action was triggered');
    });
  }

  shareTrip(email) {
    this.transpoId();
    this.lodgingId();
    this.transpoTotal();
    this.mealsTotal();
    this.lodgingTotal();
    this.trips['sharedBy'] = this.user['username'];
    this.get.getUser(email)
    .subscribe((res) => {
      console.log('User', res['id']);
      this.trips['user'] = res['id'];
      this.trips['total'] = Number((this.trips['total']).toFixed(2));
    // need to make a user get request for current user
    // for now it is hardcoded
      this.post.createTrip(this.trips, this.totals, 'pending', this.trips['sharedBy'])
    .subscribe((res) => {
      console.log('Trip', res);
      // if both these prices don't exist we want error handling
      if (this.prices['flight1'] && this.prices['flight2']) {
        const flight = this.flightTotal(this.prices['flight1'], this.prices['flight2']);
        this.post.savePrice(
            flight[0],
            flight[1],
            flight[2],
            res['id'],
            this.prices['flightQ'],
            this.priceId('flight'),
            this.priceId('flight'),
            flight[3],
        )
        .subscribe(res => console.log('Flight price', res));
      }
      if (this.prices['rental']) {
        this.post.savePrice(
          this.prices['rental'][0],
          this.prices['rental'][1],
          this.prices['rental'][2],
          res['id'],
          this.trips['quality'],
          this.priceId('rental'),
          this.priceId('rental'),
          this.prices['rental'][2],
        )
        .subscribe(res => console.log('Rental price', res));
      }
      if (this.prices['hotel']) {
        this.post.savePrice(
          this.prices['hotel'][0],
          this.prices['hotel'][1],
          this.prices['hotel'][2],
          res['id'],
          this.prices['hotelQ'],
          this.priceId('hotel'),
          this.priceId('hotel'),
          this.prices['hotel'][2],
        )
        .subscribe(res => console.log('Hotel price', res));
      }
      if (this.trips['transpo'] === 'car' || this.trips['transpo'] === 2) {
        this.post.saveCars(
          this.prices['gasTotal'],
          this.trips['distance'],
          this.prices['gas'],
          res['id'],
        )
        .subscribe(res => console.log('Gas price', res));
      }
      this.post.savePrice(
        this.prices['meals'][0],
        this.prices['meals'][1],
        this.prices['meals'][2],
        res['id'],
        this.prices['mealsQ'],
        this.priceId('meals'),
        this.priceId('meals'),
        this.prices['mealsTotal'],
        )
        .subscribe(res => console.log('Meal price', res));
    });
    });
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

  flightTotal(flight1, flight2) {
    const low = (flight1[0] + flight2[0]) / 2;
    const high = (flight1[1] + flight2[1]) / 2;
    const average = (flight1[2] + flight2[2]) / 2;
    const total = flight1[2] + flight2[2];
    Number(low.toFixed(2));
    Number(high.toFixed(2));
    Number(average.toFixed(2));
    Number(total.toFixed(2));
    return [low, high, average, total];
  }

  priceId(category) {
    if (category === 'flight') {
      return 3;
    } if (category === 'car') {
      return 2;
    } if (category === 'rental') {
      return 4;
    } if (category === 'hotel') {
      return 6;
    } if (category === 'with friends') {
      return 7;
    } if (category === 'meals') {
      return 8;
    }
  }

  transpoTotal() {
    if (this.trips['rental'] === true) {
      this.totals['transportationTotal'] = this.prices['rental'][2] + this.prices['gasTotal'];
    } else if (this.trips['transpo'] === 2) {
      this.totals['transportationTotal'] = this.prices['gasTotal'];
    } else if (this.trips['transpo'] === 3) {
      this.totals['transportationTotal'] = this.prices['flight1'][2] +
      this.prices['flight2'][2];
    }
  }

  lodgingTotal() {
    if (this.trips['lodging'] === 6) {
      this.totals['lodgingTotal'] = this.prices['hotel'][2];
    } else {
      this.totals['lodgingTotal'] = 0;
    }
  }

  mealsTotal() {
    this.totals['mealTotal'] =  this.prices['mealsTotal'];
  }

  saveTrip() {
    this.transpoId();
    this.lodgingId();
    this.transpoTotal();
    this.mealsTotal();
    this.lodgingTotal();
    this.lifecycle['wasSaved'] = true;
    this.trips['user'] = this.user['id'];
    this.trips['total'] = Number((this.trips['total']).toFixed(2));
    // need to make a user get request for current user
    // for now it is hardcoded
    this.post.createTrip(this.trips, this.totals)
    .subscribe((res) => {
      console.log('Trip', res);
      // if both these prices don't exist we want error handling
      if (this.prices['flight1'] && this.prices['flight2']) {
        const flight = this.flightTotal(this.prices['flight1'], this.prices['flight2']);
        this.post.savePrice(
            flight[0],
            flight[1],
            flight[2],
            res['id'],
            this.prices['flightQ'],
            this.priceId('flight'),
            this.priceId('flight'),
            flight[3],
        )
        .subscribe(res => console.log('Flight price', res));
      }
      if (this.prices['rental']) {
        this.post.savePrice(
          this.prices['rental'][0],
          this.prices['rental'][1],
          this.prices['rental'][2],
          res['id'],
          this.trips['quality'],
          this.priceId('rental'),
          this.priceId('rental'),
          this.prices['rental'][2],
        )
        .subscribe(res => console.log('Rental price', res));
      }
      if (this.prices['hotel']) {
        this.post.savePrice(
          this.prices['hotel'][0],
          this.prices['hotel'][1],
          this.prices['hotel'][2],
          res['id'],
          this.prices['hotelQ'],
          this.priceId('hotel'),
          this.priceId('hotel'),
          this.prices['hotel'][2],
        )
        .subscribe(res => console.log('Hotel price', res));
      }
      if (this.trips['transpo'] === 'car' || this.trips['transpo'] === 2) {
        this.post.saveCars(
          this.prices['gasTotal'],
          this.trips['distance'],
          this.prices['gas'],
          res['id'],
        )
        .subscribe(res => console.log('Gas price', res));
      }
      this.post.savePrice(
        this.prices['meals'][0],
        this.prices['meals'][1],
        this.prices['meals'][2],
        res['id'],
        this.prices['mealsQ'],
        this.priceId('meals'),
        this.priceId('meals'),
        this.prices['mealsTotal'],
        )
        .subscribe(res => console.log('Meal price', res));
    });
  }

  editHotelPrice(price) {
    if (this.prices.hotelQ !== price) {
      this.lifecycle.isDoneLoading = false;
      this.prices['tripTotal'].push(-(this.prices['hotel']));
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
      this.prices['tripTotal'].push(-(this.prices['flightTotal']));
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
      this.prices['tripTotal'].push(-(this.prices['mealsTotal']));
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

  captureScreen() {
    const data = document.getElementById('contentToConvert');
    html2canvas(data).then((canvas) => {
      const imgWidth = 208;
      const pageHeight = 295;
      const imgHeight = canvas.height * imgWidth / canvas.width;
      const heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF
      const position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
      pdf.save('MYPdf.pdf'); // Generated PDF
    });
  }

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
    let destination = this.trips['destination'].split(',')[0];
    if (this.trips['destination'] === 'Portland, ME, USA') {
      destination = 'Portland, ME';
    }
    if (this.trips['destination'] === 'Portland, OR, USA') {
      destination = 'Portland, OR';
    }
    if (this.trips['destination'] === 'Birmingham, AL, USA') {
      destination = 'Birmingham, AL';
    }
    if (this.trips['destination'] === 'Washington, DC, USA') {
      destination = 'Washington, D.C.';
    }

    this.budget.getTripPicture(destination)
      .subscribe((data: string) => {
        this.trips['imgUrl'] = data;
      });
  }
  getMealsPrices(quality: number) {
    const destination = this.trips['destination'].split(',')[0];
    this.budget.getMealsPrice(destination, quality)
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
    let { destination } = this.trips;
    destination = destination.split(',')[0];
    this.budget.getGasPrice(this.trips.origin, destination)
    .subscribe((data) => {
      // should also make use of distance and time
      this.prices['gas'] = data['gasPerGallon'].toFixed(2);
      this.prices['gasTotal'] = data['distancePrice'];
      this.trips['distance'] = data['distance'];
      this.prices['tripTotal'].push(data['distancePrice']);
      this.lifecycle['transpo'] = true;
    });
  }
}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: '../dialog/dialog-overview-example-dialog.html',
})
export class DialogOverviewExampleDialog {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
