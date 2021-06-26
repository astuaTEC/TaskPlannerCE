import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { APIService } from '../api.service';
import { YesNoPopupComponent } from '../yesNoPopup/yesNoPopup.component';

@Component({
  selector: 'app-admin-boards-popup',
  templateUrl: './adminBoardsPopup.component.html',
  styleUrls: ['./adminBoardsPopup.component.css']
})
export class AdminBoardsPopupComponent implements OnInit {

  states = [{nombre:""}];
  displayedStates = this.states;

  constructor(private API:APIService,private dialog:MatDialog, @Inject(MAT_DIALOG_DATA) private data:any) { }

  ngOnInit(): void {
    this.API.getBoardTypes().subscribe(
      data => {
        for(var type of data){
          if(type.nombre==this.data.typeName)
            this.states = type.estados;
        }
        this.displayedStates = this.states;
      }
    )
  }

  addState(){
    this.dialog.open(YesNoPopupComponent,{height:'17vh',width:'20vw',data:{id:40,
      message:"¿Agregar el estado de completitud?",stateName:(document.getElementById("stateName") as HTMLInputElement).value,
      typeName:this.data.typeName}});
  }

  deleteState(stateIndex: number){
    this.dialog.open(YesNoPopupComponent,{height:'17vh',width:'20vw',data:{id:50,
      message:"¿Eliminar el estado de completitud?",stateName:this.states[stateIndex].nombre,
      typeName:this.data.typeName}});
  }

  deleteType(){
    this.dialog.open(YesNoPopupComponent,{height:'17vh',width:'20vw',data:{id:60,
      message:"¿Eliminar el tipo de tablero?",typeName:this.data.typeName}});
  }


}

