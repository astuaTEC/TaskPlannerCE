import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AmigosNotificacionesPageRoutingModule } from './amigos-notificaciones-routing.module';

import { AmigosNotificacionesPage } from './amigos-notificaciones.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AmigosNotificacionesPageRoutingModule
  ],
  declarations: [AmigosNotificacionesPage]
})
export class AmigosNotificacionesPageModule {}
