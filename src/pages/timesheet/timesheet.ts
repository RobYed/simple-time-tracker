import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage, App } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';

import { ProtectedPage } from './../protected';
import { TimesheetWeek } from './../../models/timesheet-week';
import { TimesheetService } from './timesheet.service';
import { TimesheetPageName } from './../pages';
import { Observable } from 'rxjs/Observable';

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
  timesheet: Observable<TimesheetWeek[]>;

  constructor(
    protected fireAuth: AngularFireAuth,
    public navCtrl: NavController,
    public navParams: NavParams,
    private timesheetService: TimesheetService,
    private appRoot: App
  ) {
    super(fireAuth);

    this.userId = this.navParams.get('userId');
    this.year = this.navParams.get('year');
    this.month = this.navParams.get('month');

    this.timesheet = this.timesheetService.getTimesheetForMonth(this.userId, this.year, this.month);
    this.timesheet.subscribe(timesheet => console.log('timesheet', timesheet));
  }

  selectYear() {
    console.log('selected year:', this.year);
  }

  selectMonth() {
    console.log('selected month:', this.month);
  }

  nextMonth() {
    this.openTimesheet(
      TimesheetPage.getNextYear(this.year, this.month),
      TimesheetPage.getNextMonth(this.month)
    );
  }

  previousMonth() {
    this.openTimesheet(
      TimesheetPage.getPreviousYear(this.year, this.month),
      TimesheetPage.getPreviousMonth(this.month)
    );
  }

  private static getNextYear(year: string, month: string): string {
    return (parseInt(month) + 1 === 13 ? parseInt(year) + 1 : year).toString();
  }

  private static getNextMonth(month: string): string {
    return TimesheetPage.padStart(
      (parseInt(month) + 1 === 13 ? '1' : parseInt(month) + 1).toString(), 2, '0'
    );
  }

  private static getPreviousYear(year: string, month: string): string {
    return (parseInt(month) - 1 === 0 ? parseInt(year) - 1 : year).toString();
  }

  private static getPreviousMonth(month: string): string {
    return TimesheetPage.padStart(
      (parseInt(month) - 1 === 0 ? '12' : parseInt(month) - 1).toString(), 2, '0'
    );
  }

  private static padStart(string: string, targetLength: number, character: string): string {
    return String(character.repeat(targetLength) + string).slice(-targetLength);
  }

  private openTimesheet(year: string, month: string) {
    this.navCtrl.setRoot(TimesheetPageName, {
      userId: this.userId,
      year: year,
      month: month
    });
  }

}
