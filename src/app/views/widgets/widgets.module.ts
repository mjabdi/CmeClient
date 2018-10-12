import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { WidgetsComponent } from './widgets.component';
import { WidgetsRoutingModule } from './widgets-routing.module';
import {MaterialModule} from '../../material.module';
import {CommonModule} from '@angular/common';


@NgModule({
  imports: [
    WidgetsRoutingModule,
    CommonModule,
    ChartsModule,
    BsDropdownModule,
    MaterialModule
  ],
  declarations: [ WidgetsComponent ]
})
export class WidgetsModule { 



}
