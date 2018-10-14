import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CallReportsComponent } from './callreports.component';

const routes: Routes = [
  {
    path: '',
    component: CallReportsComponent,
    data: {
      title: 'Call Reports'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CallReportsRoutingModule {}
