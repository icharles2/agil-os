import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { DBTrip } from '../models/DBTrips';

@Injectable({
  providedIn: 'root',
})
export class GetService {

  constructor(private http: HttpClient) {}
  url: string = 'http://localhost:3000/';

  getTripsByUser(email){
    return this.http.get(`${this.url}trips/?email=${email}`);
  }

  deleteTrips(trip) {
    return this.http.delete(`${this.url}trips/${trip.id}`);
  }

  getTripPrices(trip) {
    return this.http.get(`${this.url}prices/trips/${trip.id}`);
  }

}
