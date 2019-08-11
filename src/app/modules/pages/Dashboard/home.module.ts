import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StylesModule } from 'src/app/shared/styles.module';
import { HomeRoutingModule } from './home-routing.module';
import { TripComponent } from './trip/trip.component';
import { HomeComponent } from './home.component'



@NgModule({
  declarations: [
    HomeComponent,
    TripComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    StylesModule
  ]
})
export class HomeModule { }
