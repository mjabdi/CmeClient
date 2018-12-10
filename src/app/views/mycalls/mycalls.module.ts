import { NgModule } from '@angular/core';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import {MaterialModule} from '../../material.module';
import {MyCallsRoutingModule} from './mycalls-routing.module';
import { MyCallsComponent } from './mycalls.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    MyCallsRoutingModule,
    BsDropdownModule,
    MaterialModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

  ],
  declarations: [ MyCallsComponent ]
})
export class MyCallsModule { 
}