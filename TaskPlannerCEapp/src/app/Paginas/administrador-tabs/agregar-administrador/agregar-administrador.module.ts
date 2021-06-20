import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AgregarAdministradorPageRoutingModule } from './agregar-administrador-routing.module';

import { AgregarAdministradorPage } from './agregar-administrador.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgregarAdministradorPageRoutingModule
  ],
  declarations: [AgregarAdministradorPage]
})
export class AgregarAdministradorPageModule {}
