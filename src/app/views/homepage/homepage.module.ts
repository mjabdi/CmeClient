import { NgModule } from '@angular/core';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { HomePageComponent } from './homepage.component';
import { HomePageRoutingModule } from './homepage-routing.module';
import {MaterialModule} from '../../material.module';
import { ColorPickerModule } from 'ngx-color-picker';

@NgModule({
  imports: [
    HomePageRoutingModule,
    BsDropdownModule,
    MaterialModule,
    ColorPickerModule
  ],
  declarations: [ HomePageComponent ]
})
export class HomePageModule { 

   


}