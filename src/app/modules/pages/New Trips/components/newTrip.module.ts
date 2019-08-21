import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StylesModule } from '../../../../shared/styles.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NewTripRoutingModule } from '../newTrip-routing.module';
import { NewTripComponent } from './newTrip.component';
import { NgxGooglePlaceAutocompleteDirective } from 'ngx-google-place-autocomplete'


@NgModule({
  declarations: [NewTripComponent, NgxGooglePlaceAutocompleteDirective],
  imports: [CommonModule, StylesModule, NewTripRoutingModule, ReactiveFormsModule],
})
export class NewTripModule {}
