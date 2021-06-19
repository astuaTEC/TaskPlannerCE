import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InformacionTareaPageRoutingModule } from './informacion-tarea-routing.module';

import { InformacionTareaPage } from './informacion-tarea.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InformacionTareaPageRoutingModule
  ],
  declarations: [InformacionTareaPage]
})
export class InformacionTareaPageModule {}
