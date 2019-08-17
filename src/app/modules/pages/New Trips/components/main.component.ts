import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
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
    // Object.defineProperties(obj, {
    //   destination: {
    //     value: this.form.get('destination').value,
    //     writable: true,
    //   },
    //   title: {
    //     value: this.form.get('tripName').value,
    //     writable: true,
    //   },
    //   departure: {
    //     value: this.form.get('departureDate').value,
    //     writable: true,
    //   },
    //   returnDate: {
    //     value: this.form.get('returnDate').value,
    //     writable: true,
    //   },
    //   origin: {
    //     value: 'New Orleans',
    //     writable: true,
    //   },
    // });
    console.log(this.form.get('destination').value);
    obj['destination'] = this.form.get('destination').value;

    console.log(this.form.get('tripName').value);
    obj['title'] = this.form.get('tripName').value;

    console.log(this.form.get('departureDate').value);
    obj['departure'] = this.form.get('departureDate').value;

    console.log(this.form.get('returnDate').value);
    obj['returnDate'] = this.form.get('returnDate').value;

    obj['origin'] = 'New Orleans';

    // obj.destination = this.form.get('destination').value;
    // obj.title = this.form.get('tripName').value;
    // obj.departure = this.form.get('departureDate').value;
    // obj.return = this.form.get('returnDate').value;
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
    // console.log('form', this.form);
    console.log('tripObj', this.tripObj);
  }
  goToPage(pageName: string) {
    this.router.navigate([`${pageName}`], { state: { data: this.tripObj } });
    console.log(this.tripObj);
    // , { state: this.form }
  }

}
