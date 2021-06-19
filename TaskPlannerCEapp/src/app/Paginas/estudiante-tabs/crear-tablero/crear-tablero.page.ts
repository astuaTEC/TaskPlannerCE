import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavParams, PopoverController } from '@ionic/angular';
import { Encargado } from 'src/app/Clases/encargado';
import { TablerosService } from 'src/app/Servicios/tableros.service';
import { ToastService } from 'src/app/Servicios/toast.service';


@Component({
  selector: 'app-crear-tablero',
  templateUrl: './crear-tablero.page.html',
  styleUrls: ['./crear-tablero.page.scss'],
})
export class CrearTableroPage implements OnInit {

  // Columnas para la lista de amigos
  columnasAmigos: string[] = ['Amigo', 'Seleccionar'];

  // Columnas para la lista de dependencias
  columnasProfesores: string[] = ['Profesor', 'Seleccionar'];

  //Lista de amigos
  amigos: Encargado[] = [];

  // Tipos de tableros
  tiposTableros: string[] = [];

  // Lista de profesores
  profesores: Encargado[] = [];

  // Nombre del tablero a crear
  nombreTablero: string = '';

  // Tipo de tablero
  tipoTablero: string = '';

  // Descripción del tablero
  descripcion: string = '';




  constructor(public navParams: NavParams, private tablerosService: TablerosService, private router: Router, private route: ActivatedRoute, private popoverController: PopoverController, private toastService: ToastService) { }

  ngOnInit() {
  }
  ionViewWillEnter(){
    // Vaciar las listas
    this.tiposTableros = [];
    this.amigos = [];
    this.profesores = [];

    // Recoger la información del Popover
    this.tiposTableros = this.navParams.get('tiposTableros');
    this.amigos = this.navParams.get('amigos');
    this.profesores = this.navParams.get('profesores');

    console.log(this.profesores);

  }

  crearTablero(){
    // Primero se modela la fecha
    let hoy = new Date();
    let dia = String(hoy.getDate()).padStart(2, '0');
    let mes = String(hoy.getMonth() + 1).padStart(2, '0');
    let ano = hoy.getFullYear();

    let fecha = ano + '-' + mes + '-' + dia;

    // Se crea el tablero con los datos fijos
    this.tablerosService.crearTablero(
      localStorage.getItem('correoInstitucional'), this.nombreTablero,
      this.tipoTablero, this.descripcion, fecha
    )
    .subscribe(
      data => {
        console.log(data);
  
      },
      error => {
        console.log('Tablero', error);
        if(error.status == 200){
          
          // En caso de que el usuario haya seleccionado algún colaborador
          let listaColaboradores: any[] = [];
          for(let colaborador of this.amigos){
            if(colaborador.seleccionado){
              listaColaboradores.push({
                correoEstudiante: localStorage.getItem('correoInstitucional'),
                nombreTablero: this.nombreTablero,
                correoColaborador: colaborador.correoInstitucional
              })
            }
          }

          // Se realiza la petición para agregar colaboradores al tablero creado
          this.tablerosService.agregarColaboradoresTablero(listaColaboradores)
          .subscribe(
            data => {
              console.log(data);
        
            },
            error => {
              console.log(error);
            });

          
          // En caso de que el usuario haya seleccionado algún profesor
          let listaObservadores: any[] = [];
          for(let observador of this.profesores){
            if(observador.seleccionado){
              listaObservadores.push({
                correoEstudiante: localStorage.getItem('correoInstitucional'),
                nombreTablero: this.nombreTablero,
                correoProfesor: observador.correoInstitucional
              })
            }
          }

          console.log(listaObservadores);
          // Se realiza la petición para agregar observadores al tablero creado
          this.tablerosService.agregarObservadoresTablero(listaObservadores)
          .subscribe(
            data => {
              console.log(data);
        
            },
            error => {
              console.log('observadores', error);
            });

          this.toastService.mostrarToast('Crear Tablero', 'El tablero ' + this.nombreTablero + ' se ha creado exitosamente', 3);
          this.dimiss();
          }
          else{
            this.toastService.mostrarToast('Crear Tablero', 'Ha ocurrido un error al crear el tablero', 3);
          }
        });
    
    
  }

  dimiss(){
    this.popoverController.dismiss();
  }

}
