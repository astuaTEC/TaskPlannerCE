import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AdminBoardsPopupComponent } from '../adminBoardsPopup/adminBoardsPopup.component';
import { APIService } from '../api.service';
import { NewTypePopupComponent } from '../new-type-popup/new-type-popup.component';
import { YesNoPopupComponent } from '../yesNoPopup/yesNoPopup.component';

@Component({
  selector: 'app-admin-boards',
  templateUrl: './adminBoards.component.html',
  styleUrls: ['./adminBoards.component.css']
})
export class AdminBoardsComponent implements OnInit {

  myBoards = [{name : "",states:[{nombre:""}]}];
  displayedMyBoards = this.myBoards;

  admin = false;
  isNoguera = false;

  constructor(private router:Router, private dialog:MatDialog, private API:APIService) { }

  ngOnInit(): void {
    if(localStorage.getItem('admin')=="Yes"){
      this.admin = true;
    }

    if(localStorage.getItem('email')=="lnoguera@profextec.cr"){
      this.isNoguera = true;
    }

    this.myBoards = [];
    this.displayedMyBoards = [];

    this.API.getBoardTypes().subscribe(
      data => {
        for(var type of data){
          this.myBoards.push({name:type.nombre,states:type.estados});
        }

        this.displayedMyBoards = this.myBoards;
      }
    )
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
    this.dialog.open(AdminBoardsPopupComponent,{height:'60vh',width:'60vw',data:{typeName:this.myBoards[boardIndex].name}});
  }


  createBoard(){
    this.dialog.open(NewTypePopupComponent,{height:'25vh',width:'40vw'});
  }

  goToTeacherBoards(){
    this.router.navigate(['teacherBoards']);
  } 

  goToTeacherProfile(){
    this.router.navigate(['teacherProfile']);
  }

  goToAdminManagement(){
    this.router.navigate(['addAdmins']);
  }

  logOut(){this.dialog.open(YesNoPopupComponent,{height:'17vh',width:'20vw',data:{id:1,message:"¿Cerrar sesión?"}});}


}
