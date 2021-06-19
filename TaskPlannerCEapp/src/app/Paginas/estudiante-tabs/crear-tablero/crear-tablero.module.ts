import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CrearTableroPageRoutingModule } from './crear-tablero-routing.module';

import { CrearTableroPage } from './crear-tablero.page';
import {MatTableModule} from '@angular/material/table'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CrearTableroPageRoutingModule,
    MatTableModule
  ],
  declarations: [CrearTableroPage, MatTableModule]
})
export class CrearTableroPageModule {}
