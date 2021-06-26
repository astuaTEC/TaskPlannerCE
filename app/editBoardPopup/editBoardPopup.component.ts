import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { YesNoPopupComponent } from '../yesNoPopup/yesNoPopup.component';

import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ErrorPopupComponent } from '../errorPopup/errorPopup.component';
import { APIService } from '../api.service';


@Component({
  selector: 'app-edit-board-popup',
  templateUrl: './editBoardPopup.component.html',
  styleUrls: ['./editBoardPopup.component.css']
})
export class EditBoardPopupComponent implements OnInit {
  boardName = "";
  boardType = "";
  boardDescription = "";
  boardCollaborators = [{name:"",email:""}];
  boardTeachers = [{name:"",email:""}];
  boardTypes = [{type:""}];


  constructor(private router:Router, private dialog:MatDialog, @Inject(MAT_DIALOG_DATA) private data:any, private API:APIService) { }

  ngOnInit(): void { 
    this.boardName = this.data.boardName;

    this.boardTypes = [];
    this.boardCollaborators = [];
    this.boardTeachers = [];

    this.API.getBoard(<any>localStorage.getItem('email'),this.boardName).subscribe(
      data => {
        this.boardType = data[<any>"tipo"];
        this.boardDescription = data[<any>"descripcion"];

        this.API.getFriendsBoard(<any>localStorage.getItem('email'),this.boardName).subscribe(
          data => {
            for(var student of data){
              let newCollab = {
                name: student.nombre,
                email: student.correoInstitucional
              }
              if(student.colaborador){
                this.boardCollaborators.push(newCollab)
              }
            }
            
            this.API.getTeachersBoard(<any>localStorage.getItem('email'),this.boardName).subscribe(
              data => {
                for(var teacher of data){
                  let newTeacher = {
                    name: teacher.nombre,
                    email: teacher.correoInstitucional
                  }
                  if(teacher.visualizador){
                    this.boardTeachers.push(newTeacher)
                  }
                }

                this.API.getBoardTypes().subscribe(
                  data => {
                    for(var type of data){
                      let newType = {
                        type: type.nombre,
                      }
                      this.boardTypes.push(newType);
                    }
                  }
                )
              }
            )
          }
        )
      }
    )
  }


  deleteCollaborator(collaboratorIndex:number){
    this.dialog.open(YesNoPopupComponent,{
      height:'17vh',
      width:'35vw',
      data: {
        id: 2,
        message:"¿Eliminar al colaborador "+this.boardCollaborators[collaboratorIndex].name+"?",
        collaboratorEmail: this.boardCollaborators[collaboratorIndex].email,
        boardName: this.boardName
      }
    });
  }

  deleteTeacher(teacherIndex:number){
    this.dialog.open(YesNoPopupComponent,{
      height:'17vh',
      width:'35vw',
      data: {
        id: 3,
        message:"¿Eliminar al profesor "+this.boardTeachers[teacherIndex].name+"?",
        teacherEmail: this.boardTeachers[teacherIndex].email,
        boardName: this.boardName
      }
    });
  }

  saveBoardChanges(){
    if((document.getElementById("boardName") as HTMLInputElement).value.replace(/\s/g, "")==""){
      this.openErrorDialog("Debe colocar un nombre al tablero");
    }else if((document.getElementById("boardDescription") as HTMLInputElement).value.replace(/\s/g, "")==""){
      this.openErrorDialog("Debe colocar una descripción al tablero");
    }else{
      this.dialog.open(YesNoPopupComponent,{
        height:'17vh',
        width:'40vw',
        data:{
          id:4,
          message:"¿Guardar los cambios en el tablero "+this.boardName+"?",
          boardName: this.boardName,
          startDate: "2020-05-04",
          newBoardType: (document.getElementById("boardType") as HTMLInputElement).value,
          newBoardDescription: (document.getElementById("boardDescription") as HTMLInputElement).value
        }
      });
    }
  }

  openErrorDialog(message:String){
    let audio = new Audio();
    audio.src = "https://res.cloudinary.com/dfionqbqe/video/upload/v1622072251/CE4101/TaskPlanner/cancel.mp3";
    audio.load();
    audio.play();

    this.dialog.open(ErrorPopupComponent,{
      height:'12vh',
      width:'30vw',
      data:{message:message}
    });
  }

  
}
