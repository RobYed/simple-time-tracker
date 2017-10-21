import { Component } from '@angular/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';

import { HomePageName } from '../pages';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  
  account: { email: string, password: string } = {
    email: 'test@example.com',
    password: 'test'
  };

  // Our translated text strings
  private loginErrorString: string = 'Login fehlgeschlagen';

  constructor(public navCtrl: NavController,
    public toastCtrl: ToastController) {
  }

  // Attempt to login in through our User service
  doLogin() {
    /*
    this.user.login(this.account).subscribe((resp) => {
      this.navCtrl.push(HomePageName);
    }, (err) => {
      this.navCtrl.push(HomePageName);
      // Unable to log in
      let toast = this.toastCtrl.create({
        message: this.loginErrorString,
        duration: 3000,
        position: 'top'
      });
      toast.present();
    });
    */
  }
}
