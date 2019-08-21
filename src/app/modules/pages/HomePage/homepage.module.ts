import { NgModule } from '@angular/core';
import { HomePageComponent } from './homepage.component';
import { HomePageRoutingModule } from './homepage-routing.module';
import { CommonModule } from '@angular/common';
import { StylesModule } from '../../../shared/styles.module';
import { ReactiveFormsModule } from '@angular/forms';
import { TripsComponent } from './trips/trips.component';
import { TripItemComponent } from './trip-item/trip-item.component';

@NgModule({
  declarations: [HomePageComponent, TripsComponent, TripItemComponent],
  imports: [HomePageRoutingModule, StylesModule, CommonModule, ReactiveFormsModule],
  providers: [],
})

export class HomePageModule {}
