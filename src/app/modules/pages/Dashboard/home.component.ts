import { Component, OnInit } from '@angular/core';
import { BudgetService } from 'src/budget.service';
import { HttpClient } from '@angular/common/http';


@Component({
  // moduleId: module.id,
  // selector used for when you are rendering a cpomponent and/or passing down properties to that component
  selector: 'Home',
  templateUrl: './home.component.html',
  // directives: []
  // providers: [] where you specify the components you get stuff from *i think*
})
export class HomeComponent implements OnInit {

  constructor(private http: HttpClient) {
    
   }

  ngOnInit() {
    
  }

}