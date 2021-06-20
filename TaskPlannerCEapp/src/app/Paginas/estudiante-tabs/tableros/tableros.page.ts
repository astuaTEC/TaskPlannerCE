import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { PopoverController } from '@ionic/angular';
import {TablerosService} from 'src/app/Servicios/tableros.service'
import {Tablero} from 'src/app/Clases/tablero'
import { Colaborador } from 'src/app/Clases/colaborador';
import { Profesor } from 'src/app/Clases/profesor';
import { InformacionTableroPage } from '../informacion-tablero/informacion-tablero.page';
import { ToastService } from 'src/app/Servicios/toast.service';
import { CrearTableroPage } from '../crear-tablero/crear-tablero.page';
import { AmigosService } from 'src/app/Servicios/amigos.service';
import { Encargado } from 'src/app/Clases/encargado';

@Component({
  selector: 'app-tableros',
  templateUrl: './tableros.page.html',
  styleUrls: ['./tableros.page.scss'],
})
export class TablerosPage implements OnInit {

  // Lista de tableros creados por el usuario
  tablerosCreados: Tablero[] = [];

  // Lista de tableros creados pero filtrados
  tablerosCreadosFiltro: Tablero[] = [];

  // Lista de tableros en los que colabora el usuario
  tablerosColaboraciones: Tablero[] = [];

  // Lista de tableros en los que colabora el usuario pero filtrados
  tablerosColaboracionesFiltro: Tablero[] = [];

  //Variable de filtro
  searchTerm: string = '';

  // Tablero que se selecciona para mostrar informacion
  tableroInfo: Tablero = null;

  // Lista con los tipos de tableros
  tiposTableros: string[] = [];

  // Lista de amigos
  amigos: Encargado[] = [];

  // Lista de todos los profesores del sistema
  profesores: Encargado[] = [];
  

  constructor(private amigosService: AmigosService, private toastService: ToastService, private tablerosService: TablerosService, private popoverController: PopoverController, private router: Router, private route: ActivatedRoute, public alertController: AlertController) { }

  ngOnInit() {


  }
  
  ionViewWillEnter(){
    this.actualizar();
  }

  actualizar(){
    // Vaciar las listas
    this.tablerosCreados = [];
    this.tablerosColaboraciones = [];
    this.tiposTableros = [];
    this.amigos = [];
    this.profesores = [];

    // Pedir la lista de tableros creados por el usuario
    this.tablerosService.getTablerosCreados(localStorage.getItem('correoInstitucional'))
    .subscribe(
      data => {
        for (let tablero of data){

          let colaboradores: Colaborador[] = [];
          let observadores: Profesor[] = [];

          // Pedir la información adicional del tablero
          this.tablerosService.getInfoTablero(localStorage.getItem('correoInstitucional'), tablero['nombre'])
          .subscribe(
            data => {
              for (let colaborador of data['colaboradores']){
                colaboradores.push(
                  new Colaborador(colaborador['nombre'], colaborador['correoInstitucional'])
                );
              }

              for (let observador of data['visualizadores']){
                observadores.push(
                  new Profesor(observador['nombre'], observador['correoInstitucional'])
                );
              }
              
            });     

          this.tablerosCreados.push(
            new Tablero(tablero['nombre'], tablero['tipo'], tablero['correoPropietario'], tablero['descripcion'], colaboradores, observadores)
          );

        }
    
      });


    //Pedir la lista de tableros en los que se colabora
    this.tablerosService.getTablerosColaboraciones(localStorage.getItem('correoInstitucional'))
    .subscribe(
      data => {
        console.log(data);
        for (let tablero of data){
          let colaboradores: Colaborador[] = [];
          let observadores: Profesor[] = [];

          // Pedir la información adicional del tablero
          this.tablerosService.getInfoTablero(tablero['correoPropietario'], tablero['nombre'])
          .subscribe(
            data => {
              for (let colaborador of data['colaboradores']){
                colaboradores.push(
                  new Colaborador(colaborador['nombre'], colaborador['correoInstitucional'])
                );
              }

              for (let observador of data['visualizadores']){
                observadores.push(
                  new Profesor(observador['nombre'], observador['correoInstitucional'])
                );
              }
              
            });           
          this.tablerosColaboraciones.push(
            new Tablero(tablero['nombre'], tablero['tipo'], tablero['correoPropietario'], tablero['descripcion'], colaboradores, observadores)
          );

        }
      });


      // Llenar las listas de filtros
      this.tablerosCreadosFiltro = this.tablerosCreados;
      this.tablerosColaboracionesFiltro = this.tablerosColaboraciones;

    // Acceder a los tipos de tableros
    this.tablerosService.getTiposTableros()
    .subscribe(
      data => {
        for(let tipo of data){
          this.tiposTableros.push(tipo['nombre'])
        }
      }
    )

    // Pedir la lista de amigos por medio del correo guardado en LocalStorage
    this.amigosService.getListaAmigos(localStorage.getItem('correoInstitucional'))
    .subscribe(
      data => {
        for(let amigo of data){
          // Asegurarse de que el amigo no esté agregado aún
          this.amigos.push(
            new Encargado(amigo.nombre, amigo.correoAmigo, false)
          )
        }
      });
    // Pedir la lista de todos los profesores del sistema
    this.tablerosService.getListaProfesores()
    .subscribe(
      data => {
        for(let profesor of data){
          this.profesores.push(
            new Encargado(profesor['nombre'], profesor['correoInstitucional'], false)
          )
        }
      }
    )
  }
  async eliminarTablero(tablero: Tablero) {
    const alert = await this.alertController.create({
      header: 'Eliminar tableros',
      message: '¿Seguro que quieres eliminar ' + tablero.nombre + '?',
      buttons: [
        {
          text: 'cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('cancelar');
          }
        }, {
          text: 'aceptar',
          handler: () => {
            // Se realiza la petición para eliminar el tablero
            this.tablerosService.eliminarTablero(
              tablero.creador, tablero.nombre
            )
            .subscribe(
              data => {
                console.log(data);
          
              },
              error => {
                console.log(error);
                this.toastService.mostrarToast('Eliminar tablero', tablero.nombre +' se ha eliminado exitosamente', 3);
                this.actualizar();
              })
          }
        }
      ]
    });

    await alert.present();
  }

  seleccionarTableroInfo(tablero: Tablero){
    this.tableroInfo = tablero;
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

  async crearTablero(ev: any) {
    const popover = await this.popoverController.create({
      component: CrearTableroPage,
      cssClass: 'my-custom-class',
      event: ev,
      translucent: true,
      backdropDismiss: false,
      showBackdrop: true,
      componentProps: {tiposTableros: this.tiposTableros, amigos: this.amigos, profesores: this.profesores}
    });
    await popover.present();

    const { role } = await popover.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
    // Cuando se cierra el Popover se debe actualizar la lista de estados
    this.actualizar();
  }
  
  goToContenidoTablero(nombreTablero: string, correoCreador: string){
    this.router.navigate(['/estudiante-tabs/contenido-tablero', nombreTablero, correoCreador]);
  }

  search(value: string): void {
    this.tablerosCreadosFiltro = this.tablerosCreados.filter((target) => target.nombre.toLowerCase().includes(value));
    this.tablerosColaboracionesFiltro = this.tablerosColaboraciones.filter((target) => target.nombre.toLowerCase().includes(value));
  }

  limpiarBusqueda(){
    this.searchTerm = '';
    // Llenar las listas de filtros
    this.tablerosCreadosFiltro = this.tablerosCreados;
    this.tablerosColaboracionesFiltro = this.tablerosColaboraciones;    
  }

}
