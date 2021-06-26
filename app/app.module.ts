import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTooltipModule } from '@angular/material/tooltip';


import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { app_routing } from './app.routes';
import { StudentLoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { StudentRegisterComponent } from './studentRegister/studentRegister.component';
import { TeacherRegisterComponent } from './teacherRegister/teacherRegister.component';
import { ErrorPopupComponent } from './errorPopup/errorPopup.component';
import { InfoPopupComponent } from './infoPopup/infoPopup.component';
import { StudentBoardsComponent } from './studentBoards/studentBoards.component';
import { YesNoPopupComponent } from './yesNoPopup/yesNoPopup.component';
import { EditBoardPopupComponent } from './editBoardPopup/editBoardPopup.component';
import { NewBoardPopupComponent } from './newBoardPopup/newBoardPopup.component';
import { FriendsComponent } from './friends/friends.component';
import { StatsComponent } from './stats/stats.component';
import { StudentProfileComponent } from './studentProfile/studentProfile.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { InsideStudenBoardComponent } from './insideStudentBoard/insideStudentBoard.component';

import {DragDropModule} from '@angular/cdk/drag-drop';
import { ShareBoardPopupComponent } from './shareBoardPopup/shareBoardPopup.component';
import { EditStatePopupComponent } from './editStatePopup/editStatePopup.component';
import { CriticRoutePopupComponent } from './criticRoutePopup/criticRoutePopup.component';
import { EditTaskPopupComponent } from './editTaskPopup/editTaskPopup.component';
import { NotificationsPopupComponent } from './notificationsPopup/notificationsPopup.component';
import { TeacherBoardsComponent } from './teacherBoards/teacherBoards.component';
import { TeacherProfileComponent } from './teacherProfile/teacherProfile.component';
import { InsideTeacherBoardComponent } from './insideTeacherBoard/insideTeacherBoard.component';


@NgModule({
  declarations: [
    AppComponent,
    StudentLoginComponent,
    RegisterComponent,
    StudentRegisterComponent,
    TeacherRegisterComponent,
    ErrorPopupComponent,
    InfoPopupComponent,
    StudentBoardsComponent,
    YesNoPopupComponent,
    EditBoardPopupComponent,
    NewBoardPopupComponent,
    FriendsComponent,
    StatsComponent,
    StudentProfileComponent,
    InsideStudenBoardComponent,
    ShareBoardPopupComponent,
    EditStatePopupComponent,
    CriticRoutePopupComponent,
    EditTaskPopupComponent,
    NotificationsPopupComponent,
    TeacherBoardsComponent,
    TeacherProfileComponent,
    InsideTeacherBoardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    app_routing,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatTooltipModule,
    
    NgApexchartsModule,

    DragDropModule

  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: []
})
export class AppModule { }
