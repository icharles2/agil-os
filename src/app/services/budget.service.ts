import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

export interface Budget {
  flightUrl: string;
  hotelUrl: string;
  mealsUrl: string;
  gasUrl: string;
  rentalCarUrl: string;
}

@Injectable({
  providedIn: 'root',
})
export class BudgetService {
  flightUrl = 'http://3.85.122.97:3000/prices/flight/';
  hotelUrl = 'http://3.85.122.97:3000/prices/hotel/';
  mealsUrl = 'http://3.85.122.97:3000/prices/food/';
  gasUrl = 'http://3.85.122.97:3000/prices/gas/';
  rentalCarUrl = 'http://3.85.122.97:3000/prices/cars/';
  cityPicUrl = 'http://3.85.122.97:3000/cities/picture/';

  constructor(private http: HttpClient) {}

  getHotelPrice(quality: number, destination: string, departure: string, returnDate: string): any {
    return this.http.get(`${this.hotelUrl}${quality}/${destination}/${departure}/${returnDate}`);
  }
  getFlightPrice(quality: number, origin: string, destination: string, departure: string): any {
    return this.http.get(`${this.flightUrl}${quality}/${origin}/${destination}/${departure}`);
  }

  getMealsPrice(destination: string, quality: number): any {
    return this.http.get(`${this.mealsUrl}${destination}/${quality}`);
  }

  getGasPrice(origin: string, destination: string): any {
    return this.http.get(`${this.gasUrl}${origin}/${destination}`);
  }

  getRentalCarPrice(origin: string, departure: string, returnDate: string): any {
    // yyyy-mm-dd
    return this.http.get(`${this.rentalCarUrl}${origin}/${departure}/${returnDate}`);
  }

  getTripPicture(destination): any {
    return this.http.get(`${this.cityPicUrl}${destination}`);
  }
}
