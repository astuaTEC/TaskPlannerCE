import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-amigos',
  templateUrl: './amigos.page.html',
  styleUrls: ['./amigos.page.scss'],
})
export class AmigosPage implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute, public alertController: AlertController) { }

  ngOnInit() {
  }

  goToBuscarAmigos(){
    this.router.navigate(['/estudiante-tabs/buscar-amigos']);
  }

  goToNotificaciones(){
    this.router.navigate(['/estudiante-tabs/amigos-notificaciones']);
  }

  async eliminarAmigo() {
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
          text: 'aceptar',
          handler: () => {
            console.log('se debe eliminar el amigo');
          }
        }
      ]
    });

    await alert.present();
  }


}
