import { not } from '@angular/compiler/src/output/output_ast';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { APIService } from '../api.service';

@Component({
  selector: 'app-critic-route-popup',
  templateUrl: './criticRoutePopup.component.html',
  styleUrls: ['./criticRoutePopup.component.css']
})
export class CriticRoutePopupComponent implements OnInit {
  tasks = [{name:"",startDate:"",endDate:"",end:false,endend:false}]

  constructor(private API:APIService, @Inject(MAT_DIALOG_DATA) private data:any) { }

  ngOnInit(): void {
    this.tasks = [];
    this.API.getCriticRoute(this.data.boardOwner,this.data.boardName).subscribe(
      data => {
        this.detectCriticRoute(data[<any>"ruta"]);
        this.tasks.push({name:"",startDate:"",endDate:"",end:true,endend:false});
        this.tasks.push({name:"",startDate:"",endDate:"",end:true,endend:true});
      }
    )
  }

  detectCriticRoute(route:any){
    if(route.length){
      let newTask = {name:route[0].nombre,startDate:route[0].fechaInicio.slice(0,-9),endDate:route[0].fechaFinalizacion.slice(0,-9),end:false,endend:false}
      this.tasks.push(newTask);

      this.detectCriticRoute(route[0].dependencias);
      
      this.detectCriticRoute(route.slice(1));
    }
  }

}
