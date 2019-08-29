import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, EmailValidator } from '@angular/forms';
import { Router } from '@angular/router';
import { GetService } from 'src/app/services/get.service';
import { PostService } from 'src/app/services/posts.service';

@Component({
  selector: 'sign-in',
  templateUrl: '../Signup/signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignComponent implements OnInit {
  hide = true;
  signupErr = false;
  firstFormGroup: FormGroup;
  form = new FormGroup({
    username: new FormControl(''),
    hometown: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
  });

  // user: FormGroup;
  saltRounds = 10;
  inputPassword = 'password';
  username: string;
  userInfo;
  // inputPassword = 'password';

  formattedAddress = '';

  options = {
    types: ['(cities)'],
    componentRestriction: {
      country: ['USA'],
    },
  };

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private get: GetService,
    private post: PostService,
    ) {}
  ngOnInit() {
    this.firstFormGroup = this.formBuilder.group({
      firstCtrl: ['', Validators.required],
    });
  }

  getUserInfo() {
    const username = this.form.get('username').value;
    // const hometown = ((document.getElementById('hometown') as HTMLInputElement).value);
    const hometown = this.formattedAddress.split(',')[0];
    const email = this.form.get('email').value;
    const password = this.form.get('password').value;

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

  handleAddressChange(event: any) {
    console.log('Address change:', event);
    this.formattedAddress = event.formatted_address;
  }

  registerUser() {
    this.userInfo = this.getUserInfo();
    // console.log(typeof user);
    // pass this user to the post request
    // if any of the inputs are empty dont run this query
    return this.post.saveUsers(
      this.userInfo.username, this.userInfo.hometown, this.userInfo.email, this.userInfo.password)
    .subscribe(
      (data) => {
        // user was successfully saved
        // redirect to the homepage with the user data to give to the main nav
        console.log('user posted', data);
        console.log('state obj', this.userInfo);
        this.router.navigate(['/home'], { state: { data: this.userInfo } });
        // this.router.navigate(['/home']);
      },
      (err) => {
        this.signupErr = true;
        console.log('user not saved', err);
      },
    );
  }

}
