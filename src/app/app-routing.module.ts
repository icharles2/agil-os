import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignComponent } from './modules/pages/Signup/signup.component';
import { DashboardView } from './modules/pages/Budget/dashboard.component';
import { LogComponent } from './modules/pages/login/login.component';

const routes: Routes = [
  {
    path: '',
    component: SignComponent,
  },
  {
    path: 'newtrip',
    loadChildren: () =>
      import('./modules/pages/New Trips/components/newTrip.module').then(mod => mod.NewTripModule),
  },
  {
    path: 'budget',
    loadChildren: () => import('./modules/pages/Budget/dashboard.module').then(mod => mod.DashboardModule),
  },
  {
    path: 'landing',
    component: SignComponent,
    // /modules/pages/Budget/home.module
  },
  {
    path: 'home',
    loadChildren: () => import('./modules/pages/HomePage/homepage.module').then(mod => mod.HomePageModule),
  },
  {
    path: 'login',
    component: LogComponent,
  }

  // {
  //   path: '',
  //   redirectTo: '',
  //   pathMatch: 'full',
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
