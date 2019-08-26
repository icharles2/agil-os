import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Trip } from '../../../../models/Trips';
import { DateService } from '../../../../services/date.service';
// '../components/newTrip.component.html'
// '../components/AutoAddress.html'
@Component({
  selector: 'dashboard-main',
  templateUrl: '../components/newTrip.component.html',
  styleUrls: ['../components/newTrip.component.css'],
})
export class NewTripComponent implements OnInit {

  formattedAddress = '';

  options = {
    types: ['(cities)'],
    componentRestriction: {
      country: ['USA'],
    },
  };

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  fourthFormGroup: FormGroup;
  tripObj = {};
  transpo;
  lodging;
  quality;
  form = new FormGroup({
    destination: new FormControl(),
    tripName: new FormControl(),
    departureDate: new FormControl(),
    returnDate: new FormControl(),
  });
  constructor(
    private _formBuilder: FormBuilder,
    private router: Router,
    private date: DateService) { }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required],
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required],
    });
    this.thirdFormGroup = this._formBuilder.group({
      thirdCtrl: ['', Validators.required],
    });
    this.fourthFormGroup = this._formBuilder.group({
      fourthCtrl: ['', Validators.required],
    });
  }
  handleAddressChange(event: any) {
    console.log('Address change:', event);
    this.formattedAddress = event.formatted_address;
  }

  setFormValues(obj) {
    // obj['destination'] = this.form.get('destination').value;
    obj['destination'] = this.formattedAddress.split(',')[0];
    obj['title'] = this.form.get('tripName').value;
    obj['departure'] = this.date.dateSlice(this.form.get('departureDate').value);
    obj['returnDate'] = this.date.dateSlice(this.form.get('returnDate').value);
    obj['origin'] = 'New Orleans';
  }

  setPriceValue(obj, val) {
    obj['quality'] = val;
  }

  setRentalBoolean(obj, val) {
    obj['rental'] = val;
  }

  setTranspoValue(obj, val) {
    obj['transpo'] = val;
  }

  setLodgingValue(obj, val) {
    obj['lodging'] = val;
  }
  goToPage(pageName: string) {
    this.router.navigate([`${pageName}`], { state: { data: this.tripObj } });
  }

}
