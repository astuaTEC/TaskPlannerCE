import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { PerfilService } from 'src/app/Servicios/perfil.service';
import { ToastService } from 'src/app/Servicios/toast.service';

@Component({
  selector: 'app-editar-perfil-profesor',
  templateUrl: './editar-perfil-profesor.page.html',
  styleUrls: ['./editar-perfil-profesor.page.scss'],
})
export class EditarPerfilProfesorPage implements OnInit {

  
  // Primer nombre del profesor
  primerNombre: string = '';

  // Segundo nombre del profesor
  segundoNombre: string = '';

  // Primer Apellido
  primerApellido: string = '';

  // Segundo apellido
  segundoApellido: string = '';

  // Carné institucional
  carnet: number = 0;

  // Correo institucional
  correoInstitucional: string = '';

  // Número de telefono
  telefono: number = 0;

  constructor(private alertController: AlertController, private toastService: ToastService, private perfilService: PerfilService, private router: Router) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.actualizar();
  }

  actualizar(){
    this.perfilService.getInfoPerfilProfesor(localStorage.getItem('correoInstitucional'))
    .subscribe(
      data => {
        console.log(data);
        this.primerNombre = data['primerNombre'];
        this.segundoNombre = data['segundoNombre'];
        this.primerApellido = data['primerApellido'];
        this.segundoApellido = data['segundoApellido'];
        this.correoInstitucional= data['correoInstitucional'];
        this.telefono = Number(data['telefono'].split('+506')[1]);
        this.carnet = data['carnet'];
      });
  }

  goToPerfil(){
    this.router.navigate(['/profesor-tabs/perfil-profesor']);
  }

  guardar(){
    this.perfilService.editarPerfilProfesor(
      this.correoInstitucional, this.carnet.toString(), this.primerNombre, this.segundoNombre,
      this.primerApellido, this.segundoApellido, '+506' + this.telefono.toString()
    )
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
            this.perfilService.eliminarCuentaProfesor(localStorage.getItem('correoInstitucional'))
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
