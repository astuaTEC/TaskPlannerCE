import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfesorTabsPage } from './profesor-tabs.page';

const routes: Routes = [
  {
    path: '',
    component: ProfesorTabsPage,
    children: [
      {
        path: 'tableros-profesor',
        loadChildren: () => import('../../Paginas/Profesor-Tabs/tableros-profesor/tableros-profesor.module').then( m => m.TablerosProfesorPageModule)
      },
      {
        path: 'contenido-tablero-profesor/:nombreTablero/:correoCreador',
        loadChildren: () => import('../../Paginas/Profesor-Tabs/contenido-tablero-profesor/contenido-tablero-profesor.module').then( m => m.ContenidoTableroProfesorPageModule)
      },
      {
        path: 'perfil-profesor',
        loadChildren: () => import('../../Paginas/Profesor-Tabs/perfil-profesor/perfil-profesor.module').then( m => m.PerfilProfesorPageModule)
      },
      {
        path: 'editar-perfil-profesor',
        loadChildren: () => import('../../Paginas/Profesor-Tabs/editar-perfil-profesor/editar-perfil-profesor.module').then( m => m.EditarPerfilProfesorPageModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfesorTabsPageRoutingModule {}
