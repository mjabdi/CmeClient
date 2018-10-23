import { NgModule } from '@angular/core';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { CreateWidgetComponent } from './createwidget.component';
import { CreateWidgetRoutingModule } from './createwidget-routing.module';
import {MaterialModule} from '../../material.module';
import { ColorPickerModule } from 'ngx-color-picker';
import {WidgetsModule} from '../widgets/widgets.module'
import {CommonModule} from '@angular/common';
import { ClipboardModule } from 'ngx-clipboard';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
// import {TimePickerComponent} from 'angular2-timepicker/timepicker-component';


@NgModule({
  imports: [
    CreateWidgetRoutingModule,
    CommonModule,
    ClipboardModule,
    BsDropdownModule,
    MaterialModule,
    ColorPickerModule,
    OwlDateTimeModule, 
    OwlNativeDateTimeModule,
    WidgetsModule
  ],
  declarations: [ CreateWidgetComponent ]
})
export class CreateWidgetModule { 

   


}
