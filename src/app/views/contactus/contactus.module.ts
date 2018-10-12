import { NgModule } from '@angular/core';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { ContactusComponent } from './contactus.component';
import { ContactusRoutingModule } from './contactus-routing.module';
import {MaterialModule} from '../../material.module';
import { ColorPickerModule } from 'ngx-color-picker';

@NgModule({
  imports: [
    ContactusRoutingModule,
    BsDropdownModule,
    MaterialModule,
    ColorPickerModule
  ],
  declarations: [ ContactusComponent ]
})
export class ContactusModule { 

   


}