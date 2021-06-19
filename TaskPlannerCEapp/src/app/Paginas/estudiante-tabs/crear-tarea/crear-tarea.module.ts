import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CrearTareaPageRoutingModule } from './crear-tarea-routing.module';

import { CrearTareaPage } from './crear-tarea.page';
import {MatTableModule} from '@angular/material/table'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CrearTareaPageRoutingModule,
    MatTableModule
  ],
  declarations: [CrearTareaPage, MatTableModule]
})
export class CrearTareaPageModule {}
