import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditarTableroPage } from './editar-tablero.page';

const routes: Routes = [
  {
    path: '',
    component: EditarTableroPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditarTableroPageRoutingModule {}
