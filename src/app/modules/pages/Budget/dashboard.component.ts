import { Component } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';


@Component({

  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.css'],
})
export class DashboardView {
  user;

  ngOnInit() {
    this.user = history.state.userData;
    console.log('user', this.user);
  }
}
