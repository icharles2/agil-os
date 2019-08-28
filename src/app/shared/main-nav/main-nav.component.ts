import { Component, OnInit, Input } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { ThemeService } from '../../services/theme.service';
import { Observable } from 'rxjs';
import { map, share } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css'],
})
export class MainNavComponent {
  isDarkTheme: Observable<boolean>;
  screenWidth: number;
  // @Input() user;
  constructor(
    private themeService: ThemeService,
    private router: Router,
  ) {
    this.screenWidth = window.innerWidth;
    window.onresize = () => {
    // set screenWidth on screen size change
      this.screenWidth = window.innerWidth;
    };
  }
  ngOnInit() {
    // console.log(this.user);
    this.isDarkTheme = this.themeService.isDarkTheme;
  }
  toggleDarkTheme(checked: boolean) {
    this.themeService.setDarkTheme(checked);
  }

}
