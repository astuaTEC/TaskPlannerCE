import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  usuarioEstudiante = {
    correoInstitucional: '',
    contrasena: ''
  }

  constructor(private loadingService: LoadingService, private toastService: ToastService, private router: Router, private route: ActivatedRoute, private loginService: LoginService) { }

  ngOnInit() {
  }

  goToEstudianteHome(){
   // Se presenta el Loading
   this.loadingService.iniciarLoading('Iniciando Sesión');
    this.loginService.iniciarSesion(this.usuarioEstudiante)
      .subscribe(
        data => {
          console.log(data);
          // Si el estudiante es aceptado tiene un valor verdadero
          if(data["estudiante"] == true){
            // Se vacían los campos de Input
            this.usuarioEstudiante.correoInstitucional = '';
            this.usuarioEstudiante.contrasena = '';

            // Guardar el correo para usos posteriores
            localStorage.setItem('correoInstitucional', data['correoInstitucional']);

            // Detener el loading
            this.loadingService.detenerLoading();

            // Navegar hacia el Home de la aplicación
            this.router.navigate(['/estudiante-tabs/tableros']);
          }

        },
        error => {
          console.log(error);
          // Se vacían los campos de Input
          this.usuarioEstudiante.correoInstitucional = '';
          this.usuarioEstudiante.contrasena = '';

          // Detener el loading
          this.loadingService.detenerLoading();    
                
          console.log('error')
          // Mensaje de error en el inicio de sesión
          this.toastService.mostrarToast('Login', 'El correo o la contraseña es inválido', 2);
        }); 
    
  }

}