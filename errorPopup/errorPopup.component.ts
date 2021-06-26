import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-error-popup',
  templateUrl: './errorPopup.component.html',
  styleUrls: ['./errorPopup.component.css']
})
export class ErrorPopupComponent implements OnInit {

  errorMessage = this.data.message;

  constructor(@Inject(MAT_DIALOG_DATA) private data:any) { }

  ngOnInit(): void {
    
  }

}
