import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { Colaborador } from 'src/app/Clases/colaborador';
import { Encargado } from 'src/app/Clases/encargado';
import { EstadoCompletitud } from 'src/app/Clases/estado-completitud';
import { Profesor } from 'src/app/Clases/profesor';
import { Tablero } from 'src/app/Clases/tablero';
import { Tarea } from 'src/app/Clases/tarea';
import { TablerosService } from 'src/app/Servicios/tableros.service';
import { InformacionTableroPage } from '../../estudiante-tabs/informacion-tablero/informacion-tablero.page';
import { InformacionTareaPage } from '../../estudiante-tabs/informacion-tarea/informacion-tarea.page';

@Component({
  selector: 'app-contenido-tablero-profesor',
  templateUrl: './contenido-tablero-profesor.page.html',
  styleUrls: ['./contenido-tablero-profesor.page.scss'],
})
export class ContenidoTableroProfesorPage implements OnInit {

  // Nombre del tablero
  nombreTablero: string = '';

  // Correo del creador del tablero
  correoCreador: string = '';

  // Lista con los estados de completitud
  estadosCompletitud: EstadoCompletitud[] = [];

  // Tarea de información
  tareaInfo: Tarea = null;

  // Tablero de información
  tableroInfo: Tablero = new Tablero('', '', '', '', [], []);

  constructor(private popoverController: PopoverController, private tablerosService: TablerosService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
  }

  goToTableros(){
    this.router.navigate(['/profesor-tabs/tableros-profesor']);
  }

  ionViewWillEnter(){
    this.actualizar();
  }

  actualizar(){
    // Vaciar las listas
    this.estadosCompletitud = [];
    this.tableroInfo.colaboradores = [];
    this.tableroInfo.observadores = [];
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.nombreTablero = params.get('nombreTablero');
      this.correoCreador = params.get('correoCreador');
    });
    
   // Pedir la lista de estados de completitud con sus tareas
   this.tablerosService.getEstadosCompletitud(this.correoCreador, this.nombreTablero)
   .subscribe( 
     data => {
       console.log(data);
       for(let estado of data){
         // Primero se obtienen las tareas de cada uno de los estados y se guardan en una lista
         let tareasEstado: Tarea[] = [];

         // Para cada una de las tareas se obtiene la lista de encargados y dependencias
         for(let tarea of estado['tareas']){
    
           let encargados: Colaborador[] = [];
           let dependencias: string[] = [];

           // Solicitar la información de la tarea
           this.tablerosService.getInfoTarea(this.correoCreador, this.nombreTablero, tarea['nombreTarea'])
           .subscribe(
             data => {
               // Filtrar los encargados de la tarea
               for(let encargado of data['encargados']){
                 if(encargado['encargado']){
                   encargados.push(new Colaborador(encargado['nombre'],
                   encargado['correoInstitucional']))
                 }
               }
               // Filtrar las dependencias de la tarea
               for(let dependencia of data['dependencias']){
                 if(dependencia['dependencia']){
                  dependencias.push(dependencia['nombreTarea'])
                 }
               }
             });
              
           // Crear una tarea y agregarle toda su información
           tareasEstado.push(
             new Tarea(tarea['nombreTarea'], tarea['idEstado'], tarea['descripcion'], tarea['fechaInicio'].split('T')[0], tarea['fechaFinalizacion'].split('T')[0], encargados, dependencias)
           )
         }

         // Se crea y se agrega un estado de completitud a la lista
         this.estadosCompletitud.push(
           new EstadoCompletitud(estado['idEstado'],
           estado['nombre'],
           tareasEstado)
         )
       }
    });

     //Pedir la lista de todos los colaboradores del tablero
     this.tablerosService.getInfoTablero(this.correoCreador, this.nombreTablero)
     .subscribe(
       data => {
 
         // Llenar la lista de colaboradores del tablero de información
         for(let colaborador of data['colaboradores']){
           this.tableroInfo.colaboradores.push(
             new Encargado(colaborador['nombre'], colaborador['correoInstitucional'], false)
 
           )
         }
 
         // Llenar la lista de observadores del tablero de información
         for(let observador of data['visualizadores']){
           this.tableroInfo.observadores.push(
             new Profesor(observador['nombre'], observador['correoInstitucional'])
           )
         }
       });

    // Acceder a los detalles del tablero
    this.tablerosService.getDetallesTablero(
      this.correoCreador, this.nombreTablero
    )
    .subscribe(
      data => {
        // Llenar los datos del tablero de información
        this.tableroInfo.tipo = data['tipo'];
        this.tableroInfo.descripcion = data['descripcion'];
        this.tableroInfo.creador = this.correoCreador;
        this.tableroInfo.nombre = this.nombreTablero;
      }
    )
  }



  seleccionarTareaInfo(tarea:Tarea){
    this.tareaInfo = tarea;
  }

  async informacionTarea(ev: any) {
    const popover = await this.popoverController.create({
      component: InformacionTareaPage,
      cssClass: 'my-custom-class',
      event: ev,
      translucent: true,
      backdropDismiss: false,
      showBackdrop: true,
      componentProps: { tarea: this.tareaInfo}
    });
    await popover.present();

    const { role } = await popover.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

  async informacionTablero(ev: any) {
    const popover = await this.popoverController.create({
      component: InformacionTableroPage,
      cssClass: 'my-custom-class',
      event: ev,
      translucent: true,
      componentProps: { tablero: this.tableroInfo}
    });
    await popover.present();

    const { role } = await popover.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }


}
