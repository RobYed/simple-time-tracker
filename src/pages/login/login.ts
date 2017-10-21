import { Component } from '@angular/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';

import { HomePageName } from '../pages';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  account: { email: string, password: string } = {
    email: 'test@example.com',
    password: 'test1234'
  };

  // Our translated text strings
  private loginErrorString: string = 'Login fehlgeschlagen';

  constructor(
    public navCtrl: NavController,
    public fireAuth: AngularFireAuth,
    public toastCtrl: ToastController) {
  }

  // Attempt to login in through our User service
  login() {
    this.fireAuth.auth.signInWithEmailAndPassword(this.account.email, this.account.password)
      .then(() => this.navCtrl.setRoot(HomePageName))
      .catch((error) => {
        // Unable to log in
        let toast = this.toastCtrl.create({
          message: this.loginErrorString,
          duration: 3000,
          position: 'top'
        });
        toast.present();
      });
  }
}
