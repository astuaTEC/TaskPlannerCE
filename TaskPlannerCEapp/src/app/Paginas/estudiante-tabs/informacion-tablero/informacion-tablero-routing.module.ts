import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InformacionTableroPage } from './informacion-tablero.page';

const routes: Routes = [
  {
    path: '',
    component: InformacionTableroPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InformacionTableroPageRoutingModule {}
