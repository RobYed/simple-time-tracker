import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';

import { ProtectedPage } from './../protected';
import { LoginPageName } from './../pages';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage extends ProtectedPage {

  constructor(protected fireAuth: AngularFireAuth, public navCtrl: NavController) {
    super(fireAuth);
  }

  logout() {
    this.fireAuth.auth.signOut()
      .then(() => this.navCtrl.setRoot(LoginPageName));
  }

}
