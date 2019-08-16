import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { TreeService } from '../../../../services/tree.service';
import { Trip } from '../../../../models/Trips';
import { DateService } from '../../../../services/date.service';

@Component({
  selector: 'dashboard-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  fourthFormGroup: FormGroup;
  tripObj = {};
  transpo;
  lodging;
  quality;
  // should i make a obj from scratch or mold it from the trips model?
  // tripObj: Trip;
  form = new FormGroup({
    destination: new FormControl(),
    tripName: new FormControl(),
    departureDate: new FormControl(),
    returnDate: new FormControl()
  })
  constructor(private _formBuilder: FormBuilder, private router: Router, private tree: TreeService, private date: DateService) { }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
    this.thirdFormGroup = this._formBuilder.group({
      thirdCtrl: ['', Validators.required]
    });
    this.fourthFormGroup = this._formBuilder.group({
      fourthCtrl: ['', Validators.required]
    });
  }
  setDestination() {

  }
  // tripObj = { 
  //   title: this.form.get('tripName').value,
  //   origin: 'New Orleans',
  //   destination: this.form.get('destination').value,
  //   transpo: 'car',
  //   lodging: 'hotel',
  //   departure: this.date.parseDateAPI(this.form.get('departureDate').value),
  //   return: this.date.parseDateAPI(this.form.get('returnDate').value),
  //   quality: 1,
  //   rental: true,
  // };
  logInputs() {
    console.log(this.form.get('destination').value);
    console.log(this.form.get('tripName').value);
    console.log(this.form.get('departureDate').value);
    console.log(this.form.get('returnDate').value);
    console.log('form', this.form);
    console.log('tripObj', this.tripObj);
  }
  goToPage(pageName: string) {
    this.router.navigate([`${pageName}`], { state : this.form });
  }


}
