import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MySubscriptionsComponent } from './mysubscriptions.component';

const routes: Routes = [
  {
    path: '',
    component: MySubscriptionsComponent,
    data: {
      title: 'My Subscriptions'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MySubscriptionsRoutingModule {}
