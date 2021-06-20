import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, PopoverController } from '@ionic/angular';
import { Colaborador } from 'src/app/Clases/colaborador';
import { Profesor } from 'src/app/Clases/profesor';
import { Tablero } from 'src/app/Clases/tablero';
import { TablerosService } from 'src/app/Servicios/tableros.service';
import { ToastService } from 'src/app/Servicios/toast.service';
import { InformacionTableroPage } from '../../estudiante-tabs/informacion-tablero/informacion-tablero.page';

@Component({
  selector: 'app-tableros-profesor',
  templateUrl: './tableros-profesor.page.html',
  styleUrls: ['./tableros-profesor.page.scss'],
})
export class TablerosProfesorPage implements OnInit {

  // Lista de los tableros observables
  tableros: Tablero[] = [];

  // Tableros filtrados
  tablerosFiltro: Tablero[] = [];

  // Tablero de información
  tableroInfo: Tablero = null;

  // Término de búsqueda
  searchTerm: string = '';

  constructor(private toastService: ToastService, private tablerosService: TablerosService, private popoverController: PopoverController, private router: Router, private route: ActivatedRoute, public alertController: AlertController) { }


  ngOnInit() {
  }

  ionViewWillEnter(){
    this.actualizar();
  }

  actualizar(){
      // Vaciar las listas
      this.tableros = [];

      // Solicitar la lista de tableros observables
      this.tablerosService.getListaTablerosObservables(
        localStorage.getItem('correoInstitucional')
      )
      .subscribe(
        data => {
          console.log(data);
          for(let tablero of data){
            let colaboradores: Colaborador[] = [];
            let observadores: Profesor[] = [];
            // Pedir la información adicional del tablero
            this.tablerosService.getInfoTablero(tablero['correoPropietario'], tablero['nombre'])
            .subscribe(
             data => {
                for (let colaborador of data['colaboradores']){
                  colaboradores.push(
                    new Colaborador(colaborador['nombre'], colaborador['correoInstitucional'])
                  );
                }

                for (let observador of data['visualizadores']){
                  observadores.push(
                    new Profesor(observador['nombre'], observador['correoInstitucional'])
                  );
                }
            
              });  
            this.tableros.push(
              new Tablero(tablero['nombre'], tablero['tipo'], tablero['correoPropietario'], tablero['descripcion'], colaboradores, observadores)
            )
          }
        });

  // Igualar los tableros de filtrado y total
  this.tablerosFiltro = this.tableros;
   
  }


  goToContenidoTablero(nombreTablero: string, correoCreador: string){
    this.router.navigate(['/profesor-tabs/contenido-tablero-profesor', nombreTablero, correoCreador]);
  }

  seleccionarTablero(tablero: Tablero){
    this.tableroInfo = tablero;
  }

  async informacionTablero(ev: any) {
    const popover = await this.popoverController.create({
      component: InformacionTableroPage,
      cssClass: 'my-custom-class',
      event: ev,
      translucent: true,
      componentProps: { tablero: this.tableroInfo}
    });
    await popover.present();

    const { role } = await popover.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

  search(value: string): void {
    this.tablerosFiltro = this.tableros.filter((target) => target.nombre.toLowerCase().includes(value));
  }

  limpiarBusqueda(){
    this.searchTerm = '';
    // Llenar las listas de filtros
    this.tablerosFiltro = this.tableros;  
  }
  
}
