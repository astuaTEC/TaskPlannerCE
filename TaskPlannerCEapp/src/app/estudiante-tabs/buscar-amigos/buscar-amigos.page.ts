import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'; 

@Component({
  selector: 'app-buscar-amigos',
  templateUrl: './buscar-amigos.page.html',
  styleUrls: ['./buscar-amigos.page.scss'],
})
export class BuscarAmigosPage implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
  }

  goToAmigos(){
    this.router.navigate(['/estudiante-tabs/amigos']);
  }

}
