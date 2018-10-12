import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateWidgetComponent } from './createwidget.component';

const routes: Routes = [
  {
    path: '',
    component: CreateWidgetComponent,
    data: {
      title: 'Create New Widget'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateWidgetRoutingModule {}
