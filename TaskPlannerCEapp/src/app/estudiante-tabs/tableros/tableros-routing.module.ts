import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TablerosPage } from './tableros.page';
import { CommonModule } from "@angular/common";

const routes: Routes = [
  {
    path: '',
    component: TablerosPage
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes), CommonModule],
  exports: [RouterModule],
})
export class TablerosPageRoutingModule {}
