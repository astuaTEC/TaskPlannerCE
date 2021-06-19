import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RutaCriticaPage } from './ruta-critica.page';

const routes: Routes = [
  {
    path: '',
    component: RutaCriticaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RutaCriticaPageRoutingModule {}
