import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { APIService } from '../api.service';
import { ErrorPopupComponent } from '../errorPopup/errorPopup.component';
import { InfoPopupComponent } from '../infoPopup/infoPopup.component';



@Component({
  selector: 'app-student-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class StudentLoginComponent implements OnInit {

  constructor(private router: Router, private dialog: MatDialog, private API : APIService) { }

  ngOnInit(): void {
  }

  openErrorDialog(message:String){
    let audio = new Audio();
    audio.src = "https://res.cloudinary.com/dfionqbqe/video/upload/v1622072251/CE4101/TaskPlanner/cancel.mp3";
    audio.load();
    audio.play();

    this.dialog.open(ErrorPopupComponent,{
      height:'12vh',
      width:'30vw',
      data:{message:message}
    });
  }

  login(){
    let email = (document.getElementById("email") as HTMLInputElement).value;
    let password = (document.getElementById("password") as HTMLInputElement).value;
    
    if(email==""){
      this.openErrorDialog("Debe colocar un correo institucional.");
    }else if(password==""){
      this.openErrorDialog("Debe colocar una contraseña.");
    }else{
      
      this.API.login(email,password).subscribe(
        data => {
          if(data[<any>"estudiante"]){
            this.router.navigate(['studentBoards'])
            localStorage.setItem('email',email);
            
            let audio = new Audio();
            audio.src = "https://res.cloudinary.com/dfionqbqe/video/upload/v1622072251/CE4101/TaskPlanner/start.mp3";
            audio.load();
            audio.play();

          }else if(data[<any>"profesor"]){

            this.router.navigate(['teacherBoards'])

            localStorage.setItem('admin',"No");
            localStorage.setItem('email',email);

            let audio = new Audio();
            audio.src = "https://res.cloudinary.com/dfionqbqe/video/upload/v1622072251/CE4101/TaskPlanner/start.mp3";
            audio.load();
            audio.play();

          }else if(data[<any>"admin"]){
            this.router.navigate(['teacherBoards'])

            localStorage.setItem('admin',"Yes");
            localStorage.setItem('email',email);

            let audio = new Audio();
            audio.src = "https://res.cloudinary.com/dfionqbqe/video/upload/v1622072251/CE4101/TaskPlanner/start.mp3";
            audio.load();
            audio.play();

          }
        },
        error => {
          this.openErrorDialog("Usuario no encontrado.");
        }
      )
    }

  }

  goToRegister(){
    this.router.navigate(['register']);
  }
  
  showInfo(){
    this.dialog.open(InfoPopupComponent,{
      height:'39vh',
      width:'30vw'
    });
  }

}
