import { Component, OnInit } from '@angular/core';
import { ModalController} from '@ionic/angular';

@Component({
  selector: 'app-crear-tablero-modal',
  templateUrl: './crear-tablero-modal.component.html',
  styleUrls: ['./crear-tablero-modal.component.scss'],
})
export class CrearTableroModalComponent implements OnInit {

  constructor(private modalCtrl: ModalController) { }



  ngOnInit() {}

  cerrarModal() {
    this.modalCtrl.dismiss();
  }

}
