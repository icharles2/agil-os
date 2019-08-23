import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MainNavComponent } from './main-nav/main-nav.component';
import { LandingNavComponent } from './landing-nav/landing-nav.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {
  MatButtonModule,
  MatMenuModule,
  MatStepperModule,
  MatFormFieldModule,
  MatInputModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatCardModule,
  MatExpansionModule,
  MatDividerModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatSortModule,
  MatTableModule,
  MatProgressBarModule,
  MatTooltipModule,
  MatButtonToggleModule,
  MatSelectModule,
  MatDialogModule,
  MatBadgeModule,
} from '@angular/material';

@NgModule({
  declarations: [MainNavComponent, LandingNavComponent],
  imports: [
    CommonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatMenuModule,
    MatButtonModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule,
    MatExpansionModule,
    MatDividerModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatTableModule,
    MatProgressBarModule,
    MatTooltipModule,
    MatButtonToggleModule,
    FlexLayoutModule,
    MatSelectModule,
    FormsModule,
    MatDialogModule,
    MatBadgeModule,
    MatSnackBarModule,
  ],
  exports: [
    LayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MainNavComponent,
    LandingNavComponent,
    MatButtonModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule,
    MatExpansionModule,
    MatDividerModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatTableModule,
    MatProgressBarModule,
    MatTooltipModule,
    MatButtonToggleModule,
    FlexLayoutModule,
    MatSelectModule,
    FormsModule,
    MatDialogModule,
    MatBadgeModule,
    MatSnackBarModule,
  ],
})
export class StylesModule {}
