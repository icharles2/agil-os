import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, share } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'landing-nav',
  templateUrl: './landing-nav.component.html',
  styleUrls: ['./landing-nav.component.css'],
})
export class LandingNavComponent {

  constructor(private router: Router) {}
}
