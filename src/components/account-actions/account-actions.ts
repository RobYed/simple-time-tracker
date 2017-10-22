import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';

import { LoginPageName } from './../../pages/pages';

@Component({
  selector: 'account-actions',
  templateUrl: './account-actions.html'
})
export class AccountActionsComponent {

  constructor(private fireAuth: AngularFireAuth, private navCtrl: NavController) {}

  openProfile() {

  }

  openSettings() {

  }

  logout() {
    this.fireAuth.auth.signOut()
      .then(() => this.navCtrl.setRoot(LoginPageName));
  }
}