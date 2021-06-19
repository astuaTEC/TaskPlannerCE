import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InformacionTableroPageRoutingModule } from './informacion-tablero-routing.module';

import { InformacionTableroPage } from './informacion-tablero.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InformacionTableroPageRoutingModule
  ],
  declarations: [InformacionTableroPage]
})
export class InformacionTableroPageModule {}
