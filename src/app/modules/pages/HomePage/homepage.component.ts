import { Component, Input, OnInit, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { PostService } from '../../../services/posts.service'
import { ThemeService } from '../../../services/theme.service';
import  { MatSnackBar, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

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
  notifications: number = 0;
  daysLeft: number = 0;
  countdown = 0;
  counter = 0;
  screenWidth: number;
  user;
  constructor(
    private themeService: ThemeService,
    private router: Router,
    public dialog: MatDialog,
    private post: PostService,
    private _snackBar: MatSnackBar,
    ) {
    this.screenWidth = window.innerWidth;
    window.onresize = () => {
    // set screenWidth on screen size change
      this.screenWidth = window.innerWidth;
    };
  }

  ngOnInit() {
    this.isDarkTheme = this.themeService.isDarkTheme;
    this.user = history.state.data;
    console.log(this.user);
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
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      this.user['hometown'] = result;
      this.post.updateUsers(this.user)
      .subscribe((data) => {
        this.openSnackBar('Your hometown has been changed!', '');
      });
    });
  }

  openSnackBar(message, action) {
    const snackBarRef = this._snackBar.open(message, action, {
      duration: 3000,
    });
    snackBarRef.afterDismissed().subscribe(() => {
      console.log('The snackbar');
    });
  }

  goToPage(pageName: string) {
    this.router.navigate([`${pageName}`], { state: { data: this.user } });
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

}
