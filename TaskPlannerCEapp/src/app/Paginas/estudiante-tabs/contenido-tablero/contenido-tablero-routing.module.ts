import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContenidoTableroPage } from './contenido-tablero.page';

const routes: Routes = [
  {
    path: '',
    component: ContenidoTableroPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContenidoTableroPageRoutingModule {}
