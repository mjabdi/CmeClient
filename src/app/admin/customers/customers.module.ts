import { NgModule } from '@angular/core';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import {MaterialModule} from '../../material.module';
import {CustomersRoutingModule} from './customers-routing.module';
import { CustomersComponent } from './customers.component';

@NgModule({
  imports: [
    CustomersRoutingModule,
    BsDropdownModule,
    MaterialModule
  ],
  declarations: [ CustomersComponent ]
})
export class CustomersModule { 
}