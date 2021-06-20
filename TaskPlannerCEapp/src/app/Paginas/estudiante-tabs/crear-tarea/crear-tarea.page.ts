import { Component, OnInit } from '@angular/core';
import { NavParams, PopoverController } from '@ionic/angular';
import { Dependencia } from 'src/app/Clases/dependencia';
import { Encargado } from 'src/app/Clases/encargado';
import { EstadoCompletitud } from 'src/app/Clases/estado-completitud';
import { TablerosService } from 'src/app/Servicios/tableros.service';
import { ToastService } from 'src/app/Servicios/toast.service';

@Component({
  selector: 'app-crear-tarea',
  templateUrl: './crear-tarea.page.html',
  styleUrls: ['./crear-tarea.page.scss'],
})
export class CrearTareaPage implements OnInit {

  // Lista de estados que viene desde el tablero
  estados: EstadoCompletitud[] = null;

  // Correo del creador del tableo
  correoCreador: string = '';

  // Nombre del tablero
  nombreTablero: string = '';

  // Nombre de la nueva tarea
  nombreTarea: string = '';

  // Descripción de la tarea
  descripcion: string = '';

  // Fecha de inicio
  fechaInicio: string = '';

  // Fecha de finalización
  fechaFinalizacion: string = '';

  // Lista de encargados
  colaboradores: Encargado[] = [];

  // Estado de completitud inicial
  idEstadoInicial: number = -1;

  // Lista de dependencias
  dependencias: Dependencia[] = [];


  // Columnas para la lista de dependencias
  columnasDependencias: string[] = ['Nombre de la tarea', 'Seleccionar'];

  // Columnas para la lista de colaboradores
  columnasColaboradores: string[] = ['Colaborador', 'Seleccionar'];


  constructor(private toastService: ToastService, private popoverController: PopoverController, public navParams: NavParams, private tablerosService: TablerosService) { }

  ngOnInit() {
    this.estados = this.navParams.get('estados');

    this.correoCreador = this.navParams.get('correoCreador');

    this.nombreTablero = this.navParams.get('nombreTablero');

    this.colaboradores = this.navParams.get('colaboradores');


    // Llenar la lista de tareas que pueden ser dependencias
    for(let estado of this.estados){
      for(let tarea of estado.tareas){
        this.dependencias.push(
          new Dependencia(tarea.nombre, false)
        )
      }
    }
    
  }

  ionViewWillEnter(){}

  crearTarea(){
    if(this.nombreTarea != '' && this.descripcion != '' && this.fechaInicio != ''
    && this.fechaFinalizacion != '' && this.idEstadoInicial != -1){ 
    // Se agregan los colaboradores
    let listaEncargados: any[] = [];
    for(let colaborador of this.colaboradores){
      if(colaborador.seleccionado){
        listaEncargados.push(
          {correoEstudiante: this.correoCreador,
          nombreTablero: this.nombreTablero,
          nombreTarea: this.nombreTarea,
          correoResponsable: colaborador.correoInstitucional}
        )
    }
  }

  // Ahora se agregan los colaboradores
  let listaDependencias: any[] = [];
  for(let dependencia of this.dependencias){
    if(dependencia.seleccionada){
      listaDependencias.push(
        {correoEstudiante: this.correoCreador,
        nombreTablero: this.nombreTablero,
        nombreTarea: this.nombreTarea,
        nombreTareaDependiente: dependencia.nombre}
      )
    }
  }
     
  // Primero se crea una nueva tarea
  this.tablerosService.crearTarea(this.correoCreador, this.nombreTablero, this.nombreTarea, this.idEstadoInicial,
    this.descripcion, this.fechaInicio, this.fechaFinalizacion)
    .subscribe(
      data => {
        console.log(data);
  
      },
      error => {
        console.log(error);
        // Se agregan los encargados de la tarea creada
        if(listaEncargados.length > 0){
          this.tablerosService.agregarEncargadosTarea(listaEncargados)
          .subscribe(
            data => {
              console.log(data);
        
            },
            error => {
              console.log(error);
            });
        }

        // Se agregan las dependencias
        if(listaDependencias.length > 0){
          this.tablerosService.agregarDependenciasTarea(listaDependencias)
          .subscribe(
            data => {
              console.log(data);
        
            },
            error => {
              console.log(error);
            })
        }

        // Finalmente se notifica al usuario y se cierra el Popover
        this.toastService.mostrarToast('Crear Tarea', 'Se ha creado la tarea: ' + this.nombreTarea, 5);
        this.popoverController.dismiss();
      });
  }
  else{
    // Mostrar mensaje de error
    this.toastService.mostrarToast('Crear Tarea', 'Faltan datos por ingresar', 3)
  }
}

dimiss(){
  this.popoverController.dismiss();
}

}
