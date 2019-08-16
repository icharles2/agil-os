import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LogComponent } from './modules/pages/Login/login.component';
import { SignComponent } from './modules/pages/Signup/signup.component';

const routes: Routes = [
  {
    path: 'login',
    component: LogComponent,
  },
  {
    path: 'signup',
    component: SignComponent,
  },
  {
    path: 'newtrip',
    loadChildren: () =>
      import('./modules/pages/New Trips/components/newTrip.module').then(mod => mod.NewTripModule),
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./modules/pages/Dashboard/home.module').then(mod => mod.HomeModule),
  },
  {
    path: 'landing',
    component: SignComponent,
  },
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
