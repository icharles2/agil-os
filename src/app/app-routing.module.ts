import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './modules/pages/Dashboard/home.component';
import { BudgetComponent } from './modules/pages/Budget/budget.component';


const routes: Routes = [
  { 
    path: 'newtrip', 
    loadChildren: () => import('./modules/pages/New Trips/components/newTrip.module').then(mod => mod.NewTripModule) 
  },
  { 
    path: 'dashboard', 
    loadChildren: () => import('./modules/pages/Dashboard/home.module').then(mod => mod.HomeModule)
  },
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
