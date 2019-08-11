import { Component, OnInit } from '@angular/core';

@Component({
  // moduleId: module.id,
  // selector used for when you are rendering a cpomponent and/or passing down properties to that component
  selector: 'Home',
  templateUrl: './home.component.html',
  // directives: []
  // providers: [] where you specify the components you get stuff from *i think*
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}