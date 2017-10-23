import { Injectable } from '@angular/core';
import * as addWeeks from 'date-fns/add_weeks';
import * as startOfWeek from 'date-fns/start_of_week';
import * as isSameMonth from 'date-fns/is_same_month';
import * as endOfWeek from 'date-fns/end_of_week';
import * as endOfMonth from 'date-fns/end_of_month';
import * as isBefore from 'date-fns/is_before';

import { TimesheetWeek } from './../../models/timesheet-week';

@Injectable()
export class TimesheetService {

  private static FIRST_WEEKDAY = 1; // = Monday

  constructor() {}

  public getTimesheetForMonth(year: string, month: string, plannedHours: number): TimesheetWeek[] {
    const months = [];
    
    let startDay = TimesheetService.getFirstDayOfMonth(year, month);
    let endDay: Date = endOfWeek(startDay, { weekStartsOn: TimesheetService.FIRST_WEEKDAY });

    while (TimesheetService.isInMonth(startDay, year, month)) {
      months.push(new TimesheetWeek(plannedHours, startDay, endDay));
      startDay = TimesheetService.getStartOfFollowingWeek(startDay);
      endDay = TimesheetService.getEndOfWeekInSameMonth(startDay);
    }

    return months;
  }

  private static isInMonth(date: Date, year: string, month: string): boolean {
    return isSameMonth(date, new Date(parseInt(year), parseInt(month) + 1, 1));
  }

  private static getFirstDayOfMonth(year: string, month: string): Date {
    return new Date(parseInt(year), parseInt(month) + 1, 1);
  }

  private static getStartOfFollowingWeek(day: Date): Date {
    return startOfWeek(addWeeks(day, 1), { weekStartsOn: TimesheetService.FIRST_WEEKDAY });
  }

  private static getEndOfWeekInSameMonth(date: Date) {
    let lastWeekDay = endOfWeek(date, { weekStartsOn: TimesheetService.FIRST_WEEKDAY });
    let lastMonthDay = endOfMonth(date);
    if (isBefore(lastWeekDay, lastMonthDay)) {
      return lastWeekDay;
    } else {
      return lastMonthDay;
    }
  }
}