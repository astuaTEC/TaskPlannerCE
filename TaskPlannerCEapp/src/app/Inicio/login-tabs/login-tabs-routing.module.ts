import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginTabsPage } from './login-tabs.page';

const routes: Routes = [
  {
    path: '',
    component: LoginTabsPage,
    children: [
      {
        path: 'login',
        loadChildren: () => import('../../Inicio/Login-Tabs/login/login.module').then( m => m.LoginPageModule)
      },
      {
        path: 'pre-registro',
        loadChildren: () => import('../../Inicio/Login-Tabs/pre-registro/pre-registro.module').then( m => m.PreRegistroPageModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginTabsPageRoutingModule {}
