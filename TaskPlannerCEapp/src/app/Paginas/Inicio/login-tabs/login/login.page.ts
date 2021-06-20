import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { LoadingService } from 'src/app/Servicios/loading.service';
import {LoginService } from 'src/app/Servicios/login.service'
import {ToastService} from 'src/app/Servicios/toast.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  //Objeto JSON para almacenar el correo y la contraseña del estudiante.
  usuario = {
    correoInstitucional: '',
    contrasena: ''
  }

  constructor(private loadingService: LoadingService, private toastService: ToastService, private router: Router, private loginService: LoginService, private alertController: AlertController) { }

  ngOnInit() {
  }

  login(){
   // Se presenta el Loading
   this.loadingService.iniciarLoading('Iniciando Sesión');
    this.loginService.iniciarSesion(this.usuario)
      .subscribe(
        data => {
          console.log(data);
          // Si el estudiante es aceptado tiene un valor verdadero
          if(data["estudiante"] == true){
            // Se vacían los campos de Input
            this.usuario.correoInstitucional = '';
            this.usuario.contrasena = '';

            // Guardar el correo para usos posteriores
            localStorage.setItem('correoInstitucional', data['correoInstitucional']);

            // Detener el loading
            this.loadingService.detenerLoading();

            // Navegar hacia el Home de la aplicación
            this.router.navigate(['/estudiante-tabs/tableros']);
          }
          if(data['profesor'] == true && data['admin'] == false){
            // Se vacían los campos de Input
            this.usuario.correoInstitucional = '';
            this.usuario.contrasena = '';

            // Guardar el correo para usos posteriores
            localStorage.setItem('correoInstitucional', data['correoInstitucional']);

            // Detener el loading
            this.loadingService.detenerLoading();

            // Navegar hacia el Home de la aplicación
            this.router.navigate(['/profesor-tabs/tableros-profesor']);
          }
          if(data['admin'] == true){
            // Se vacían los campos de Input
            this.usuario.correoInstitucional = '';
            this.usuario.contrasena = '';

            // Guardar el correo para usos posteriores
            localStorage.setItem('correoInstitucional', data['correoInstitucional']);

            // Detener el loading
            this.loadingService.detenerLoading();

            // Navegar hacia el Home de la aplicación
            this.profesorAdministrador();
          }

        },
        error => {
          console.log(error);
          // Se vacían los campos de Input
          this.usuario.correoInstitucional = '';
          this.usuario.contrasena = '';

          // Detener el loading
          this.loadingService.detenerLoading();    
                
          // Mensaje de error en el inicio de sesión
          this.toastService.mostrarToast('Login', 'El correo o la contraseña es inválido', 2);
        }); 
    
  }
  async profesorAdministrador() {
    const alert = await this.alertController.create({
      header: 'TaskPlannerCE',
      message: 'Por favor indique cómo desea iniciar sesión',
      buttons: [
        {
          text: 'Profesor',
          cssClass: 'secondary',
          handler: () => {
            this.router.navigate(['/profesor-tabs/tableros-profesor']);

          }
        }, {
          text: 'Administrador',
          handler: () => {
            this.router.navigate(['/administrador-tabs/tipos-tablero']); 
          }
        }
      ]
    });

    await alert.present();
  }

}