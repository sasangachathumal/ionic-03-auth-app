import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform  } from 'ionic-angular';

import { SignInPage } from '../sign-in/sign-in';
import { SignUpPage } from '../sign-up/sign-up';

/**
 * Generated class for the WelcomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
})
export class WelcomePage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public platform: Platform ) {
    platform.registerBackButtonAction(() => {
      console.log("backPressed 1");
    },1);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WelcomePage');
  }

  navigateToSignin() {
    this.navCtrl.push(SignInPage);
  }

  navigateToSignUp() {
    this.navCtrl.push(SignUpPage);
  }

}
