import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { PerfilService } from 'src/app/Servicios/perfil.service';
import { ToastService } from 'src/app/Servicios/toast.service';


@Component({
  selector: 'app-editar-perfil',
  templateUrl: './editar-perfil.page.html',
  styleUrls: ['./editar-perfil.page.scss'],
})
export class EditarPerfilPage implements OnInit {

  constructor(private alertController: AlertController, private toastService: ToastService, private perfilService: PerfilService, private router: Router, private route: ActivatedRoute) { }

  // Primer nombre del estudiante
  primerNombre: string = '';

  // Segundo nombre del estudiante
  segundoNombre: string = '';

  // Primer apellido
  primerApellido: string = '';

  // Segundo apellido
  segundoApellido: string = '';

  // Carné estudiantil
  carnet: number = 0;

  // Correo estudiantil
  correoEstudiantil: string = '';

  // Número de telefono
  telefono: number = 0;

  // Carrera matriculada
  carreraMatriculada: string = '';

  // Provincia en la que reside
  provinciaResidencia: string = '';

  //Provicia en la que asiste a la universidad
  provinciaUniversidad: string = '';

  // Área de interes
  areaInteres: string = '';

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.actualizar();
  }

  actualizar(){
    this.perfilService.getInfoPerfil(localStorage.getItem('correoInstitucional'))
    .subscribe(
      data => {
        console.log(data);
        this.primerNombre = data['primerNombre'];
        this.segundoNombre = data['segundoNombre'];
        this.primerApellido = data['primerApellido'];
        this.segundoApellido = data['segundoApellido'];
        this.correoEstudiantil= data['correoInstitucional'];
        this.telefono = Number(data['telefono'].split('+506')[1]);
        this.carnet = data['carnet'];
        this.carreraMatriculada = data['carreraMatriculada'];
        this.provinciaResidencia = data['provinciaResidencia'];
        this.provinciaUniversidad = data['provinciaUniversidad'];
        this.areaInteres = data['areaDeInteres'];
      });
  }

  goToPerfil(){
    this.router.navigate(['/estudiante-tabs/perfil']);
  }

  guardar(){
    this.perfilService.editarPerfil(
      this.correoEstudiantil, this.carnet.toString(), this.primerNombre,
      this.segundoNombre, this.primerApellido, this.segundoApellido,
      '+506' + this.telefono.toString(), this.carreraMatriculada, this.provinciaResidencia,
      this.provinciaUniversidad, this.areaInteres)
      .subscribe(
        data => {
          console.log(data);
    
        },
        error => {
          console.log(error);
          if(error.status == 200){
            this.toastService.mostrarToast('Editar perfil', 'El perfil se ha actualizado exitosamente', 3);
            this.actualizar();
          }
        });
    
  }


  async eliminarCuenta() {
    const alert = await this.alertController.create({
      header: 'Eliminar Cuenta',
      message: '¿Seguro que deseas eliminar tu cuenta?',
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
            this.perfilService.eliminarCuenta(localStorage.getItem('correoInstitucional'))
            .subscribe(
              data => {
                console.log(data);
          
              },
              error => {
                console.log(error);
                if(error.status == 200){
                  this.toastService.mostrarToast('Mi estimado', 'Se le informa que su cuenta se ha eliminado', 10);
                  this.router.navigate(['/login-tabs/login']);
                }
                else{
                  this.toastService.mostrarToast('Eliminar Cuenta', 'Error al intentar eliminar la cuenta', 10);
                }
              });

            
          }
        }
      ]
    });

    await alert.present();
  }

}
