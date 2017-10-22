import { TimesheetDay } from './timesheet-day';

export class TimesheetWeek {

  days: TimesheetDay[];
  weekNumber: number;
  actualHours: number;

  constructor(
    public plannedHours: number,
    private from: Date,
    private to: Date = null,
  ) {

  }

  getWeekNumberName(): string {
    return 'KW' + this.weekNumber.toString();
  }
}

function getDateOfISOWeek(w, y) {
  const simple = new Date(y, 0, 1 + (w - 1) * 7);
  const dow = simple.getDay();
  const ISOweekStart = simple;
  if (dow <= 4) {
    ISOweekStart.setDate(simple.getDate() - simple.getDay() + 1);
  } else {
    ISOweekStart.setDate(simple.getDate() + 8 - simple.getDay());
  }
  return ISOweekStart;
}