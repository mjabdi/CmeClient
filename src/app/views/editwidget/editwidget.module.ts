import { NgModule } from '@angular/core';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { EditWidgetComponent } from './editwidget.component';
import { EditWidgetRoutingModule } from './editwidget-routing.module';
import {MaterialModule} from '../../material.module';
import { ColorPickerModule } from 'ngx-color-picker';
import {WidgetsModule} from '../widgets/widgets.module'
import {CommonModule} from '@angular/common';
import { ClipboardModule } from 'ngx-clipboard';

@NgModule({
  imports: [
    EditWidgetRoutingModule,
    WidgetsModule,
    ClipboardModule,
    CommonModule,
    BsDropdownModule,
    MaterialModule,
    ColorPickerModule
  ],
  declarations: [ EditWidgetComponent ]
})
export class EditWidgetModule { 

   


}
