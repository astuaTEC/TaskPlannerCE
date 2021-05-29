import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-amigos',
  templateUrl: './amigos.page.html',
  styleUrls: ['./amigos.page.scss'],
})
export class AmigosPage implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
  }

  goToBuscarAmigos(){
    this.router.navigate(['/estudiante-tabs/buscar-amigos']);
  }

  goToNotificaciones(){
    this.router.navigate(['/estudiante-tabs/amigos-notificaciones']);
  }


}
