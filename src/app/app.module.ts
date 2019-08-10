import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BudgetComponent } from './modules/pages/Budget/budget.component';
import { HomeComponent } from './modules/pages/Dashboard/home.component';
import { LandingNavComponent } from './shared/landing-nav/landing-nav.component';
import { StylesModule } from './shared/styles.module';

@NgModule({
  declarations: [
    AppComponent,
    BudgetComponent,
    HomeComponent,
    LandingNavComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    BrowserAnimationsModule,
    StylesModule,
    AppRoutingModule,
  ],
  exports: [
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
