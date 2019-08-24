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
        // if successful login, redirect to home with the user info, need to make get request for user info
        // send user info to dashboard components
       console.log(data);
      },
      (err) => {
        // if err send alert saying email and password does not match
        // possibly pop up asking if theyve forgoten theyre password
        console.log('no user matches', err);
      },
    );
  }
}
