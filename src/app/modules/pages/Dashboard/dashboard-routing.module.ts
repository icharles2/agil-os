import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BudgetComponent } from './budgetBreakdown/budget.component';
import { DashboardView } from './dashboard.component';
// import { }

const routes: Routes = [
  {
    path: '',
    component: DashboardView,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
