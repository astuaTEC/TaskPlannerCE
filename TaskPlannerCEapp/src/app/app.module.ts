import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { CommonModule } from "@angular/common";
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { InformacionTableroPage } from './Paginas/estudiante-tabs/informacion-tablero/informacion-tablero.page';
import { InformacionTareaPage } from './Paginas/estudiante-tabs/informacion-tarea/informacion-tarea.page';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EditarTareaPage } from './Paginas/estudiante-tabs/editar-tarea/editar-tarea.page';
import { EditarTableroPage } from './Paginas/estudiante-tabs/editar-tablero/editar-tablero.page';
import { RutaCriticaPage } from './Paginas/estudiante-tabs/ruta-critica/ruta-critica.page';

@NgModule({
  declarations: [AppComponent,InformacionTableroPage, InformacionTareaPage, EditarTareaPage, EditarTableroPage, RutaCriticaPage],
  entryComponents: [InformacionTableroPage,InformacionTareaPage,  EditarTareaPage, EditarTableroPage, RutaCriticaPage],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, CommonModule,  FormsModule, HttpClientModule, BrowserAnimationsModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
