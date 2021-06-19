import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CrearTableroPage } from './crear-tablero.page';

const routes: Routes = [
  {
    path: '',
    component: CrearTableroPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CrearTableroPageRoutingModule {}
