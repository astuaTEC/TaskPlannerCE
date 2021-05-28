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
    loadChildren: () => import('./estudiante-tabs/estudiante-tabs.module').then( m => m.EstudianteTabsPageModule)
  },
  {
    path: 'login-tabs',
    loadChildren: () => import('./Inicio/login-tabs/login-tabs.module').then( m => m.LoginTabsPageModule)
  },
  {
    path: 'registro-estudiante',
    loadChildren: () => import('./Inicio/registro-estudiante/registro-estudiante.module').then( m => m.RegistroEstudiantePageModule)
  },
  {
    path: 'registro-profesor',
    loadChildren: () => import('./Inicio/registro-profesor/registro-profesor.module').then( m => m.RegistroProfesorPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
