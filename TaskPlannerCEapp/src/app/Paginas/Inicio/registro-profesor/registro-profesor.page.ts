import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { LoadingService } from 'src/app/Servicios/loading.service';
import { LoginService } from 'src/app/Servicios/login.service';
import { ToastService } from 'src/app/Servicios/toast.service';

@Component({
  selector: 'app-registro-profesor',
  templateUrl: './registro-profesor.page.html',
  styleUrls: ['./registro-profesor.page.scss'],
})
export class RegistroProfesorPage implements OnInit {

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

  constructor(private toastService: ToastService, private loadingService: LoadingService, private loginService: LoginService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
  }
  ioViewWillEnter(){
    this.actualizar();
  }

  actualizar(){
    this.carnet = 0;
    this.correoInstitucional = '';
    this.primerNombre = '';
    this.segundoNombre = '';
    this.primerApellido = '';
    this.segundoApellido = '';
    this.telefono = 0;
  }

  goToPreRegister(){
    this.router.navigate(['/login-tabs/pre-registro']);
  }

  registrarProfesor(){
    this.loadingService.iniciarLoading('Registrando a ' + this.primerNombre);
    this.loginService.registrarProfesor(
      this.carnet.toString(), this.correoInstitucional, this.primerNombre,
      this.segundoNombre, this.primerApellido, this.segundoApellido,
      '+506' + this.telefono.toString()
    )
    .subscribe(
      data => {
        console.log(data);

      },
      error => {
        console.log(error);
        this.loadingService.detenerLoading();
        // Mostrar un Toast
        if(error.status == 200){
          this.toastService.mostrarToast('Registro de Profesor', 'Se ha registrado un nuevo profesor en el sistema' , 3);
          this.actualizar();
          this.router.navigate(['/login-tabs/login']);
        }
        else{
          this.toastService.mostrarToast('Registro de Profesor', 'Error al intentar registrar a un nuevo profesor' , 3);
        }

      });
  }


}