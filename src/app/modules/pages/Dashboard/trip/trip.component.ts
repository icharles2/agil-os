import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-trip',
  templateUrl: './trip.component.html',
  styleUrls: ['./trip.component.css']
})
export class TripComponent implements OnInit {
    trip: any;
    flight: number;
    prices: any;
    food: number;
    hotel: number;
    tripLength: number;
    mealsTotal: number;
    total: number;
    daysUntilTrip: number;

  constructor(private http: HttpClient) { 
    
    let obsFlight = this.http.get('http://localhost:3000/prices/flight')
    obsFlight.subscribe((response) => {
      this.flight = parseFloat(response[1]);
    });
    let obsFood = this.http.get('http://localhost:3000/prices/food');
    obsFood.subscribe((response) => {
      this.food = parseFloat(response[1]);
    });
    let obsHotel = this.http.get('http://localhost:3000/prices/hotel');
    obsHotel.subscribe((response) => {
      this.hotel = parseFloat(response[1]);
      
    });
    let obsTrip = this.http.get('http://localhost:3000/trips/detail');
    obsTrip.subscribe((response) => {
      this.trip.departure = response[1];
      this.trip.return = response[2];
      this.tripLength = getTripLength(this.trip.departure, this.trip.return);
      this.mealsTotal = ((this.food) * 3) * this.tripLength
      this.total = this.mealsTotal + this.flight + this.hotel;
      //this.daysUntilTrip = getTripLength(this.trip.departure, )
    });
   
    
    // this.prices.total = this.trip.mealsTotal + this.prices.hotel + this.prices.flight;
    
    this.trip = {
      title: "Renee's Bachelorette",
      destination: "Las Vegas",
      origin: "New Orleans",
      transpo: "car",
      rental: true,
      lodging: "Hotel",
    };
  
    let getMonthString = (stringDate) => {
      let dateDay = Number(stringDate.match(/\d+/)[0]);
      let arr = stringDate.split(' ');
      let monthStr = arr[1]
      let dateMon = new Date(Date.parse(monthStr + dateDay + ", 2019")).getMonth()+1
      return {mon: dateMon, day: dateDay};
    }

    let getTripLength = (dateStr1, dateStr2) => {
    let oneDay = 24*60*60*1000;
    let date1 = getMonthString(dateStr1);
    let date2 = getMonthString(dateStr2); // hours*minutes*seconds*milliseconds
    let firstDate = new Date(2019, date1.mon, date1.day);
    let secondDate = new Date(2019, date2.mon, date2.day);
    let tripLength = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime())/(oneDay)));
    return tripLength;
    }

    // let getTripCountdown = (tripDeparture) => {
    //   let oneDay = 24*60*60*1000;
    //   let date1 = getMonthString(tripDeparture);
    //   let firstDate = new Date(2019, date1.mon, date1.day);
    //   let todayDate = new Date();
    //   let tripLength = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime())/(oneDay)));
    // return tripLength;
    // }

    
    //console.log(this.trip.mealsTotal);
    // 
  }
  ngOnInit() {
 }

}
