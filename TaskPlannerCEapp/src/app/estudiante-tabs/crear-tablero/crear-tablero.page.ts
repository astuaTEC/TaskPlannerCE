import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-crear-tablero',
  templateUrl: './crear-tablero.page.html',
  styleUrls: ['./crear-tablero.page.scss'],
})
export class CrearTableroPage implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
  }

  goToTableros(){
    this.router.navigate(['/estudiante-tabs/tableros']);
  }

}
