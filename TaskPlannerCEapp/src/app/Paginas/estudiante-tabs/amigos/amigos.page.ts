import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import {AmigosService} from 'src/app/Servicios/amigos.service'
import {Amigo} from 'src/app/Clases/amigo'
import { ToastService } from 'src/app/Servicios/toast.service';

@Component({
  selector: 'app-amigos',
  templateUrl: './amigos.page.html',
  styleUrls: ['./amigos.page.scss'],
})
export class AmigosPage implements OnInit {

  // Lista de amigos
  listaAmigos: Amigo[] = [];

  constructor(private toastService: ToastService, private amigosService: AmigosService, private router: Router, private route: ActivatedRoute, public alertController: AlertController) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.actualizar();
    
  }

  actualizar(){
    // Vaciar la lista de amigos
    this.listaAmigos = [];
    // Pedir la lista de amigos por medio del correo guardado en LocalStorage
    this.amigosService.getListaAmigos(localStorage.getItem('correoInstitucional'))
    .subscribe(
      data => {
        console.log(data);
        for(let amigo of data){
          // Asegurarse de que el amigo no esté agregado aún
          this.listaAmigos.push(
            new Amigo(amigo.correoAmigo, amigo.carnet, amigo.nombre, 'Amigo')
          )
        }
    
      });
  }

  goToBuscarAmigos(){
    this.router.navigate(['/estudiante-tabs/buscar-amigos']);
  }

  goToNotificaciones(){
    this.router.navigate(['/estudiante-tabs/amigos-notificaciones']);
  }

  async eliminarAmigo(amigo: Amigo) {
    const alert = await this.alertController.create({
      header: 'Eliminar Amigos',
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


}
