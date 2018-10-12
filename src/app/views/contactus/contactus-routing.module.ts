import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContactusComponent } from './contactus.component';

const routes: Routes = [
  {
    path: '',
    component: ContactusComponent,
    data: {
      title: 'Contact Us'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContactusRoutingModule {}
