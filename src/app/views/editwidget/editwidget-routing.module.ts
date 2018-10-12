import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditWidgetComponent } from './editwidget.component';

const routes: Routes = [
  {
    path: '',
    component: EditWidgetComponent,
    data: {
      title: 'Edit Widget'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditWidgetRoutingModule {}
