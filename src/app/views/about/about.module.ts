import { NgModule } from '@angular/core';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { AboutComponent } from './about.component';
import { AboutRoutingModule } from './about-routing.module';
import {MaterialModule} from '../../material.module';
import { ColorPickerModule } from 'ngx-color-picker';

@NgModule({
  imports: [
    AboutRoutingModule,
    BsDropdownModule,
    MaterialModule,
    ColorPickerModule
  ],
  declarations: [ AboutComponent ]
})
export class AboutModule { 

   


}