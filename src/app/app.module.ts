import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ResultsComponent } from './results.component';
import { HomeComponent } from './homepage/home.component';
import { TravelComponent } from './dTree/travelMethod.component';
import { RangeComponent } from './dTree/priceRange.component';
import { LodgeMethod } from './dTree/lodgingMethod.component';
import { DestinationComponent } from './dTree/destination.component';
import { CarComponent } from './dTree/carMethods/car.component';

@NgModule({
  declarations: [
    AppComponent,
    ResultsComponent,
    HomeComponent,
    TravelComponent,
    RangeComponent,
    LodgeMethod,
    DestinationComponent,
    CarComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
