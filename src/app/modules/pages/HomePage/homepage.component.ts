import { Component, Input, OnInit } from '@angular/core';

@Component({
  // moduleId: module.id,

  selector: 'home-page',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
})

export class HomePageComponent implements OnInit{
  notifications: number = 0;
  counter = 0;
  screenWidth: number;
  constructor(

    ) {
    this.screenWidth = window.innerWidth;
    window.onresize = () => {
    // set screenWidth on screen size change
      this.screenWidth = window.innerWidth;
    };
  }

  ngOnInit() {
  }

  count(num) {
    this.counter = num;
  }

  notify(num) {
    this.notifications = num;
  }
}
