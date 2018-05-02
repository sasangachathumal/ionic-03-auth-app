import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';

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

  constructor(public navCtrl: NavController, public platform: Platform, public _authDataService: AuthDataProvider) {
    let backAction =  platform.registerBackButtonAction(() => {
      this.navCtrl.pop();
      backAction();
    },2)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignUpPage');
  }

  openProfileImageSelector() {
    document.getElementById('profile_image_selector').click();
  }

  signUp () {
    if (this.checkDateOfBirth()) {
      if (this.checkPasswords()) {
        this.user.password = this.confirmPassword;
        let signUp = this._authDataService.registerUser(this.user);
        console.log("return", signUp);
      }
    }
  }

  private checkPasswords():boolean {
    return this.password === this.confirmPassword;
  }

  private checkDateOfBirth():boolean {
    return this.dateRegex.test(this.user.dob);
  }

}
