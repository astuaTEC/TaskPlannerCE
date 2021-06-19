import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AmigosService {

  constructor(private http: HttpClient) { }

    // Solicitar la lista de amigos
    getListaAmigos(correoInstitucional: string){
      return this.http.get<any[]>('https://taskplannerce.azurewebsites.net/api/estudiante/misAmigos?', {
        params: {
          correo: '"' + correoInstitucional + '"'
        }});
    }

    // Buscar amigos
    getListaEstudiantes(correoInstitucional: string){
      return this.http.get<any[]>('https://taskplannerce.azurewebsites.net/api/estudiante/estudiantesNoAmigos?', {
        params: {
          correo: '"' + correoInstitucional + '"'
        }});
    }

  // Buscar a todos los estudiantes del sistema
  getListaEstudiantesSistema(correoInstitucional: string){
    return this.http.get<any[]>('https://taskplannerce.azurewebsites.net/api/estudiante/getTodos?', {
      params: {
        correo: '"' + correoInstitucional + '"'
      }});
   }

  //Solicita eliminar un estado de completitud
  eliminarAmigo(correoEstudiante: string, correoA: string){
    return this.http.delete<string>('https://taskplannerce.azurewebsites.net/api/estudiante/eliminarAmigo?', {
      params: {
        correo: correoEstudiante,
        correoA: correoA
      }});
  }

  // Solicitar las solicitudes de amistad
  getSolicitudesAmistad(correoInstitucional: string){
    return this.http.get<any[]>('https://taskplannerce.azurewebsites.net/api/estudiante/misSolicitudes?', {
      params: {
        correo: '"' + correoInstitucional + '"'
      }});
   }

  // Aceptar una solicitud de amistad
  validarSolicitudAmistad(correoEmisor: string, correoReceptor: string, estado: string){
    //se modela el objeto JSON que se va a enviar
    let cuerpo = {
      correoEmisor: correoEmisor,
      correoReceptor: correoReceptor,
      estado: estado
    };
    console.log(cuerpo);
    return this.http.post<string>('https://taskplannerce.azurewebsites.net/api/estudiante/aceptarRechazarSolicitud', cuerpo);
    }

  // Enviar solicitud de amistad
  enviarSolicitudAmistad(correoEmisor: string, correoReceptor: string){
    //se modela el objeto JSON que se va a enviar
    let cuerpo = {
      correoEmisor: correoEmisor,
      correoReceptor: correoReceptor,
      estado: 'Pendiente'
    };
    console.log(cuerpo);
    return this.http.post<string>('https://taskplannerce.azurewebsites.net/api/estudiante/enviarSolicitud', cuerpo);
    }
  
  // Solicitar las solicitudes de amistad
  getSolicitudesPendientes(correoInstitucional: string){
    return this.http.get<any[]>('https://taskplannerce.azurewebsites.net/api/estudiante/solicitudesPendientes?', {
      params: {
        correo: '"' + correoInstitucional + '"'
      }});
   }

  // Solicitar la lista de notificaciones
  getListaNotificaciones(correoInstitucional: string){
    return this.http.get<any[]>('https://taskplannerce.azurewebsites.net/api/estudiante/notificaciones?', {
      params: {
        correo: '"' + correoInstitucional + '"'
      }});
   }
  

  //Solicita eliminar una notificación
  eliminarNotificacion(correoEstudiante: string, id: number){
    return this.http.delete<string>('https://taskplannerce.azurewebsites.net/api/estudiante/eliminarNotificacion?', {
      params: {
        correo: correoEstudiante,
        id: id
      }});
  }    
}
