import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ThemeService } from '../../../services/theme.service';

@Component({
  // moduleId: module.id,
  selector: 'home-page',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
})

export class HomePageComponent implements OnInit{
  isDarkTheme: Observable<boolean>;
  notifications: number = 0;
  counter = 0;
  screenWidth: number;
  constructor(
    private themeService: ThemeService,
    ) {
    this.screenWidth = window.innerWidth;
    window.onresize = () => {
    // set screenWidth on screen size change
      this.screenWidth = window.innerWidth;
    };
  }

  ngOnInit() {
    this.isDarkTheme = this.themeService.isDarkTheme;
  }

  toggleDarkTheme(checked: boolean) {
    this.themeService.setDarkTheme(checked);
  }

  count(num) {
    this.counter = num;
  }

  notify(num) {
    this.notifications = num;
  }
}
