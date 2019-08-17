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

  selector: 'Home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.css'],
  
})

export class HomeComponent{

}
