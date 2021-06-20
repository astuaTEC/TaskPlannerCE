import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfesorTabsPageRoutingModule } from './profesor-tabs-routing.module';

import { ProfesorTabsPage } from './profesor-tabs.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfesorTabsPageRoutingModule
  ],
  declarations: [ProfesorTabsPage]
})
export class ProfesorTabsPageModule {}
