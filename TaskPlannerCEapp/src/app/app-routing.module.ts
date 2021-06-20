import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  {
    path: '',
    redirectTo: 'login-tabs/login',
    pathMatch: 'full'
  },
  {
    path: 'estudiante-tabs',
    loadChildren: () => import('./Paginas/estudiante-tabs/estudiante-tabs.module').then( m => m.EstudianteTabsPageModule)
  },
  {
    path: 'login-tabs',
    loadChildren: () => import('./Paginas/Inicio/login-tabs/login-tabs.module').then( m => m.LoginTabsPageModule)
  },
  {
    path: 'registro-estudiante',
    loadChildren: () => import('./Paginas/Inicio/registro-estudiante/registro-estudiante.module').then( m => m.RegistroEstudiantePageModule)
  },
  {
    path: 'registro-profesor',
    loadChildren: () => import('./Paginas/Inicio/registro-profesor/registro-profesor.module').then( m => m.RegistroProfesorPageModule)
  },
  {
    path: 'crear-tarea',
    loadChildren: () => import('./Paginas/estudiante-tabs/crear-tarea/crear-tarea.module').then( m => m.CrearTareaPageModule)
  },
  {
    path: 'editar-tarea',
    loadChildren: () => import('./Paginas/estudiante-tabs/editar-tarea/editar-tarea.module').then( m => m.EditarTareaPageModule)
  },
  {
    path: 'crear-tablero',
    loadChildren: () => import('./Paginas/estudiante-tabs/crear-tablero/crear-tablero.module').then( m => m.CrearTableroPageModule)
  },
  {
    path: 'profesor-tabs',
    loadChildren: () => import('./Paginas/profesor-tabs/profesor-tabs.module').then( m => m.ProfesorTabsPageModule)
  },
  {
    path: 'administrador-tabs',
    loadChildren: () => import('./Paginas/administrador-tabs/administrador-tabs.module').then( m => m.AdministradorTabsPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
