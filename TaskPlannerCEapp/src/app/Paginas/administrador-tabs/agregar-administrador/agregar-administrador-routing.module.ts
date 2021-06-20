import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgregarAdministradorPage } from './agregar-administrador.page';

const routes: Routes = [
  {
    path: '',
    component: AgregarAdministradorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgregarAdministradorPageRoutingModule {}
