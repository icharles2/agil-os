import { NgModule } from '@angular/core';
import { HomePageComponent } from './homepage.component';
import { HomePageRoutingModule } from './homepage-routing.module';
import { CommonModule } from '@angular/common';
import { StylesModule } from '../../../shared/styles.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [HomePageComponent],
  imports: [HomePageRoutingModule, StylesModule, CommonModule, ReactiveFormsModule],
  providers: [],
})

export class HomePageModule {}
