import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GetService } from 'src/app/services/get.service';
import { PostService } from 'src/app/services/posts.service';

@Component({
  selector: 'log-in',
  templateUrl: '../login/login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LogComponent implements OnInit {
  constructor(private router: Router, private get: GetService, private post: PostService) { }

  ngOnInit() { }

  verify() {
    const email = ((document.getElementById('email') as HTMLInputElement).value);
    const password = ((document.getElementById('password') as HTMLInputElement).value);

    console.log({
      email,
      password,
    });
    return {
      email,
      password,
    };
  }

  verifyUser() {
    const user = this.verify();
    return this.get.verifyUser(user.email, user.password)
      .subscribe(
        (data) => {
          if (Object.keys(data).length === 0) {
            // send alert saying email and password do not match
            console.log('user not found');
          } else {
            console.log('user found', data[0]);
            this.router.navigate(['/home']);
            // redirect to home with the user data for the main nav to render the info
          }
        },
        (err) => {
          // if err send alert saying email and password does not match
          // possibly pop up asking if theyve forgoten theyre password
          // alert saying invalid credentials or 'forgot to put your email/password!'
          // this only happens when both or one of the input fields is empty
          console.log('error in your validation', err);
        },
      );
  }
}
