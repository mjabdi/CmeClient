import { NgModule } from '@angular/core';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { ChangepasswordComponent } from './changepassword.component';
import { ChangepasswordRoutingModule } from './changepassword-routing.module';
import {MaterialModule} from '../../material.module';
import { ColorPickerModule } from 'ngx-color-picker';
import { ToastrModule } from 'ngx-toastr';
import {CommonModule} from '@angular/common';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';


@NgModule({
  imports: [
    ChangepasswordRoutingModule,
    BsDropdownModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MaterialModule,
    ColorPickerModule,
    ToastrModule.forRoot()
  ],
  declarations: [ ChangepasswordComponent ]
})
export class ChangepasswordModule { 

}
