import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, share } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'landing-nav',
  templateUrl: './landing-nav.component.html',
  styleUrls: ['./landing-nav.component.css'],
})
export class LandingNavComponent implements OnInit {
  isDarkTheme: Observable<boolean>;

  constructor(
    private router: Router,
    private themeService: ThemeService,
    ) {}

  ngOnInit(): void {
    this.isDarkTheme = this.themeService.isDarkTheme;
  }
  toggleDarkTheme(checked: boolean) {
    this.themeService.setDarkTheme(checked);
  }
}
