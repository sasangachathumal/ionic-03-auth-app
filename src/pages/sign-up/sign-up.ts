import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthDataProvider } from '../../providers/auth-data/auth-data';

/**
 * Generated class for the SignUpPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html',
})
export class SignUpPage {

  dateRegex:any = /(0[1-9]|1[012])[- \/.](0[1-9]|[12][0-9]|3[01])[- \/.](19|20)\d\d/;
  emailRegex:any = '/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/';
  signUpForm:any;

  user:any = {
    "firstName": "",
    "lastName": "",
    "email": "",
    "dob": "",
    "address": "",
    "password": ""
  };
  password:string;
  confirmPassword:string;

  constructor(public navCtrl: NavController, public platform: Platform, public _authDataService: AuthDataProvider, public formBuilder: FormBuilder) {
    let backAction =  platform.registerBackButtonAction(() => {
      this.navCtrl.pop();
      backAction();
    },2);

    this.signUpForm = formBuilder.group({
      firstName: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      lastName: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      email: ['', Validators.compose([Validators.pattern(this.emailRegex), Validators.required])],
      dob: ['', Validators.compose([Validators.pattern('/(0[1-9]|1[012])[- \/.](0[1-9]|[12][0-9]|3[01])[- \/.](19|20)\d\d/'), Validators.required])],
      address: ['', Validators.compose([Validators.required])],
      password: ['',Validators.compose([Validators.minLength(6), Validators.required])],
      confirmPassword: ['',Validators.compose([Validators.minLength(6), Validators.required])]
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignUpPage');
  }

  openProfileImageSelector() {
    document.getElementById('profile_image_selector').click();
  }

  signUp () {
    if (this.signUpForm.valid) {
      if (this.checkPasswords()) {
        this.user.password = this.confirmPassword;
        let signUp = this._authDataService.registerUser(this.user);
        console.log("return", signUp);
      } else {

      }
    } else {

    }
  }

  private checkPasswords():boolean {
    return this.password === this.confirmPassword;
  }

  private checkDateOfBirth():boolean {
    return this.dateRegex.test(this.user.dob);
  }

}
