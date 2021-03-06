import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ErrorPopupComponent } from '../errorPopup/errorPopup.component';

@Component({
  selector: 'app-teacher-register',
  templateUrl: './teacherRegister.component.html',
  styleUrls: ['./teacherRegister.component.css']
})
export class TeacherRegisterComponent implements OnInit {

  constructor(private router:Router, private dialog: MatDialog) { }
  ngOnInit(): void {}
  
  openErrorDialog(message:String){
    let audio = new Audio();
    audio.src = "https://res.cloudinary.com/dfionqbqe/video/upload/v1622072251/CE4101/TaskPlanner/cancel.mp3";
    audio.load();
    audio.play();

    this.dialog.open(ErrorPopupComponent,{
      height:'13vh',
      width:'30vw',
      data:{message:message}
    });
  }

  goToRegister(){
    this.router.navigate(['register']);
  } 

  register(){
    let name1 = (document.getElementById("name1") as HTMLInputElement).value;
    let name2 = (document.getElementById("name2") as HTMLInputElement).value;
    let surname1 = (document.getElementById("surname1") as HTMLInputElement).value;
    let surname2 = (document.getElementById("surname2") as HTMLInputElement).value;
    let email = (document.getElementById("email") as HTMLInputElement).value;
    let id = (document.getElementById("id") as HTMLInputElement).value;
    let phoneNumber = (document.getElementById("phoneNumber") as HTMLInputElement).value;

    if(/[^a-z]/i.test(name1)){
      this.openErrorDialog("El primer nombre solo puede contener letras.");
    }else if (name1==""){
      this.openErrorDialog("Debe colocar un primer nombre.");
    }else if(/[^a-z]/i.test(name2)){
      this.openErrorDialog("El segundo nombre solo puede contener letras.");
    }else if(/[^a-z]/i.test(surname1)){
      this.openErrorDialog("El primer apellido solo puede contener letras.");
    }else if(surname1==""){
      this.openErrorDialog("Debe colocar un primer apellido.");
    }else if(/[^a-z]/i.test(surname2)){
      this.openErrorDialog("El segundo apellido solo puede contener letras.");
    }else if(surname2==""){
      this.openErrorDialog("Debe colocar un segundo apellido.");
    }else if(email==""){
      this.openErrorDialog("Debe colocar un correo institucional.");
    }else if(!/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(email)){
      this.openErrorDialog("Debe colocar un correo institucional v??lido.");
    }else if(id==""){
      this.openErrorDialog("Debe colocar un carn?? institucional.");
    }else if(!/^\d+$/.test(id)){
      this.openErrorDialog("El carn?? institucional solo puede contener n??meros.");
    }else if(phoneNumber==""){
      this.openErrorDialog("Debe colocar un n??mero de tel??fono.");
    }else if(!/^\d+$/.test(phoneNumber)){
      this.openErrorDialog("El n??mero de tel??fono solo puede contener n??meros.");
    }else{
      
      //do register
      this.router.navigate(['']);
    }
  }

}
