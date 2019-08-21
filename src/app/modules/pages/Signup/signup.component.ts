import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'sign-in',
  templateUrl: '../Signup/signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {}
}
