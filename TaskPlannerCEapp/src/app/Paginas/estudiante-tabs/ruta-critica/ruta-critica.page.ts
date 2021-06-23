import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NavParams } from '@ionic/angular';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-ruta-critica',
  templateUrl: './ruta-critica.page.html',
  styleUrls: ['./ruta-critica.page.scss'],
})
export class RutaCriticaPage implements OnInit {

  @ViewChild('barCanvas') private barChart: ElementRef;
  bars: any;
  colorArray: any;

  // Lista con los nombres de las tareas de la ruta crítica
  nombreTareasRuta: string[] = [];

  // Lista con la duración de las tareas de la ruta crítica
  duracionTareasRuta: number[] = [];



  constructor(public navParams: NavParams) {
   
  }

  ngAfterViewInit(): void{
    this.createBarChart();
  }

 
  createBarChart() {
    let data =  {
      labels: this.nombreTareasRuta,
      datasets: [
        {
          label: 'Duración [días]',
          data: this.duracionTareasRuta,
          fill: false,
          backgroundColor: 'blue',
          borderColor: 'red',
          stepped: true,
        }
      ]
    };

    let config = {
      type: 'line',
      data: data,
      options: {
        responsive: true,
        interaction: {
          intersect: false,
          axis: 'x'
        },
        plugins: {
          title: {
            display: true,
            text: (ctx) => 'Step ' + ctx.chart.data.datasets[0].stepped + ' Interpolation',
          }
        }
      }
    };

    this.bars = new Chart(this.barChart.nativeElement, config);
  } 

  ngOnInit() {
    this.nombreTareasRuta = this.navParams.get('nombreTareasRuta');
    this.duracionTareasRuta = this.navParams.get('duracionTareasRuta');
    console.log(this.nombreTareasRuta);
    console.log(this.duracionTareasRuta);
  }

}
