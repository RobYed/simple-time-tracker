import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { TimesheetPage } from './timesheet';
import { TimesheetService } from './timesheet.service';
import { TimesheetTimepicker } from './timesheet-timepicker/timesheet-timepicker';
import { ComponentsModule } from '../../components/components.module';
import { MonthPipe } from './month.pipe';

@NgModule({
  declarations: [
    TimesheetPage,
    TimesheetTimepicker,
    MonthPipe
  ],
  imports: [
    // ComponentsModule,
    IonicPageModule.forChild(TimesheetPage)
  ],
  exports: [
    TimesheetPage,
    TimesheetTimepicker
  ],
  providers: [
    TimesheetService
  ]
})
export class LoginPageModule { }
