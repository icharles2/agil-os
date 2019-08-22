import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BudgetComponent } from './budgetBreakdown/budget.component';
import { DashboardView } from './dashboard.component';
import { DialogOverviewExample, DialogOverviewExampleDialog } from './dialog/dialog.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardView,
  },
  {
    path: '',
    component: DialogOverviewExample,
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
