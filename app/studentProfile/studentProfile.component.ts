import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { APIService } from '../api.service';
import { ErrorPopupComponent } from '../errorPopup/errorPopup.component';
import { YesNoPopupComponent } from '../yesNoPopup/yesNoPopup.component';

@Component({
  selector: 'app-student-profile',
  templateUrl: './studentProfile.component.html',
  styleUrls: ['./studentProfile.component.css']
})
export class StudentProfileComponent implements OnInit {


  name1 = "";
  name2 = "";
  surname1 = "";
  surname2 = "";
  email = <any>localStorage.getItem('email');
  id = "";
  phoneNumber = "";
  currentProvince = "";
  academicProvince = "";
  career = "";
  interest = "";

  constructor(private router:Router, private dialog:MatDialog, private API:APIService) { }

  ngOnInit(): void {
    this.API.getStudentInfo(<any>localStorage.getItem('email')).subscribe(
      data => {
        this.name1 = data[<any>"primerNombre"];
        this.name2 = data[<any>"segundoNombre"];
        this.surname1 = data[<any>"primerApellido"];
        this.surname2 = data[<any>"segundoApellido"];
        this.id = data[<any>"carnet"];
        this.phoneNumber = data[<any>"telefono"];
        this.currentProvince = data[<any>"provinciaResidencia"];
        this.academicProvince = data[<any>"provinciaUniversidad"];
        this.career = data[<any>"carreraMatriculada"];
        this.interest = data[<any>"areaDeInteres"];
      }
    )
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


  editProfile(){
    let name1 = (document.getElementById("name1") as HTMLInputElement).value;
    let name2 = (document.getElementById("name2") as HTMLInputElement).value;
    let surname1 = (document.getElementById("surname1") as HTMLInputElement).value;
    let surname2 = (document.getElementById("surname2") as HTMLInputElement).value;
    let email = (document.getElementById("email") as HTMLInputElement).value;
    let id = (document.getElementById("id") as HTMLInputElement).value;
    let phoneNumber = (document.getElementById("phoneNumber") as HTMLInputElement).value;
    let currentProvince = (document.getElementById("currentProvince") as HTMLInputElement).value;
    let academicProvince = (document.getElementById("academicProvince") as HTMLInputElement).value;
    let career = (document.getElementById("career") as HTMLInputElement).value;
    let interest = (document.getElementById("interest") as HTMLInputElement).value;

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

      let student = {correoInstitucional:email,carnet:id,primerNombre:name1,segundoNombre:name2,primerApellido:surname1,segundoApellido:surname2,telefono:phoneNumber,carreraMatriculada:career,provinciaResidencia:currentProvince,provinciaUniversidad:academicProvince,areaDeInteres:interest};
      

      this.dialog.open(YesNoPopupComponent,{height:'17vh',width:'20vw',data:{id:8,message:"¿Guardar los cambios?",student:student}});
    }
  }

  deleteProfile(){
    this.dialog.open(YesNoPopupComponent,{height:'17vh',width:'20vw',data:{id:7,message:"¿Eliminar tu perfil?"}});
  }


  goToStudentBoards(){this.router.navigate(['studentBoards']);}
  goToFriends(){this.router.navigate(['friends']);}
  goToStats(){this.router.navigate(['stats']);}
  logOut(){this.dialog.open(YesNoPopupComponent,{height:'17vh',width:'20vw',data:{id:1,message:"¿Cerrar sesión?"}});}

}

