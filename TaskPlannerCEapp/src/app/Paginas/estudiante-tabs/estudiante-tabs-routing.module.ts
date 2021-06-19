import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EstudianteTabsPage } from './estudiante-tabs.page';

const routes: Routes = [
  {
    path: '',
    component: EstudianteTabsPage,
    children: [
      {
        path: 'tableros',
        loadChildren: () => import('./tableros/tableros.module').then( m => m.TablerosPageModule)
      },
      {
        path: 'amigos',
        loadChildren: () => import('./amigos/amigos.module').then( m => m.AmigosPageModule)
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then( m => m.DashboardPageModule)
      },
      {
        path: 'perfil',
        loadChildren: () => import('./perfil/perfil.module').then( m => m.PerfilPageModule)
      },
      {
        path: 'buscar-amigos',
        loadChildren: () => import('./buscar-amigos/buscar-amigos.module').then( m => m.BuscarAmigosPageModule)
      },
      {
        path: 'amigos-notificaciones',
        loadChildren: () => import('./amigos-notificaciones/amigos-notificaciones.module').then( m => m.AmigosNotificacionesPageModule)
      },
      {
        path: 'editar-perfil',
        loadChildren: () => import('./editar-perfil/editar-perfil.module').then( m => m.EditarPerfilPageModule)
      },
      {
        path: 'contenido-tablero/:nombreTablero/:correoCreador',
        loadChildren: () => import('./contenido-tablero/contenido-tablero.module').then( m => m.ContenidoTableroPageModule)
      },
      {
      path: 'editar-tablero',
      loadChildren: () => import('./editar-tablero/editar-tablero.module').then( m => m.EditarTableroPageModule)
      },
      {
        path: 'ruta-critica',
        loadChildren: () => import('./ruta-critica/ruta-critica.module').then( m => m.RutaCriticaPageModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EstudianteTabsPageRoutingModule {}
