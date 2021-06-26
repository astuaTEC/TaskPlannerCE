import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { APIService } from '../api.service';
import { ErrorPopupComponent } from '../errorPopup/errorPopup.component';
import { NotificationsPopupComponent } from '../notificationsPopup/notificationsPopup.component';
import { YesNoPopupComponent } from '../yesNoPopup/yesNoPopup.component';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {

  myFriends = [{name:"",email:""}];
  displayedMyFriends = this.myFriends;
  students = [{name:"",email:"",requested:false}];
  displayedStudents = this.students;

  constructor(private router:Router, private dialog:MatDialog, private API:APIService) { }

  ngOnInit(): void {
    this.myFriends = [];
    this.displayedMyFriends = [];
    this.students = [];
    this.displayedStudents = [];

    this.API.getFriends(<any>localStorage.getItem('email')).subscribe(
      data => {
        for(var friend of data){
          let newFriend = {
            name: friend.nombre,
            email: friend.correoAmigo
          }
          this.myFriends.push(newFriend);
        }

        this.displayedMyFriends = this.myFriends;

        this.API.getStudents(<any>localStorage.getItem('email')).subscribe(
          error => {
            let auxiliarStudents: { name: string; email: any; requested: boolean; }[] = [];
            var flag : boolean;
            for(var student of error){
              flag = false;
              for(var friend of this.displayedMyFriends){
                if(student.correoInstitucional==friend.email){
                  flag = true;
                }
              }
              if(!flag){
                let newStudent = {name:student.nombre,email:student.correoInstitucional,requested:false};
                auxiliarStudents.push(newStudent);
              }
            }

            this.API.getPendingRequests(<any>localStorage.getItem('email')).subscribe(
              error => {
                for(var student of auxiliarStudents){
                  for(var request of error){
                    if(student.email==request.correo){
                      student.requested = true;
                    }
                  }
                }

                this.students = auxiliarStudents;
                this.displayedStudents = auxiliarStudents;
              }
            )
          }
        )
      }
    )
  }

  searchMyFriend(){
    let displayedMyFriends = [];
    for(var friend of this.myFriends){
      if(friend.name.toLocaleLowerCase().includes((document.getElementById("searchMyFriend") as HTMLInputElement).value.toLocaleLowerCase())){
        displayedMyFriends.push(friend);
      }
    }
    this.displayedMyFriends = displayedMyFriends;
  }

  cancelSearchMyFriend(){this.displayedMyFriends = this.myFriends;}

  deleteMyFriend(myFriendIndex:number){
    this.dialog.open(YesNoPopupComponent,{
      height:'17vh',
      width:'35vw',
      data: {
        id: 9,
        message:"¿Eliminar a "+this.displayedMyFriends[myFriendIndex].name+
        " de tu lista de amigos?",
        deletedFriend:this.displayedMyFriends[myFriendIndex].email
      }
    });
  }

  searchStudent(){
    let displayedStudents = [];
    for(var student of this.students){
      if(student.name.toLocaleLowerCase().includes((document.getElementById("searchStudent") as HTMLInputElement).value.toLocaleLowerCase())){
        displayedStudents.push(student);
      }
    }
    this.displayedStudents = displayedStudents;
  }

  cancelSearchStudent(){this.displayedStudents = this.students;}

  sendFriendRequest(studentIndex:number){
    this.dialog.open(YesNoPopupComponent,{
      height:'17vh',
      width:'35vw',
      data: {
        id: 10,
        message:"¿Enviar solicitud de amistad a "+this.displayedStudents[studentIndex].name+"?",
        newFriend:this.displayedStudents[studentIndex].email
      }
    });
  }

  cancelFriendRequest(studentIndex:number){
    let audio = new Audio();
    audio.src = "https://res.cloudinary.com/dfionqbqe/video/upload/v1622072251/CE4101/TaskPlanner/cancel.mp3";
    audio.load();
    audio.play();
    this.dialog.open(ErrorPopupComponent,{
      height:'17vh',
      width:'35vw',
      data: {
        message:"Existe una solicitud de amistad pendiente.",
      }
    });
  }

  goToNotifications(){
    this.dialog.open(NotificationsPopupComponent,{
      height:'74vh',
      width:'53vw',
    });
  }


  goToStudentBoards(){this.router.navigate(['studentBoards']);}
  goToStats(){this.router.navigate(['stats']);}
  goToStudentProfile(){this.router.navigate(['studentProfile']);}
  logOut(){this.dialog.open(YesNoPopupComponent,{height:'17vh',width:'20vw',data:{id:1,message:"¿Cerrar sesión?"}});}
}
