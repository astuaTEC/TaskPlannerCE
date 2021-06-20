import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import { Colaborador } from 'src/app/Clases/colaborador';
import { AmigosService } from 'src/app/Servicios/amigos.service';
import { DashboardService } from 'src/app/Servicios/dashboard.service';


interface UltimoAmigo{
  nombre: string,
  correo: string,
  carrera: string
}
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})


export class DashboardPage implements OnInit {
  @ViewChild('barCanvas') private barChart: ElementRef;
  bars: any;
  colorArray: any;



  // Lista con la cantidad de tableros por mes, en los últimos 6 meses
  tablerosMes: any[] = [];

  // Labels del gráfico
  labelsGrafico: string[] = [];

  // Datos del gráfico
  datosGrafico: number[] = [];

  // Lista de los últimos amigos
  ultimosAmigos: UltimoAmigo[] = [];

  
  // Cantidad de tableros
  c: number = 0;
  constructor(private dashboardService: DashboardService, private amigosService: AmigosService) { }

  ngOnInit(): void {
    
  }
  ionViewWillEnter(){
    // Vaciar las listas
    this.ultimosAmigos = [];

    // Solicitar el numero de tableros creados
    this.dashboardService.getCantidadTableros(localStorage.getItem('correoInstitucional'))
    .subscribe(
      data => {
        console.log(data);
        this.c = data;

      }
    )

    // Solicitar la cantidad de tableros en los últimos 6 meses
    this.dashboardService.getCantidadTablerosMeses(localStorage.getItem('correoInstitucional'))
    .subscribe(
      data => {
        for(let m of data){
          this.tablerosMes.push(
            {
              mes: m['mes'],
              cantidad: m['cantidad']
            }
          )
        }
      }
    )

  // Llenar los datos de los graficos
  for(let mes of this.tablerosMes){
      this.labelsGrafico.push(mes.mes);
      this.datosGrafico.push(mes.cantidad);
  }

    // Solicitar la información de los últimos 5 amigos
    this.dashboardService.getUltimosAmigos(localStorage.getItem('correoInstitucional'))
    .subscribe(
      data => {
        for(let amigo of data){
          this.ultimosAmigos.push(
            {
              nombre: amigo['nombre'],
              correo: amigo['correoAmigo'],
              carrera: amigo['carrera']
            }
          )
            
        }
      });
  }

  ngAfterViewInit(): void{
    this.createBarChart();
  }

 
  createBarChart() {
    this.bars = new Chart(this.barChart.nativeElement, {
      type: 'bar',
      data: {
        labels: this.labelsGrafico,
        datasets: [{
          label: 'Cantidad de tableros creados',
          data: this.datosGrafico,
          backgroundColor: 'blue', // array should have same number of elements as number of dataset
          borderColor: 'blue',// array should have same number of elements as number of dataset
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }

  slideOpts = {
    on: {
      beforeInit() {
        const swiper = this;
        swiper.classNames.push(`${swiper.params.containerModifierClass}flip`);
        swiper.classNames.push(`${swiper.params.containerModifierClass}3d`);
        const overwriteParams = {
          slidesPerView: 1,
          slidesPerColumn: 1,
          slidesPerGroup: 1,
          watchSlidesProgress: true,
          spaceBetween: 0,
          virtualTranslate: true,
        };
        swiper.params = Object.assign(swiper.params, overwriteParams);
        swiper.originalParams = Object.assign(swiper.originalParams, overwriteParams);
      },
      setTranslate() {
        const swiper = this;
        const { $, slides, rtlTranslate: rtl } = swiper;
        for (let i = 0; i < slides.length; i += 1) {
          const $slideEl = slides.eq(i);
          let progress = $slideEl[0].progress;
          if (swiper.params.flipEffect.limitRotation) {
            progress = Math.max(Math.min($slideEl[0].progress, 1), -1);
          }
          const offset$$1 = $slideEl[0].swiperSlideOffset;
          const rotate = -180 * progress;
          let rotateY = rotate;
          let rotateX = 0;
          let tx = -offset$$1;
          let ty = 0;
          if (!swiper.isHorizontal()) {
            ty = tx;
            tx = 0;
            rotateX = -rotateY;
            rotateY = 0;
          } else if (rtl) {
            rotateY = -rotateY;
          }
  
           $slideEl[0].style.zIndex = -Math.abs(Math.round(progress)) + slides.length;
  
           if (swiper.params.flipEffect.slideShadows) {
            // Set shadows
            let shadowBefore = swiper.isHorizontal() ? $slideEl.find('.swiper-slide-shadow-left') : $slideEl.find('.swiper-slide-shadow-top');
            let shadowAfter = swiper.isHorizontal() ? $slideEl.find('.swiper-slide-shadow-right') : $slideEl.find('.swiper-slide-shadow-bottom');
            if (shadowBefore.length === 0) {
              shadowBefore = swiper.$(`<div class="swiper-slide-shadow-${swiper.isHorizontal() ? 'left' : 'top'}"></div>`);
              $slideEl.append(shadowBefore);
            }
            if (shadowAfter.length === 0) {
              shadowAfter = swiper.$(`<div class="swiper-slide-shadow-${swiper.isHorizontal() ? 'right' : 'bottom'}"></div>`);
              $slideEl.append(shadowAfter);
            }
            if (shadowBefore.length) shadowBefore[0].style.opacity = Math.max(-progress, 0);
            if (shadowAfter.length) shadowAfter[0].style.opacity = Math.max(progress, 0);
          }
          $slideEl
            .transform(`translate3d(${tx}px, ${ty}px, 0px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`);
        }
      },
      setTransition(duration) {
        const swiper = this;
        const { slides, activeIndex, $wrapperEl } = swiper;
        slides
          .transition(duration)
          .find('.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left')
          .transition(duration);
        if (swiper.params.virtualTranslate && duration !== 0) {
          let eventTriggered = false;
          // eslint-disable-next-line
          slides.eq(activeIndex).transitionEnd(function onTransitionEnd() {
            if (eventTriggered) return;
            if (!swiper || swiper.destroyed) return;
  
            eventTriggered = true;
            swiper.animating = false;
            const triggerEvents = ['webkitTransitionEnd', 'transitionend'];
            for (let i = 0; i < triggerEvents.length; i += 1) {
              $wrapperEl.trigger(triggerEvents[i]);
            }
          });
        }
      }
    }
  };
 

 

}
