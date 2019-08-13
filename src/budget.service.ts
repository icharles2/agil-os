import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {

      // printBudget(arg) {
      //   console.log(arg);
      // }
  constructor(private http: HttpClient) {

  }

  // getHotelPrice(): Observable<Trip[]> {
  //   return this.http.get('http://localhost:3000/prices/hotel')
  //   .subscribe(data => {
  //     console.log("We got", data);
  //   }) 
  // }
}
