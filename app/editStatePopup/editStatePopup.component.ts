import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ErrorPopupComponent } from '../errorPopup/errorPopup.component';
import { YesNoPopupComponent } from '../yesNoPopup/yesNoPopup.component';

@Component({
  selector: 'app-edit-state-popup',
  templateUrl: './editStatePopup.component.html',
  styleUrls: ['./editStatePopup.component.css']
})
export class EditStatePopupComponent implements OnInit {

  stateName = this.data.stateName;
  edit = this.data.edit;


  constructor(private dialog:MatDialog, @Inject(MAT_DIALOG_DATA) private data:any) { }

  ngOnInit(): void {
  }

  saveStateChanges(){
    if ((document.getElementById("stateName") as HTMLInputElement).value==""){
      let audio = new Audio();
      audio.src = "https://res.cloudinary.com/dfionqbqe/video/upload/v1622072251/CE4101/TaskPlanner/cancel.mp3";
      audio.load();
      audio.play();

      this.dialog.open(ErrorPopupComponent,{
        height:'13vh',
        width:'30vw',
        data:{message:"Debe colocar un nombre al estado de completitud."}
      });

    }else{
      if(this.edit){

        //Send message to backend
  
        this.dialog.open(YesNoPopupComponent,{
          height:'17vh',
          width:'35vw',
          data: {
            id: 12,
            message:"¿Guardar cambios en el estado de completitud "+this.stateName+"?",
            stateName: (document.getElementById("stateName") as HTMLInputElement).value,
            boardName: this.data.boardName,
            boardOwner: this.data.boardOwner,
            stateID: this.data.stateID,
            edit:this.edit
          }
        });
      }else{  
        this.dialog.open(YesNoPopupComponent,{
          height:'17vh',
          width:'35vw',
          data: {
            id: 12,
            message:"¿Crear el estado de completitud "+
            (document.getElementById("stateName") as HTMLInputElement).value+"?",
            stateName: (document.getElementById("stateName") as HTMLInputElement).value,
            boardName: this.data.boardName,
            boardOwner: this.data.boardOwner,
            edit:this.edit
          }
        });
      }
    }
  }
}
