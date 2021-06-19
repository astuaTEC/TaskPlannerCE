import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }

  // Solicitar el número de tableros creados
  getCantidadTableros(correoInstitucional: string){
    return this.http.get<number>('https://taskplannerce.azurewebsites.net/api/estudiante/getNumeroTableros?', {
      params: {
        correo: '"' + correoInstitucional + '"'
      }});
  }

  // Solicitar el número de tableros en los últimos 6 meses
  getCantidadTablerosMeses(correoInstitucional: string){
    return this.http.get<any[]>('https://taskplannerce.azurewebsites.net/api/estudiante/getTablerosPorMes?', {
      params: {
        correo: '"' + correoInstitucional + '"'
      }});
  }

  // Solicitar la información de los últimos 5 amigos
  getUltimosAmigos(correoInstitucional: string){
    return this.http.get<any[]>('https://taskplannerce.azurewebsites.net/api/estudiante/ultimosAmigos?', {
      params: {
        correo: '"' + correoInstitucional + '"'
      }});
  }
}
