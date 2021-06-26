import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { APIService } from '../api.service';
import { YesNoPopupComponent } from '../yesNoPopup/yesNoPopup.component';

@Component({
  selector: 'app-notifications-popup',
  templateUrl: './notificationsPopup.component.html',
  styleUrls: ['./notificationsPopup.component.css']
})
export class NotificationsPopupComponent implements OnInit {

  friendRequests = [{ name : "",email : ""}];

  notifications = [{description : ""}];

  constructor(private dialog:MatDialog,@Inject(MAT_DIALOG_DATA) private data:any, private API:APIService) { }

  ngOnInit(): void {
    this.friendRequests = [];
    this.notifications = [];

    this.API.getFriendRequests(<any>localStorage.getItem('email')).subscribe(
      data => {
        for(var request of data){
          let newRequest = {name:request.nombre,email:request.correoEmisor};
          this.friendRequests.push(newRequest);
        }

        this.API.getNotifications(<any>localStorage.getItem('email')).subscribe(
          data => {
            for(var notification of data){
              let newNotification = {description:notification.descripcion};
              this.notifications.push(newNotification)
            }
          }
        )
      }
    )
  }

  acceptFriendRequest(friendRequestIndex:number){
    this.dialog.open(YesNoPopupComponent,{
      height:'17vh',
      width:'35vw',
      data: {
        id: 19,
        message:"¿Aceptar la solicitud de amistad de "+ this.friendRequests[friendRequestIndex].name +"?",
        newFriend:this.friendRequests[friendRequestIndex].email
      }
    });
  }

  declineFriendRequest(friendRequestIndex:number){
    this.dialog.open(YesNoPopupComponent,{
      height:'17vh',
      width:'35vw',
      data: {
        id: 19,
        message:"¿Rechazar la solicitud de amistad de "+ this.friendRequests[friendRequestIndex].name +"?",
        newFriend:this.friendRequests[friendRequestIndex].email
      }
    });
  }

}
