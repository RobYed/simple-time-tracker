export enum TimesheetDayType {
  Workday = 'Arbeitstag',
  Holiday = 'Urlaub',
  SickDay = 'Krankheitstag',
  Overtime = 'Überstundenfrei'
}

export class TimesheetDay {

  constructor(
    public day: Date,
    public from: Date,
    public to: Date,
    public type: TimesheetDayType
  ) {}

  getWeekdayShortName(): string {
    return 'MO';
  }

  getWeekdayNumber(): number {
    return 23;
  }
}