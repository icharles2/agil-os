import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'log-in',
  templateUrl: '../login/login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LogComponent implements OnInit {
  constructor(private router: Router) { }

  ngOnInit() { }
}
