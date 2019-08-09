import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BudgetComponent } from './modules/pages/Budget/budget.component';
import { HomeComponent } from './modules/pages/Dashboard/home.component';
import { TranspoComponent } from './modules/pages/New Trips/Transpo/transpo.component';
import { RangeComponent } from './modules/pages/New Trips/Price/price.component';
import { LodgeMethod } from './modules/pages/New Trips/Lodging/lodging.component';
import { DestinationComponent } from './modules/pages/New Trips/newTripForm.component';
import { CarComponent } from './modules/pages/New Trips/Transpo/car.component';


@NgModule({
  declarations: [
    AppComponent,
    BudgetComponent,
    HomeComponent,
    TranspoComponent,
    RangeComponent,
    LodgeMethod,
    DestinationComponent,
    CarComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
