import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { YesNoPopupComponent } from '../yesNoPopup/yesNoPopup.component';

import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { EditBoardPopupComponent } from '../editBoardPopup/editBoardPopup.component';
import { ShareBoardPopupComponent } from '../shareBoardPopup/shareBoardPopup.component';
import { EditStatePopupComponent } from '../editStatePopup/editStatePopup.component';
import { CriticRoutePopupComponent } from '../criticRoutePopup/criticRoutePopup.component';
import { EditTaskPopupComponent } from '../editTaskPopup/editTaskPopup.component';
import { APIService } from '../api.service';


@Component({
  selector: 'app-inside-studen-board',
  templateUrl: './insideStudentBoard.component.html',
  styleUrls: ['./insideStudentBoard.component.css']
})


export class InsideStudenBoardComponent implements OnInit {


  states = [{name:"",realID:0,tasks:[{name:"",startDate:"",endDate:"",description:""}]}];

  connectedTo = [""];


  board = {name : "",type : "",description: "",collaborators: [{name : "",email : ""}],teachers:[{name : "",email : ""}]};

  owner = true;
  serverEmail = "";


  drop(event: CdkDragDrop<{name : string;startDate: string;endDate : string;description:string;}[]>, state:any) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,event.container.data,event.previousIndex,event.currentIndex);
      
      
      this.API.editTaskState({correoEstudiante:this.serverEmail,nombreTablero:<any>localStorage.getItem('boardName'),nombreTarea:event.container.data[event.currentIndex].name,idEstado:state.realID}).subscribe(
        data => {},
        error => {}
      )
    }
  }


  constructor(private router:Router, private dialog:MatDialog, private API:APIService) { }

  ngOnInit(): void {
    if(<any>localStorage.getItem("owner")=="yes"){
      this.owner = true;
      this.serverEmail = <any>localStorage.getItem('email');
    }else{
      this.owner = false;
      this.serverEmail = <any>localStorage.getItem('ownerEmail');
    }


    this.states = [];
    this.API.getTasks(this.serverEmail,<any>localStorage.getItem('boardName')).subscribe(
      data => {
        for(var state of data){
          let taskList = [];
          for(var task of state.tareas){
            let newTask = {name:task.nombreTarea,description:task.descripcion,startDate:task.fechaInicio,endDate:task.fechaFinalizacion};
            taskList.push(newTask);
          }
          let newState = {name:state.nombre,realID:state.idEstado,tasks:taskList};
          this.states.push(newState);
        }

        this.API.getBoard(this.serverEmail,<any>localStorage.getItem('boardName')).subscribe(
          data => {
            this.board.name = data[<any>"nombre"];
            this.board.type = data[<any>"tipo"];
            this.board.description = data[<any>"descripcion"];

            this.connectedTo = [];
            for(let state of this.states) {
              this.connectedTo.push(state.realID.toString());
            }
          }
        )
      }
    )
  }

  
  createNewState(){
    this.dialog.open(EditStatePopupComponent,{
      height:'25vh',
      width:'40vw',
      data:{
        boardName: this.board.name,
        boardOwner: this.serverEmail,
        edit: false
      }
    });
  }

  openTask(taskIndex:number, stateIndex:number){
    let tasks = [];
    for(var state of this.states){
      for(var task of state.tasks){
        if(task.name!=this.states[stateIndex].tasks[taskIndex].name){
          let newTask = {name:task.name,isDependencie:false};
          tasks.push(newTask);
        }
      }
    }

    this.dialog.open(EditTaskPopupComponent,{
      height:'95vh',
      width:'70vw',
      data:{
        taskName: this.states[stateIndex].tasks[taskIndex].name,
        taskDescription: this.states[stateIndex].tasks[taskIndex].description,
        startDate: this.states[stateIndex].tasks[taskIndex].startDate,
        endDate: this.states[stateIndex].tasks[taskIndex].endDate,        
        dependencies: tasks,
        edit: true,
        boardName: this.board.name,
        boardOwner: this.serverEmail,
        stateID:this.states[stateIndex].realID
      }
    });
  }

  createTask(stateIndex:number){
    let tasks = [];
    for(var state of this.states){
      for(var task of state.tasks){
        let newTask = {name:task.name,isDependencie:false};
        tasks.push(newTask)
      }
    }

    this.dialog.open(EditTaskPopupComponent,{
      height:'95vh',
      width:'70vw',
      data:{
        boardOwner: this.serverEmail,
        boardName: this.board.name,
        stateID: this.states[stateIndex].realID,
        dependencies: tasks,
        edit: false
      }
    });
  }

  openCriticRoute(){
    
    this.dialog.open(CriticRoutePopupComponent,{
      height:'90vh',
      width:'40vw',
      data:{
        boardName: this.board.name,
        boardOwner: this.serverEmail
      }
    });
  }


  shareBoard(){
    this.dialog.open(ShareBoardPopupComponent,{
      height:'70vh',
      width:'70vw',
      data:{
        boardName: this.board.name,
        boardOwner: this.serverEmail,
      }
    });
  }
  
  editBoard(){
    this.dialog.open(EditBoardPopupComponent,{
      height:'98vh',
      width:'50vw',
      data:{
        boardName: this.board.name,
        boardType: this.board.type,
        boardDescription: this.board.description,
        boardCollaborators: this.board.collaborators,
        boardTeachers: this.board.teachers
      }
    });
  }

  deleteBoard(){
    this.dialog.open(YesNoPopupComponent,{
      height:'17vh',
      width:'35vw',
      data: {
        id: 5,
        message:"¿Eliminar el tablero "+this.board.name+"?",
        boardName:this.board.name,
        out:true
      }
    });
  }

  editState(stateIndex:number){
    this.dialog.open(EditStatePopupComponent,{
      height:'25vh',
      width:'40vw',
      data:{
        boardName: this.board.name,
        stateName: this.states[stateIndex].name,
        stateID: this.states[stateIndex].realID,
        edit: true,
        boardOwner: this.serverEmail
      }
    });
  }

  deleteState(stateIndex:number){
    this.dialog.open(YesNoPopupComponent,{
      height:'17vh',
      width:'35vw',
      data: {
        id: 21,
        message:"¿Eliminar el estado de completitud "+this.states[stateIndex].name+"?",
        boardOwner:this.serverEmail,
        boardName:this.board.name,
        stateID:this.states[stateIndex].realID,
      }
    });
  }


  goToBoards(){this.router.navigate(['studentBoards']);}
  goToFriends(){this.router.navigate(['friends']);}
  goToStats(){this.router.navigate(['stats']);}
  goToStudentProfile(){this.router.navigate(['studentProfile']);}
  logOut(){this.dialog.open(YesNoPopupComponent,{height:'17vh',width:'20vw',data:{id:1,message:"¿Cerrar sesión?"}});}


}
