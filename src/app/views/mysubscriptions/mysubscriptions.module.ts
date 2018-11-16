import { NgModule } from '@angular/core';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import {MaterialModule} from '../../material.module';
import {MySubscriptionsRoutingModule} from './mysubscriptions-routing.module';
import { MySubscriptionsComponent } from './mysubscriptions.component';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    MySubscriptionsRoutingModule,
    BsDropdownModule,
    MaterialModule,
    CommonModule
  ],
  declarations: [ MySubscriptionsComponent ]
})
export class MySubscriptionsModule { 
}