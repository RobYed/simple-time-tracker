import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { TimesheetPage } from './timesheet';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    TimesheetPage,
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(TimesheetPage)
  ],
  exports: [
    TimesheetPage
  ]
})
export class LoginPageModule { }
