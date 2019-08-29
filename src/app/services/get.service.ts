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

  getTripsByUser(email) {
    return this.http.get(`${this.url}trips/${email}`);
  }

  deleteTrips(trip) {
    return this.http.delete(`${this.url}trips/${trip.id}`);
  }

  getTripPrices(trip) {
    return this.http.get(`${this.url}prices/trips/${trip.id}`);
  }

  getUserById(id) {
    return this.http.get(`${this.url}users/${id}`);
  }

  getUser(email) {
    return this.http.get(`${this.url}users/email/${email}`);
  }

  verifyUser(email, password) {
    return this.http.get(`${this.url}users/password/${email}/${password}`);
  }

}
