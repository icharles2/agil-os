import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StylesModule } from '../../../../shared/styles.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NewTripRoutingModule } from '../newTrip-routing.module';
import { NewTripComponent } from './newTrip.component';
import { GooglePlaceModule } from "ngx-google-places-autocomplete";
// import { NgxGooglePlaceAutocompleteDirective } from 'ngx-google-place-autocomplete'


@NgModule({
  declarations: [NewTripComponent],
  imports: [CommonModule, StylesModule, NewTripRoutingModule, ReactiveFormsModule, GooglePlaceModule],
})
export class NewTripModule {}
