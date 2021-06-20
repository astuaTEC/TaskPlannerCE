import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditarPerfilProfesorPageRoutingModule } from './editar-perfil-profesor-routing.module';

import { EditarPerfilProfesorPage } from './editar-perfil-profesor.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditarPerfilProfesorPageRoutingModule
  ],
  declarations: [EditarPerfilProfesorPage]
})
export class EditarPerfilProfesorPageModule {}
