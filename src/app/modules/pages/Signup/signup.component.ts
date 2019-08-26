import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { GetService } from 'src/app/services/get.service';
import { PostService } from 'src/app/services/posts.service';

@Component({
  selector: 'sign-in',
  templateUrl: '../Signup/signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignComponent implements OnInit {
  user: FormGroup;
  saltRounds = 10;
  inputPassword = 'password';
  username: string;
  constructor(private router: Router, private get: GetService, private post: PostService) {}
  ngOnInit() {}

  getUserInfo() {
    const username = ((document.getElementById('username') as HTMLInputElement).value);
    const hometown = ((document.getElementById('hometown') as HTMLInputElement).value);
    const email = ((document.getElementById('email') as HTMLInputElement).value);
    const password = ((document.getElementById('password') as HTMLInputElement).value);
    // on submit user info is taken, either we pass the result of this func to the service or we call the func in here
    console.log({
      username,
      hometown,
      email,
      password,
    });
    return {
      username,
      hometown,
      email,
      password,
    };
  }

  registerUser() {
    const user = this.getUserInfo();
    // console.log(typeof user);
    // pass this user to the post request
    // if any of the inputs are empty dont run this query
    return this.post.saveUsers(user.username, user.hometown, user.email, user.password)
    .subscribe(
      (data) => {
        // user was successfuly saved
        // redirect to the homepage with the user data to give to the main nav
        // router.navigate(['/home']) and also send the data back for the dashboard and main nav to render

        console.log('user posted', data);
        this.router.navigate(['/home']);
      },
      (err) => {
        // user could not be saved
        // display an alert/error saying email already exist or invalid hometown/name etc.
        console.log('user not saved', err);
      },
    );
  }

}
