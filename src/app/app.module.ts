import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OverlayModule } from '@angular/cdk/overlay';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { StylesModule } from './shared/styles.module';
import { SignComponent } from './modules/pages/Signup/signup.component';
import { BudgetService } from './services/budget.service';
import { DateService } from './services/date.service';
import { ThemeService } from './services/theme.service';
import { DashboardView } from './modules/pages/Budget/dashboard.component';
import { LogComponent } from './modules/pages/login/login.component';
import { LandingComponent } from './modules/pages/landing/landing.component';
// import { NgxGooglePlaceAutocompleteDirective } from 'ngx-google-place-autocomplete'
import { GooglePlaceModule } from "ngx-google-places-autocomplete";


@NgModule({
  declarations: [AppComponent, SignComponent, LogComponent, LandingComponent],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    BrowserAnimationsModule,
    StylesModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    OverlayModule,
    GooglePlaceModule,
  ],
  exports: [HttpClientModule, OverlayModule],
  providers: [BudgetService, DateService, ThemeService],
  bootstrap: [AppComponent],
})
export class AppModule {}
