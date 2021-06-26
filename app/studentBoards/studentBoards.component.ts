import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { APIService } from '../api.service';
import { EditBoardPopupComponent } from '../editBoardPopup/editBoardPopup.component';
import { NewBoardPopupComponent } from '../newBoardPopup/newBoardPopup.component';
import { YesNoPopupComponent } from '../yesNoPopup/yesNoPopup.component';

@Component({
  selector: 'app-student-boards',
  templateUrl: './studentBoards.component.html',
  styleUrls: ['./studentBoards.component.css']
})
export class StudentBoardsComponent implements OnInit {

  myBoards = [{name:"",type:"",description:""}];
  displayedMyBoards = this.myBoards;

  collabBoards = [{name:"",type:"",description:"",ownerEmail:""}];
  displayedCollabBoards = this.collabBoards;


  constructor(private router:Router, private dialog:MatDialog, private API:APIService) {}

  ngOnInit(): void {

    this.myBoards = []
    this.displayedMyBoards = []
    this.collabBoards = []
    this.displayedCollabBoards = []
    localStorage.setItem("owner","");
    localStorage.setItem("boardName","");
    localStorage.setItem("ownerEmail","");


    this.API.getStudentBoards(<any>localStorage.getItem('email')).subscribe(
      data=>{
        for(var board of data){
          let newBoard = {
            name: board.nombre,
            type: board.tipo,
            description: board.descripcion
          }
          this.myBoards.push(newBoard); 
        }
        this.displayedMyBoards = this.myBoards;
        this.API.getCollabBoards(<any>localStorage.getItem('email')).subscribe(
          data=>{
            for(var board of data){
              let newBoard = {
                name: board.nombre,
                type: board.tipo,
                description: board.descripcion,
                ownerEmail: board.correoPropietario
              }
              this.collabBoards.push(newBoard);
            }
            this.displayedCollabBoards = this.collabBoards;
          }
        );
      }
    );
  }



  openMyBoard(boardIndex:number){
    localStorage.setItem('boardName',this.myBoards[boardIndex].name);
    localStorage.setItem('owner',"yes");
    this.router.navigate(['insideStudentBoard']);
  }

  openCollabBoard(boardIndex:number){
    localStorage.setItem('boardName',this.collabBoards[boardIndex].name);
    localStorage.setItem('ownerEmail',this.collabBoards[boardIndex].ownerEmail);
    localStorage.setItem('owner',"no");
    this.router.navigate(['insideStudentBoard']);
  }

  editBoard(boardIndex:number){
    let board = this.displayedMyBoards[boardIndex];
    this.dialog.open(EditBoardPopupComponent,{
      height:'98vh',
      width:'50vw',
      data:{
        boardName: board.name
      }
    });
  }

  deleteBoard(boardIndex:number){
    this.dialog.open(YesNoPopupComponent,{
      height:'17vh',
      width:'35vw',
      data: {
        id: 5,
        message:"¿Eliminar el tablero "+this.displayedMyBoards[boardIndex].name+"?",
        boardName:this.displayedMyBoards[boardIndex].name
      }
    });
  }

  createBoard(){
    this.dialog.open(NewBoardPopupComponent,{
      height:'95vh',
      width:'70vw'
    });
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

  searchCollabBoard(){
    let displayedCollabBoards = [];
    for(var board of this.collabBoards){
      if(board.name.toLocaleLowerCase().includes((document.getElementById("searchCollabBoard") as HTMLInputElement).value.toLocaleLowerCase())){
        displayedCollabBoards.push(board);
      }
    }
    this.displayedCollabBoards = displayedCollabBoards;
  }

  cancelSearchCollabBoard(){
    this.displayedCollabBoards = this.collabBoards;
  }


  goToFriends(){this.router.navigate(['friends']);}
  goToStats(){this.router.navigate(['stats']);}
  goToStudentProfile(){this.router.navigate(['studentProfile']);}
  logOut(){this.dialog.open(YesNoPopupComponent,{height:'17vh',width:'20vw',data:{id:1,message:"¿Cerrar sesión?"}});}
}
