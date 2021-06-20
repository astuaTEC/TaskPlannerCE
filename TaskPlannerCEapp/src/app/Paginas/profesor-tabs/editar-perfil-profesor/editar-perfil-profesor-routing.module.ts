import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditarPerfilProfesorPage } from './editar-perfil-profesor.page';

const routes: Routes = [
  {
    path: '',
    component: EditarPerfilProfesorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditarPerfilProfesorPageRoutingModule {}
