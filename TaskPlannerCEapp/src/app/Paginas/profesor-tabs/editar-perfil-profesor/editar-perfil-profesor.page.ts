import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(private toastService: ToastService, private perfilService: PerfilService, private router: Router) { }

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

}
