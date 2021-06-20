import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  //Solicita el inicio de sesión mediante un POST
  iniciarSesion(usuarioEstudiante){
    //Se crea un nuevo objeto json con la información recibida
    return this.http.post<string>('https://taskplannerce.azurewebsites.net/api/taskplanner/login',usuarioEstudiante);
  }

  // Crear un nuevo estado de completitud
  registrarEstudiante(carnet: string, correoInstitucional: string, primerNombre: string, segundoNombre: string, primerApellido: string, segundoApellido: string, telefono: string, carreraMatriculada: string, provinciaResidencia: string, provinciaUniversidad: string, areaDeInteres: string){
    //se modela el objeto JSON que se va a enviar
    let cuerpo = {
      carnet: carnet,
      correoInstitucional: correoInstitucional,
      primerNombre: primerNombre,
      segundoNombre: segundoNombre,
      primerApellido: primerApellido,
      segundoApellido: segundoApellido,
      telefono: telefono,
      carreraMatriculada: carreraMatriculada,
      provinciaResidencia: provinciaResidencia,
      provinciaUniversidad: provinciaUniversidad,
      areaDeInteres: areaDeInteres
  }
  ;
    console.log(cuerpo);
    return this.http.post<string>('https://taskplannerce.azurewebsites.net/api/taskplanner/registrarEstudiante', cuerpo);
    }
  // Crear un nuevo estado de completitud
  registrarProfesor(carnet: string, correoInstitucional: string, primerNombre: string, segundoNombre: string, primerApellido: string, segundoApellido: string, telefono: string){
    //se modela el objeto JSON que se va a enviar
    let cuerpo = {
      carnet: carnet,
      correoInstitucional: correoInstitucional,
      primerNombre: primerNombre,
      segundoNombre: segundoNombre,
      primerApellido: primerApellido,
      segundoApellido: segundoApellido,
      telefono: telefono,
  };
    console.log(cuerpo);
    return this.http.post<string>('https://taskplannerce.azurewebsites.net/api/taskplanner/registrarProfesor', cuerpo);
    }
}
