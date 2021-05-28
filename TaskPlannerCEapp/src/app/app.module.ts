import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { CommonModule } from "@angular/common";
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import {InfoTableroComponent} from 'src/app/estudiante-tabs/tableros/info-tablero/info-tablero.component'
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
 
@NgModule({
  declarations: [AppComponent, InfoTableroComponent],
  entryComponents: [InfoTableroComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, CommonModule,  FormsModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
