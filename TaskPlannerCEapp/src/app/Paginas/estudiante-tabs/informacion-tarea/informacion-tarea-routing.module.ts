import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InformacionTareaPage } from './informacion-tarea.page';

const routes: Routes = [
  {
    path: '',
    component: InformacionTareaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InformacionTareaPageRoutingModule {}
