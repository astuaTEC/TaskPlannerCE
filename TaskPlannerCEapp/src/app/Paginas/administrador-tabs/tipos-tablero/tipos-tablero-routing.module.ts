import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TiposTableroPage } from './tipos-tablero.page';

const routes: Routes = [
  {
    path: '',
    component: TiposTableroPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TiposTableroPageRoutingModule {}
