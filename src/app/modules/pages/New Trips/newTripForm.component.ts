import { Component } from '@angular/core';

@Component({
  // moduleId: module.id,
  // selector used for when you are rendering a cpomponent and/or passing down properties to that component
  selector: 'destination',
  templateUrl: '../New Trips/newTripForm.component.html',
  // directives: []
  // providers: [] where you specify the components you get stuff from *i think*
})
export class DestinationComponent {
  // also define dynamic values in the hmtl files like title= 'Pllnr'
  constructor(/*get*/) {

  }
  // functions after constructor
  ngOnInit() {

  }
}