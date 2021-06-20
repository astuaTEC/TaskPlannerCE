import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  // Solicitar la lista de tipos de tableros
  getTiposTableros(){
    return this.http.get<any[]>('https://taskplannerce.azurewebsites.net/api/tablero/tiposConEstado')
  }

  // Agregar un tipo de tablero
  agregarTipoTablero(nombre: string){
    //se modela el objeto JSON que se va a enviar
    let cuerpo = {
      nombre: nombre
    };
    return this.http.post<string>('https://taskplannerce.azurewebsites.net/api/tablero/crearTipo', cuerpo);
    }

  // Agregar un estado a un tipo de tablero
  agregarEstado(nombreTipo: string, nombreEstado: string){
    //se modela el objeto JSON que se va a enviar
    let cuerpo = [
      {
      nombreTipo: nombreTipo,
      nombreEstado: nombreEstado
    }
    ];
    return this.http.post<string>('https://taskplannerce.azurewebsites.net/api/estado/asociarATipo', cuerpo);
    }

  //Solicita eliminar un tipo de tablero
  eliminarTipoTablero(nombre: string){
    return this.http.delete<string>('https://taskplannerce.azurewebsites.net/api/tablero/eliminarTipo?', {
      params: {
       nombre: nombre
      }});
  }
  
  //Solicita eliminar un estado de un tipo de tablero
  eliminarEstado(nombreTipo: string, nombreEstado: string){
    return this.http.delete<string>('https://taskplannerce.azurewebsites.net/api/estado/eliminarDeTipo?', {
      params: {
       nombreTipo: nombreTipo,
       nombreEstado: nombreEstado
      }});
  } 

// Agregar a un nuevo administrador
agregarAdministrador(correoAdmin: string, carnet: string, primerNombre: string, segundoNombre: string, primerApellido: string,
  segundoApellido: string, telefono: string){
  //se modela el objeto JSON que se va a enviar
  let cuerpo = {
    correoInstitucional: correoAdmin,
    carnet:carnet,
    primerNombre: primerNombre,
    segundoNombre: segundoNombre,
    primerApellido: primerApellido,
    segundoApellido: segundoApellido,
    telefono: telefono
};
  return this.http.post<string>('https://taskplannerce.azurewebsites.net/api/taskplanner/registrarAdmin', cuerpo);
  }
}
