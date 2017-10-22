import { Injectable } from '@angular/core';

import { TimesheetWeek } from './../../models/timesheet-week';

@Injectable()
export class TimesheetService {

  constructor() {}

  private static getFirstDayOfMonth(year, month) {
    return new Date(year, month + 1, 1);
  }

  private getTimesheetWeeks(year: number, month: number, plannedHours: number): TimesheetWeek[] {
    const months = [];
    const firstDay = TimesheetService.getFirstDayOfMonth(year, month);
    months.push(new TimesheetWeek(plannedHours, firstDay));

    // TODO: add rest of months
    
    return months;
  }
}