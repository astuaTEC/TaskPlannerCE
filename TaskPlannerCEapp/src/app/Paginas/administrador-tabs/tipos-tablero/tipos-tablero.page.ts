import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AdminService } from 'src/app/Servicios/admin.service';
import { ToastService } from 'src/app/Servicios/toast.service';



interface TipoTablero {
  nombre: string,
  abierto: boolean,
  estados: string[]
}



@Component({
  selector: 'app-tipos-tablero',
  templateUrl: './tipos-tablero.page.html',
  styleUrls: ['./tipos-tablero.page.scss'],
})
export class TiposTableroPage implements OnInit {

  // Lista de tipos de tableros
  tiposTableros: TipoTablero[] = [];

  // Correo institucional del administrador
  correoInstitucional: string = '';


  constructor(private router: Router, private toastService: ToastService, private adminService: AdminService, private alertController: AlertController) {
    
  }

  ngOnInit(): void {

  }

  ionViewWillEnter(){
    this.actualizar();
  }

  actualizar(){
    // Vaciar las listas
    this.correoInstitucional = localStorage.getItem('correoInstitucional');
    this.tiposTableros = [];
    // Solicitar la lista de tipos de tablero
    this.adminService.getTiposTableros()
    .subscribe(
      data => {
        console.log(data);
        for(let tipo of data){

          // Primero se construyen los estados
          let estados: string[] = [];
          for(let estado of tipo['estados']){
            estados.push(estado['nombre']);
          }

          this.tiposTableros.push(
            {
              nombre: tipo['nombre'],
              abierto: false,
              estados: estados
            }
          )
     
        }
      });
  }

  abrirEstados(tipo: TipoTablero){
    // Se abren los estados
    tipo.abierto = true;

    // Se cierran todos los demás
    for(let t of this.tiposTableros){
      if(t.abierto && t.nombre != tipo.nombre){
        t.abierto = false;
      }
    }
  }

  async crearTipoTablero() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Crear nuevo tipo de tablero',
      inputs: [
        {
          name: 'nombreTipo',
          type: 'text',
          placeholder: 'Nombre'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'confirmar',
          handler: (satanas) => {
            if(satanas.nombreTipo != ''){
              this.adminService.agregarTipoTablero(
                satanas.nombreTipo
              )
              .subscribe(
                data => {
                  console.log(data);
        
                },
                error => {
                  console.log(error);
                  if(error.status == 200){
                    this.toastService.mostrarToast('Crear Tipo de Tablero', 'El tipo de tablero ' + satanas.nombreTipo + ' se ha creado exitosamente', 3);
                    this.actualizar();
                  }
                  else{
                    this.toastService.mostrarToast('Crear Tipo de Tablero', 'Error al crear nuevo tipo de tablero', 3);
                  }

                });
            }
            
          }
        }
      ]
    });

    await alert.present();
  }

  async eliminarTipoTablero(tipo: TipoTablero) {
    const alert = await this.alertController.create({
      header: 'Eliminar ' + tipo.nombre,
      message: '¿Seguro que quieres eliminar este tipo de tablero?',
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
            this.adminService.eliminarTipoTablero(
              tipo.nombre
            )
            .subscribe(
              data => {
                console.log(data);
      
              },
              error => {
                console.log(error);
                if(error.status == 200){
                  this.toastService.mostrarToast('Eliminar Tipo de Tablero', 'El tipo de tablero ' + tipo.nombre + ' ha sido eliminado', 3);
                  this.actualizar();
                }

              });
      
        }
        }]
    });

    await alert.present();
  }

  async agregarEstado(tipo: TipoTablero) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Agregar un nuevo estado a ' + tipo.nombre,
      inputs: [
        {
          name: 'nombreEstado',
          type: 'text',
          placeholder: 'Nombre'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'confirmar',
          handler: (satanas) => {

            if(satanas.nombreEstado != ''){
              this.adminService.agregarEstado(
                tipo.nombre, satanas.nombreEstado
              )
              .subscribe(
                data => {
                  console.log(data);
        
                },
                error => {
                  console.log(error);
                  if(error.status == 200){
                    this.toastService.mostrarToast(tipo.nombre, 'Se agregó el estado ' + satanas.nombreEstado , 3);
                    this.actualizar();
                  }
                  else{
                    this.toastService.mostrarToast(tipo.nombre, 'Error al agregar un nuevo estado' , 3);
                  }

                });
            }
            
          }
        }
      ]
    });

    await alert.present();
  }

  async eliminarEstado(tipo: TipoTablero, estado: string) {
    const alert = await this.alertController.create({
      header: 'Eliminar ' + estado,
      message: '¿Seguro que quieres eliminar este estado?',
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
            this.adminService.eliminarEstado(
              tipo.nombre, estado
            )
            .subscribe(
              data => {
                console.log(data);
      
              },
              error => {
                console.log(error);
                if(error.status == 200){
                  this.toastService.mostrarToast(tipo.nombre, 'Se ha eliminado el estado ' + estado, 3);
                  this.actualizar();
                }

              });
      
        }
        }]
    });

    await alert.present();
  }
  goToLogin(){
    this.router.navigate(['/login-tabs/login']);
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
