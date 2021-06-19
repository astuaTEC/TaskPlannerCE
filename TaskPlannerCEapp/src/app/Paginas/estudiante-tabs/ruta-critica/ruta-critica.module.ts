import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RutaCriticaPageRoutingModule } from './ruta-critica-routing.module';

import { RutaCriticaPage } from './ruta-critica.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RutaCriticaPageRoutingModule
  ],
  declarations: [RutaCriticaPage]
})
export class RutaCriticaPageModule {}
