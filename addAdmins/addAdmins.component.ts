import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ErrorPopupComponent } from '../errorPopup/errorPopup.component';
import { YesNoPopupComponent } from '../yesNoPopup/yesNoPopup.component';

@Component({
  selector: 'app-add-admins',
  templateUrl: './addAdmins.component.html',
  styleUrls: ['./addAdmins.component.css']
})
export class AddAdminsComponent implements OnInit {

  admin = false;
  isNoguera = false;


  constructor(private router:Router, private dialog:MatDialog) { }

  ngOnInit(): void {
    if(localStorage.getItem('admin')=="Yes"){
      this.admin = true;
    }

    if(localStorage.getItem('email')=="lnoguera@profextec.cr"){
      this.isNoguera = true;
    }

  }

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


  registerdAdmin(){
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
    }else if(phoneNumber==""){
      this.openErrorDialog("Debe colocar un número de teléfono.");
    }else if(!/^\d+$/.test(phoneNumber)){
      this.openErrorDialog("El número de teléfono solo puede contener números.");
    }else{
      let admin = {correoInstitucional:email,carnet:id,primerNombre:name1,segundoNombre:name2,primerApellido:surname1,segundoApellido:surname2,telefono:phoneNumber};

      this.dialog.open(YesNoPopupComponent,{height:'17vh',width:'20vw',data:{id:30,message:"¿Registrar como administrador?" ,admin:admin}});

    }
  }

  
  goToTeacherProfile(){
    this.router.navigate(['teacherProfile']);
  }

  
  goToTeacherBoards(){
    this.router.navigate(['teacherBoards'])
  }

  goToBoardManagement(){
    this.router.navigate(['boardsManagement']);
  }

  goToAdminManagement(){
    this.router.navigate(['addAdmins']);
  }

  logOut(){this.dialog.open(YesNoPopupComponent,{height:'17vh',width:'20vw',data:{id:1,message:"¿Cerrar sesión?"}});}

}
