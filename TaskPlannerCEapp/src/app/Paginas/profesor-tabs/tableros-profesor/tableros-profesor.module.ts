import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TablerosProfesorPageRoutingModule } from './tableros-profesor-routing.module';

import { TablerosProfesorPage } from './tableros-profesor.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TablerosProfesorPageRoutingModule
  ],
  declarations: [TablerosProfesorPage]
})
export class TablerosProfesorPageModule {}
