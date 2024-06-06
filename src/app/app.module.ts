import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CadastroProdutos2Component } from './cadastro-produtos2/cadastro-produtos2.component';
import { FormGroup, FormsModule, NgModel, ReactiveFormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';
import { NgbAlertModule, NgbModule, NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { CoursesComponent } from './courses/courses.component';
import { StudentsComponent } from './students/students.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    CadastroProdutos2Component,
    FooterComponent,
    NavbarComponent,
    LoginComponent,
    CoursesComponent,
    StudentsComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule, 
    NgbModule, 
    NgbAlertModule, 
    NgbPopoverModule,
    HttpClientModule,
    
    
    
    

    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
