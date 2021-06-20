import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { PerfilProfesor } from 'src/app/Clases/perfil-profesor';
import { PerfilService } from 'src/app/Servicios/perfil.service';

@Component({
  selector: 'app-perfil-profesor',
  templateUrl: './perfil-profesor.page.html',
  styleUrls: ['./perfil-profesor.page.scss'],
})
export class PerfilProfesorPage implements OnInit {
  
  // Perfil del profesor
  perfilProfesor: PerfilProfesor = new PerfilProfesor('', '', '', '');

  constructor(public alertController: AlertController,private perfilService: PerfilService, private router: Router) { }

  ngOnInit() {
  }

  goToLogin(){
    this.router.navigate(['/login-tabs/login']);
  }
  goToEditarPerfil(){
    this.router.navigate(['/profesor-tabs/editar-perfil-profesor']);
  }

  ionViewWillEnter(){
    this.perfilService.getInfoPerfilProfesor(localStorage.getItem('correoInstitucional'))
    .subscribe(
      data => {
        console.log(data);
        this.perfilProfesor.nombre = data['primerNombre'] + ' ' + data['segundoNombre'] + ' ' + data['primerApellido'] + ' ' + data['segundoApellido'];
        this.perfilProfesor.carnet = data['carnet'];
        this.perfilProfesor.correoInstitucional = data['correoInstitucional'];
        this.perfilProfesor.telefono = data['telefono'];
      });
  }

  async cerrarSesion() {
    const alert = await this.alertController.create({
      header: 'Cerrar Sesión',
      message: '¿Seguro que deseas cerrar sesión?',
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
            this.goToLogin();
          }
        }
      ]
    });

    await alert.present();
  }


}
