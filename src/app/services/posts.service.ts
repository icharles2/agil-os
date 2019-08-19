import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostService {

  constructor(private http: HttpClient) {}

  createTrip(trip): Observable<Object> {
    return this.http.post('http://localhost:3000/trips/create', {
      name: trip['title'],
      departureDate: trip['departure'],
      arrivalDate: trip['returnDate'],
      origin: trip['origin'],
      destination: trip['destination'],
      user: trip['user'],
      quality: trip['quality'],
      lodging: trip['lodging'],
      transportation: trip['transpo'],
      isRental: trip['rental'],
      pic: trip['imgUrl'],
      total: trip['total'],
    });
  }

  savePrice(low, high, average, trips, quality, category, subTotal): Observable<Object> {
    return this.http.post('http://localhost:3000/prices/create', {
      low,
      high,
      average,
      trips,
      quality,
      category,
      subTotal,
    });
  }

  saveCars(total, distance, price, tripId):Observable<Object> {
    return this.http.post('http://localhost:3000/cars/create', {
      total,
      tripDistance: distance,
      pricePerGal: price,
      trips: tripId,
    });
  }

}
