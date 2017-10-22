import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';

import { AccountActionsComponent } from './account-actions/account-actions';

@NgModule({
  declarations: [
    AccountActionsComponent,
  ],
  imports: [
    IonicModule.forRoot(ComponentsModule)
  ],
  exports: [
    AccountActionsComponent
  ]
})
export class ComponentsModule { }
