import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastroProdutos2Component } from './cadastro-produtos2/cadastro-produtos2.component';
import { CoursesComponent } from './courses/courses.component';
import { LoginComponent } from './login/login.component';
import { StudentsComponent } from './students/students.component';

const routes: Routes = [
  {path: '', component: CadastroProdutos2Component},
  {path: 'courses', component: CoursesComponent},
  {path: 'students' , component: StudentsComponent},
  {path: 'login', component: LoginComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
