import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdministradorTabsPageRoutingModule } from './administrador-tabs-routing.module';

import { AdministradorTabsPage } from './administrador-tabs.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdministradorTabsPageRoutingModule
  ],
  declarations: [AdministradorTabsPage]
})
export class AdministradorTabsPageModule {}
