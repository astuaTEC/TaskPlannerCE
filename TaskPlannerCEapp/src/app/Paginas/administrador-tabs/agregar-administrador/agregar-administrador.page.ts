import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/Servicios/admin.service';
import { LoadingService } from 'src/app/Servicios/loading.service';
import { ToastService } from 'src/app/Servicios/toast.service';

@Component({
  selector: 'app-agregar-administrador',
  templateUrl: './agregar-administrador.page.html',
  styleUrls: ['./agregar-administrador.page.scss'],
})
export class AgregarAdministradorPage implements OnInit {

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

  constructor(private loading: LoadingService, private router: Router, private adminService: AdminService, private toastService: ToastService) { }

  ngOnInit() {
  }
  ionViewWillEnter(){
    this.actualizar();
  }

  actualizar(){
    this.primerNombre = '';
    this.segundoNombre = '';
    this.primerApellido = '';
    this.segundoApellido = '';
    this.correoInstitucional= '';
    this.telefono = 0;
    this.carnet = 0; 
  }

  goToTiposTableros(){
    this.router.navigate(['/administrador-tabs/tipos-tablero']); 
  }

  agregarAdministrador(){
    this.loading.iniciarLoading('Agregando nuevo administrador');
    this.adminService.agregarAdministrador(
      this.correoInstitucional, this.carnet.toString(), this.primerNombre,
      this.segundoNombre, this.primerApellido, this.segundoApellido,
      '+506' + this.telefono
    )
    .subscribe(
      data => {
        console.log(data);

      },
      error => {
        console.log(error);
        if(error.status == 200){
          this.toastService.mostrarToast('Agregar Administrador', 'El nuevo administrador se ha agregado exitosamente', 3);
          this.actualizar();
          this.loading.detenerLoading();
        }
        else{
          this.toastService.mostrarToast('Agregar Administrador', 'Ha ocurrido un error al intentar agregar un nuevo administrador', 3);
          this.loading.detenerLoading();
        }

      });
  }
}
