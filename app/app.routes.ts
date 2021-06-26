import { RouterModule, Routes } from '@angular/router';
import { StudentLoginComponent } from 'src/app/login/login.component'; 
import { RegisterComponent } from 'src/app/register/register.component';
import { StudentRegisterComponent } from './studentRegister/studentRegister.component';
import { StudentBoardsComponent } from './studentBoards/studentBoards.component';
import { TeacherRegisterComponent } from './teacherRegister/teacherRegister.component';
import { FriendsComponent } from './friends/friends.component';
import { StatsComponent } from './stats/stats.component';
import { StudentProfileComponent } from './studentProfile/studentProfile.component';
import { InsideStudenBoardComponent } from './insideStudentBoard/insideStudentBoard.component';
import { TeacherProfileComponent } from './teacherProfile/teacherProfile.component';
import { TeacherBoardsComponent } from './teacherBoards/teacherBoards.component';
import { InsideTeacherBoardComponent } from './insideTeacherBoard/insideTeacherBoard.component';


const app_routes: Routes = [ 
    { path: '', component: StudentLoginComponent},
    { path: 'register', component: RegisterComponent},
    { path: 'studentRegister', component: StudentRegisterComponent},
    { path: 'teacherRegister', component: TeacherRegisterComponent},
    { path: 'studentBoards', component: StudentBoardsComponent},
    { path: 'friends', component: FriendsComponent},
    { path: 'stats', component: StatsComponent},
    { path: 'studentProfile', component: StudentProfileComponent},
    { path: 'insideStudentBoard', component: InsideStudenBoardComponent},
    { path: 'teacherProfile', component: TeacherProfileComponent},
    { path: 'teacherBoards', component: TeacherBoardsComponent},
    { path: 'insideTeacherBoard', component: InsideTeacherBoardComponent}
]

export const app_routing = RouterModule.forRoot(app_routes);
