import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './modules/pages/Dashboard/home.component';
import { BudgetComponent } from './modules/pages/Budget/budget.component';


const routes: Routes = [
  // { path: '', redirectTo: '/app', pathMatch: 'full'},
  // { path: "app", component: AppComponent},
  { 
    path: 'newtrip', 
    loadChildren: () => import('./modules/pages/New Trips/components/newTrip.module').then(mod => mod.NewTripModule) 
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  { 
    path: '', 
    redirectTo: '',
    pathMatch: 'full', 
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
