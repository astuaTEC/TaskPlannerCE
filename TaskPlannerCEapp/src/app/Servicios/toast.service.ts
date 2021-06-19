import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(public toastController: ToastController) { }

  async mostrarToast(cabecera: string, mensaje: string, segundos: number) {
    const toast = await this.toastController.create({
      header: cabecera,
      message: mensaje,
      duration: segundos * 1000,
      position: 'top'
    });
    toast.present();
  }
}
