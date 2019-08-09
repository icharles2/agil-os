import { Component } from '@angular/core';

@Component({
  // moduleId: module.id,
  // selector used for when you are rendering a cpomponent and/or passing down properties to that component
  selector: 'Home',
  templateUrl: './home.component.html',
  // directives: []
  // providers: [] where you specify the components you get stuff from *i think*
})
export class HomeComponent {
  // also define dynamic values in the hmtl files like title= 'Pllnr'
  constructor(/*get*/) {

  }
  // functions after constructor
  ngOnInit() {
    console.log('home page');
  }

}