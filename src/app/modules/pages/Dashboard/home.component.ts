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

  constructor() {}

  ngOnInit() {}
}
