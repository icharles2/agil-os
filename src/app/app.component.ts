import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html', //landing 
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // also define dynamic values in the hmtl files like title= 'Pllnr'
  title = 'Plnnr';
  text = 'Click Me yuuuurd';
  private nolaData = '../../../agil-server/sample_data/numbeo/newOrleans.js';
  constructor(private http: HttpClient) {

  }
  // functions after constructor
  ngOnInit() {
    // simple initialize func
    console.log('App innnnnit');
    console.log(this.getNolaData());
  }

  countClicks() {
    console.log('button has been clicked yuuurd');
  }

  getNolaData() {
    return this.http.get(this.nolaData)
    .subscribe((data) => {
      console.log('request', data);
    })
  }
}
