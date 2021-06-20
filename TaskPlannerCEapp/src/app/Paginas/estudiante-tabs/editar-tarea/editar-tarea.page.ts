import { Component, OnInit } from '@angular/core';
import { NavParams, PopoverController } from '@ionic/angular';
import { Dependencia } from 'src/app/Clases/dependencia';
import { Encargado } from 'src/app/Clases/encargado';
import { EstadoCompletitud } from 'src/app/Clases/estado-completitud';
import { Tarea } from 'src/app/Clases/tarea';
import { LoadingService } from 'src/app/Servicios/loading.service';
import { TablerosService } from 'src/app/Servicios/tableros.service';
import { ToastService } from 'src/app/Servicios/toast.service';

@Component({
  selector: 'app-editar-tarea',
  templateUrl: './editar-tarea.page.html',
  styleUrls: ['./editar-tarea.page.scss'],
})
export class EditarTareaPage implements OnInit {
 // Lista de estados que viene desde el tablero
 estados: EstadoCompletitud[] = [];

 // Correo del creador del tableo
 correoCreador: string = '';

 // Nombre del tablero
 nombreTablero: string = '';

 // La tarea que se desea editar
 tarea: Tarea = null;

 // Lista de encargados
 colaboradores: Encargado[] = [];

 // Lista de dependencias
 dependencias: Dependencia[] = [];

 // Columnas para la lista de dependencias
 columnasDependencias: string[] = ['Nombre de la tarea', 'Seleccionar'];

 // Columnas para la lista de colaboradores
 columnasColaboradores: string[] = ['Colaborador', 'Seleccionar'];


 // Variables para identificar si se realizaron cambios
 tareaCambios: boolean = false;
 encargadosCambios: boolean = false;
 dependenciasCambios: boolean = false;


 constructor(private loading: LoadingService, private toastService: ToastService, private popoverController: PopoverController, public navParams: NavParams, private tablerosService: TablerosService) { }

 ngOnInit() {
   this.estados = this.navParams.get('estados');
   this.correoCreador = this.navParams.get('correoCreador');
   this.nombreTablero = this.navParams.get('nombreTablero');
   this.colaboradores = this.navParams.get('colaboradores');
   this.tarea = this.navParams.get('tarea');
   
   console.log('Colaboradores', this.colaboradores);
   console.log('Tarea', this.tarea);
   console.log('Estados', this.estados);

   // Recorrer la lista de colaboradores del tablero y revisar si alguno de ellos es
   // encargado de una tarea
   for(let colaborador of this.colaboradores){
     for(let encargado of this.tarea.encargados){
       if(colaborador.correoInstitucional == encargado.correoInstitucional){
         colaborador.seleccionado = true;
       }
     }
   }

    // Llenar la lista de tareas que pueden ser dependencias
    for(let estado of this.estados){
      for(let tarea of estado.tareas){
        if(tarea.nombre != this.tarea.nombre){
          this.dependencias.push(new Dependencia(tarea.nombre, false));
        }

      }
    }

    // Filtrar las dependencias
    for(let tarea of this.dependencias){
      for(let dependencia of this.tarea.dependencias){
        if(tarea.nombre == dependencia){
          tarea.seleccionada = true;
        }
      }
    }

  
 }

 ionViewWillEnter(){
  this.tareaCambios = false;
  this.encargadosCambios = false;
  this.dependenciasCambios = false;
 }

 editarTarea(){
  if(this.tareaCambios || this.encargadosCambios || this.dependenciasCambios){

   if(this.tareaCambios){
        // Editar la primerra información de la tarea
    this.tablerosService.editarTarea(this.correoCreador, this.nombreTablero, this.tarea.nombre, this.tarea.idEstado, this.tarea.descripcion, this.tarea.fechaInicio, this.tarea.fechaFinalizacion)
    .subscribe(
     data => {
       console.log(data);
 
     },
     error => {
       console.log(error);
     });
   }

   // Mostrar un mensaje por medio del Toast
   this.toastService.mostrarToast(this.tarea.nombre, 'La tarea se ha editado exitosamente', 3);  
   //this.popoverController.dismiss();

  }
  else{
    this.toastService.mostrarToast(this.tarea.nombre, 'No se ha realizado ningún cambio', 3);  
  }
  this.tareaCambios = false;

}

cambiosRealizadosTarea(){
  this.tareaCambios = true;
}

cambiosRealizadosEncargado(encargado: Encargado){
  if(!encargado.seleccionado){
    this.tablerosService.agregarEncargadosTarea(
      [
          {
          correoEstudiante: this.correoCreador,
          nombreTablero: this.nombreTablero,
          nombreTarea: this.tarea.nombre,
          correoResponsable: encargado.correoInstitucional
        }
      ]
    )
    .subscribe(
      data => {
        console.log(data);
  
      },
      error => {
        console.log(error);
        this.toastService.mostrarToast(encargado.nombre, 'Ahora es un encargado de la tarea', 1);
      })
  }
  else{
    this.tablerosService.eliminarEncargadoTarea(this.correoCreador, this.nombreTablero, this.tarea.nombre, encargado.correoInstitucional)
    .subscribe(
      data => {
        console.log(data);
  
      },
      error => {
        console.log(error);
        this.toastService.mostrarToast(encargado.nombre, 'Ya no es un encargado de la tarea', 1);
      })
  }
}

cambiosRealizadosDependencia(dependencia: Dependencia){
  if(!dependencia.seleccionada){
    this.tablerosService.agregarDependenciasTarea(
      [
        {correoEstudiante: this.correoCreador,
          nombreTablero: this.nombreTablero,
          nombreTarea: this.tarea.nombre,
          nombreTareaDependiente: dependencia.nombre}
      ]
    )
    .subscribe(
      data => {
        console.log(data);
  
      },
      error => {
        console.log(error);
        this.toastService.mostrarToast(dependencia.nombre, 'Ahora es una dependencia', 1);
      })
  }
  else{
    this.tablerosService.eliminarDependenciaTarea(
      this.correoCreador, this.nombreTablero, this.tarea.nombre, dependencia.nombre
    )
    .subscribe(
      data => {
        console.log(data);
  
      },
      error => {
        console.log(error);
        this.toastService.mostrarToast(dependencia.nombre, 'Ya no es una dependencia', 1);
      })
  } 
}

dimiss(){
  this.popoverController.dismiss();
}

}