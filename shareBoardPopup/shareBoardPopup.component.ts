import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { APIService } from '../api.service';
import { ErrorPopupComponent } from '../errorPopup/errorPopup.component';
import { YesNoPopupComponent } from '../yesNoPopup/yesNoPopup.component';

@Component({
  selector: 'app-share-board-popup',
  templateUrl: './shareBoardPopup.component.html',
  styleUrls: ['./shareBoardPopup.component.css']
})
export class ShareBoardPopupComponent implements OnInit {

  myFriends = [{name:"",email:"",isCollaborator:false}];
  displayedMyFriends = this.myFriends;
  teachers = [{name:"",email:"",isObserver:false}];
  displayedTeachers = this.teachers;

  oldCollaborators = [{nombre:"",correoInstitucional:""}];
  oldObservers = [{nombre:"",correoInstitucional:""}];

  boardTypes = JSON.parse(localStorage.getItem('BOARD_TYPES')!);


  constructor(private dialog:MatDialog, @Inject(MAT_DIALOG_DATA) private data:any, private API:APIService) { }


  ngOnInit(): void {
    this.myFriends = [];
    this.displayedMyFriends = this.myFriends;
    this.teachers = [];
    this.displayedTeachers = this.teachers;
    this.oldCollaborators = [];
    this.oldObservers = [];

    this.API.getCollaboratorsTeachers(this.data.boardOwner,this.data.boardName).subscribe(
      data => {
        let currentCollaborators = data[<any>"colaboradores"];
        this.oldCollaborators = <any>currentCollaborators;

        let currentObservers = data[<any>"visualizadores"];
        this.oldObservers = <any>currentObservers;
        
        this.API.getFriends(this.data.boardOwner).subscribe(
          data => {
            for(var friend of data){
              let flag = false;
              for(var collaborator of currentCollaborators){
                if(collaborator[<any>"correoInstitucional"]==friend.correoAmigo){
                  flag = true;
                }
              }
              let newFriend = {name:friend.nombre,email:friend.correoAmigo,isCollaborator:flag}
              this.myFriends.push(newFriend);
            }

            this.API.getTeachers().subscribe(
              data => {
                for(var teacher of data){
                  let flag = false;
                  for(var observer of currentObservers){
                    if(observer[<any>"correoInstitucional"]==teacher.correoInstitucional){
                      flag = true;
                    }
                  }
                  let newTeacher = {name:teacher.nombre,email:teacher.correoInstitucional,isObserver:flag}
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
    if(this.displayedMyFriends[collaboratorIndex].isCollaborator){
      this.API.deleteCollaborator(this.data.boardOwner,this.data.boardName,this.displayedMyFriends[collaboratorIndex].email).subscribe(
        data => {},
        error => {
          this.displayedMyFriends[collaboratorIndex].isCollaborator = !this.displayedMyFriends[collaboratorIndex].isCollaborator;
        }
      )
    }else{
      this.API.addCollaborators(this.data.boardOwner,this.data.boardName,[{email:this.displayedMyFriends[collaboratorIndex].email}]).subscribe(
        data => {},
        error => {
          this.displayedMyFriends[collaboratorIndex].isCollaborator = !this.displayedMyFriends[collaboratorIndex].isCollaborator;
        }
      )
    }
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
    if(this.displayedTeachers[observerIndex].isObserver){
      this.API.deleteTeacher(this.data.boardOwner,this.data.boardName,this.displayedMyFriends[observerIndex].email).subscribe(
        data => {},
        error => {
          this.displayedTeachers[observerIndex].isObserver = !this.displayedTeachers[observerIndex].isObserver;
        }
      )
    }else{
      this.API.addObservers(this.data.boardOwner,this.data.boardName,[{email:this.displayedTeachers[observerIndex].email}]).subscribe(
        data => {},
        error => {
          this.displayedTeachers[observerIndex].isObserver = !this.displayedTeachers[observerIndex].isObserver;
        }
      )
    }

  }

 
  shareBoard(){
    
    this.dialog.open(YesNoPopupComponent,{
      height:'17vh',
      width:'35vw',
      data: {
        id: 25,
        message:"¿Compartir el tablero "+this.data.boardName+"?",
        boardOwner:this.data.boardOwner,
        boardName:this.data.boardName
      }
    });
  }

}
