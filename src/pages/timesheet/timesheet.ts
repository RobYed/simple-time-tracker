import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';

import { ProtectedPage } from './../protected';

@IonicPage({
  segment: 'timesheet/:userId/:year/:month'
})
@Component({
  selector: 'page-timesheet',
  templateUrl: 'timesheet.html'
})
export class TimesheetPage extends ProtectedPage {
  
  userId: string;
  year: string;
  month: string;

  constructor(
    protected fireAuth: AngularFireAuth,
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
    super(fireAuth);

    this.userId = this.navParams.get('userId');
    this.year = this.navParams.get('year');
    this.month = this.navParams.get('month');
  }

}
