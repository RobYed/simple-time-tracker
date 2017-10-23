import { TimesheetService } from './timesheet.service';
import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';

import { ProtectedPage } from './../protected';
import { TimesheetWeek } from './../../models/timesheet-week';

@IonicPage({
  segment: 'timesheet/:userId/:year/:month'
})
@Component({
  selector: 'page-timesheet',
  templateUrl: 'timesheet.html'
})
export class TimesheetPage extends ProtectedPage {
  
  userId: string;
  plannedHours = 39;

  year: string;
  month: string;
  timesheet: TimesheetWeek[];

  constructor(
    protected fireAuth: AngularFireAuth,
    public navCtrl: NavController,
    public navParams: NavParams,
    private timesheetService: TimesheetService
  ) {
    super(fireAuth);

    this.userId = this.navParams.get('userId');
    this.year = this.navParams.get('year');
    this.month = this.navParams.get('month');

    this.timesheet = this.timesheetService.getTimesheetForMonth(this.year, this.month, this.plannedHours);
    console.log('timesheet', this.timesheet);
  }



}
