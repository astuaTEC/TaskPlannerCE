import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'; 
import { AlertController, ToastController } from '@ionic/angular';
import { Colaborador } from 'src/app/Clases/colaborador';
import { Notificacion } from 'src/app/Clases/notificacion';
import { AmigosService } from 'src/app/Servicios/amigos.service';
import { ToastService } from 'src/app/Servicios/toast.service';

@Component({
  selector: 'app-amigos-notificaciones',
  templateUrl: './amigos-notificaciones.page.html',
  styleUrls: ['./amigos-notificaciones.page.scss'],
})
export class AmigosNotificacionesPage implements OnInit {

  // Lista de todas las solicitudes de amistad
  solicitudesAmistad: Colaborador[] = [];

  // Lista de notificaciones
  notificaciones: Notificacion[] = [];


  constructor(private amigosService: AmigosService, private toastService: ToastService, private router: Router, private route: ActivatedRoute, public alertController: AlertController) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.actualizar();

  }
  actualizar(){
    // Vaciar las listas
    this.solicitudesAmistad = [];
    this.notificaciones = [];

    // Solicitar las solicitudes de amistad
    this.amigosService.getSolicitudesAmistad(localStorage.getItem('correoInstitucional'))
    .subscribe(
      data => {
        for(let solicitud of data){
          this.solicitudesAmistad.push(
            new Colaborador(solicitud['nombre'], solicitud['correoEmisor'])
          );
        }
      }
    )

    // Solicitar la lista de notificaciones
    this.amigosService.getListaNotificaciones(
      localStorage.getItem('correoInstitucional')
    )
    .subscribe(
      data => {
        for(let notificacion of data){
          this.notificaciones.push(
            new Notificacion(notificacion['id'], notificacion['descripcion'], notificacion['fecha'].split('T')[0])
          )
        }
      }
    )
  }
  
  goToAmigos(){
    this.router.navigate(['/estudiante-tabs/amigos']);
  }

  async eliminarNotificacion(notificacion: Notificacion) {
    const alert = await this.alertController.create({
      header: 'Notificaciones',
      message: '¿Seguro que quieres eliminar esta notificación?',
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
              this.amigosService.eliminarNotificacion(
                localStorage.getItem('correoInstitucional'), notificacion.id
              )
              .subscribe(
                data => {
                  console.log(data);
        
                },
                error => {
                  console.log(error);
                  if(error.status == 200){
                    this.toastService.mostrarToast('Eliminar Notificación', 'La notificación ha sido eliminada exitosamente', 3);
                    this.actualizar();
                  }
  
                });
          }
        }
      ]
    });

    await alert.present();
  }

  
  async aceptarSolicitud(correoReceptor: string, nombre: string) {
    const alert = await this.alertController.create({
      header: 'Solicitudes de amistad',
      message: '¿Desea aceptar la solicitud de amistad?',
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
            this.amigosService.validarSolicitudAmistad(correoReceptor,
            localStorage.getItem('correoInstitucional'), 'Aceptado')
            .subscribe(
              data => {
                console.log(data);
      
              },
              error => {
                console.log(error);
                if(error.status == 200){
                  this.toastService.mostrarToast('Solicitudes de amistad', 'Tu y ' + nombre + ' ahora son amigos', 3);
                  this.actualizar();
                }

              });
          }
        }
      ]
    });

    await alert.present();
  }

  async rechazarSolicitud(correoReceptor: string, nombre: string) {
    const alert = await this.alertController.create({
      header: 'Solicitudes de amistad',
      message: '¿Desea rechazar la solicitud de amistad?',
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
            this.amigosService.validarSolicitudAmistad(
            correoReceptor, localStorage.getItem('correoInstitucional'), 'Rechazado')
            .subscribe(
              data => {
                console.log(data);
      
              },
              error => {
                console.log(error);
                // Mostrar un Toast
                if(error.status == 200){
                  this.toastService.mostrarToast('Solicitudes de amistad', 'La solicitud de' + nombre + ' ha sido rechazada', 3);
                  this.actualizar();
                }

              });
          }
        }
      ]
    });

    await alert.present();
  }


}
