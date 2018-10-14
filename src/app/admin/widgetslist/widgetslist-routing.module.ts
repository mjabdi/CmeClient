import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WidgetsListComponent } from './widgetslist.component';

const routes: Routes = [
  {
    path: '',
    component: WidgetsListComponent,
    data: {
      title: 'Widgets List'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WidgetsListRoutingModule {}
