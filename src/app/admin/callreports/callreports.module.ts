import { NgModule } from '@angular/core';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import {MaterialModule} from '../../material.module';
import {CallReportsRoutingModule} from './callreports-routing.module';
import { CallReportsComponent } from './callreports.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_DATE_LOCALE } from '@angular/material';

@NgModule({
  imports: [
    CallReportsRoutingModule,
    BsDropdownModule,
    MaterialModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

  ],
  declarations: [ CallReportsComponent ],
  providers : [ {provide: MAT_DATE_LOCALE, useValue: 'en-GB'},]
})
export class CallReportsModule { 
}