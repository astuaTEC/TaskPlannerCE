import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

@Component({
  selector: 'app-registro-estudiante',
  templateUrl: './registro-estudiante.page.html',
  styleUrls: ['./registro-estudiante.page.scss'],
})
export class RegistroEstudiantePage implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
  }

  goToPreRegister(){
    this.router.navigate(['/login-tabs/pre-registro']);
  }

}