import { Component, OnInit } from '@angular/core';
import { APIService } from '../api.service';

@Component({
  selector: 'app-new-type-popup',
  templateUrl: './new-type-popup.component.html',
  styleUrls: ['./new-type-popup.component.css']
})
export class NewTypePopupComponent implements OnInit {

  constructor(private API:APIService) { }

  ngOnInit(): void {
  }

  createType(){

    this.API.addAdminType({nombre:(document.getElementById("typeName") as HTMLInputElement).value}).subscribe(
      data => {},
      error => {
        window.location.reload();
      }
    )
  }

}
