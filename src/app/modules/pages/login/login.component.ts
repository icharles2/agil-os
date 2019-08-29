import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { GetService } from 'src/app/services/get.service';
import { PostService } from 'src/app/services/posts.service';

@Component({
  selector: 'log-in',
  templateUrl: '../login/login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LogComponent implements OnInit {
  hide = true;
  user;
  firstFormGroup: FormGroup;
  form = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });
  constructor(
    // tslint:disable-next-line: variable-name
    private _formBuilder: FormBuilder,
    private router: Router,
    private get: GetService,
    private post: PostService) {
  }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required],
    });
  }

  getErrorMessage() {
    return this.form.get('email').hasError('required') ? 'You must enter a value' :
        this.form.get('email').hasError('email') ? 'Not a valid email' :
            '';
  }

  verify() {
    const email = this.form.get('email').value;
    const password = this.form.get('password').value;

    return {
      email,
      password,
    };
  }

  verifyUser() {
    const userInfo = this.verify();
    return this.get.verifyUser(userInfo.email, userInfo.password)
      .subscribe(
        (data) => {
          if (Object.keys(data).length === 0) {
            // send alert saying email and password do not match
          } else {
            // console.log('user found', data[0]);
            this.user = data[0];
            this.router.navigate(['/home'], { state: { data: this.user } });
            // this.router.navigate(['/home']);
            // redirect to home with the user data for the main nav to render the info
          }
        },
        (err) => {
          // if err send alert saying email and password does not match
          // possibly pop up asking if they've forgoten their password
          // alert saying invalid credentials or 'forgot to put your email/password!'
          // this only happens when both or one of the input fields is empty
          console.log('error in your validation', err);
        },
      );
  }
}
