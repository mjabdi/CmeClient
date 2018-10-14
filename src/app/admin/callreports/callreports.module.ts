import { NgModule } from '@angular/core';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import {MaterialModule} from '../../material.module';
import {CallReportsRoutingModule} from './callreports-routing.module';
import { CallReportsComponent } from './callreports.component';

@NgModule({
  imports: [
    CallReportsRoutingModule,
    BsDropdownModule,
    MaterialModule
  ],
  declarations: [ CallReportsComponent ]
})
export class CallReportsModule { 
}