import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { PopoverController } from '@ionic/angular';
import {InfoTableroComponent} from 'src/app/estudiante-tabs/tableros/info-tablero/info-tablero.component'


@Component({
  selector: 'app-tableros',
  templateUrl: './tableros.page.html',
  styleUrls: ['./tableros.page.scss'],
})
export class TablerosPage implements OnInit {
  constructor(private popoverController: PopoverController, private router: Router, private route: ActivatedRoute, public alertController: AlertController) { }

  ngOnInit() {
  }

  async eliminarTablero() {
    const alert = await this.alertController.create({
      header: 'Eliminar tableros',
      message: '¿Seguro que quieres eliminar este tablero?',
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
            console.log('se debe eliminar el tablero');
          }
        }
      ]
    });

    await alert.present();
  }



  async informacionTablero(ev: any) {
    const popover = await this.popoverController.create({
      component: InfoTableroComponent,
      cssClass: 'my-custom-class',
      event: ev,
      translucent: true
    });
    await popover.present();

    const { role } = await popover.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

  goToCrearTablero(){
    this.router.navigate(['/estudiante-tabs/crear-tablero']);
  }
}
