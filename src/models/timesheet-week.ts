import { TimesheetDay } from './timesheet-day';
import * as getISOWeek from 'date-fns/get_iso_week';

export class TimesheetWeek {

  public weekNumber: number;
  public actualHours: number = 0;

  constructor(
    public days: TimesheetDay[] = [],
    public plannedHours: number
  ) {
    if (this.days.length != 0) {
      this.weekNumber = getISOWeek(this.days[0].day);
    }
  }

  getWeekNumberName(): string {
    return 'KW' + this.weekNumber.toString();
  }
}