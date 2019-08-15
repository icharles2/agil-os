import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BudgetComponent } from './Budget/budget.component';

import { StylesModule } from './shared/styles.module';
import { LogComponent } from './modules/pages/Login/login.component';
import { SignComponent } from './modules/pages/Signup/signup.component';
import { BudgetService } from './services/budget.service';
import { DateService } from './services/date.service';

@NgModule({
  declarations: [
    AppComponent,
    BudgetComponent,
    LogComponent,
    SignComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    BrowserAnimationsModule,
    StylesModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  exports: [
    HttpClientModule,
  ],
  providers: [
    BudgetService,
    DateService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
