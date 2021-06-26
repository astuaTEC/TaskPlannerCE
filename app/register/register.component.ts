import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  goToLogin(){
    this.router.navigate(['']);
  }

  goToStudentRegister(){
    this.router.navigate(['studentRegister']);
  }

  goToTeacherRegister(){
    this.router.navigate(['teacherRegister']);
  }

}
