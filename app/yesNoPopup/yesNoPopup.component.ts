import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { APIService } from '../api.service';
import { EditBoardPopupComponent } from '../editBoardPopup/editBoardPopup.component';
import { NotificationsPopupComponent } from '../notificationsPopup/notificationsPopup.component';

@Component({
  selector: 'app-yes-no-popup',
  templateUrl: './yesNoPopup.component.html',
  styleUrls: ['./yesNoPopup.component.css']
})
export class YesNoPopupComponent implements OnInit {

  id = this.data.id;
  message = this.data.message;

  constructor(private router:Router, private dialog:MatDialog, @Inject(MAT_DIALOG_DATA) private data:any, private API:APIService) { }

  ngOnInit(): void {
  }

  goToLogin(){
    this.router.navigate(['']);
  }

  deleteCollaborator(){
    this.API.deleteCollaborator(<any>localStorage.getItem('email'),this.data.boardName,this.data.collaboratorEmail).subscribe(
      data => {},
      error => {
        this.dialog.closeAll();
        this.dialog.open(EditBoardPopupComponent,{
          height:'98vh',
          width:'50vw',
          data:{
            boardName: this.data.boardName  
          }
        });
      }
    )
  }

  deleteTeacher(){
    this.API.deleteTeacher(<any>localStorage.getItem('email'),this.data.boardName,this.data.teacherEmail).subscribe(
      data => {},
      error => {
        this.dialog.closeAll();
        this.dialog.open(EditBoardPopupComponent,{
          height:'98vh',
          width:'50vw',
          data:{
            boardName: this.data.boardName  
          }
        });
      }
    )
  }

  saveBoardChanges(){
    this.API.editBoard(<any>localStorage.getItem('email'),this.data.boardName,this.data.newBoardType,this.data.newBoardDescription,this.data.startDate).subscribe(
      data => {
      },
      error => {
        window.location.reload();
      }
    )
  }

  deleteBoard(){
    this.API.deleteBoard(<any>localStorage.getItem('email'),this.data.boardName).subscribe(
      data=>{},
      error => {
        if(this.data.out){
          this.router.navigate(['studentBoards']);
        }else{
          this.router.navigate(['studentBoards']);
          window.location.reload();
        }
      }
    )
  }

  createBoard(){
    let d = new Date;
    let startDate = [`${d.getFullYear()}`, `0${d.getMonth()+1}`, `0${d.getDate()}`.substr(-2)].join("-");

    this.API.createBoard(<any>localStorage.getItem('email'),this.data.boardName,this.data.boardType,this.data.boardDescription,startDate).subscribe(
      data => {},
      error => {
        
        this.API.addCollaborators(<any>localStorage.getItem('email'),this.data.boardName,this.data.collaborators).subscribe(
          data => {},
          error => {

            this.API.addObservers(<any>localStorage.getItem('email'),this.data.boardName,this.data.observers).subscribe(
              data => {},
              error => {
                window.location.reload();
              }
            )
          }
        )
      }
    )
  }


  deleteStudentProfile(){
    this.API.deleteStudentProfile(<any>localStorage.getItem('email')).subscribe(
      data => {},
      error => {
        this.router.navigate(['']);
      }
    )
  }

  editStudentProfile(){
    this.API.editStudentProfile(this.data.student).subscribe(
      data =>{},
      error => {
        console.log(error)
        window.location.reload();
      }
    )
  }
  

  deleteFriend(){
    this.API.deleteFriend(<any>localStorage.getItem('email'),this.data.deletedFriend).subscribe(
      data => {},
      error => {
        console.log(error)
        window.location.reload();
      }
    )  
  }


  sendFriendRequest(){
    this.API.sendFriendRequest(<any>localStorage.getItem('email'),this.data.newFriend).subscribe(
      error => {
      },
      data => {
        window.location.reload();
      }
    ) 
  }

  cancelFriendRequest(){window.location.reload();}


  editState(){
    if(!this.data.edit){
      this.API.createState({correoEstudiante:this.data.boardOwner,nombreTablero:this.data.boardName,nombre:this.data.stateName}).subscribe(
        data => {},
        error => {
          window.location.reload();
        }
      )
    }else{
      this.API.editState({correoEstudiante:this.data.boardOwner,nombreTablero:this.data.boardName,nombre:this.data.stateName,idEstado:this.data.stateID}).subscribe(
        data => {},
        error => {
          console.log(error)
          window.location.reload();
        }
      )
    }
  }

  deleteState(){
    this.API.deleteState(this.data.boardOwner,this.data.boardName,this.data.stateID).subscribe(
      data => {},
      error => {
        console.log(error);
        window.location.reload();
      }
    )
    
  }



  editTask(){
    this.API.editTask(this.data.task).subscribe(
      data => {},
      error => {
        window.location.reload();
      }
    )
  }



  
  createTask(){
    this.API.createTask(this.data.task).subscribe(
      data => {},
      error => {
        
        this.API.addTaskManagers(this.data.managers).subscribe(
          data => {},
          error => {

            console.log(error);
            this.API.addTaskDependencies(this.data.dependencies).subscribe(
              data => {},
              error => {

                console.log(error);
                window.location.reload();
              }
            )
          }
        )
      }
    )


    
  }



  shareBoard(){
    window.location.reload();
  }




  deleteTask(){
    this.API.deleteTask(this.data.boardOwner,this.data.boardName,this.data.taskName).subscribe(
      data => {},
      error => {
        console.log(error)
        window.location.reload();
      }
    )
  }

  editTeacherProfile(){
    this.API.editTeacherProfile(this.data.teacher).subscribe(
      data =>{},
      error => {
        window.location.reload();
      }
    )
    
  }

  deleteTeacherProfile(){
    this.API.deleteTeacherProfile(<any>localStorage.getItem('email')).subscribe(
      data => {},
      error => {
        this.router.navigate([''])
      }
    )
  }

  acceptFriendRequest(){
    this.API.answerFriendRequest(<any>localStorage.getItem('email'),this.data.newFriend,"Aceptado").subscribe(
      data => {},
      error => {
        this.dialog.closeAll();
        window.location.reload();
        this.dialog.open(NotificationsPopupComponent,{
          height:'74vh',
          width:'53vw',
        });
      }
    )
  }

  declineFriendRequest(){
    this.API.answerFriendRequest(<any>localStorage.getItem('email'),this.data.newFriend,"Rechazado").subscribe(
      data => {},
      error => {
        this.dialog.closeAll();
        window.location.reload();
        this.dialog.open(NotificationsPopupComponent,{
          height:'74vh',
          width:'53vw',
        });
      }
    )
  }


}
