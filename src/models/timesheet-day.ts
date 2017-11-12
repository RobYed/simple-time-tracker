export enum DAY_TYPE {
  WORKDAY = 'WORKDAY', // 'Arbeitstag',
  WEEKEND = 'WEEKEND', // 'Wochenende',
  HOLIDAY = 'HOLIDAY', // 'Urlaub',
  SICKDAY = 'SICKDAY', // 'Krankheitstag',
  OVERTIME = 'OVERTIME' // 'Überstundenfrei'
}

export interface TimesheetDayObject {
  day: string,
  from: Date,
  to: Date,
  type: DAY_TYPE
}

export class TimesheetDay implements TimesheetDayObject {

  public from: Date = null;
  public to: Date = null;

  constructor(
    public day: string,
    public type: DAY_TYPE = DAY_TYPE.WORKDAY
  ) {}

  toObject(): Object {
    return JSON.parse(JSON.stringify(this));
  }
}