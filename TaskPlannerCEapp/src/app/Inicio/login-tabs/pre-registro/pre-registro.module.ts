import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PreRegistroPageRoutingModule } from './pre-registro-routing.module';

import { PreRegistroPage } from './pre-registro.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PreRegistroPageRoutingModule
  ],
  declarations: [PreRegistroPage]
})
export class PreRegistroPageModule {}
