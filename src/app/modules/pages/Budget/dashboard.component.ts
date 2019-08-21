import { Component } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';

export interface Expenses {
  expense: string;
  lowest: number;
  highest: number;
  average: number;
  details: string;
}

@Component({

  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.css'],
})
export class DashboardView {

  ngOnInit() {}
}
