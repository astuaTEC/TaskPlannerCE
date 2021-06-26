import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { APIService } from '../api.service';
import { YesNoPopupComponent } from '../yesNoPopup/yesNoPopup.component';

@Component({
  selector: 'app-teacher-boards',
  templateUrl: './teacherBoards.component.html',
  styleUrls: ['./teacherBoards.component.css']
})
export class TeacherBoardsComponent implements OnInit {

  myBoards = [{name : "",type : "",description: "",boardOwner:"",info:""}];
  displayedMyBoards = this.myBoards;
 
  admin = false;
  isNoguera = false;

  constructor(private router:Router,private dialog:MatDialog, private API:APIService) { }

  ngOnInit(): void {
    if(localStorage.getItem('admin')=="Yes"){
      this.admin = true;
    }

    if(localStorage.getItem('email')=="lnoguera@profextec.cr"){
      this.isNoguera = true;
    }


    this.myBoards = [];
    this.displayedMyBoards = [];

    this.API.getObserverBoards(<any>localStorage.getItem('email')).subscribe(
      data => {
        for(var board of data){
          let newBoard = {name:board[<any>"nombre"],type:board[<any>"tipo"],description:board[<any>"descripcion"],boardOwner:board[<any>"correoPropietario"],info:""}

          this.API.getCollaboratorsTeachers(board[<any>"correoPropietario"],board[<any>"nombre"]).subscribe(
            data => {
              let collaborators = "";
              let observers = "";
              for(var collaborator of data[<any>"colaboradores"]){
                collaborators = collaborators + collaborator[<any>"nombre"]+"\n";
              }
              for(var observer of data[<any>"visualizadores"]){
                observers = observers + observer[<any>"nombre"]+"\n";
              }

              if(collaborators==""){
                collaborators="Sin colaboradores";
              }
              if(observers==""){
                observers="Sin profesores observadores";
              }

              let info = "Creado por " + newBoard.boardOwner + ".\n\n" + "Colaboradores:\n" + collaborators + "\n\n" + "Observadores:\n" + observers;
              newBoard.info = info;

              this.myBoards.push(newBoard);

            }
          )
        }
        this.displayedMyBoards = this.myBoards;
      }
    )
    
  }

  goToTeacherProfile(){
    this.router.navigate(['teacherProfile'])
  }


  searchMyBoard(){
    let displayedMyBoards = [];
    for(var board of this.myBoards){
      if(board.name.toLocaleLowerCase().includes((document.getElementById("searchMyBoard") as HTMLInputElement).value.toLocaleLowerCase())){
        displayedMyBoards.push(board);
      }
    }
    this.displayedMyBoards = displayedMyBoards;
  }

  cancelSearchMyBoard(){
    this.displayedMyBoards = this.myBoards;
  }

  openMyBoard(boardIndex:number){
    localStorage.setItem('boardName',this.myBoards[boardIndex].name);
    localStorage.setItem('boardOwner',this.myBoards[boardIndex].boardOwner);

    this.router.navigate(['insideTeacherBoard']);
  }

  logOut(){this.dialog.open(YesNoPopupComponent,{height:'17vh',width:'20vw',data:{id:1,message:"¿Cerrar sesión?"}});}


  goToBoardManagement(){
    this.router.navigate(['boardsManagement']);

  }

  goToAdminManagement(){
    this.router.navigate(['addAdmins']);
  }
}
