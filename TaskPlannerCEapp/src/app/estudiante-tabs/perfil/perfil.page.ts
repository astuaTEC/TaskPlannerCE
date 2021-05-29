import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
  }

  goToLogin(){
    this.router.navigate(['/login-tabs/login']);
  }
  goToEditarPerfil(){
    this.router.navigate(['/estudiante-tabs/editar-perfil']);
  }


}
