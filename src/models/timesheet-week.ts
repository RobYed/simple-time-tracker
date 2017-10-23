import { TimesheetDay } from './timesheet-day';
import * as getISOWeek from 'date-fns/get_iso_week';
import * as isAfter from 'date-fns/is_after';
import * as addDays from 'date-fns/add_days';

export class TimesheetWeek {

  days: TimesheetDay[] = [];
  weekNumber: number;
  actualHours: number = 0;

  constructor(
    public plannedHours: number,
    private from: Date,
    private to: Date
  ) {
    this.weekNumber = getISOWeek(from);
    
    let currentDate = from;
    
    while (!isAfter(currentDate, to)) {
      this.days.push(new TimesheetDay(currentDate));
      currentDate = addDays(currentDate, 1);
    }
  }

  getWeekNumberName(): string {
    return 'KW' + this.weekNumber.toString();
  }
}