import { NgModule } from '@angular/core';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import {MaterialModule} from '../../material.module';
import {MyCallsRoutingModule} from './mycalls-routing.module';
import { MyCallsComponent } from './mycalls.component';

@NgModule({
  imports: [
    MyCallsRoutingModule,
    BsDropdownModule,
    MaterialModule
  ],
  declarations: [ MyCallsComponent ]
})
export class MyCallsModule { 
}