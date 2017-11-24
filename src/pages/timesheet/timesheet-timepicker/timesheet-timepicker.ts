import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { PickerController } from 'ionic-angular';

import { TimesheetDay } from './../../../models/timesheet-day';

@Component({
  selector: 'timesheet-timepicker',
  templateUrl: './timesheet-timepicker.html'
})
export class TimesheetTimepicker implements OnInit {

  @Input() day: TimesheetDay;

  @Output() change = new EventEmitter<TimesheetDay>();

  public fromTime;
  public toTime;

  constructor(private pickerCtrl: PickerController) {}

  ngOnInit() {
    this.fromTime = this.day.from && this.day.from.toLocaleTimeString().substring(0, 5);
    this.toTime = this.day.to && this.day.to.toLocaleTimeString().substring(0, 5);
  }

  pickFrom(event) {
    this.createPicker();
    // this.change.emit(this.day);
  }

  pickTo() {
    this.createPicker();
    // this.change.emit(this.day);
  }

  private createPicker() {
    const picker = this.pickerCtrl.create();
    picker.present();
  }


}