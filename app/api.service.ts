import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { __param } from 'tslib';



export interface Default {
  correoPropietario: any;
  mes: any;
  cantidad: any;
  correoEmisor: any;
  correo: any;
  estado: any;
  tareas: any;
  idEstado: any;
  correoAmigo: any;
  visualizador: any;
  colaborador: any;
  correoInstitucional: any;
  descripcion: string;
  tipo: string;
  nombre: string;
}


//Clases para los post y updates
export class LoginUser {
  constructor(public correoInstitucional:string, public contrasena: string){}
}

export class UpdateBoard {
  constructor(public correoEstudiante:string, public nombre:string, public tipo:string, public descripcion:string, public fechaCreacion:string){}
}

export class Collaborator {
  constructor(public correoEstudiante:string, nombreTablero:string, correoColaborador:string){}
}

export class Observer {
  constructor(public correoEstudiante:string, nombreTablero:string, correoProfesor:string){}
}

@Injectable({providedIn: 'root'})
export class APIService {
  API = 'https://taskplannerce.azurewebsites.net';

  constructor(private http: HttpClient) { 
  }

  login(email:string, password:string){
      let user = new LoginUser(email,password);
      return this.http.post<string>(this.API+'/api/taskplanner/login', user)
  }

  getStudentInfo(email:string){
    return this.http.get<string>(this.API+'/api/estudiante/getMiInfo',{params:{correo:email}})
  }

  getTeacherInfo(email:string){
    return this.http.get<string>(this.API+'/api/profesor/getMiInfo',{params:{correo:email}})
  }

  getStudentBoards(email:string){
    return this.http.get<Default[]>(this.API+'/api/tablero/misTableros',{params:{correo:"'"+email+"'"}})
  }

  getCollabBoards(email:string){
    return this.http.get<Default[]>(this.API+'/api/tablero/tablerosColaborador',{params:{correo:"'"+email+"'"}})
  }

  getBoard(email:string, boardName:string){
    return this.http.get<string>(this.API+'/api/tablero/getDetalles',{params:{correo:"'"+email+"'",nombre:"'"+boardName+"'"}});
  }

  getFriendsBoard(email:string, boardName:string){
    return this.http.get<Default[]>(this.API+'/api/tablero/amigosYcolaboradores',{params:{correo:"'"+email+"'",nombre:"'"+boardName+"'"}});
  }

  getTeachersBoard(email:string, boardName:string){
    return this.http.get<Default[]>(this.API+'/api/tablero/profesYvisualizadores',{params:{correo:"'"+email+"'",nombre:"'"+boardName+"'"}});
  }

  deleteCollaborator(email:string,boardName:string,collaboratorEmail:string){
    return this.http.delete<string>(this.API+'/api/tablero/eliminarColaborador',{params:{correo:email,nombreTablero:boardName,correoC:collaboratorEmail}});
  }

  deleteTeacher(email:string,boardName:string,teacherEmail:string){
    return this.http.delete<string>(this.API+'/api/tablero/eliminarObservador',{params:{correo:email,nombreTablero:boardName,correoO:teacherEmail}});
  }

  editBoard(email:string,boardName:string,boardType:string,boardDescription:string,startDate:string){
    let board = new UpdateBoard(email,boardName,boardType,boardDescription,startDate);
    return this.http.put<string>(this.API+'/api/tablero/actualizar',board);
  }

  getBoardTypes(){
    return this.http.get<Default[]>(this.API+'/api/tablero/tiposConEstado');
  }

  deleteBoard(email:string,boardName:string){
    return this.http.delete<string>(this.API+'/api/tablero/eliminar',{params:{correo:email,nombre:boardName}});
  }

  getFriends(email:string){
    return this.http.get<Default[]>(this.API+'/api/estudiante/misAmigos',{params:{correo:"'"+email+"'"}});
  }

  getTeachers(){
    return this.http.get<Default[]>(this.API+'/api/profesor/getTodos');
  }


  createBoard(email:string,boardName:string,boardType:string,boardDescription:string,startDate:string){
    

    let board = new UpdateBoard(email,boardName,boardType,boardDescription,startDate);
    return this.http.post<string>(this.API+'/api/tablero/crear',board);
  }

  addCollaborators(email:string,boardName:string,collaborators:any){
    

    let collaboratorsList = [];
    
    for(var collaborator of collaborators){
      let newCollaborator = {correoEstudiante:email,nombreTablero:boardName,correoColaborador:collaborator.email};
      collaboratorsList.push(newCollaborator);
    }
    return this.http.post<string>(this.API+'/api/tablero/agregarColaboradores',collaboratorsList);
  }


  addObservers(email:string,boardName:string,observers:any){
    let observersList = [];
    for(var observer of observers){
      let newObserver = {correoEstudiante:email,nombreTablero:boardName,correoProfesor:observer.email};
      observersList.push(newObserver);
    }
    return this.http.post<string>(this.API+'/api/tablero/agregarObservadores',observersList);
  }


  getTasks(email:string,boardName:string){
    return this.http.get<Default[]>(this.API+'/api/tablero/getEstadoConTareas',{params:{correo:"'"+email+"'",nombre:"'"+boardName+"'"}});
  }

  getStudents(email:string){
    return this.http.get<Default[]>(this.API+'/api/estudiante/getTodos',{params:{correo:"'"+email+"'"}});
  }

  getPendingRequests(email:string){
    return this.http.get<Default[]>(this.API+'/api/estudiante/solicitudesPendientes',{params:{correo:"'"+email+"'"}});
  }

  deleteFriend(email:string,friendEmail:string){
    return this.http.delete<string>(this.API+'/api/estudiante/eliminarAmigo',{params:{correo:email,correoA:friendEmail}});
  }

  sendFriendRequest(email:string,friendEmail:string){
    let request = {correoEmisor:email, correoReceptor:friendEmail, estado:"Pendiente"};
    return this.http.post<string>(this.API+'/api/estudiante/enviarSolicitud',request);
  }

  answerFriendRequest(email:string,friendEmail:string,state:string){
    let answer = {correoEmisor:friendEmail,correoReceptor:email,estado:state};
    return this.http.post<string>(this.API+'/api/estudiante/aceptarRechazarSolicitud',answer);
  }

  getFriendRequests(email:string){
    return this.http.get<Default[]>(this.API+'/api/estudiante/misSolicitudes',{params:{correo:"'"+email+"'"}});
  }

  getNotifications(email:string){
    return this.http.get<Default[]>(this.API+'/api/estudiante/notificaciones',{params:{correo:"'"+email+"'"}});
  }

  getLastFriends(email:string){
    return this.http.get<Default[]>(this.API+'/api/estudiante/ultimosAmigos',{params:{correo:"'"+email+"'"}});
  }

  getLastBoards(email:string){
    return this.http.get<Default[]>(this.API+'/api/estudiante/getTablerosPorMes',{params:{correo:"'"+email+"'"}});
  }

  editStudentProfile(student:any){
    return this.http.put<string>(this.API+'/api/estudiante/actualizar',student);
  }
  
  editTeacherProfile(teacher:any){
    return this.http.put<string>(this.API+'/api/profesor/actualizar',teacher);
  }

  deleteStudentProfile(email:string){
    return this.http.delete<string>(this.API+'/api/estudiante/eliminar',{params:{correo:email}});
  }

  deleteTeacherProfile(email:string){
    return this.http.delete<string>(this.API+'/api/profesor/eliminar',{params:{correo:email}});
  }

  getCriticRoute(email:string,boardName:string){
    return this.http.get<string>(this.API+'/api/tablero/rutaCritica',{params:{correo:"'"+email+"'",nombreTablero:"'"+boardName+"'"}});
  }

  editTaskState(change:any){
    return this.http.post<string>(this.API+'/api/tarea/actualizarEstado',change);
  }

  editTask(task:any){
    return this.http.put<string>(this.API+'/api/tarea/actualizar',task);
  }

  createState(state:any){
    return this.http.post<string>(this.API+'/api/estado/agregar',state);
  }

  editState(state:any){
    return this.http.post<string>(this.API+'/api/estado/actualizarNombre',state);
  }

  deleteState(email:string,boardName:string,stateID:number){
    return this.http.delete<string>(this.API+'/api/estado/eliminar?',{params:{id:stateID,correo:email,nombreTablero:boardName}});
  }



  createTask(task:any){
    return this.http.post<string>(this.API+'/api/tarea/agregar',task);
  }




  addTaskDependencies(dependencies:any){
    return this.http.post<any>(this.API+'/api/tarea/agregarDependencias',dependencies);
  }

  addTaskManagers(managers:any){


    return this.http.post<string>(this.API+'/api/tarea/agregarResponsables',managers);
  }



  getCollaboratorsTeachers(email:string,boardName:string){
    return this.http.get<string>(this.API+'/api/tablero/infoTablero',{params:{correo:"'"+email+"'",nombre:"'"+boardName+"'"}});
  }

  getTaskManagersDependencies(email:string,boardName:string,taskName:string){
    return this.http.get<string>(this.API+'/api/tarea/infoTarea',{params:{correo:"'"+email+"'",nombreTablero:"'"+boardName+"'",nombreTarea:"'"+taskName+"'"}});
  }

  getObserverBoards(email:string){
    return this.http.get<string>(this.API+'/api/tablero/misTablerosObservados',{params:{correo:"'"+email+"'"}});
  }
  
  deleteTask(email:string,boardName:string,taskName:string){
    return this.http.delete<string>(this.API+'/api/tarea/eliminar',{params:{correo:email,nombreTablero:boardName,nombre:taskName}});
  }  

  deleteTaskManager(email:string,boardName:string,taskName:string,managerEmail:string){
    return this.http.delete<string>(this.API+'/api/tarea/eliminarResponsable',{params: {correo: email,nombreTablero: boardName,nombreTarea: taskName,correoR: managerEmail}});
  }

  eliminarDependenciaTarea(correoEstudiante: string, nombreTablero: string, nombreTarea: string,  nombreDependencia: string){
    return this.http.delete<string>('https://taskplannerce.azurewebsites.net/api/tarea/eliminarDependencia', {
      params: {
        correo: correoEstudiante,
        nombreTablero: nombreTablero,
        nombreTarea: nombreTarea,
        nombreTareaD: nombreDependencia
      }});
  }




}
