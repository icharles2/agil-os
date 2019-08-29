import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HelperService {

  constructor(private http: HttpClient) {}

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

  categoryId(number) {
    if (number === 2) {
      return 'car';
    }
    if (number === 3) {
      return 'flight';
    }
    if (number === 4) {
      return 'rental';
    }
    if (number === 6) {
      return 'hotel';
    }
    if (number === 7) {
      return 'with friends';
    }
    if (number === 8) {
      return 'meals';
    }
  }
}
