import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { TablerosService } from 'src/app/Servicios/tableros.service';
import { EstadoCompletitud } from 'src/app/Clases/estado-completitud';
import { Tarea } from 'src/app/Clases/tarea';
import { Colaborador } from 'src/app/Clases/colaborador';
import { InformacionTareaPage } from '../informacion-tarea/informacion-tarea.page';
import { ToastService } from 'src/app/Servicios/toast.service';
import { CrearTareaPage } from '../crear-tarea/crear-tarea.page';
import { Encargado } from 'src/app/Clases/encargado';
import { EditarTareaPage } from '../editar-tarea/editar-tarea.page';
import { InformacionTableroPage } from '../informacion-tablero/informacion-tablero.page';
import { AmigosService } from 'src/app/Servicios/amigos.service';
import { CrearTableroPage } from '../crear-tablero/crear-tablero.page';
import { EditarTableroPage } from '../editar-tablero/editar-tablero.page';
import { Tablero } from 'src/app/Clases/tablero';
import { Profesor } from 'src/app/Clases/profesor';
import { RutaCriticaPage } from '../ruta-critica/ruta-critica.page';


@Component({
  selector: 'app-contenido-tablero',
  templateUrl: './contenido-tablero.page.html',
  styleUrls: ['./contenido-tablero.page.scss'],
})


export class ContenidoTableroPage implements OnInit {



  constructor(private amigosService: AmigosService, private toastService: ToastService, private tablerosService: TablerosService, public alertController: AlertController, private popoverController: PopoverController, private router: Router, private route: ActivatedRoute) {
   
   }

  //Lista de estados de completitud
  estadosCompletitud: EstadoCompletitud[] = []

  // Nombre del tablero seleccionado
  nombreTablero: string = '';

  // Correo del creador del tablero
  correoCreador: string = '';

  // Variable de la tarea que se desea seleccionar
  tareaInfo: Tarea = null;

  // Lista de colaboradores del tablero
  colaboradores: Encargado[] = [];
 
  // Variable para seleccionar una tarea y luego enviar el nombre a ediar
  tareaEditar: Tarea = null;

  // Lista de los amigos
  amigos: Encargado[] = [];

  // Lista de profesores
  profesores: Encargado[] = [];

  // Lista de observadores
  observadores: Colaborador[] = [];

  // Lista con los tipos de tablero
  tiposTableros: string[] = [];

  // El tipo de tablero
  tipoTablero: string = ''

  // La descripción del tablero
  descripcion: string = '';

  // Tablero de información
  tableroInfo: Tablero = new Tablero('', '', '', '', [], []);

  // Cantidad de tareas
  cantidadTareas: number = 0;

  // Nombre de las tareas de la ruta crítica
  nombreTareasRuta: string[] = [];

  // Duración de las tareas de la ruta crítica
  duracionTareasRuta: number[] = [];

  ngOnInit() {


  }

  ionViewWillEnter(){
    this.actualizar();
  }

  actualizar(){
    // Vaciar la lista de estados de completitud
    this.estadosCompletitud = [];
    this.colaboradores = [];
    this.observadores = [];
    this.amigos = [];
    this.profesores = [];
    this.tiposTableros = [];
    this.tableroInfo.colaboradores = [];
    this.tableroInfo.observadores = [];

    this.cantidadTareas = 0;
    this.nombreTareasRuta = [];
    this.duracionTareasRuta = [];

    this.route.paramMap.subscribe((params: ParamMap) => {
      this.nombreTablero = params.get('nombreTablero');
      this.correoCreador = params.get('correoCreador');
    });
     
   // Pedir la lista de estados de completitud con sus tareas
    this.tablerosService.getEstadosCompletitud(this.correoCreador, this.nombreTablero)
    .subscribe( 
      data => {
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

            // Se aumenta el contador de las tareas
            this.cantidadTareas++;
          }
 
          // Se crea y se agrega un estado de completitud a la lista
          this.estadosCompletitud.push(
            new EstadoCompletitud(estado['idEstado'],
            estado['nombre'],
            tareasEstado)
          )
        }
        if(this.cantidadTareas > 2){
          // Pedir la ruta crítica
          this.tablerosService.getRutaCritica(
            this.correoCreador, this.nombreTablero
          )
          .subscribe(
            data => {
              console.log(data);
              // Primero se obtiene la primera tarea de la ruta
              this.nombreTareasRuta.push(data['ruta'][0]['nombre']);
              this.duracionTareasRuta.push(data['ruta'][0]['dur']);

              // Luego se agregan las siguientes tareas de la ruta
              for(let hija of data['ruta'][0]['dependencias']){
                this.nombreTareasRuta.push(hija['nombre']);
                this.duracionTareasRuta.push(hija['dur']);
              }

            });
        }
     }); 
     
     //Pedir la lista de todos los colaboradores del tablero
    this.tablerosService.getInfoTablero(this.correoCreador, this.nombreTablero)
    .subscribe(
      data => {
        // Llenar la lista de colaboradores del tablero
        for(let colaborador of data['colaboradores']){
          this.colaboradores.push(
            new Encargado(colaborador['nombre'], colaborador['correoInstitucional'], false)
          )

          // Llenar la lista de colaboradores del tablero de información
          this.tableroInfo.colaboradores.push(
            new Encargado(colaborador['nombre'], colaborador['correoInstitucional'], false)

          )
        }

        // Llenar la lista de observadores
        for(let observador of data['visualizadores']){
          this.observadores.push(
            new Colaborador(observador['nombre'], observador['correoInstitucional'])
          )

          // Llenar la lista de observadores del tablero de información
          this.tableroInfo.observadores.push(
            new Profesor(observador['nombre'], observador['correoInstitucional'])
          )
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

    // Acceder a los tipos de tableros
    this.tablerosService.getTiposTableros()
    .subscribe(
      data => {
        for(let tipo of data){
          this.tiposTableros.push(tipo['nombre'])
        }
      }
    )
    // Acceder a los detalles del tablero
    this.tablerosService.getDetallesTablero(
      this.correoCreador, this.nombreTablero
    )
    .subscribe(
      data => {
        this.tipoTablero = data['tipo'];
        this.descripcion = data['descripcion'];

        // Llenar los datos del tablero de información
        this.tableroInfo.tipo = data['tipo'];
        this.tableroInfo.descripcion = data['descripcion'];
        this.tableroInfo.creador = this.correoCreador;
        this.tableroInfo.nombre = this.nombreTablero;
      });
        
  }
  
  goToTableros(){
    this.router.navigate(['/estudiante-tabs/tableros']);
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      let idEstado = Number(event.container.id);
      let nombreTarea = event.item.data['nombre'];
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.container.data.length);
      
        // Mover la tarea en la base de datos
        this.tablerosService.moverTarea(this.correoCreador, this.nombreTablero, nombreTarea, idEstado)
        .subscribe(
          data => {
            console.log(data);
  
          },
          error => {
            console.log(error);
            // Mostrar un Toast
            this.toastService.mostrarToast('Mover Tarea', nombreTarea + ' se ha movido exitosamente', 3 );
            this.actualizar();
          });
    
        
    }
  }

  async nuevaTarea(ev: any) {
    const popover = await this.popoverController.create({
      component: CrearTareaPage,
      cssClass: 'my-custom-class',
      event: ev,
      translucent: true,
      backdropDismiss: false,
      showBackdrop: true,
      componentProps: {correoCreador: this.correoCreador, nombreTablero: this.nombreTablero, estados: this.estadosCompletitud, colaboradores: this.colaboradores}
    });
    await popover.present();

    const { role } = await popover.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
    // Cuando se cierra el Popover se debe actualizar la lista de estados
    this.actualizar();
  }

  async rutaCritica(ev: any) {
    const popover = await this.popoverController.create({
      component: RutaCriticaPage,
      cssClass: 'my-custom-class',
      event: ev,
      translucent: true,
      componentProps: {nombreTareasRuta: this.nombreTareasRuta, duracionTareasRuta: this.duracionTareasRuta}
    });
    if(this.cantidadTareas >= 2){
      await popover.present();

      const { role } = await popover.onDidDismiss();
      console.log('onDidDismiss resolved with role', role);
      // Cuando se cierra el Popover se debe actualizar la lista de estados   
    }
    else{
      this.toastService.mostrarToast('Ruta Crítica', 'En este momento no es posible generar una ruta crítica', 3);
    }

  }

  async editarTablero(ev: any) {
    console.log('Correo creador:', this.correoCreador);
    console.log('Mi correo:', localStorage.getItem('correoInstitucional'));

    if(localStorage.getItem('correoInstitucional') == this.correoCreador){
      const popover = await this.popoverController.create({
        component: EditarTableroPage,
        cssClass: 'my-custom-class',
        event: ev,
        translucent: true,
        componentProps: {nombreTablero: this.nombreTablero, tipoTablero: this.tipoTablero, tiposTableros: this.tiposTableros, descripcion: this.descripcion, colaboradores: this.colaboradores,
      amigos: this.amigos, observadores: this.observadores, profesores: this.profesores, correoCreador: this.correoCreador}
      });
      await popover.present();
  
      const { role } = await popover.onDidDismiss();
      console.log('onDidDismiss resolved with role', role);
      // Cuando se cierra el Popover se debe actualizar la lista de estados
      this.actualizar();
    }
    else{
      this.toastService.mostrarToast('Estimado amigo', 'Se le recuerda que solo el creador del tablero tiene permisos de edición', 3);
    }

  }

  async informacionTablero(ev: any) {
    const popover = await this.popoverController.create({
      component: InformacionTableroPage,
      cssClass: 'my-custom-class',
      event: ev,
      translucent: true,
      backdropDismiss: false,
      showBackdrop: true,
      componentProps: { tablero: this.tableroInfo}
    });
    await popover.present();

    const { role } = await popover.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

  seleccionarTareaEditar(tarea: Tarea){
    this.tareaEditar = tarea;
  }

  async editarTarea(ev: any) {
    const popover = await this.popoverController.create({
      component: EditarTareaPage,
      cssClass: 'my-custom-class',
      event: ev,
      translucent: true,
      backdropDismiss: false,
      showBackdrop: true,
      componentProps: {correoCreador: this.correoCreador, nombreTablero: this.nombreTablero, estados: this.estadosCompletitud, colaboradores: this.colaboradores, tarea: this.tareaEditar}
    });
    await popover.present();

    const { role } = await popover.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
    // Se actualiza la lista de estados
    this.actualizar();
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

  async nuevoEstado() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Crear nuevo estado',
      inputs: [
        {
          name: 'nombreEstado',
          type: 'text',
          placeholder: 'Nombre del estado de completitud'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'confirmar',
          handler: (satanas) => {
            if(satanas.nombreEstado != ''){
              this.tablerosService.crearEstadoCompletitud(
                this.correoCreador, this.nombreTablero, satanas.nombreEstado
              )
              .subscribe(
                data => {
                  console.log(data);
        
                },
                error => {
                  console.log(error);
                  // Mostrar un Toast
                  this.toastService.mostrarToast('Crear Estado', 'se ha creado el estado ' + satanas.nombreEstado, 3);
                  this.actualizar();
                });
            }
            
          }
        }
      ]
    });

    await alert.present();
  }

  async editarEstado(idEstado: number, nombreEstado: string) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Editar estado de completitud',
      inputs: [
        {
          name: 'nombreEstado',
          type: 'text',
          placeholder: 'Escriba el nuevo nombre del estado de completitud'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'confirmar',
          handler: (satanas) => {
            if(satanas.nombreEstado != ''){
              // Cambiar el nombre del estado en la base de datos
              this.tablerosService.actualizarNombreEstado(this.correoCreador, this.nombreTablero, satanas.nombreEstado, idEstado)
              .subscribe(
                data => {
                  console.log(data);
        
                },
                error => {
                  console.log(error);
                  // Mostrar un Toast
                  this.toastService.mostrarToast('Editar Estado', 'El estado ' + nombreEstado + ' se ha cambiado por ' + satanas.nombreEstado, 3);
                  this.actualizar();
                });
            }
          }
        }
      ]
    });

    await alert.present();
  }

  async eliminarTarea(tarea: Tarea) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Eliminar Tarea',
      message: '¿Seguro que quieres eliminar ' + tarea.nombre + '?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'confirmar',
          handler: () => {
            this.tablerosService.eliminarTarea(
              this.correoCreador, this.nombreTablero, tarea.nombre
            )
            .subscribe(
              data => {
                console.log(data);
      
              },
              error => {
                console.log(error);
                // Mostrar un Toast
                this.toastService.mostrarToast('Eliminar Tarea', 'La tarea ' + tarea.nombre + ' se ha eliminado exitosamente', 3);
                this.actualizar();
              });
          }
        }
      ]
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

  
  async eliminarEstado(estado: EstadoCompletitud) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Eliminar estados',
      message: '¿Seguro que quieres eliminar este estado de completitud?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'confirmar',
          handler: () => {
            this.tablerosService.eliminarEstadoCompletitud(
              this.correoCreador, this.nombreTablero, estado.id
            )
            .subscribe(
              data => {
                console.log(data);
      
              },
              error => {
                console.log(error);
                // Mostrar un Toast
                this.toastService.mostrarToast('Eliminar Estado', 'El estado ' + estado.nombre + ' se ha eliminado exitosamente', 3);
                this.actualizar();
              });
          }
        }
      ]
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }


}
