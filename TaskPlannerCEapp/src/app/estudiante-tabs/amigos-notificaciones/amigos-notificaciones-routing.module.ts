import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AmigosNotificacionesPage } from './amigos-notificaciones.page';

const routes: Routes = [
  {
    path: '',
    component: AmigosNotificacionesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AmigosNotificacionesPageRoutingModule {}
