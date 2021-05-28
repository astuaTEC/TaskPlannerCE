import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CrearTableroPageRoutingModule } from './crear-tablero-routing.module';

import { CrearTableroPage } from './crear-tablero.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CrearTableroPageRoutingModule
  ],
  declarations: [CrearTableroPage]
})
export class CrearTableroPageModule {}
