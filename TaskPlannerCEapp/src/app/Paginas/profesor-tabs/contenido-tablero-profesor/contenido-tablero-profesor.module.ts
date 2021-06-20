import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ContenidoTableroProfesorPageRoutingModule } from './contenido-tablero-profesor-routing.module';

import { ContenidoTableroProfesorPage } from './contenido-tablero-profesor.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ContenidoTableroProfesorPageRoutingModule
  ],
  declarations: [ContenidoTableroProfesorPage]
})
export class ContenidoTableroProfesorPageModule {}
