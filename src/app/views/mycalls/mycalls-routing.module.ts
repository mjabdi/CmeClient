import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyCallsComponent } from './mycalls.component';

const routes: Routes = [
  {
    path: '',
    component: MyCallsComponent,
    data: {
      title: 'My Calls'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyCallsRoutingModule {}
