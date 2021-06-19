import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EstudianteTabsPageRoutingModule } from './estudiante-tabs-routing.module';

import { EstudianteTabsPage } from './estudiante-tabs.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EstudianteTabsPageRoutingModule
  ],
  declarations: [EstudianteTabsPage]
})
export class EstudianteTabsPageModule {}
