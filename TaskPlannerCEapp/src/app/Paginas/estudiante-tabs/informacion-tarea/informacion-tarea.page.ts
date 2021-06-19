import { Component, OnInit } from '@angular/core';
import { NavParams } from '@ionic/angular';
import { Tarea } from 'src/app/Clases/tarea';

@Component({
  selector: 'app-informacion-tarea',
  templateUrl: './informacion-tarea.page.html',
  styleUrls: ['./informacion-tarea.page.scss'],
})
export class InformacionTareaPage implements OnInit {

  // Variable de entrada para la tarea
  tarea: Tarea = null;

  constructor(public navParams: NavParams) { }

  ngOnInit() {
    this.tarea = this.navParams.get('tarea');
  }

}
