import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StylesModule } from 'src/app/shared/styles.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { BudgetComponent } from './budgetBreakdown/budget.component';
import { DashboardView } from './dashboard.component';
// import { AppModule } from 'src/app/app.module';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { EditButtonsComponent } from './edit-buttons/edit-buttons.component';
// import { BudgetService } from '../../../../budget.service';

@NgModule({
  declarations: [DashboardView, BudgetComponent, EditButtonsComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    StylesModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
  ],
  providers: [
    // BudgetService,
  ],
})
export class DashboardModule {}
