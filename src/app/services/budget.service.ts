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
  flightUrl = 'http://localhost:3000/prices/flight/';
  hotelUrl = 'http://localhost:3000/prices/hotel/';
  mealsUrl = 'http://localhost:3000/prices/food/';
  gasUrl = 'http://localhost:3000/prices/gas/';
  rentalCarUrl = 'http://localhost:3000/prices/cars/';
  cityPicUrl = 'http://localhost:3000/cities/picture/';

  constructor(private http: HttpClient) {}

  createTrip(trip): Observable<Object> {
    return this.http.post('http://localhost:3000/trips/create', {
      content: trip.content,
      submittedBy: trip.submittedBy,
    });
  }

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
