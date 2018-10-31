import { NgModule } from '@angular/core';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import {MaterialModule} from '../../material.module';
import {CallReportsRoutingModule} from './callreports-routing.module';
import { CallReportsComponent } from './callreports.component';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CallReportsRoutingModule,
    BsDropdownModule,
    MaterialModule,
    CommonModule

  ],
  declarations: [ CallReportsComponent ]
})
export class CallReportsModule { 
}