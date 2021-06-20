import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdministradorTabsPage } from './administrador-tabs.page';

const routes: Routes = [
  {
    path: '',
    component: AdministradorTabsPage,
    children: [
      {
        path: 'tipos-tablero',
        loadChildren: () => import('../../Paginas/Administrador-Tabs/tipos-tablero/tipos-tablero.module').then( m => m.TiposTableroPageModule)
      },
      {
        path: 'agregar-administrador',
        loadChildren: () => import('../../Paginas/Administrador-Tabs/agregar-administrador/agregar-administrador.module').then( m => m.AgregarAdministradorPageModule)
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdministradorTabsPageRoutingModule {}
