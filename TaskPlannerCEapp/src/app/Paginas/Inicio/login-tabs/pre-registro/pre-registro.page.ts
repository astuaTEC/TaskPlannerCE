import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

@Component({
  selector: 'app-pre-registro',
  templateUrl: './pre-registro.page.html',
  styleUrls: ['./pre-registro.page.scss'],
})
export class PreRegistroPage implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
  }

  //Función que redirige al usuario a uno de los distintos registros del sistema
  goToRegister(opcion: string){
    if (opcion == 'estudiante'){
      this.router.navigate(['/registro-estudiante']);
    }
    if (opcion == 'profesor'){
      this.router.navigate(['/registro-profesor']);
    }
  }

}