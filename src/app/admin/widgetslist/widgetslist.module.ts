import { NgModule } from '@angular/core';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import {MaterialModule} from '../../material.module';
import { WidgetsListComponent } from './widgetslist.component';
import { WidgetsListRoutingModule } from './widgetslist-routing.module';

@NgModule({
  imports: [
    WidgetsListRoutingModule,
    BsDropdownModule,
    MaterialModule
  ],
  declarations: [ WidgetsListComponent ]
})
export class WidgetsListModule { 
}