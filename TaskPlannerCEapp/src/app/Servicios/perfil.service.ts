import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class PerfilService {

  constructor(private http: HttpClient) { }

  // Solicitar la lista de amigos
  getInfoPerfil(correoInstitucional: string){
    return this.http.get<any[]>('https://taskplannerce.azurewebsites.net/api/estudiante/getMiInfo?', {
      params: {
        correo: correoInstitucional
      }});
  }

  // Crear un nuevo tablero
  editarPerfil(correoEstudiante: string, carnet: string, primerNombre: string, segundoNombre: string, primerApellido: string,
    segundoApellido: string, telefono: string, carreraMatriculada: string, provinciaResidencia: string, provinciaUniversidad: string,
    areaDeInteres: string){
    //se modela el objeto JSON que se va a enviar
    let cuerpo = {
      correoInstitucional: correoEstudiante,
      carnet:carnet,
      primerNombre: primerNombre,
      segundoNombre: segundoNombre,
      primerApellido: primerApellido,
      segundoApellido: segundoApellido,
      telefono: telefono,
      carreraMatriculada:carreraMatriculada,
      provinciaResidencia: provinciaResidencia,
      provinciaUniversidad: provinciaUniversidad,
      areaDeInteres: areaDeInteres
  }
  ;
    console.log(cuerpo);
    return this.http.put<string>('https://taskplannerce.azurewebsites.net/api/estudiante/actualizar', cuerpo);
    }

  // Solicitar la información del perfil de un profesor
  getInfoPerfilProfesor(correoInstitucional: string){
    return this.http.get<any[]>('https://taskplannerce.azurewebsites.net/api/profesor/getMiInfo?', {
      params: {
        correo: correoInstitucional
      }});
  }

// Crear un nuevo tablero
editarPerfilProfesor(correoEstudiante: string, carnet: string, primerNombre: string, segundoNombre: string, primerApellido: string,
  segundoApellido: string, telefono: string){
  //se modela el objeto JSON que se va a enviar
  let cuerpo = {
    correoInstitucional: correoEstudiante,
    carnet:carnet,
    primerNombre: primerNombre,
    segundoNombre: segundoNombre,
    primerApellido: primerApellido,
    segundoApellido: segundoApellido,
    telefono: telefono
}
;
  console.log(cuerpo);
  return this.http.put<string>('https://taskplannerce.azurewebsites.net/api/profesor/actualizar', cuerpo);
  }

  // Solicita eliminar cuenta
  eliminarCuenta(correoEstudiante: string){
    return this.http.delete<string>('https://taskplannerce.azurewebsites.net/api/estudiante/eliminar?', {
      params: {
        correo: correoEstudiante
      }});
  }

  // Solicita eliminar cuenta
  eliminarCuentaProfesor(correoProfesor: string){
    return this.http.delete<string>('https://taskplannerce.azurewebsites.net/api/profesor/eliminar?', {
      params: {
        correo: correoProfesor
      }});
  }



}
