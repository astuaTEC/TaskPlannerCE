import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { LoadingService } from 'src/app/Servicios/loading.service';
import { LoginService } from 'src/app/Servicios/login.service';
import { ToastService } from 'src/app/Servicios/toast.service';

@Component({
  selector: 'app-registro-estudiante',
  templateUrl: './registro-estudiante.page.html',
  styleUrls: ['./registro-estudiante.page.scss'],
})
export class RegistroEstudiantePage implements OnInit {

  constructor(private loading: LoadingService, private loginService: LoginService, private toastService: ToastService, private router: Router, private route: ActivatedRoute) { }

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

  ioViewWillEnter(){
    this.actualizar();
  }

  actualizar(){
    this.carnet = 0;
    this.correoEstudiantil = '';
    this.primerNombre = '';
    this.segundoNombre = '';
    this.primerApellido = '';
    this.segundoApellido = '';
    this.telefono = 0;
    this.carreraMatriculada = '';
    this.provinciaResidencia = '';
    this.provinciaUniversidad = '';
    this.areaInteres = '';
  }

  goToPreRegister(){
    this.router.navigate(['/login-tabs/pre-registro']);
  }

  registrarEstudiante(){
    this.loading.iniciarLoading('Registrando a ' + this.primerNombre);
    // Se solicita registrar a un estudiante
    this.loginService.registrarEstudiante(
      this.carnet.toString(),
      this.correoEstudiantil,
      this.primerNombre,
      this.segundoNombre,
      this.primerApellido,
      this.segundoApellido,
      '+506' + this.telefono,
      this.carreraMatriculada,
      this.provinciaResidencia,
      this.provinciaUniversidad,
      this.areaInteres
    )
    .subscribe(
      data => {
        console.log(data);

      },
      error => {
        console.log(error);
        this.loading.detenerLoading();
        // Mostrar un Toast
        if(error.status == 200){
          this.toastService.mostrarToast('Registro De Estudiante', 'Se ha registrado un nuevo estudiante en el sistema' , 3);
          this.router.navigate(['/login-tabs/login']);
        }
        else{
          this.toastService.mostrarToast('Registro De Estudiante', 'Error al intentar registrar a un nuevo estudiante' , 3);
        }

      });
  }

}