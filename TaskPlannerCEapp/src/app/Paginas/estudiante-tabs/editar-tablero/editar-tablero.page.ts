import { Component, OnInit } from '@angular/core';
import { NavParams, PopoverController } from '@ionic/angular';
import { Colaborador } from 'src/app/Clases/colaborador';
import { Encargado } from 'src/app/Clases/encargado';
import { TablerosService } from 'src/app/Servicios/tableros.service';
import { ToastService } from 'src/app/Servicios/toast.service';

@Component({
  selector: 'app-editar-tablero',
  templateUrl: './editar-tablero.page.html',
  styleUrls: ['./editar-tablero.page.scss'],
})
export class EditarTableroPage implements OnInit {
// Columnas para la lista de amigos
columnasAmigos: string[] = ['Amigo', 'Seleccionar'];

// Columnas para la lista de dependencias
columnasProfesores: string[] = ['Profesor', 'Seleccionar'];

// Lista de los amigos
amigos: Encargado[] = [];

// Lista de profesores
profesores: Encargado[] = [];

// Lista de observadores
observadores: Colaborador[] = [];

// Lista de colaboradores del tablero
colaboradores: Encargado[] = [];

// Lista con los tipos de tablero
tiposTableros: string[] = [];

// Nombre del tablero a crear
nombreTablero: string = '';

// Tipo de tablero
tipoTablero: string = '';

// Descripción del tablero
descripcion: string = '';

// Correo del creador del tablero
correoCreador: string = '';

// Bandera que indica si la descripción o el tipo de tablero ha cambiado
tableroCambios: boolean = false;


 constructor(private toastService: ToastService, private popoverController: PopoverController, public navParams: NavParams, private tablerosService: TablerosService) { }

 ngOnInit() {
 }

 ionViewWillEnter(){
   // Vaciar las listas
   this.tiposTableros = [];
   this.amigos = [];
   this.profesores = [];
   this.colaboradores = [];
   this.tableroCambios = false;

   // Recoger la información del Popover
   this.tiposTableros = this.navParams.get('tiposTableros');
   this.amigos = this.navParams.get('amigos');
   this.profesores = this.navParams.get('profesores');
   this.colaboradores = this.navParams.get('colaboradores');
   this.observadores = this.navParams.get('observadores');
   this.nombreTablero = this.navParams.get('nombreTablero');
   this.tipoTablero = this.navParams.get('tipoTablero');
   this.descripcion = this.navParams.get('descripcion');
   this.correoCreador = this.navParams.get('correoCreador');

   console.log(this.amigos);
   console.log(this.colaboradores);
   console.log(this.observadores);
   console.log(this.profesores);

   // Filtrar los amigos colaboradores del tableo
   for(let amigo of this.amigos){
     for(let colaborador of this.colaboradores){
       if(amigo.correoInstitucional == colaborador.correoInstitucional){
         amigo.seleccionado = true;
       }
     }
   }

   // Filtrar los profesores observadores
   for(let profesor of this.profesores){
     for(let observador of this.observadores){
       if(profesor.correoInstitucional == observador.correoInstitucional){
         profesor.seleccionado = true;
       }
     }
   }

 }

 dimiss(){
   this.popoverController.dismiss();
 }

 cambiosRealizadosTablero(){
   this.tableroCambios = true;
 }

 cambioRealizadoAmigo(amigo: Encargado){
   if(!amigo.seleccionado){
    this.tablerosService.agregarColaboradoresTablero(
      [
        {
          correoEstudiante: this.correoCreador,
          nombreTablero: this.nombreTablero,
          correoColaborador: amigo.correoInstitucional
        }
      ]
    )
    .subscribe(
      data => {
        console.log(data);
  
      },
      error => {
        console.log(error);
        if(error.status == 200){
          this.toastService.mostrarToast('Editar Tablero', amigo.nombre + ' ahora es un colaborador del tablero', 3);
        }
      })
   }
   else{
    this.tablerosService.eliminarColaboradorTablero(this.correoCreador,
      this.nombreTablero, amigo.correoInstitucional)
    .subscribe(
      data => {
        console.log(data);
  
      },
      error => {
        console.log(error);
        if(error.status == 200){
          this.toastService.mostrarToast('Editar Tablero', amigo.nombre + ' ya no es un colaborador del tablero', 3);
        }
      }) 
   }
 }

 cambioRealizadoProfesor(profesor: Encargado){
  if(!profesor.seleccionado){
    this.tablerosService.agregarObservadoresTablero(
      [{
          correoEstudiante: this.correoCreador,
          nombreTablero: this.nombreTablero,
          correoProfesor: profesor.correoInstitucional
        }
      ]
    )
    .subscribe(
      data => {
        console.log(data);
  
      },
      error => {
        console.log(error);
        if(error.status == 200){
          this.toastService.mostrarToast('Editar Tablero', profesor.nombre + ' ahora es un observador del tablero', 3);
        }
      })
  }
  else{
    this.tablerosService.eliminarObservadorTablero(this.correoCreador,
      this.nombreTablero, profesor.correoInstitucional)
    .subscribe(
      data => {
        console.log(data);
  
      },
      error => {
        console.log(error);
        if(error.status == 200){
          this.toastService.mostrarToast('Editar Tablero', profesor.nombre + ' ya no es un observador del tablero', 3);
        }
      })  
  }
}

 editarTablero(){
   // Validar solamente si cambió la bandera del tablero
   if(this.tableroCambios){
     this.tablerosService.editarTablero(
       this.correoCreador, this.nombreTablero, this.tipoTablero, this.descripcion
     )
     .subscribe(
      data => {
        console.log(data);
  
      },
      error => {
        console.log(error);
        if(error.status == 200){
          this.toastService.mostrarToast('Editar Tablero', this.nombreTablero + ' ha sido editado exitosamente', 3);
          this.dimiss();
        }
        else{
          this.toastService.mostrarToast('Editar Tablero', 'Ha ocurrido un error al intentar editar el tablero', 3);
        }
      })
   }
 }

}