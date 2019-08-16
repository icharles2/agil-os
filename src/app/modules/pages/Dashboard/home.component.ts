import { Component, OnInit } from '@angular/core';

export interface Transaction {
  expense: string;
  average: number;
  low: number;
  high: number;
}

@Component({
  // moduleId: module.id,

  selector: 'Home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.css'],
})
export class HomeComponent implements OnInit {
  displayedColumns: string[] = ['expense', 'average', 'low', 'high'];
  transactions: Transaction[] = [
    { expense: 'Hotel', average: 4, low: 2, high: 2 },
    { expense: 'Price per Meal', average: 5, low: 2, high: 2 },
    { expense: 'Meals Total', average: 2, low: 2, high: 2 },
    { expense: 'Price per Gallon', average: 4, low: 2, high: 2 },
    { expense: 'Gas Total', average: 25, low: 2, high: 2 },
    { expense: 'Flight to Destination', average: 15, low: 2, high: 2 },
    { expense: 'Flight Home', average: 15, low: 2, high: 2 },
    { expense: 'Rental Car', average: 2, low: 2, high: 2 },
  ];

  getTotalCost() {
    return this.transactions.map(t => t.average).reduce((acc, value) => acc + value, 0);
  }
  constructor() {}

  ngOnInit() {}
}
