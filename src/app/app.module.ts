import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CadastroProdutos2Component } from './cadastro-produtos2/cadastro-produtos2.component';
import { FormGroup, FormsModule, NgModel, ReactiveFormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';
import { NgbAlertModule, NgbModule, NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    CadastroProdutos2Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule, 
    NgbModule, 
    NgbAlertModule, 
    NgbPopoverModule,
    HttpClientModule
    
    
    

    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
