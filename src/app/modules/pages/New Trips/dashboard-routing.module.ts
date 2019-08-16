import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './components/main.component';
import { HomeComponent } from '../Dashboard/home.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
  },

  // {
  //   path: 'dashboard',
  //   component: HomeComponent
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
