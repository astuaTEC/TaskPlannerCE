import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

import {
  ApexAxisChartSeries,
  ApexChart,
  ApexTitleSubtitle,
} from "ng-apexcharts";
import { APIService } from '../api.service';
import { YesNoPopupComponent } from '../yesNoPopup/yesNoPopup.component';


@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {

  series: ApexAxisChartSeries = [{name:"Cantidad de tableros",data:[0, 0, 0, 0, 0, 0],color:"#0B486B"}];
  chart: ApexChart = {height:450,width:800,type:"area",zoom:{enabled:false}, toolbar:{show:false}};
  dataLabels= {enabled: true}
  title= {text: ""}
  grid={row:{colors: ["#A8DBA8"],opacity: 1},column:{colors:["#A8DBA8"],opacity: 1}}
  xaxis= {categories: ["","","","","",""],labels:{style:{fontSize:"15px",fontWeight: "bold",colors:"#000000"}}}
  yaxis = {labels:{style:{fontSize:"15px",fontWeight: "bold",colors:"#000000"}}}

  
  lastFriends = [{name:"",email:""}]
  visible = false;
  

  constructor(private router:Router, private dialog:MatDialog, private API:APIService) {

  }

  ngOnInit(): void {

    this.lastFriends = [];
    this.API.getLastFriends(<any>localStorage.getItem('email')).subscribe(
      data => {
        for(var friend of data){
          let newFriend = {name:friend.nombre,email:friend.correoAmigo}
          this.lastFriends.push(newFriend);
        }

        this.API.getLastBoards(<any>localStorage.getItem('email')).subscribe(
          data => {
            var months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Setiembre", "Octubre", "Noviembre", "Diciembre"];
            var today = new Date();
            var auxiliar;
            var month;
            let lastMonths = [{name:"",amount:0}];
            lastMonths = [];
            for(var i = 5; i > -1; i -= 1) {
              auxiliar = new Date(today.getFullYear(), today.getMonth() - i, 1);
              month = months[auxiliar.getMonth()];
              lastMonths.push({name:month,amount:0});
            }

            console.log(lastMonths);

            for(var month2 of data){
              for(var month3 of lastMonths){
                if(month2.mes==month3.name){
                  month3.amount = month2.cantidad;
                }
              }
            }

            let index = 0;
            for(var month4 of lastMonths){
              this.xaxis.categories[index]=month4.name;
              this.series[0].data[index]=month4.amount;
              index++;
            }


            this.visible = true;
          }
        )
      }
    )

  }

  goToStudentBoards(){this.router.navigate(['studentBoards']);}
  goToFriends(){this.router.navigate(['friends']);}
  goToStudentProfile(){this.router.navigate(['studentProfile']);}
  logOut(){this.dialog.open(YesNoPopupComponent,{height:'17vh',width:'20vw',data:{id:1,message:"¿Cerrar sesión?"}});}

}
