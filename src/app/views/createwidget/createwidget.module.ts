import { NgModule } from '@angular/core';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { CreateWidgetComponent } from './createwidget.component';
import { CreateWidgetRoutingModule } from './createwidget-routing.module';
import {MaterialModule} from '../../material.module';
import { ColorPickerModule } from 'ngx-color-picker';
import {WidgetsModule} from '../widgets/widgets.module'
import {CommonModule} from '@angular/common';
import { ClipboardModule } from 'ngx-clipboard';


@NgModule({
  imports: [
    CreateWidgetRoutingModule,
    CommonModule,
    ClipboardModule,
    BsDropdownModule,
    MaterialModule,
    ColorPickerModule,
    WidgetsModule
  ],
  declarations: [ CreateWidgetComponent ]
})
export class CreateWidgetModule { 

   


}
