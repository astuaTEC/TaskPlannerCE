import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { APIService } from '../api.service';
import { YesNoPopupComponent } from '../yesNoPopup/yesNoPopup.component';

@Component({
  selector: 'app-inside-teacher-board',
  templateUrl: './insideTeacherBoard.component.html',
  styleUrls: ['./insideTeacherBoard.component.css']
})
export class InsideTeacherBoardComponent implements OnInit {

  admin = false;

  connectedTo = [];
  states = [{name:"",realID:0,tasks:[{name:"",startDate:"",endDate:"",description:"",info:""}]}];
  board = {name : "",type : "",description: "",collaborators: [{name : "",email : ""}],teachers:[{name : "",email : ""}]};

  constructor(private router:Router,private dialog:MatDialog,private API:APIService) { }

  ngOnInit(): void {
    if(localStorage.getItem('admin')=="Yes"){
      this.admin = true;
    }

    this.states = [];
    this.API.getTasks(<any>localStorage.getItem('boardOwner'),<any>localStorage.getItem('boardName')).subscribe(
      data => {
        for(var state of data){
          let taskList: { name: any; description: any; startDate: any; endDate: any; info: string; }[] = [];
          for(var task of state.tareas){
            let newTask = {name:task.nombreTarea,description:task.descripcion,startDate:task.fechaInicio.slice(0,10),endDate:task.fechaFinalizacion.slice(0,10),info:""};
            
            this.API.getTaskManagersDependencies(<any>localStorage.getItem('boardOwner'),<any>localStorage.getItem('boardName'),task.nombreTarea).subscribe(
              data => {
                let managers = "";
                let dependencies = "";
                for(var manager of data[<any>"encargados"]){
                  if(manager[<any>"encargado"]){
                    managers = managers + manager[<any>"nombre"]+"\n";
                  }
                }
                for(var dependencie of data[<any>"dependencias"]){
                  if(dependencie[<any>"dependencia"]){
                    dependencies = dependencies + dependencie[<any>"nombreTarea"]+"\n";
                  }
                }

                if(managers==""){
                  managers="Sin encargados";
                }
                if(dependencies==""){
                  dependencies="Sin dependencias";
                }
              
                let info = "Descripción:\n" + task.descripcion + ".\n\n" + "Encargados:\n" + managers + "\n\n" + "Dependencias:\n" + dependencies;
                
                newTask.info = info;
                taskList.push(newTask);
              }
            )

          }
          let newState = {name:state.nombre,realID:state.idEstado,tasks:taskList};          
          this.states.push(newState);
        }

        this.API.getBoard(<any>localStorage.getItem('boardOwner'),<any>localStorage.getItem('boardName')).subscribe(
          data => {
            this.board.name = data[<any>"nombre"];
            this.board.type = data[<any>"tipo"];
            this.board.description = data[<any>"descripcion"];
          }
        )
      }
    )

  }

  goToTeacherProfile(){
    this.router.navigate(['teacherProfile'])
  }

  goToTeacherBoards(){
    this.router.navigate(['teacherBoards'])
  }


  drop(event: CdkDragDrop<{name : string;startDate: string;endDate : string; description:string; info:string;}[]>, state:any) {
    
  }

  logOut(){this.dialog.open(YesNoPopupComponent,{height:'17vh',width:'20vw',data:{id:1,message:"¿Cerrar sesión?"}});}

  goToBoardManagement(){
    this.router.navigate(['boardsManagement']);

  }

  goToAdminManagement(){
    this.router.navigate(['addAdmins']);
  }

}
