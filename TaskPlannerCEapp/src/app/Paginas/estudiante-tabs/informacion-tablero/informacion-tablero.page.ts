import { Component, OnInit } from '@angular/core';
import { NavParams } from '@ionic/angular';
import { Tablero } from 'src/app/Clases/tablero';

@Component({
  selector: 'app-informacion-tablero',
  templateUrl: './informacion-tablero.page.html',
  styleUrls: ['./informacion-tablero.page.scss'],
})
export class InformacionTableroPage implements OnInit {

  tablero: Tablero = null;

  constructor(public navParams: NavParams) { }

  ngOnInit() {
    this.tablero = this.navParams.get('tablero');
  }

}
