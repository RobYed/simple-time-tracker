import { Injectable } from '@angular/core';
import * as addDays from 'date-fns/add_days';
import * as endOfMonth from 'date-fns/end_of_month';
import * as isBefore from 'date-fns/is_before';
import * as isWeekend from 'date-fns/is_weekend';
import * as isLastWeekday from 'date-fns/is_sunday';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

import { TimesheetDay, DAY_TYPE, TimesheetDayObject } from './../../models/timesheet-day';
import { TimesheetWeek } from './../../models/timesheet-week';

@Injectable()
export class TimesheetService {

  constructor(private fireStore: AngularFirestore) {}

  public getTimesheetForMonth(userId: string, year: string, month: string): Observable<TimesheetWeek[]> {
    
    const timesheets = this.fireStore.collection('users')
      .doc(userId)
      .collection('timesheets', ref => {
        return ref
          .orderBy('day')
          .startAt(TimesheetService.getDateString(year, month, '01'))
          .endAt(TimesheetService.getDateString(year, month, '31'));
      })
      .valueChanges();
      
      timesheets.subscribe((timesheets: TimesheetDayObject[]) => {
        if (!timesheets || timesheets.length === 0) {
          this.addTimesheetForMonth(userId, year, month);
        }
      });
      
      return timesheets
        .map((timesheets: TimesheetDayObject[]) => TimesheetService.getTimesheetMonthFromArray(timesheets));
  }

  private static getDateString(year: string, month: string, day: string): string {
    return year + '-' + month + '-' + day;
  }

  private static getDateStringFromDate(date: Date): string {
    return date.toLocaleDateString('en-CA'); // format: YYYY-MM-DD
  }

  private static getDaysForMonth(year: string, month: string): TimesheetDay[] {
    const days = [];
  
    let currentString = TimesheetService.getDateString(year, month, '01');
    let currentDate = new Date(currentString);
    let currentType: DAY_TYPE;
    const endDate = endOfMonth(currentDate);
  
    while (isBefore(currentDate, endDate)) {
      currentType = TimesheetService.getDayTypeFromDate(currentDate);
      days.push(new TimesheetDay(currentString, currentType));
      currentDate = addDays(currentDate, 1);
      currentString = TimesheetService.getDateStringFromDate(currentDate);
    }
  
    return days;
  }

  private static getDayTypeFromDate(date: Date): DAY_TYPE {
    if (isWeekend(date)) {
      return DAY_TYPE.WEEKEND;
    } else {
      return DAY_TYPE.WORKDAY;
    }
  }

  private static getTimesheetMonthFromArray(timesheetDays: TimesheetDayObject[]): TimesheetWeek[] {
    const weeks = [];
    let plannedHours = 38; // TODO: add logic
    
    let timesheetDay: TimesheetDay;
    let currentWeekDays: TimesheetDay[] = [];

    timesheetDays.forEach((day: TimesheetDayObject) => {
      timesheetDay = new TimesheetDay(day.day, day.type);
      timesheetDay.from = day.from;
      timesheetDay.to = day.to;
      currentWeekDays.push(timesheetDay);

      if (isLastWeekday(new Date(timesheetDay.day))) {
        weeks.push(new TimesheetWeek(currentWeekDays, plannedHours));
        currentWeekDays = [];
      }
    });

    return weeks;
  }

  private addTimesheetForMonth(userId: string, year: string, month: string): void {
    const timesheetDays = TimesheetService.getDaysForMonth(year, month);
    this.saveTimesheet(userId, timesheetDays);
  }
  

  private saveTimesheet(userId: string, timesheetDays: TimesheetDay[] = []): Promise<void> {
    const batch = this.fireStore.firestore.batch();

    const collection = this.fireStore.collection('users')
      .doc(userId)
      .collection('timesheets');

    timesheetDays.forEach(day => collection.doc(day.day).set(day.toObject()));

    return batch.commit();
  }
}