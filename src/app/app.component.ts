import { Component } from '@angular/core';
// import { homedir } from 'os';

@Component({
  selector: 'app-root',
  /* sorry for all the comments i was testing out the views */
  templateUrl: './app.component.html', //landing
  // templateUrl: './homepage/home.component.html', //homepage
  // templateUrl: './dTree/priceRange.component.html', //priceRange

  styleUrls: ['./app.component.css']
  // styleUrls: ['../app/homepage/home.css']
})
export class AppComponent {
  // also define dynamic values in the hmtl files like title= 'Pllnr'
  title = 'Plnnr';
  constructor(/*get*/) {

  }
  // functions after constructor
  ngOnInit() {
    // simple initialize func
    console.log('App innnnnit');
  }
}
