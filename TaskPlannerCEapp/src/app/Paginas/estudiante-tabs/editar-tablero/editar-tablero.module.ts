import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditarTableroPageRoutingModule } from './editar-tablero-routing.module';

import { EditarTableroPage } from './editar-tablero.page';
import {MatTableModule} from '@angular/material/table'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditarTableroPageRoutingModule,
    MatTableModule
  ],
  declarations: [EditarTableroPage, MatTableModule]
})
export class EditarTableroPageModule {}
