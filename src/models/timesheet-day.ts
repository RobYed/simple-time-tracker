export enum TimesheetDayType {
  Workday = 'Arbeitstag',
  Holiday = 'Urlaub',
  SickDay = 'Krankheitstag',
  Overtime = 'Überstundenfrei'
}

export class TimesheetDay {

  public from: Date;
  public to: Date;

  constructor(
    public day: Date,
    public type: TimesheetDayType = TimesheetDayType.Workday
  ) {}

  getWeekdayShortName(): string {
    return 'MO';
  }

  getWeekdayNumber(): number {
    return 23;
  }
}