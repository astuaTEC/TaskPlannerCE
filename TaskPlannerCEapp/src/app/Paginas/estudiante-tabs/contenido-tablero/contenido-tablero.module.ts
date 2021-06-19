import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ContenidoTableroPageRoutingModule } from './contenido-tablero-routing.module';
import { ContenidoTableroPage } from './contenido-tablero.page';
import {DragDropModule } from '@angular/cdk/drag-drop'


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ContenidoTableroPageRoutingModule,
    DragDropModule
  ],
  declarations: [ContenidoTableroPage]
})
export class ContenidoTableroPageModule {
}
