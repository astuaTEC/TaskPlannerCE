import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'; 
import {AmigosService} from 'src/app/Servicios/amigos.service'
import {Amigo} from 'src/app/Clases/amigo'
import { AlertController } from '@ionic/angular';
import { ToastService } from 'src/app/Servicios/toast.service';
@Component({
  selector: 'app-buscar-amigos',
  templateUrl: './buscar-amigos.page.html',
  styleUrls: ['./buscar-amigos.page.scss'],
})
export class BuscarAmigosPage implements OnInit {

  searchTerm: string = '';

  // Lista de los amigos
  amigos: Amigo[] = [];

  // Lista de estudiantes con solicitudes pendientes
  pendientes: Amigo[] = []; 

  // Esta es la lista con todos los estudiantes
  estudiantes: Amigo[] = [];

  // Esta es la lista con estudiantes filtrados
  estudiantesFiltro: Amigo[] = [];


  constructor(private toastService: ToastService, private alertController: AlertController, private amigosService: AmigosService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
 
  }

  ionViewWillEnter(){
    this.actualizar();
  }

  actualizar(){
    // Vaciar la lista de estudiantes
    this.estudiantes = [];
    this.amigos = [];

    // Pedir la lista de las solicitudes pendientes
    this.amigosService.getSolicitudesPendientes(localStorage.getItem('correoInstitucional'))
    .subscribe(
      data => {
        for(let estudiante of data){
          console.log(estudiante['correo']);
          this.pendientes.push(
            new Amigo(estudiante['correo'], '', '', '')
          );
        }

        
    // Pedir la lista de estudiantes que son amigos
    this.amigosService.getListaAmigos(localStorage.getItem('correoInstitucional'))
    .subscribe(
      data => {
        console.log(data);
        for(let e of data){
          // Asegurarse de que el amigo no esté agregado aún
          this.amigos.push(
            new Amigo(e.correoAmigo, e.carnet, e.nombre, 'Amigo')
          )
        }
        // Pedir la lista de todos los estudiantes del sistema para filtrarlos
        this.amigosService.getListaEstudiantesSistema(localStorage.getItem('correoInstitucional'))
        .subscribe(
          data => {
            console.log(data);
            for(let e of data){
              // Asegurarse de que si es un amigo o no
              if(this.esAmigo(e.correoInstitucional)){
                this.estudiantes.push(
                  new Amigo(e.correoInstitucional, e.carnet, e.nombre, 'Amigo')
                )
                continue;
              }
              if(this.esPendiente(e.correoInstitucional)){
                this.estudiantes.push(
                  new Amigo(e.correoInstitucional, e.carnet, e.nombre, 'Pendiente')
                )
                continue;
              }
              else{
                this.estudiantes.push(
                  new Amigo(e.correoInstitucional, e.carnet, e.nombre, 'NoAmigo')
                )
              }
            }
          });


          this.estudiantesFiltro = this.estudiantes;
       
          });
      })

  }

  esAmigo(correo: string): boolean{
    let amigoBandera: boolean = false;
    for(let amigo of this.amigos){
      if(amigo.correoAmigo == correo){
        amigoBandera = true;
        break;
      }
    }
    return amigoBandera;
  }

  esPendiente(correo: string): boolean{
    let pendienteBandera: boolean = false;
    for(let amigo of this.pendientes){
      if(amigo.correoAmigo == correo){
        pendienteBandera = true;
        break;
      }
    }
    return pendienteBandera;
  }

  goToAmigos(){
    this.router.navigate(['/estudiante-tabs/amigos']);
  }

  search(value: string): void {
    this.estudiantesFiltro = this.estudiantes.filter((target) => target.nombre.toLowerCase().includes(value) || target.correoAmigo.toLowerCase().includes(value));
  }

  limpiarBusqueda(){
    this.searchTerm = '';
    // Llenar las listas de filtros
    this.estudiantesFiltro = this.estudiantes;
  }

  async enviarSolicitudAmistad(correoReceptor: string){
    const alert = await this.alertController.create({
      header: 'Enviar solicitud de amistad',
      message: '¿Seguro que quieres enviar la solicitud de amistad?',
      buttons: [
        {
          text: 'cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('cancelar');
          }
        }, {
          text: 'confirmar',
          handler: () => {
            // Realizar la petición al servidor
            this.amigosService.enviarSolicitudAmistad(
              localStorage.getItem('correoInstitucional'), correoReceptor
            )
            .subscribe(
              data => {
                console.log(data);
      
              },
              error => {
                console.log(error);
                if(error.status == 200){
                  this.toastService.mostrarToast('Enviar solicitud de amistad', 'La solicitud de amistad se ha enviado exitosamente al correo ' + correoReceptor, 3);
                  this.actualizar();
                }
                else{
                  this.toastService.mostrarToast('Enviar solicitud de amistad', 'Error al enviar la solicitud de amistad al correo ' + correoReceptor, 3);
                }
              });
          }
        }
      ]
    });

    await alert.present();
  }

  async eliminarAmigo(amigo: Amigo) {
    const alert = await this.alertController.create({
      header: 'Eliminar amigos',
      message: '¿Seguro que quieres eliminar a este amigo?',
      buttons: [
        {
          text: 'cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('cancelar');
          }
        }, {
          text: 'confirmar',
          handler: () => {
            this.amigosService.eliminarAmigo(localStorage.getItem('correoInstitucional'),
            amigo.correoAmigo)
            .subscribe(
              data => {
                console.log(data);
      
              },
              error => {
                console.log(error);
                if(error.status == 200){
                  this.toastService.mostrarToast('Eliminar Amigo', amigo.nombre + ' ha sido eliminado de la lista de amigos', 3);
                  this.actualizar();
                }

              });
      
        }
        }]
    });

    await alert.present();
  }

  notificarEstudiantePendiente(){
    this.toastService.mostrarToast('Mensaje', 'El estudiante se encuentra en estado Pendiente', 3);
  }
}
