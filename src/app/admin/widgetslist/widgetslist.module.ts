import { NgModule } from '@angular/core';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import {MaterialModule} from '../../material.module';
import { WidgetsListComponent } from './widgetslist.component';
import { WidgetsListRoutingModule } from './widgetslist-routing.module';
import {CommonModule} from '@angular/common';
import { BrowserModule }  from '@angular/platform-browser';


@NgModule({
  imports: [
    WidgetsListRoutingModule,
    BsDropdownModule,
    MaterialModule,
    CommonModule,
    BrowserModule
  ],
  declarations: [ WidgetsListComponent ]
})
export class WidgetsListModule { 
}