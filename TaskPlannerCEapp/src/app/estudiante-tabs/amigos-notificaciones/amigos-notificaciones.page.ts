import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'; 
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-amigos-notificaciones',
  templateUrl: './amigos-notificaciones.page.html',
  styleUrls: ['./amigos-notificaciones.page.scss'],
})
export class AmigosNotificacionesPage implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute, public alertController: AlertController) { }

  ngOnInit() {
  }
  
  goToAmigos(){
    this.router.navigate(['/estudiante-tabs/amigos']);
  }

  async eliminarNotificacion() {
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
            console.log('se debe eliminar la notificacion');
          }
        }
      ]
    });

    await alert.present();
  }

  
  async aceptarSolicitud() {
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
            console.log('se debe eliminar la notificacion');
          }
        }
      ]
    });

    await alert.present();
  }

  async rechazarSolicitud() {
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
            console.log('se debe eliminar la notificacion');
          }
        }
      ]
    });

    await alert.present();
  }


}
