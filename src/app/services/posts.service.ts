import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostService {

  constructor(private http: HttpClient) {}
  url: string = 'http://localhost:3000/';

  updateTrip(trip):Observable<Object> {
    return this.http.put(`${this.url}trips/${trip.id}`, {
      status: 'confirmed',
    });
  }

  createTrip(trip, total, status = 'confirmed', sharedBy = null): Observable<Object> {
    return this.http.post(`${this.url}trips/create`, {
      status,
      sharedBy,
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
      mealTotal: total['mealTotal'],
      lodgingTotal: total['lodgingTotal'],
      transportationTotal: total['transportationTotal'],
      pic: trip['imgUrl'],
      total: trip['total'],
    });
  }

  savePrice(
    low, high, average, trips, quality, category, categoryNumber, subTotal,
    ): Observable<Object> {
    return this.http.post(`${this.url}prices/create`, {
      low,
      high,
      average,
      trips,
      quality,
      category,
      categoryNumber,
      subTotal,
    });
  }

  saveCars(total, distance, price, tripId):Observable<Object> {
    return this.http.post(`${this.url}cars/create`, {
      total,
      tripDistance: distance,
      pricePerGal: price,
      trips: tripId,
    });
  }

  saveUsers(username, hometown, email, pic):Observable<Object> {
    return this.http.post(`${this.url}users/create`, {
      username,
      hometown,
      email,
      pic,
    });
  }

}
