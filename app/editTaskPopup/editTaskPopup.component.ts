import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { APIService } from '../api.service';
import { ErrorPopupComponent } from '../errorPopup/errorPopup.component';
import { YesNoPopupComponent } from '../yesNoPopup/yesNoPopup.component';


@Component({
  selector: 'app-edit-task-popup',
  templateUrl: './editTaskPopup.component.html',
  styleUrls: ['./editTaskPopup.component.css']
})
export class EditTaskPopupComponent implements OnInit {

  edit = this.data.edit;

  taskName = "";
  taskDescription = "";
  startDate = "";
  endDate = "";

  managers = [{name:"",email:"",isManager:false}];
  displayedManagers = this.managers;
  dependencies = this.data.dependencies;
  displayedDependencies = this.dependencies;




  constructor(private router:Router, private dialog:MatDialog, @Inject(MAT_DIALOG_DATA) private data:any, private API:APIService) { }

  ngOnInit(): void {
    this.managers = [];
    this.displayedManagers = [];
    
    if(this.edit){
      this.taskName = this.data.taskName;
      this.taskDescription = this.data.taskDescription;
      this.startDate = this.data.startDate.slice(0,10);
      this.endDate = this.data.endDate.slice(0,10);

      this.API.getCollaboratorsTeachers(this.data.boardOwner,this.data.boardName).subscribe(
        data => {
          for(var collaborator of data[<any>"colaboradores"]){
            let newCollaborator = {name:collaborator[<any>"nombre"],email:collaborator[<any>"correoInstitucional"],isManager:false};
            this.managers.push(newCollaborator);
          }

          this.API.getTaskManagersDependencies(this.data.boardOwner,this.data.boardName,this.taskName).subscribe(
            data => {
              for(var manager of data[<any>"encargados"]){
                for(var collaborator of this.managers){
                  if(manager[<any>"correoInstitucional"]==collaborator.email && manager[<any>"encargado"]){
                    collaborator.isManager = true;
                  }
                }
              }
              this.displayedManagers = this.managers;

              for(var dependencie of data[<any>"dependencias"]){
                for(var task of this.dependencies){
                  if(dependencie[<any>"nombreTarea"]==task.name && dependencie[<any>"dependencia"]){
                    task.isDependencie = true;
                  }
                }
              }
            }
          )
        }
      )


    }else{
      this.API.getCollaboratorsTeachers(this.data.boardOwner,this.data.boardName).subscribe(
        data => {
          for(var collaborator of data[<any>"colaboradores"]){
            let newCollaborator = {name:collaborator[<any>"nombre"],email:collaborator[<any>"correoInstitucional"],isManager:false};
            this.managers.push(newCollaborator);
          }
          this.displayedManagers = this.managers;
        }
      )
    }
  }

  
  searchManager(){
    for(var manager of this.displayedManagers){
        for(var manager2 of this.managers){
          if(manager==manager2){
            manager2.isManager=manager.isManager;
          }
        }
    }

    let displayedManagers = [];
    for(var manager of this.managers){
      if(manager.name.toLocaleLowerCase().includes((document.getElementById("searchManager") as HTMLInputElement).value.toLocaleLowerCase())){
        displayedManagers.push(manager);
      }
    }
    this.displayedManagers = displayedManagers;
  }


  cancelSearchManager(){
    this.displayedManagers = this.managers;
  }

  toggleManagerState(managerIndex:number){
    if(this.displayedManagers[managerIndex].isManager){
      this.API.deleteTaskManager(this.data.boardOwner,this.data.boardName,this.data.taskName,this.displayedManagers[managerIndex].email).subscribe(
        data => {},
        error => {
          this.displayedManagers[managerIndex].isManager = !this.displayedManagers[managerIndex].isManager;
        }
      )
    }else{
      this.API.addTaskManagers([{correoEstudiante:this.data.boardOwner,nombreTablero:this.data.boardName,nombreTarea:this.data.taskName,correoResponsable:this.displayedManagers[managerIndex].email}]).subscribe(
        data => {},
        error => {
          this.displayedManagers[managerIndex].isManager = !this.displayedManagers[managerIndex].isManager;
        }
      )
    }


  }


  searchDependencie(){
    for(var dependencie of this.displayedDependencies){
      for(var dependencie2 of this.dependencies){
        if(dependencie==dependencie2){
          dependencie2.isDependencie=dependencie.isDependencie;
        }
      }
    }

    let displayedDependencies = [];
    for(var dependencie of this.dependencies){
      if(dependencie.name.toLocaleLowerCase().includes((document.getElementById("searchDependencie") as HTMLInputElement).value.toLocaleLowerCase())){
        displayedDependencies.push(dependencie);
      }
    }
    this.displayedDependencies = displayedDependencies;
  }



  cancelSearchDependencie(){
    this.displayedDependencies = this.dependencies;
  }

  toggleDependencieState(dependencieIndex:number){
    if(this.displayedDependencies[dependencieIndex].isDependencie){
      this.API.eliminarDependenciaTarea(this.data.boardOwner,this.data.boardName,this.data.taskName,this.displayedDependencies[dependencieIndex].name).subscribe(
        data => {},
        error => {
          this.displayedDependencies[dependencieIndex].isDependencie = !this.displayedDependencies[dependencieIndex].isDependencie;
        }
      )
    }else{
      this.API.addTaskDependencies([{correoEstudiante:this.data.boardOwner,nombreTablero:this.data.boardName,nombreTarea:this.data.taskName,nombreTareaDependiente:this.displayedDependencies[dependencieIndex].name}]).subscribe(
        data => {},
        error => {
          this.displayedDependencies[dependencieIndex].isDependencie = !this.displayedDependencies[dependencieIndex].isDependencie;
        }
      )
    }  
  }



  openErrorDialog(message:String){
    let audio = new Audio();
    audio.src = "https://res.cloudinary.com/dfionqbqe/video/upload/v1622072251/CE4101/TaskPlanner/cancel.mp3";
    audio.load();
    audio.play();

    this.dialog.open(ErrorPopupComponent,{
      height:'13vh',
      width:'30vw',
      data:{message:message}
    });
  }


  saveTaskChanges(){
    
    if((document.getElementById("taskName") as HTMLInputElement).value.replace(/\s/g, "")==""){
      this.openErrorDialog("Debe colocar un nombre a la tarea.");
    }else if((document.getElementById("taskDescription") as HTMLInputElement).value.replace(/\s/g, "")==""){
      this.openErrorDialog("Debe colocar una descripción a la tarea");
    }else if((document.getElementById("startDate") as HTMLInputElement).value==""){
      this.openErrorDialog("Debe colocar una fecha de inicio válida.");
    }else if((document.getElementById("endDate") as HTMLInputElement).value==""){
      this.openErrorDialog("Debe colocar una fecha de finalización válida.");
    }else{



      this.dialog.open(YesNoPopupComponent,{
        height:'17vh',
        width:'35vw',
        data: {
          id: 14,
          message:"¿Guardar cambios en la tarea " +this.taskName+"?",
          task:{correoEstudiante:this.data.boardOwner,nombreTablero:this.data.boardName,idEstado:this.data.stateID,
            nombre:(document.getElementById("taskName") as HTMLInputElement).value,
            descripcion:(document.getElementById("taskDescription") as HTMLInputElement).value,
            fechaInicio:(document.getElementById("startDate") as HTMLInputElement).value,
            fechaFinalizacion:(document.getElementById("endDate") as HTMLInputElement).value}
        }
      });
    }

  }

  deleteTask(){
    this.dialog.open(YesNoPopupComponent,{
      height:'17vh',
      width:'35vw',
      data: {
        id: 15,
        message:"¿Eliminar la tarea " +this.taskName+"?",
        boardOwner:this.data.boardOwner,
        boardName:this.data.boardName,
        taskName:this.taskName
      }
    });
  }

  createTask(){
    if((document.getElementById("taskName") as HTMLInputElement).value.replace(/\s/g, "")==""){
      this.openErrorDialog("Debe colocar un nombre a la tarea.");
    }else if((document.getElementById("taskDescription") as HTMLInputElement).value.replace(/\s/g, "")==""){
      this.openErrorDialog("Debe colocar una descripción a la tarea.");
    }else if((document.getElementById("startDate") as HTMLInputElement).value==""){
      this.openErrorDialog("Debe colocar una fecha de inicio válida.");
    }else if((document.getElementById("endDate") as HTMLInputElement).value==""){
      this.openErrorDialog("Debe colocar una fecha de finalización válida.");
    }else{
      let taskManagers = [];
      for(var manager of this.managers){
        if(manager.isManager){
          let newManager = {correoEstudiante:this.data.boardOwner,nombreTablero:this.data.boardName,
            nombreTarea:(document.getElementById("taskName") as HTMLInputElement).value,
            correoResponsable:manager.email
          }
          taskManagers.push(newManager);
        }
      }

      let taskDependencies = [];
      for(var dependencie of this.dependencies){
        if(dependencie.isDependencie){
          let newDependecie = {correoEstudiante:this.data.boardOwner,nombreTablero:this.data.boardName,
            nombreTarea:(document.getElementById("taskName") as HTMLInputElement).value,
            nombreTareaDependiente:dependencie.name
          }
          taskDependencies.push(newDependecie);
        }
      }


      this.dialog.open(YesNoPopupComponent,{
        height:'17vh',
        width:'35vw',
        data: {
          id: 16,
          message:"¿Crear la tarea " +(document.getElementById("taskName") as HTMLInputElement).value+"?",
          task: {correoEstudiante:this.data.boardOwner,nombreTablero:this.data.boardName,idEstado:this.data.stateID,
            nombre:(document.getElementById("taskName") as HTMLInputElement).value,
            descripcion:(document.getElementById("taskDescription") as HTMLInputElement).value,
            fechaInicio:(document.getElementById("startDate") as HTMLInputElement).value,
            fechaFinalizacion:(document.getElementById("endDate") as HTMLInputElement).value
          },
          managers:taskManagers,
          dependencies:taskDependencies
        }
      });
    }
  }

}
