import { Component, NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule
  ]})
  
@Component({
  selector: 'app-info-tablero',
  templateUrl: './info-tablero.component.html',
  styleUrls: ['./info-tablero.component.scss'],
})


export class InfoTableroComponent implements OnInit {

  constructor() { }

  ngOnInit() {}

}
