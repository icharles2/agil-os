import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StylesModule } from 'src/app/shared/styles.module';
import { HomeRoutingModule } from './home-routing.module';
import { TripComponent } from './trip/trip.component';
import { HomeComponent } from './home.component'
// import { AppModule } from 'src/app/app.module';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
// import { BudgetService } from '../../../../budget.service';


@NgModule({
  declarations: [
    HomeComponent,
    TripComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    StylesModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
  ],
  providers: [
    // BudgetService,
  ]
})
export class HomeModule { }
