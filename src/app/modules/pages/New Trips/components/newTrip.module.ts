import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StylesModule } from '../../../../shared/styles.module';
import { ReactiveFormsModule } from '@angular/forms';
import { DashboardRoutingModule } from '../dashboard-routing.module';
import { NewTripComponent } from './newTrip.component';

@NgModule({
  declarations: [NewTripComponent],
  imports: [CommonModule, StylesModule, DashboardRoutingModule, ReactiveFormsModule],
})
export class NewTripModule {}
