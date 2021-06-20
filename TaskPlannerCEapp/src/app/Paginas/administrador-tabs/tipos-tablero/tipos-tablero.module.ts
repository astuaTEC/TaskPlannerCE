import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TiposTableroPageRoutingModule } from './tipos-tablero-routing.module';

import { TiposTableroPage } from './tipos-tablero.page';
import { MatTreeModule } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TiposTableroPageRoutingModule,
    MatTreeModule,
    MatIconModule, 
    MatButtonModule
  ],
  declarations: [TiposTableroPage]
})
export class TiposTableroPageModule {}
