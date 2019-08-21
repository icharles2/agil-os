import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
// import { BudgetComponent } from './modules/pages/Dashboard/trip/budget.component';
import { StylesModule } from './shared/styles.module';
import { SignComponent } from './modules/pages/Signup/signup.component';
import { BudgetService } from './services/budget.service';
import { DateService } from './services/date.service';
import { DashboardView } from './modules/pages/Budget/dashboard.component';
// import { NgxGooglePlaceAutocompleteDirective } from 'ngx-google-place-autocomplete'



@NgModule({
  declarations: [AppComponent, SignComponent ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    BrowserAnimationsModule,
    StylesModule,
    AppRoutingModule,
    HttpClientModule,
  
  ],
  exports: [HttpClientModule],
  providers: [BudgetService, DateService],
  bootstrap: [AppComponent],
})
export class AppModule {}
