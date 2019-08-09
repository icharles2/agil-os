import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './homepage/home.component';
import { ResultsComponent } from './results.component';

const routes: Routes = [
  { path: 'home', pathMatch: 'full', component: HomeComponent},
  { path: 'results', pathMatch: 'full', component: ResultsComponent},
  // { path: 'shop', loadChildren: () => import('./shop/shop.module').then(m => m.ShopModule) }, example
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
