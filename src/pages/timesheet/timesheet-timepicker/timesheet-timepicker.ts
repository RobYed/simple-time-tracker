import { Component, Input } from '@angular/core';

import { TimesheetDay } from './../../../models/timesheet-day';

@Component({
  selector: 'timesheet-timepicker',
  templateUrl: './timesheet-timepicker.html'
})
export class TimesheetTimepicker {

  @Input() day: TimesheetDay;

  constructor() {}
}