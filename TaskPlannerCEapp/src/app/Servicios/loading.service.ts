import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  constructor(private loadingC: LoadingController) { }


  // Desplegar un controlador Loading
  async iniciarLoading(mensaje: string){
    const loading = await this.loadingC.create({
      message: mensaje,
      spinner: "bubbles",
      cssClass: 'loading-k',
      backdropDismiss: false,
      showBackdrop: true
    });
    return await loading.present(); 
  }

  // Detener el controlador Loading
  detenerLoading(){
    this.loadingC.dismiss();
  }
}
