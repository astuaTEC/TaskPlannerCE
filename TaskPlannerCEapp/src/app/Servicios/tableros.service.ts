import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TablerosService {

  constructor(private http: HttpClient) { }

  // Solicitar la lista de tableros creados
  getTablerosCreados(correoInstitucional: string){
    return this.http.get<any[]>('https://taskplannerce.azurewebsites.net/api/tablero/misTableros?', {
      params: {
        correo: '"' + correoInstitucional + '"'
      }}); 
}

  // Solicitar la lista de tableros en los que se colabora
  getTablerosColaboraciones(correoInstitucional: string){
    return this.http.get<any[]>('https://taskplannerce.azurewebsites.net/api/tablero/tablerosColaborador?', {
      params: {
        correo: '"' + correoInstitucional + '"'
      }}); 
}

  // Solicitar la lista de profesores observadores y colaboradores de un tablero
  getInfoTablero(correoInstitucional: string, nombreTablero: string){
    return this.http.get<any[]>('https://taskplannerce.azurewebsites.net/api/tablero/infoTablero?', {
      params: {
        correo: '"' + correoInstitucional + '"',
        nombre: '"' + nombreTablero + '"'
      }}); 
}

  //Solicita eliminar un tablero
  eliminarTablero(correoEstudiante: string, nombreTablero: string){
    return this.http.delete<string>('https://taskplannerce.azurewebsites.net/api/tablero/eliminar?', {
      params: {
        correo: correoEstudiante,
        nombre: nombreTablero
      }});
  }

  // Solicitar la lista de estados de completitud con sus tareas
  getEstadosCompletitud(correoInstitucional: string, nombreTablero: string){
    return this.http.get<any[]>('https://taskplannerce.azurewebsites.net/api/tablero/getEstadoConTareas?', {
      params: {
        correo: '"' + correoInstitucional + '"',
        nombre: '"' + nombreTablero + '"'
      }}); 
}

  // Solicitar la información de encargados y las dependencias de una tarea
  getInfoTarea(correoInstitucional: string, nombreTablero: string, nombreTarea: string){
    return this.http.get<any[]>('https://taskplannerce.azurewebsites.net/api/tarea/infoTarea?', {
      params: {
        correo: '"' + correoInstitucional + '"',
        nombreTablero: '"' + nombreTablero + '"',
        nombreTarea: '"' + nombreTarea + '"'
      }}); 
}

  // Cambiar el estado de una tarea
  moverTarea(correoEstudiante: string, nombreTablero: string, nombreTarea: string, idEstado: number){
    //se modela el objeto JSON que se va a enviar
    let cuerpo = {
      correoEstudiante: correoEstudiante,
      nombreTablero: nombreTablero,
      nombreTarea: nombreTarea,
      idEstado: idEstado
    };
    console.log(cuerpo);
    return this.http.post<string>('https://taskplannerce.azurewebsites.net/api/tarea/actualizarEstado', cuerpo);
    }

  // Cambiar el nombre de un estado de completitud
  actualizarNombreEstado(correoEstudiante: string, nombreTablero: string, nuevoNombre: string, idEstado: number){
    //se modela el objeto JSON que se va a enviar
    let cuerpo = {
      correoEstudiante: correoEstudiante,
      nombreTablero: nombreTablero,
      nombre: nuevoNombre,
      idEstado: idEstado
    };
    console.log(cuerpo);
    return this.http.post<string>('https://taskplannerce.azurewebsites.net/api/estado/actualizarNombre', cuerpo);
    }

  // Crear una nueva tarea
  crearTarea(correoEstudiante: string, nombreTablero: string, nombreTarea: string, idEstado: number, descripcion: string, fechaInicio: string, fechaFinalizacion: string){
    //se modela el objeto JSON que se va a enviar
    let cuerpo = {
      correoEstudiante: correoEstudiante,
      nombreTablero: nombreTablero,
      nombre: nombreTarea,
      idEstado: idEstado,
      descripcion: descripcion,
      fechaInicio: fechaInicio,
      fechaFinalizacion: fechaFinalizacion
    };
    console.log(cuerpo);
    return this.http.post<string>('https://taskplannerce.azurewebsites.net/api/tarea/agregar', cuerpo);
    }

  // Agregar encargados de una tarea
  agregarEncargadosTarea(listaEncargados){
    return this.http.post<string>('https://taskplannerce.azurewebsites.net/api/tarea/agregarResponsables', listaEncargados);
    }

  // Agregar las dependencias de una tarea
  agregarDependenciasTarea(listaDependencias){
    return this.http.post<string>('https://taskplannerce.azurewebsites.net/api/tarea/agregarDependencias', listaDependencias);
    }
    
  // Solicitar la lista de amigos y colaboradores de un tablero
  getListaAmigosColaboradores(correoInstitucional: string, nombreTablero: string){
    return this.http.get<any[]>('https://taskplannerce.azurewebsites.net/api/tablero/amigosYcolaboradores?', {
      params: {
        correo: '"' + correoInstitucional + '"',
        nombreTablero: '"' + nombreTablero + '"'
      }}); 
}


  // Editar la primera información de una tarea
  editarTarea(correoEstudiante: string, nombreTablero: string, nombreTarea: string, idEstado: number, descripcion: string, fechaInicio: string, fechaFinalizacion: string){
    //se modela el objeto JSON que se va a enviar
    let cuerpo = {
      correoEstudiante: correoEstudiante,
      nombreTablero: nombreTablero,
      idEstado: idEstado,
      nombre: nombreTarea,
      descripcion: descripcion,
      fechaInicio: fechaInicio,
      fechaFinalizacion: fechaFinalizacion
    };
    console.log(cuerpo);
    return this.http.put<string>('https://taskplannerce.azurewebsites.net/api/tarea/actualizar', cuerpo);
    }

    //Solicita eliminar un encargado de una tarea
    eliminarEncargadoTarea(correoEstudiante: string, nombreTablero: string, nombreTarea: string,  correoR: string){
      return this.http.delete<string>('https://taskplannerce.azurewebsites.net/api/tarea/eliminarResponsable?', {
        params: {
          correo: correoEstudiante,
          nombreTablero: nombreTablero,
          nombreTarea: nombreTarea,
          correoR: correoR
        }});
    }

    //Solicita eliminar una dependencia de una tarea
    eliminarDependenciaTarea(correoEstudiante: string, nombreTablero: string, nombreTarea: string,  nombreDependencia: string){
      return this.http.delete<string>('https://taskplannerce.azurewebsites.net/api/tarea/eliminarDependencia?', {
        params: {
          correo: correoEstudiante,
          nombreTablero: nombreTablero,
          nombreTarea: nombreTarea,
          nombreTareaD: nombreDependencia
        }});
    }

    //Solicita eliminar una tarea
    eliminarTarea(correoEstudiante: string, nombreTablero: string, nombreTarea: string){
      return this.http.delete<string>('https://taskplannerce.azurewebsites.net/api/tarea/eliminar?', {
        params: {
          correo: correoEstudiante,
          nombreTablero: nombreTablero,
          nombre: nombreTarea
        }});
    }

    //Solicita eliminar un estado de completitud
    eliminarEstadoCompletitud(correoEstudiante: string, nombreTablero: string, id: number){
      return this.http.delete<string>('https://taskplannerce.azurewebsites.net/api/estado/eliminar?', {
        params: {
          id: id,
          correo: correoEstudiante,
          nombreTablero: nombreTablero
        }});
    }

  // Crear un nuevo estado de completitud
  crearEstadoCompletitud(correoEstudiante: string, nombreTablero: string, nombreEstado: string){
    //se modela el objeto JSON que se va a enviar
    let cuerpo = {
      correoEstudiante: correoEstudiante,
      nombreTablero: nombreTablero,
      nombre: nombreEstado,
    };
    console.log(cuerpo);
    return this.http.post<string>('https://taskplannerce.azurewebsites.net/api/estado/agregar', cuerpo);
    }

  // Solicitar los tipos de tableros que existen
  getTiposTableros(){
    return this.http.get<any[]>('https://taskplannerce.azurewebsites.net/api/tablero/tipos'); 
}

  // Solicitar la lista de todos los profesores del sistema
  getListaProfesores(){
    return this.http.get<any[]>('https://taskplannerce.azurewebsites.net/api/profesor/getTodos'); 
}

  // Crear un nuevo tablero
  crearTablero(correoEstudiante: string, nombreTablero: string, tipo: string, descripcion: string, fechaCreacion: string){
    //se modela el objeto JSON que se va a enviar
    let cuerpo = {
      correoEstudiante: correoEstudiante,
      nombre: nombreTablero,
      tipo: tipo,
      descripcion: descripcion,
      fechaCreacion: fechaCreacion,

    };
    console.log(cuerpo);
    return this.http.post<string>('https://taskplannerce.azurewebsites.net/api/tablero/crear', cuerpo);
    }

  // Agregar colaboradores a un tablero
  agregarColaboradoresTablero(listaColaboradores: any){
    return this.http.post<string>('https://taskplannerce.azurewebsites.net/api/tablero/agregarColaboradores', listaColaboradores);
    }

  //Solicita eliminar un colaborador de un tablero
  eliminarColaboradorTablero(correoEstudiante: string, nombreTablero: string, correoC: string){
    return this.http.delete<string>('https://taskplannerce.azurewebsites.net/api/tablero/eliminarColaborador?', {
      params: {
        correo: correoEstudiante,
        nombreTablero: nombreTablero,
        correoC: correoC
      }});
    }

  // Agregar observadores a un tablero
  agregarObservadoresTablero(listaObservadores: any){
    return this.http.post<string>('https://taskplannerce.azurewebsites.net/api/tablero/agregarObservadores', listaObservadores);
    }

  //Solicita eliminar un observador de un tablero
  eliminarObservadorTablero(correoEstudiante: string, nombreTablero: string, correoO: string){
    return this.http.delete<string>('https://taskplannerce.azurewebsites.net/api/tablero/eliminarObservador?', {
      params: {
        correo: correoEstudiante,
        nombreTablero: nombreTablero,
        correoO: correoO
      }});
    }

  // Solicitar los detalles de un tablero en específico
  getDetallesTablero(correoInstitucional: string, nombreTablero: string){
    return this.http.get<any[]>('https://taskplannerce.azurewebsites.net/api/tablero/getDetalles?', {
      params: {
        correo: '"' + correoInstitucional + '"',
        nombre: '"' + nombreTablero + '"'
      }}); 
}


  // Editar la primera información de un tablero
  editarTablero(correoEstudiante: string, nombreTablero: string, tipo: string, descripcion: string){
    //se modela el objeto JSON que se va a enviar
    let cuerpo = {
      correoEstudiante: correoEstudiante,
      nombre: nombreTablero,
      tipo: tipo,
      descripcion: descripcion
    };
    console.log(cuerpo);
    return this.http.put<string>('https://taskplannerce.azurewebsites.net/api/tablero/actualizar', cuerpo);
    }
}
