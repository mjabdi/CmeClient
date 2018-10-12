import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePageComponent } from './homepage.component';

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
    data: {
      title: 'Homepage'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
