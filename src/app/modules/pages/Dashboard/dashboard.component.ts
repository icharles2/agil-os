import { Component, OnInit } from '@angular/core';

export interface Transaction {
  expense: string;
  average: number;
  low: number;
  high: number;
}

@Component({
  // moduleId: module.id,

  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.css'],
})
export class DashboardView implements OnInit {

  constructor() {}

  ngOnInit() {}
}