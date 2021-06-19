import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {PerfilService} from 'src/app/Servicios/perfil.service'
import {PerfilEstudiante} from 'src/app/Clases/perfil-estudiante'
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  constructor(public alertController: AlertController,private perfilService: PerfilService, private router: Router, private route: ActivatedRoute) { }

  // Objeto que almacena la información del perfil
  perfilEstudiante: PerfilEstudiante = new PerfilEstudiante('', '', '', '', '', '', '', '')

  ngOnInit() {

  }

  ionViewWillEnter(){
    this.perfilService.getInfoPerfil(localStorage.getItem('correoInstitucional'))
    .subscribe(
      data => {
        console.log(data);
        this.perfilEstudiante.nombre = data['primerNombre'] + ' ' + data['segundoNombre'] + ' ' + data['primerApellido'] + ' ' + data['segundoApellido'];
        this.perfilEstudiante.carnet = data['carnet'];
        this.perfilEstudiante.correoInstitucional = data['correoInstitucional'];
        this.perfilEstudiante.telefono = data['telefono'];
        this.perfilEstudiante.carrera = data['carreraMatriculada'];
        this.perfilEstudiante.provinciaResidencia = data['provinciaResidencia'];
        this.perfilEstudiante.provinciaCursa = data['provinciaUniversidad'];
        this.perfilEstudiante.areaInteres = data['areaDeInteres'];
      });
  }



  goToLogin(){
    this.router.navigate(['/login-tabs/login']);
  }
  goToEditarPerfil(){
    this.router.navigate(['/estudiante-tabs/editar-perfil']);
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
