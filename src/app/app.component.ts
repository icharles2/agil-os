import { Component } from '@angular/core';
// import { homedir } from 'os';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html', //landing
  // templateUrl: './homepage/home.component.html', //homepage
  // templateUrl: './dTree/priceRange.component.html', priceRange

  // styleUrls: ['./app.component.css']
  // styleUrls: ['../app/homepage/home.css']
})
export class AppComponent {
  // also define dynamic values in the hmtl files like title= 'Pllnr'
  title = 'Plnnr';
}
