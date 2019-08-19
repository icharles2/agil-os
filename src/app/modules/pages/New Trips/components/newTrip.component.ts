import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Trip } from '../../../../models/Trips';
import { DateService } from '../../../../services/date.service';

@Component({
  selector: 'dashboard-main',
  templateUrl: '../components/newTrip.component.html',
  styleUrls: ['../components/newTrip.component.css'],
})
export class NewTripComponent implements OnInit {

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  fourthFormGroup: FormGroup;
  tripObj = {};
  // transpo;
  // lodging;
  // quality;
  // should i make a obj from scratch or mold it from the trips model?
  // tripObj: Trip;
  form = new FormGroup({
    destination: new FormControl(),
    tripName: new FormControl(),
    departureDate: new FormControl(),
    returnDate: new FormControl()
  })
  constructor(private _formBuilder: FormBuilder, private router: Router, private date: DateService) { }

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
  
  setFormValues(obj) {
    console.log(this.form.get('destination').value);
    obj['destination'] = this.form.get('destination').value;

    console.log(this.form.get('tripName').value);
    obj['title'] = this.form.get('tripName').value;

    console.log(this.form.get('departureDate').value);
    obj['departure'] = this.form.get('departureDate').value;

    console.log(this.form.get('returnDate').value);
    obj['returnDate'] = this.form.get('returnDate').value;

    obj['origin'] = 'New Orleans';
  }

  setPriceValue(obj, val) {
    console.log(val);
    obj['quality'] = val;
  }

  setTranspoValue(obj, val) {
    console.log(val);
    obj['transpo'] = val;
  }

  setLodgingValue(obj, val) {
    console.log(val);
    obj['lodging'] = val;
  }
  logInputs() {
    console.log(this.form.get('destination').value);
    console.log(this.form.get('tripName').value);
    console.log(this.form.get('departureDate').value);
    console.log(this.form.get('returnDate').value);
    console.log('tripObj', this.tripObj);
  }
  goToPage(pageName: string) {
    this.router.navigate([`${pageName}`], { state: { data: this.tripObj } });
  }

}
