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
        loadChildren: () => import('../Estudiante-Tabs/tableros/tableros.module').then( m => m.TablerosPageModule)
      },
      {
        path: 'amigos',
        loadChildren: () => import('../Estudiante-Tabs/amigos/amigos.module').then( m => m.AmigosPageModule)
      },
      {
        path: 'dashboard',
        loadChildren: () => import('../Estudiante-Tabs/dashboard/dashboard.module').then( m => m.DashboardPageModule)
      },
      {
        path: 'perfil',
        loadChildren: () => import('../Estudiante-Tabs/perfil/perfil.module').then( m => m.PerfilPageModule)
      },
      {
        path: 'buscar-amigos',
        loadChildren: () => import('./buscar-amigos/buscar-amigos.module').then( m => m.BuscarAmigosPageModule)
      },
      {
        path: 'crear-tablero',
        loadChildren: () => import('./crear-tablero/crear-tablero.module').then( m => m.CrearTableroPageModule)
      },
      {
        path: 'amigos-notificaciones',
        loadChildren: () => import('./amigos-notificaciones/amigos-notificaciones.module').then( m => m.AmigosNotificacionesPageModule)
      }
    
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EstudianteTabsPageRoutingModule {}
