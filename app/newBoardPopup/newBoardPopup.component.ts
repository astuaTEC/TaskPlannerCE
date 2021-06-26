import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { APIService } from '../api.service';
import { ErrorPopupComponent } from '../errorPopup/errorPopup.component';
import { YesNoPopupComponent } from '../yesNoPopup/yesNoPopup.component';

@Component({
  selector: 'app-new-board-popup',
  templateUrl: './newBoardPopup.component.html',
  styleUrls: ['./newBoardPopup.component.css']
})
export class NewBoardPopupComponent implements OnInit {

  myFriends = [{name:"",email:"",isCollaborator:false}];
  displayedMyFriends = this.myFriends;
  teachers = [{name:"",email:"",isObserver:false}];
  displayedTeachers = this.teachers;
  boardTypes = [{type:""}];


  constructor(private dialog:MatDialog, private API:APIService) { }

  ngOnInit(): void {
    this.myFriends = [];
    this.displayedMyFriends = [];
    this.teachers = [];
    this.displayedTeachers = [];
    this.boardTypes = [];

    this.API.getBoardTypes().subscribe(
      data => {
        for(var type of data){
          let newType = {
            type: type.nombre,
          }
          this.boardTypes.push(newType);
        }

        this.API.getFriends(<any>localStorage.getItem('email')).subscribe(
          data => {
            for(var friend of data){
              let newFriend = {
                name: friend.nombre,
                email: friend.correoAmigo,
                isCollaborator: false
              }
              this.myFriends.push(newFriend);
            }

            this.API.getTeachers().subscribe(
              data => {
                for(var teacher of data){
                  let newTeacher = {
                    name: teacher.nombre,
                    email: teacher.correoInstitucional,
                    isObserver: false
                  }
                  this.teachers.push(newTeacher);
                }

                this.displayedMyFriends = this.myFriends;
                this.displayedTeachers = this.teachers;
              }
            )
          }
        )
      }
    )
  }


  searchCollaborator(){
    for(var friend of this.displayedMyFriends){
        for(var friend2 of this.myFriends){
          if(friend==friend2){
            friend2.isCollaborator=friend.isCollaborator;
          }
        }
    }

    let displayedMyFriends = [];
    for(var friend of this.myFriends){
      if(friend.name.toLocaleLowerCase().includes((document.getElementById("searchCollaborator") as HTMLInputElement).value.toLocaleLowerCase())){
        displayedMyFriends.push(friend);
      }
    }
    this.displayedMyFriends = displayedMyFriends;
  }


  cancelSearchCollaborator(){
    this.displayedMyFriends = this.myFriends;
  }

  toggleCollaboratorState(collaboratorIndex:number){
    this.displayedMyFriends[collaboratorIndex].isCollaborator = !this.displayedMyFriends[collaboratorIndex].isCollaborator;
  }


  searchTeacher(){
    for(var teacher of this.displayedTeachers){
      for(var teacher2 of this.teachers){
        if(teacher==teacher2){
          teacher2.isObserver=teacher.isObserver;
        }
      }
  }

  let displayedTeachers = [];
  for(var teacher of this.teachers){
    if(teacher.name.toLocaleLowerCase().includes((document.getElementById("searchTeacher") as HTMLInputElement).value.toLocaleLowerCase())){
      displayedTeachers.push(teacher);
    }
  }
  this.displayedTeachers = displayedTeachers;
  }

  cancelSearchTeacher(){
    this.displayedTeachers = this.teachers;
  }

  toggleObserverState(observerIndex:number){
    this.displayedTeachers[observerIndex].isObserver = !this.displayedTeachers[observerIndex].isObserver;
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

  createBoard(){
    if((document.getElementById("boardName") as HTMLInputElement).value.replace(/\s/g, "")==""){
      this.openErrorDialog("Debe colocar un nombre al tablero");
    }else if((document.getElementById("boardType") as HTMLInputElement).value=="Tipo del tablero"){
      this.openErrorDialog("Debe colocar un tipo al tablero");
    }else if((document.getElementById("boardDescription") as HTMLInputElement).value.replace(/\s/g, "")==""){
      this.openErrorDialog("Debe colocar una descripción al tablero");
    }else{

      let collaborators = [];
      for(var friend of this.myFriends){
        if(friend.isCollaborator){
          collaborators.push(friend);
        }
      }

      let observers = [];
      for(var teacher of this.teachers){
        if(teacher.isObserver){
          observers.push(teacher);
        }
      }


      this.dialog.open(YesNoPopupComponent,{
        height:'17vh',
        width:'35vw',
        data: {
          id: 6,
          message:"¿Crear el tablero "+(document.getElementById("boardName") as HTMLInputElement).value+"?",
          boardName:(document.getElementById("boardName") as HTMLInputElement).value,
          boardDescription:(document.getElementById("boardDescription") as HTMLInputElement).value,
          boardType: (document.getElementById("boardType") as HTMLInputElement).value,
          collaborators: collaborators,
          observers: observers
        }
      });
    }
  }

}
