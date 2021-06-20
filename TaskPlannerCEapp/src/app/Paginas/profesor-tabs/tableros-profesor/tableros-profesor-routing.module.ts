import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TablerosProfesorPage } from './tableros-profesor.page';

const routes: Routes = [
  {
    path: '',
    component: TablerosProfesorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TablerosProfesorPageRoutingModule {}
