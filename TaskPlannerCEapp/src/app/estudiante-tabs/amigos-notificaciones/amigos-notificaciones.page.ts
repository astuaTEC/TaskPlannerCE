import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'; 

@Component({
  selector: 'app-amigos-notificaciones',
  templateUrl: './amigos-notificaciones.page.html',
  styleUrls: ['./amigos-notificaciones.page.scss'],
})
export class AmigosNotificacionesPage implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
  }
  
  goToAmigos(){
    this.router.navigate(['/estudiante-tabs/amigos']);
  }


}
