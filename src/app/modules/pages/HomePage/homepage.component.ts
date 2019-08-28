import { Component, Input, OnInit, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ThemeService } from '../../../services/theme.service';
import  { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface HometownData {
  answer: boolean;
  hometown: string;
}

@Component({
  // moduleId: module.id,
  selector: 'home-page',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
})

export class HomePageComponent implements OnInit{
  isDarkTheme: Observable<boolean>;
  hometown: '';
  user = {};
  notifications: number = 0;
  daysLeft: number = 0;
  countdown = 0;
  counter = 0;
  screenWidth: number;
  user = history.state.data;
  constructor(
    private themeService: ThemeService,
    private router: Router,
    public dialog: MatDialog,
    ) {
    this.screenWidth = window.innerWidth;
    window.onresize = () => {
    // set screenWidth on screen size change
      this.screenWidth = window.innerWidth;
    };
  }

  ngOnInit() {
    this.isDarkTheme = this.themeService.isDarkTheme;
    console.log('user', history.state.data);
  }

  toggleDarkTheme(checked: boolean) {
    this.themeService.setDarkTheme(checked);
  }

  sendNum(num) {
    this.daysLeft = num;
  }

  count(num) {
    this.counter = num;
  }

  notify(num) {
    this.notifications = num;
  }

  openDialog() {
    const dialogRef = this.dialog.open(HometownDialog, {
      width: '250px',
      data: { hometown: this.hometown },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      this.hometown = result;
    });
  }

}

@Component({
  selector: 'hometown-dialog',
  templateUrl: '../HomePage/dialogs/changeHometown.html',
})
export class HometownDialog {

  constructor(
    public dialogRef: MatDialogRef<HometownDialog>,
    @Inject(MAT_DIALOG_DATA) public data: HometownData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  goToPage(pageName: string) {
    this.router.navigate([`${pageName}`], { state: { data: this.user } });
  }
}
